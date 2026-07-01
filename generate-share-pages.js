/* =========================================================================
   SHARE PAGE GENERATOR — writes s/<dishId>.html for every dish.

   Crawlers can't see URL hashes, so #mexican/mex-birria always previews the
   homepage OG image. These tiny static pages give each dish its own OG
   title/description/image, then instantly redirect humans to the hash route.

   Run after generate-data.js:   node generate-share-pages.js
   Also expects og/<dishId>.png  (see generate-og-images.py).
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = "https://sfeats.vercel.app";

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "sf-food-data.js"), "utf8"), ctx);
const CUISINES = ctx.window.SF_FOOD_DATA.cuisines;

const outDir = path.join(__dirname, "s");
fs.mkdirSync(outDir, { recursive: true });

const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let count = 0;
for (const [cuisineId, cuisine] of Object.entries(CUISINES)) {
  for (const dish of cuisine.dishes) {
    const top = dish.spots.slice(0, 3).map((s) => s.name).join(", ");
    const title = `Best ${dish.name} in San Francisco — SF Eats`;
    const desc = top
      ? `Top spots: ${top}. Ranked by what reviewers actually love, not just what they mention.`
      : `The best ${dish.name} in SF, ranked by what reviewers actually love.`;
    const hashUrl = `${SITE}/#${cuisineId}/${dish.id}`;
    const ogImage = `${SITE}/og/${dish.id}.png`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escAttr(title)}</title>
<meta name="description" content="${escAttr(desc)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${SITE}/s/${dish.id}" />
<meta property="og:title" content="${escAttr(title)}" />
<meta property="og:description" content="${escAttr(desc)}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escAttr(title)}" />
<meta name="twitter:description" content="${escAttr(desc)}" />
<meta name="twitter:image" content="${ogImage}" />
<link rel="canonical" href="${hashUrl}" />
<meta http-equiv="refresh" content="0;url=/#${cuisineId}/${dish.id}" />
<script>location.replace("/#${cuisineId}/${dish.id}");</script>
</head>
<body>
<p>Redirecting to <a href="/#${cuisineId}/${dish.id}">${escAttr(dish.name)} on SF Eats</a>…</p>
</body>
</html>
`;
    fs.writeFileSync(path.join(outDir, `${dish.id}.html`), html);
    count++;
  }
}
console.log(`Wrote ${count} share pages to s/`);
