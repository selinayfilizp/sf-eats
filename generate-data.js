#!/usr/bin/env node
/* =========================================================================
   SF EATS — live data generator
   Queries the Google Places API (New) for each dish, ranks the SF spots,
   pulls a real review quote per spot, and writes  ./sf-food-data.js
   which the front-end (sf-food-map.html) loads as live data.

   USAGE
     node generate-data.js              # live run (needs GOOGLE_PLACES_API_KEY)
     node generate-data.js --dry-run    # no network — writes fake sample data
     node generate-data.js --no-reviews # skip the per-spot review-quote calls
     node generate-data.js --top 4      # how many spots to keep per dish (default 4)

   The API key is read from the GOOGLE_PLACES_API_KEY environment variable,
   or from a local .env file (KEY=VALUE lines). It is never written to output.
   ========================================================================= */

const fs = require("fs");
const path = require("path");
const CATALOG = require("./dishes.js");

// Reviews provider — pulls ALL reviews per place to compute hype vs love
// automatically (approval = % rated 4★+ over every dish-mentioning review).
const REVIEWS = require("./reviews-provider.js");

// Hand-researched "hype vs love" numbers. Now an OVERRIDE layer: a manual
// entry here wins over the automatic API number (use it to pin/correct).
// Optional file — the app works without it.
let VERIFIED = {};
try { VERIFIED = require("./verified-dishes.js"); } catch { /* none yet */ }

// Loose name match so "La Taqueria" matches "La Taqueria" / "La Taquería" etc.
const normName = s => (s || "")
  .toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "")  // strip accents
  .replace(/[^a-z0-9]+/g, " ").trim();

function verifiedFor(dishId, spotName) {
  const list = VERIFIED[dishId] || [];
  const n = normName(spotName);
  return list.find(e => {
    const en = normName(e.place);
    return en === n || n.includes(en) || en.includes(n);
  }) || null;
}

// ---- tiny .env loader (no dependency) --------------------------------------
(function loadEnv() {
  const p = path.join(__dirname, ".env");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
})();

// ---- args ------------------------------------------------------------------
const args = process.argv.slice(2);
const DRY_RUN   = args.includes("--dry-run");
const NO_REVIEWS = args.includes("--no-reviews");
const TOP = (() => { const i = args.indexOf("--top"); return i >= 0 ? parseInt(args[i + 1], 10) : 4; })();

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!DRY_RUN && !API_KEY) {
  console.error("\n✗ No GOOGLE_PLACES_API_KEY found.");
  console.error("  Add it to a .env file (see .env.example) or run: node generate-data.js --dry-run\n");
  process.exit(1);
}

// ---- San Francisco bounding box (keeps results in the city) ----------------
const SF = {
  low:  { latitude: 37.700, longitude: -122.520 },
  high: { latitude: 37.835, longitude: -122.350 }
};
const inSF = (lat, lng) =>
  lat >= SF.low.latitude && lat <= SF.high.latitude &&
  lng >= SF.low.longitude && lng <= SF.high.longitude;

// ---- ranking ---------------------------------------------------------------
// Bayesian-weighted score: blends a place's rating toward a prior using its
// review count, so a 4.9 with 12 reviews can't outrank a 4.6 with 3,000.
const PRIOR_MEAN = 4.3;   // assumed citywide average
const PRIOR_WEIGHT = 200; // how many reviews it takes to "trust" the rating
const MIN_REVIEWS = 25;   // ignore places with thinner signal (relaxed if needed)
function score(rating, count) {
  if (!rating || !count) return 0;
  return (count / (count + PRIOR_WEIGHT)) * rating +
         (PRIOR_WEIGHT / (count + PRIOR_WEIGHT)) * PRIOR_MEAN;
}

// ---- Places API (New) helpers ----------------------------------------------
async function searchText(dish) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": [
        "places.id", "places.displayName", "places.formattedAddress",
        "places.rating", "places.userRatingCount", "places.location",
        "places.priceLevel", "places.googleMapsUri", "places.addressComponents",
        "places.businessStatus"
      ].join(",")
    },
    body: JSON.stringify({
      textQuery: dish.query,
      locationRestriction: { rectangle: SF },
      maxResultCount: 20,
      rankPreference: "RELEVANCE"
    })
  });
  if (!res.ok) throw new Error(`searchText ${res.status}: ${await res.text()}`);
  return (await res.json()).places || [];
}

