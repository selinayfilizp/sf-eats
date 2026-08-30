/* =========================================================================
   DATA QUALITY REPORT — run after any generate/refresh:  node validate-data.js
   Exits nonzero if a hard rule fails, so it can gate deploys.

   Hard rules (fail):
     - a spot with no name, no lat/lng, or no address
     - businessStatus present and not OPERATIONAL (closed spot still listed)
     - an em dash anywhere in spot text (house style)
     - dishApproval outside 0..100, or mentions negative
   Soft signals (warn):
     - dishApproval == null coverage below 90%
     - missing price
     - data older than 45 days
     - duplicate spot names within one dish
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "sf-food-data.js"), "utf8"), ctx);
const FOOD = ctx.window.SF_FOOD_DATA;

let fails = [], warns = [];
let spots = 0, withStats = 0, withPrice = 0;

for (const [cid, c] of Object.entries(FOOD.cuisines)) {
  for (const d of c.dishes) {
    const seen = new Set();
    for (const s of d.spots) {
      spots++;
      const tag = `${cid}/${d.id} · ${s.name || "?"}`;
      if (!s.name) fails.push(`${tag}: missing name`);
      if (typeof s.lat !== "number" || typeof s.lng !== "number") fails.push(`${tag}: missing geo`);
      if (!s.address) fails.push(`${tag}: missing address`);
      if (s.businessStatus && s.businessStatus !== "OPERATIONAL") fails.push(`${tag}: ${s.businessStatus}`);
      for (const field of ["why", "name", "neighborhood", "dishChip"])
        if (s[field] && String(s[field]).includes("—")) fails.push(`${tag}: em dash in ${field}`);
      if (s.dishApproval != null && (s.dishApproval < 0 || s.dishApproval > 100)) fails.push(`${tag}: approval ${s.dishApproval}`);
      if (s.dishMentions != null && s.dishMentions < 0) fails.push(`${tag}: mentions ${s.dishMentions}`);
      if (s.dishApproval != null) withStats++;
      if (s.price) withPrice++;
      if (seen.has(s.name)) warns.push(`${tag}: duplicate in dish`);
      seen.add(s.name);
    }
  }
}

const statsPct = Math.round((withStats / spots) * 100);
if (statsPct < 90) warns.push(`hype/love coverage ${statsPct}% (${withStats}/${spots}) below 90%`);
const pricePct = Math.round((withPrice / spots) * 100);
if (pricePct < 75) warns.push(`price coverage ${pricePct}%`);
const ageDays = Math.floor((Date.now() - new Date(FOOD.refreshedAt || FOOD.generatedAt)) / 86400000);
if (ageDays > 45) warns.push(`data is ${ageDays} days old (refresh with fill-missing-stats.js or generate-data.js)`);

console.log(`spots=${spots} statsCoverage=${statsPct}% priceCoverage=${pricePct}% age=${ageDays}d`);
warns.forEach((w) => console.log("WARN " + w));
fails.forEach((f) => console.log("FAIL " + f));
console.log(fails.length ? `\n${fails.length} hard failure(s)` : "\nAll hard rules pass.");
process.exit(fails.length ? 1 : 0);
