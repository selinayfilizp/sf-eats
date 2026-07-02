/* =========================================================================
   SHARE / SEO PAGE GENERATOR — writes s/<dishId>.html for every dish,
   plus sitemap.xml and robots.txt.

   Crawlers can't see URL hashes, so #mexican/mex-birria always looked like
   the homepage to Google. These static pages give every dish a real,
   indexable URL ("best birria san francisco") with the full ranked list,
   dish-specific OG tags (og/<dishId>.png), ItemList structured data, and
   internal links between dishes. A prominent CTA sends humans into the app.

   Run after generate-data.js:   npm run share-pages
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = "https://sfeats.vercel.app";

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "sf-food-data.js"), "utf8"), ctx);
const FOOD = ctx.window.SF_FOOD_DATA;
const CUISINES = FOOD.cuisines;

const outDir = path.join(__dirname, "s");
fs.mkdirSync(outDir, { recursive: true });

const escHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => escHtml(s).replace(/"/g, "&quot;");

const CSS = `
  :root { --bg:#C3C9B8; --ink:#2A2F28; --muted:rgba(42,47,40,0.55); --line:#2A2F28; --yellow:#DFD154;
          --high:#4a6e3a; --mid:#8a7a2a; --low:#8a3a3a; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--ink); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
         -webkit-font-smoothing:antialiased; line-height:1.5; }
  .wrap { max-width:720px; margin:0 auto; padding:1.5rem 1.25rem 4rem; }
  a { color:var(--ink); }
  .brand { font-size:0.7rem; font-weight:700; letter-spacing:0.1em; text-decoration:none; }
  .crumb { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); margin-top:1.75rem; }
  h1 { font-size:1.7rem; letter-spacing:-0.02em; margin-top:0.25rem; line-height:1.2; }
  .lede { font-size:0.9rem; color:var(--muted); margin-top:0.5rem; }
  .cta { display:inline-block; margin:1.25rem 0 0.5rem; background:var(--ink); color:var(--bg); text-decoration:none;
         padding:11px 20px; font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; }
  .spot { border:1px solid var(--line); margin-top:1rem; padding:1.1rem 1.25rem; background:rgba(42,47,40,0.03); }
  .rank { font-size:0.6rem; letter-spacing:0.1em; color:var(--muted); text-transform:uppercase; }
  .rank.gold { color:var(--mid); font-weight:700; }
  h2 { font-size:1.15rem; margin-top:0.2rem; letter-spacing:-0.01em; }
  .meta { font-size:0.75rem; color:var(--muted); margin-top:0.25rem; }
  .scores { display:flex; gap:1.25rem; margin-top:0.6rem; font-size:0.72rem; }
  .scores b { font-variant-numeric:tabular-nums; }
  .loved-high { color:var(--high); } .loved-mid { color:var(--mid); } .loved-low { color:var(--low); }
  .quote { font-size:0.8rem; font-style:italic; opacity:0.85; margin-top:0.6rem; border-left:2px solid var(--line); padding-left:0.75rem; }
  .addr { font-size:0.72rem; color:var(--muted); margin-top:0.6rem; }
  .maplink { font-size:0.72rem; }
  .more { margin-top:2.5rem; }
  .more h3 { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--muted); font-weight:500; }
  .more ul { list-style:none; margin-top:0.5rem; display:flex; flex-wrap:wrap; gap:6px; }
  .more a { display:inline-block; border:1px solid var(--line); padding:6px 12px; font-size:0.72rem; text-decoration:none; }
  .more a:hover { background:var(--yellow); }
  footer { margin-top:3rem; font-size:0.65rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; }
`;

function lovedClass(a) { return a >= 80 ? "loved-high" : a >= 65 ? "loved-mid" : "loved-low"; }

function spotHtml(s, rank) {
  const gold = rank === 1;
  const link = s.mapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + " " + (s.address || "San Francisco"))}`;
  const scores = [];
  if (s.dishMentions != null) scores.push(`<span>Talked about <b>${s.dishMentions}</b></span>`);
  if (s.dishApproval != null) scores.push(`<span class="${lovedClass(s.dishApproval)}">Loved <b>${s.dishApproval}%</b></span>`);
  return `
  <article class="spot">
    <div class="rank${gold ? " gold" : ""}">Rank ${String(rank).padStart(2, "0")}${gold ? " · The gold standard" : ""}</div>
    <h2>${escHtml(s.name)}</h2>
    <div class="meta">${[s.neighborhood, s.rating ? `★ ${s.rating}${s.reviews ? ` (${s.reviews} reviews)` : ""}` : null, s.price].filter(Boolean).map(escHtml).join(" · ")}</div>
    ${scores.length ? `<div class="scores">${scores.join("")}</div>` : ""}
    ${s.why ? `<div class="quote">${escHtml(s.why)}</div>` : ""}
    ${s.address ? `<div class="addr">${escHtml(s.address)}</div>` : ""}
    <div class="addr"><a class="maplink" href="${escAttr(link)}" rel="noopener">Google Maps →</a></div>
  </article>`;
}

function jsonLd(dish, cuisineId) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${dish.name} in San Francisco`,
    url: `${SITE}/s/${dish.id}`,
    itemListElement: dish.spots.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Restaurant",
        name: s.name,
        address: s.address || undefined,
        servesCuisine: CUISINES[cuisineId].label,
        aggregateRating: s.rating ? { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: parseInt(String(s.reviews).replace(/\D/g, "")) || undefined } : undefined,
      },
    })),
  });
}

const urls = [{ loc: `${SITE}/`, priority: "1.0" }];
let count = 0;

for (const [cuisineId, cuisine] of Object.entries(CUISINES)) {
  for (const dish of cuisine.dishes) {
    const top = dish.spots.slice(0, 3).map((s) => s.name).join(", ");
    const title = `Best ${dish.name} in San Francisco — SF Eats`;
    const desc = top
      ? `The ${dish.spots.length} best spots for ${dish.name} in SF: ${top}. Ranked by what reviewers actually love, not just what they mention.`
      : `The best ${dish.name} in SF, ranked by what reviewers actually love.`;
    const pageUrl = `${SITE}/s/${dish.id}`;
    const appUrl = `/#${cuisineId}/${dish.id}`;
    const ogImage = `${SITE}/og/${dish.id}.png`;
    const siblings = cuisine.dishes.filter((d) => d.id !== dish.id);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escHtml(title)}</title>
<meta name="description" content="${escAttr(desc)}" />
<link rel="canonical" href="${pageUrl}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:title" content="${escAttr(title)}" />
<meta property="og:description" content="${escAttr(desc)}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escAttr(title)}" />
<meta name="twitter:description" content="${escAttr(desc)}" />
<meta name="twitter:image" content="${ogImage}" />
<script type="application/ld+json">${jsonLd(dish, cuisineId)}</script>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <a class="brand" href="/">SF EATS</a>
  <div class="crumb">${escHtml(cuisine.label)} · San Francisco</div>
  <h1>${dish.emoji ? dish.emoji + " " : ""}Best ${escHtml(dish.name)} in San Francisco</h1>
  <p class="lede">${dish.spots.length} spots ranked by what reviewers actually love — high mentions ≠ high quality.</p>
  <a class="cta" href="${appUrl}">Open the interactive map →</a>
  ${dish.spots.map((s, i) => spotHtml(s, i + 1)).join("\n")}
  <div class="more">
    <h3>More ${escHtml(cuisine.label)}</h3>
    <ul>${siblings.map((d) => `<li><a href="/s/${d.id}">${d.emoji ? d.emoji + " " : ""}${escHtml(d.name)}</a></li>`).join("")}</ul>
  </div>
  <footer>Data from Google review consensus · <a href="/">sfeats.vercel.app</a></footer>
</div>
</body>
</html>
`;
    fs.writeFileSync(path.join(outDir, `${dish.id}.html`), html);
    urls.push({ loc: pageUrl, priority: "0.8" });
    count++;
  }
}

const lastmod = (FOOD.generatedAt || new Date().toISOString()).slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap);

fs.writeFileSync(path.join(__dirname, "robots.txt"), `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`Wrote ${count} SEO pages to s/, sitemap.xml (${urls.length} urls), robots.txt`);