async function getReviewQuote(placeId, keywords) {
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews`,
      { headers: { "X-Goog-Api-Key": API_KEY } }
    );
    if (!res.ok) return null;
    const reviews = (await res.json()).reviews || [];
    // prefer a 4–5 star review that names the dish
    const named = reviews.find(r =>
      (r.rating || 0) >= 4 &&
      keywords.some(k => (r.text?.text || "").toLowerCase().includes(k.toLowerCase()))
    );
    const pick = named || reviews.find(r => (r.rating || 0) >= 4) || reviews[0];
    if (!pick?.text?.text) return null;
    return cleanQuote(pick.text.text);
  } catch { return null; }
}

// ---- shaping ---------------------------------------------------------------
function cleanQuote(t) {
  let s = t.replace(/\s+/g, " ").trim();
  if (s.length > 150) s = s.slice(0, 147).replace(/[ ,.;:]+\S*$/, "") + "…";
  return "“" + s + "”";
}
function neighborhoodOf(place) {
  const comps = place.addressComponents || [];
  const want = ["neighborhood", "sublocality_level_1", "sublocality"];
  for (const t of want) {
    const c = comps.find(c => (c.types || []).includes(t));
    if (c) return c.longText;
  }
  return "San Francisco";
}
const PRICE = { PRICE_LEVEL_INEXPENSIVE:"$", PRICE_LEVEL_MODERATE:"$$", PRICE_LEVEL_EXPENSIVE:"$$$", PRICE_LEVEL_VERY_EXPENSIVE:"$$$$" };

async function processDish(dish) {
  let places = await searchText(dish);

  // keep operational, in-SF, rated places
  places = places.filter(p =>
    p.businessStatus === "OPERATIONAL" &&
    p.location && inSF(p.location.latitude, p.location.longitude) &&
    p.rating && p.userRatingCount
  );

  // dedupe by id
  const seen = new Set();
  places = places.filter(p => (seen.has(p.id) ? false : seen.add(p.id)));

  // prefer places with enough reviews; relax if that leaves too few
  let pool = places.filter(p => p.userRatingCount >= MIN_REVIEWS);
  if (pool.length < TOP) pool = places;

  pool.sort((a, b) => score(b.rating, b.userRatingCount) - score(a.rating, a.userRatingCount));
  const top = pool.slice(0, TOP);

  const spots = [];
  for (const p of top) {
    let quote = null;
    if (!NO_REVIEWS) quote = await getReviewQuote(p.id, dish.keywords);
    const name = p.displayName?.text || "Unknown";

    // hype vs love: automatic (read ALL reviews via provider), unless a manual
    // verified-dishes.js entry overrides it.
    let hl = { mentions: null, approval: null, sample: null, source: null };
    if (!NO_REVIEWS && REVIEWS.reviewsEnabled()) {
      try {
        const s = await REVIEWS.dishStats({ placeId: p.id }, dish.keywords);
        if (s) hl = { mentions: s.mentions, approval: s.approval, sample: s.sample, source: s.source };
      } catch (e) { console.warn(`    ⚠ reviews(${name}): ${e.message.split("\n")[0]}`); }
    }
    const v = verifiedFor(dish.id, name);     // manual override wins if present
    if (v) hl = { mentions: v.mentions, approval: v.approval, sample: v.sample, source: "manual", chip: v.chip };

    spots.push({
      name,
      neighborhood: neighborhoodOf(p),
      rating: p.rating,
      reviews: p.userRatingCount.toLocaleString(),
      price: PRICE[p.priceLevel] || "",
      why: quote || `Top-rated for ${dish.name.toLowerCase()} — ${p.rating}★ from ${p.userRatingCount.toLocaleString()} Google reviews.`,
      address: (p.formattedAddress || "").replace(/, USA$/, ""),
      lat: p.location.latitude,
      lng: p.location.longitude,
      mapsUri: p.googleMapsUri || "",
      // ---- hype vs love (null if no provider configured and no manual entry) ----
      dishMentions:  hl.mentions,   // # reviews naming the dish
      dishApproval:  hl.approval,   // % of those rated 4★+ (read over ALL of them)
      dishSample:    hl.sample,     // # dish-reviews scored (= mentions; no sampling)
      dishChip:      hl.chip || null,
      dishSource:    hl.source,     // "serpapi" | "manual" | null
      dishVerified:  hl.approval != null
    });
    await sleep(120); // be gentle on the API
  }
  return spots;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---- dry-run sample (no network) -------------------------------------------
function fakeSpots(dish, n) {
  const hoods = ["Mission", "North Beach", "Richmond", "SoMa", "Castro"];
  return Array.from({ length: n }, (_, i) => {
    const lat = 37.74 + Math.random() * 0.06, lng = -122.46 + Math.random() * 0.06;
    const rating = +(4.7 - i * 0.1).toFixed(1), count = 2400 - i * 500;
    // Illustrate hype-vs-love: spot #2 is a "hype trap" — most-mentioned dish
    // but lukewarm sentiment. Others show hype and love roughly aligned.
    const mentions = [180, 210, 95, 60, 40][i] ?? 30;
    const approval = i === 1 ? 58 : [94, 0, 88, 91, 86][i] ?? 84; // #2 dips low
    return {
      name: `${dish.name} Spot #${i + 1}`,
      neighborhood: hoods[i % hoods.length],
      rating, reviews: count.toLocaleString(), price: "$$",
      why: i === 1
        ? `“Everyone talks about the ${dish.name.toLowerCase()} but honestly it was just okay — over-hyped.”`
        : `“Best ${dish.name.toLowerCase()} I've had in SF — order it.”`,
      address: `${100 + i} Sample St`, lat, lng, mapsUri: "",
      dishMentions: mentions,
      dishApproval: approval,
      dishSample: 12,
      dishChip: dish.name.toLowerCase(),
      dishVerified: true
    };
  });
}

