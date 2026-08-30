/* =========================================================================
   LUNCH TAB DATA — writes lunch-data.js (window.LUNCH_DATA), consumed by
   index.html the same way michelin-sources.js is: client-side only, no
   share page.

   Two dishes:
     "Best Lunch Spots"        — curated pointers into sf-food-data.js; each
                                 spot is copied with its existing dish stats,
                                 so no API calls and no invented numbers.
     "Lunch Recommendations"   — ranked by how often reviewers literally
                                 mention lunch at candidate spots, scored by
                                 the same reviews-provider pipeline with the
                                 keyword "lunch". Needs SerpAPI:
                                     node build-lunch-data.js --recs

   Without --recs, an existing recs list in lunch-data.js is preserved.
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

require("fs").readFileSync(path.join(__dirname, ".env"), "utf8").split("\n")
  .forEach((l) => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; });

const RECS = process.argv.includes("--recs");
const OUT = path.join(__dirname, "lunch-data.js");

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "sf-food-data.js"), "utf8"), ctx);
const CUISINES = ctx.window.SF_FOOD_DATA.cuisines;

function findSpot(cuisineId, dishId, name) {
  const d = CUISINES[cuisineId]?.dishes.find((x) => x.id === dishId);
  const s = d?.spots.find((x) => x.name.toLowerCase().includes(name.toLowerCase()));
  if (!s) console.log(`  ? not found: ${cuisineId}/${dishId}/${name}`);
  return s ? { ...s } : null;
}

/* Curated eat-in ranking; mirrors /blog/best-lunch-spots-san-francisco.
   Each entry points at the source dish so stats stay real. */
const BEST = [
  ["vietnamese", "viet-banhmi",    "Saigon Sandwich",  "banh mi"],
  ["japanese",   "jpn-curry",      "Muracci",          "katsu curry"],
  ["mexican",    "mex-burrito",    "El Metate",        "burrito"],
  ["italian",    "ita-nyslice",    "Golden Boy",       "slice"],
  ["vietnamese", "viet-pho",       "Pho 2000",         "pho"],
  ["korean",     "kor-bibimbap",   "Manna",            "bibimbap"],
  ["chinese",    "chn-wontonnoods","Hai Ky Mi Gia",    "wonton noodles"],
  ["mexican",    "mex-tamale",     "La Palma",         "tamales"],
];

const bestSpots = BEST.map(([c, d, n, chip]) => {
  const s = findSpot(c, d, n);
  if (s) s.dishChip = chip;
  return s;
}).filter(Boolean);

/* Candidates for the lunch-mentions analysis: the curated list plus
   big-sample spots where a lunch crowd plausibly exists. */
const REC_CANDIDATES = [
  ...BEST,
  ["vietnamese", "viet-comtam",   "Yummy Yummy",   "com tam"],
  ["indian",     "ind-curry",     "Pakwan",        "curry"],
  ["japanese",   "jpn-curry",     "Volcano Curry", "curry"],
  ["chinese",    "chn-dimsum",    "Dragon Beaux",  "dim sum"],
  ["mexican",    "mex-burrito",   "La Taqueria",   "burrito"],
  ["turkish",    "tur-doner",     "", ""],
];

async function computeRecs() {
  const { reviewsEnabled, dishStats } = require("./reviews-provider.js");
  if (!reviewsEnabled()) { console.log("reviews provider not configured; skipping recs"); return null; }
  const KEY = process.env.GOOGLE_PLACES_API_KEY;
  const out = [];
  for (const [c, d, n, chip] of REC_CANDIDATES) {
    if (!n) continue;
    const s = findSpot(c, d, n);
    if (!s) continue;
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": KEY, "X-Goog-FieldMask": "places.id" },
        body: JSON.stringify({ textQuery: `${s.name} ${s.address || "San Francisco"}`, maxResultCount: 1 }),
      });
      const id = (await res.json()).places?.[0]?.id;
      if (!id) { console.log(`  ? no place id: ${s.name}`); continue; }
      const stats = await dishStats({ placeId: id }, ["lunch"]);
      if (stats && stats.mentions > 0) {
        out.push({ ...s, dishChip: chip || "lunch", dishMentions: stats.mentions, dishApproval: stats.approval, dishSample: stats.sample, dishSource: stats.source, dishVerified: false });
        console.log(`  ✓ ${s.name}: ${stats.mentions} lunch mentions, ${stats.approval}% (read ${stats.totalRead})`);
      } else {
        console.log(`  · ${s.name}: no lunch mentions`);
      }
    } catch (e) { console.log(`  ✗ ${s.name}: ${e.message}`); }
  }
  out.sort((a, b) => (b.dishMentions ?? 0) - (a.dishMentions ?? 0));
  return out.slice(0, 8);
}

(async () => {
  // keep previously computed recs when not recomputing
  let prevRecs = [];
  if (fs.existsSync(OUT)) {
    const pctx = { window: {} };
    vm.createContext(pctx);
    try {
      vm.runInContext(fs.readFileSync(OUT, "utf8"), pctx);
      prevRecs = pctx.window.LUNCH_DATA?.dishes?.find((d) => d.id === "lunch-recs")?.spots || [];
    } catch {}
  }
  const recs = RECS ? (await computeRecs()) || prevRecs : prevRecs;

  const dishes = [
    { id: "lunch-best", emoji: "🥪", name: "Best Lunch Spots", spots: bestSpots },
  ];
  if (recs.length) dishes.push({ id: "lunch-recs", emoji: "🍱", name: "Lunch Recommendations", spots: recs });

  const data = { updatedAt: new Date().toISOString().slice(0, 10), label: "Lunch", dishes };
  fs.writeFileSync(OUT, `/* AUTO-GENERATED by build-lunch-data.js. Do not hand-edit. */\nwindow.LUNCH_DATA = ${JSON.stringify(data, null, 1)};\n`);
  console.log(`Wrote lunch-data.js: ${bestSpots.length} best spots, ${recs.length} recs${RECS ? "" : " (cached)"}`);
})();
