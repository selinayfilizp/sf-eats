/* =========================================================================
   QUOTE ENRICHER — adds a real reviewer quote to spots that only have the
   generic "Top-rated for…" line, using the 5 free reviews the Places API
   returns per place. No SerpAPI needed.

   For each spot: one searchText call (name + address) with places.reviews
   in the field mask. Prefers a 4–5★ review that names the dish (quoting the
   sentence around the mention); falls back to any 4–5★ review.

   Patches sf-food-data.js in place and caches results in quote-cache.json
   so re-runs skip already-fetched places.

   Run:  node enrich-quotes.js
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// dependency-free .env loader (no dotenv in this project)
for (const line of fs.readFileSync(path.join(__dirname, ".env"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) { console.error("GOOGLE_PLACES_API_KEY missing"); process.exit(1); }

const DISHES = require("./dishes.js");
const SENTIMENT = require("./sentiment.js");
const REPICK = process.argv.includes("--repick");
const KEYWORDS = {};
for (const cu of Object.values(DISHES)) for (const d of cu.dishes) KEYWORDS[d.id] = d.keywords || [];

const DATA_PATH = path.join(__dirname, "sf-food-data.js");
const CACHE_PATH = path.join(__dirname, "quote-cache.json");
const src = fs.readFileSync(DATA_PATH, "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(src, ctx);
const FOOD = ctx.window.SF_FOOD_DATA;

const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, "utf8")) : {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cleanQuote(t) {
  let s = t.replace(/\s+/g, " ").trim();
  if (s.length > 150) s = s.slice(0, 147).replace(/[ ,.;:]+\S*$/, "") + "…";
  return "“" + s + "”";
}

// pull the sentence(s) around the first keyword mention, up to ~150 chars
function keywordSnippet(text, keywords) {
  const lower = text.toLowerCase();
  const kw = keywords.find((k) => lower.includes(k.toLowerCase()));
  if (!kw) return null;
  const sentences = text.split(/(?<=[.!?])\s+/);
  const kwSents = sentences
    .map((s, i) => ({ i, s, sc: SENTIMENT.sentiment(s, keywords).score }))
    .filter((x) => keywords.some((k) => x.s.toLowerCase().includes(k.toLowerCase())))
    .sort((a, b) => b.sc - a.sc);
  const idx = kwSents.length ? kwSents[0].i : -1;
  if (idx === -1) return cleanQuote(text);
  let snippet = sentences[idx];
  // add the next sentence if there's room
  if (idx + 1 < sentences.length && (snippet + " " + sentences[idx + 1]).length <= 150)
    snippet += " " + sentences[idx + 1];
  return cleanQuote(snippet);
}

async function fetchReviews(spot) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.reviews",
    },
    body: JSON.stringify({ textQuery: `${spot.name} ${spot.address || "San Francisco"}`, maxResultCount: 1 }),
  });
  if (!res.ok) throw new Error(`searchText ${res.status}`);
  const place = ((await res.json()).places || [])[0];
  if (!place) return null;
  return (place.reviews || []).map((r) => ({ rating: r.rating || 0, text: r.text?.text || "" })).filter((r) => r.text);
}

(async () => {
  let fetched = 0, quoted = 0, skipped = 0, failed = 0;
  for (const cu of Object.values(FOOD.cuisines)) {
    for (const dish of cu.dishes) {
      for (const spot of dish.spots) {
        const hasQuote = spot.why && spot.why.startsWith("“");
        if (hasQuote && !REPICK) { skipped++; continue; }
        const key = `${spot.name}|${spot.address || ""}`;
        let reviews = cache[key];
        if (reviews === undefined) {
          try {
            await sleep(120);
            reviews = await fetchReviews(spot);
            fetched++;
            cache[key] = reviews;
          } catch (e) {
            console.warn(`  ⚠ ${spot.name}: ${e.message}`);
            failed++;
            continue;
          }
        }
        if (!reviews || !reviews.length) continue;
        const kws = KEYWORDS[dish.id] || [];
        const good = reviews.filter((r) => r.rating >= 4);
        // among dish-naming reviews, prefer the most positive one
        const named = good
          .filter((r) => kws.some((k) => r.text.toLowerCase().includes(k.toLowerCase())))
          .map((r) => ({ r, s: SENTIMENT.sentiment(r.text, kws).score }))
          .sort((a, b) => b.s - a.s)[0]?.r;
        let quote = null;
        if (named) quote = keywordSnippet(named.text, kws);
        else if (good.length) {
          const best = good
            .map((r) => ({ r, s: SENTIMENT.sentiment(r.text, ["food", "place"]).score }))
            .sort((a, b) => b.s - a.s)[0].r;
          quote = cleanQuote(best.text);
        }
        if (quote) {
          spot.why = quote;
          quoted++;
          console.log(`  ✓ ${dish.id} · ${spot.name}${named ? "" : " (general)"}`);
        }
      }
    }
  }
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 1));
  const out =
    "/* AUTO-GENERATED by generate-data.js — do not edit by hand. */\n" +
    "window.SF_FOOD_DATA = " + JSON.stringify(FOOD, null, 2) + ";\n";
  fs.writeFileSync(DATA_PATH, out);
  console.log(`\nDone: ${quoted} quotes added (${fetched} API calls, ${skipped} already quoted, ${failed} failed)`);
})();