// ---- main ------------------------------------------------------------------
(async function main() {
  const t0 = Date.now();
  console.log(DRY_RUN ? "▶ DRY RUN (no API calls)" : "▶ Live run — Google Places API (New)");
  const out = { generatedAt: new Date().toISOString(), source: DRY_RUN ? "dry-run" : "google-places", cuisines: {} };

  for (const key of Object.keys(CATALOG)) {
    const c = CATALOG[key];
    out.cuisines[key] = { label: c.label, dishes: [] };
    for (const dish of c.dishes) {
      process.stdout.write(`  ${c.label} · ${dish.name} … `);
      try {
        const spots = DRY_RUN ? fakeSpots(dish, TOP) : await processDish(dish);
        out.cuisines[key].dishes.push({ id: dish.id, name: dish.name, emoji: dish.emoji, spots });
        console.log(`${spots.length} spots`);
      } catch (e) {
        out.cuisines[key].dishes.push({ id: dish.id, name: dish.name, emoji: dish.emoji, spots: [] });
        console.log(`✗ ${e.message.split("\n")[0]}`);
      }
      if (!DRY_RUN) await sleep(200);
    }
  }

  const banner = "/* AUTO-GENERATED by generate-data.js — do not edit by hand. */\n";
  fs.writeFileSync(
    path.join(__dirname, "sf-food-data.js"),
    banner + "window.SF_FOOD_DATA = " + JSON.stringify(out, null, 2) + ";\n"
  );

  const dishes = Object.values(out.cuisines).reduce((n, c) => n + c.dishes.length, 0);
  const spots  = Object.values(out.cuisines).reduce((n, c) => n + c.dishes.reduce((m, d) => m + d.spots.length, 0), 0);
  console.log(`\n✓ Wrote sf-food-data.js — ${dishes} dishes, ${spots} spots in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log("  Open sf-food-map.html to view. Re-run monthly to refresh.\n");
})();
