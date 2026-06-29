#!/usr/bin/env node
/* Cheap sanity check for your reviews provider BEFORE a full run.
   Pulls all reviews for one place and scores one dish keyword.

   Usage:
     node test-reviews.js <place_id> <keyword> [moreKeywords...]
   Example (La Taqueria, Mission burrito):
     node test-reviews.js ChIJrTYBzUZ-j4ARdeRB5Wzp_CE "carne asada" burrito

   Reads SERPAPI_KEY / REVIEWS_PROVIDER from .env (same as generate-data.js).
*/
const fs = require("fs"), path = require("path");
(function loadEnv(){ const p=path.join(__dirname,".env"); if(!fs.existsSync(p))return;
  for(const l of fs.readFileSync(p,"utf8").split("\n")){const m=l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^["']|["']$/g,"");}})();

const REVIEWS = require("./reviews-provider.js");
const [placeId, ...keywords] = process.argv.slice(2);

if (!placeId || !keywords.length) {
  console.error('Usage: node test-reviews.js <place_id> <keyword> [more...]'); process.exit(1);
}
if (!REVIEWS.reviewsEnabled()) {
  console.error("No reviews provider configured. Set REVIEWS_PROVIDER + key in .env."); process.exit(1);
}

(async () => {
  console.log(`Fetching all reviews for ${placeId} …`);
  const stats = await REVIEWS.dishStats({ placeId }, keywords);
  if (!stats) { console.log("No reviews returned."); return; }
  console.log("\n  Keyword(s):   " + keywords.join(", "));
  console.log("  Reviews read: " + stats.sample + ` (of ${stats.totalRead ?? "?"} total scanned)`);
  console.log("  🗣 Mentions:   " + stats.mentions);
  console.log("  💛 Approval:   " + (stats.approval == null ? "—" : stats.approval + "%")
              + `   [mode: ${stats.mode}]`);
  if (stats.approvalStars != null) {
    console.log("      breakdown: stars " + stats.approvalStars + "%  ·  text "
                + stats.approvalText + "%  ·  hybrid " + stats.approvalHybrid + "%");
  }
  console.log("  Source:       " + stats.source + "\n");
})().catch(e => { console.error("✗", e.message); process.exit(1); });
