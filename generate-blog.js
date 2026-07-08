/* =========================================================================
   BLOG GENERATOR — writes blog/<slug>.html + blog/index.html from the POSTS
   array below. Shared layout, Article JSON-LD, per-post OG tags.

   Posts are hand-written but grounded in sf-food-data.js numbers. When the
   data changes meaningfully, update the copy and re-run:

       node generate-blog.js
   ========================================================================= */
const fs = require("fs");
const path = require("path");

const SITE = "https://sfeats.vercel.app";
const AUTHOR = "Selinay, Google Maps Level 7 local guide (2,259 contributions, 6.3M views)";
const PUBLISHED = "2026-07-07";

const CSS = `
  :root { --bg:#C3C9B8; --ink:#2A2F28; --muted:rgba(42,47,40,0.55); --line:#2A2F28; --yellow:#DFD154;
          --high:#4a6e3a; --mid:#8a7a2a; --low:#8a3a3a; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--ink); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
         -webkit-font-smoothing:antialiased; line-height:1.65; }
  .wrap { max-width:680px; margin:0 auto; padding:1.5rem 1.25rem 4rem; }
  a { color:var(--ink); }
  .brand { font-size:0.7rem; font-weight:700; letter-spacing:0.1em; text-decoration:none; }
  .crumb { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); margin-top:1.75rem; }
  h1 { font-size:1.75rem; letter-spacing:-0.02em; margin-top:0.35rem; line-height:1.2; }
  .byline { font-size:0.72rem; color:var(--muted); margin-top:0.6rem; }
  article p { margin-top:1rem; font-size:0.95rem; }
  article h2 { font-size:1.2rem; margin-top:2rem; letter-spacing:-0.01em; }
  article h3 { font-size:1rem; margin-top:1.4rem; }
  article ul, article ol { margin:1rem 0 0 1.25rem; font-size:0.95rem; }
  article li { margin-top:0.4rem; }
  .rankcard { border:1px solid var(--line); background:rgba(42,47,40,0.03); padding:1rem 1.25rem; margin-top:1.1rem; }
  .rankcard .rk { font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); }
  .rankcard h3 { margin-top:0.15rem; }
  .rankcard .meta { font-size:0.75rem; color:var(--muted); margin-top:2px; }
  .rankcard .scores { font-size:0.72rem; margin-top:0.4rem; }
  .rankcard .scores b { font-variant-numeric:tabular-nums; }
  .quote { font-size:0.85rem; font-style:italic; opacity:0.85; margin-top:0.6rem; border-left:2px solid var(--line); padding-left:0.75rem; }
  .cta { display:inline-block; margin-top:1.5rem; background:var(--ink); color:var(--bg); text-decoration:none;
         padding:11px 20px; font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; }
  .postlist a.post { display:block; border:1px solid var(--line); padding:1.1rem 1.25rem; margin-top:1rem;
         text-decoration:none; background:rgba(42,47,40,0.03); }
  .postlist a.post:hover { background:var(--yellow); }
  .postlist .pt { font-weight:600; font-size:1.05rem; letter-spacing:-0.01em; }
  .postlist .pd { font-size:0.8rem; color:var(--muted); margin-top:0.25rem; }
  .more { margin-top:2.75rem; }
  .more h3 { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--muted); font-weight:500; }
  footer { margin-top:3rem; font-size:0.65rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.08em; }
`;

function rankcard(rank, name, meta, scores, quote) {
  return `<div class="rankcard">
    <div class="rk">Rank ${String(rank).padStart(2, "0")}${rank === 1 ? " · The gold standard" : ""}</div>
    <h3>${name}</h3>
    <div class="meta">${meta}</div>
    ${scores ? `<div class="scores">${scores}</div>` : ""}
    ${quote ? `<div class="quote">${quote}</div>` : ""}
  </div>`;
}

const POSTS = [
  // ── 1 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-burrito-san-francisco",
    title: "The Best Mission Burrito in San Francisco, Ranked by Review Data (2026)",
    description:
      "We analyzed thousands of Google reviews to rank SF's Mission burritos by how much reviewers actually love them, not just how often they mention them. El Metate beats the famous names.",
    ogImage: "/og/mex-burrito.png",
    body: `
<p>Ask ten people in San Francisco where to get the best Mission burrito and you will hear the same two names: La Taqueria and El Farolito. Both are excellent. Neither is the answer the review data gives.</p>
<p>At SF Eats we score every spot on two separate signals. <strong>Hype</strong> is how many reviews mention the dish. <strong>Love</strong> is how positively reviewers talk about it when they do. The famous places win on hype. A quieter spot wins on love.</p>

<h2>The ranking</h2>
${rankcard(1, "El Metate", "Mission District · ★ 4.6 (430 reviews) · $$",
  "45 mentions · <b>93% loved</b>",
  "The flakey chips they put at the table are amazing, and you get to pick any salsas and heat level they have out for the day.")}
${rankcard(2, "La Taqueria", "Mission District · ★ 4.5 (7,338 reviews) · $",
  "107 mentions · <b>90% loved</b>")}
${rankcard(3, "Taqueria El Farolito", "Mission District · ★ 4.5 (5,697 reviews) · $",
  "85 mentions · <b>82% loved</b>")}
${rankcard(4, "Taqueria Cancun", "Mission District · ★ 4.5 (2,554 reviews) · $",
  "52 mentions · <b>85% loved</b>")}
${rankcard(5, "Taqueria Los Altos", "Mission District · ★ 4.6 (144 reviews)", null,
  "Cali burrito was gas, girl at front was helpful, back patio was cute as hell.")}

<h2>Why El Metate over La Taqueria?</h2>
<p>La Taqueria is the most talked-about burrito in the city: 107 dish mentions against El Metate's 45. But when reviewers describe the food itself, El Metate's burrito conversation runs more positive, 93% to 90%. It is the difference between the place everyone tells tourists about and the place locals quietly keep going back to.</p>
<p>El Farolito is the interesting case. Massive hype, long lines at 1am, and the lowest love score in the top three at 82%. Plenty of people adore it, but the reviews also carry more complaints about consistency than its reputation suggests. Order the super burrito and go in with the right expectations.</p>
<p>One honest caveat: La Taqueria famously skips rice, which changes what a burrito even is. If rice-less density is your definition of the form, the gap between #1 and #2 disappears.</p>
<a class="cta" href="/s/mex-burrito">See the full burrito map →</a>

<h2>How we rank</h2>
<p>SF Eats pulls every spot from the Google Places API, weights ratings by review volume so a 4.9 with 12 reviews cannot outrank a 4.6 with 3,000, and then reads the reviews that mention the specific dish to score sentiment. The method is explained in <a href="/blog/most-mentioned-isnt-best">why the most-mentioned dish is not the best</a>.</p>`,
  },
  // ── 2 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-ramen-san-francisco",
    title: "The Best Ramen in San Francisco: 4 Bowls Ranked by 9,000+ Reviews (2026)",
    description:
      "Marufuku, Mensho, Hinodeya or Taishoken? We scored SF's ramen shops on how positively thousands of reviewers describe the actual bowl. The answer is not the one with the longest line.",
    ogImage: "/og/jpn-ramen.png",
    body: `
<p>San Francisco's ramen scene has a clear big four: Marufuku in Japantown with its legendary queue, Mensho Tokyo imported from one of Tokyo's most decorated ramen makers, Hinodeya with its lighter dashi broth, and Taishoken, the Mission tsukemen specialist. Between them they hold more than nine thousand Google reviews.</p>
<p>We read the reviews that actually talk about the ramen and scored how positive they are. It is remarkably close at the top, and the order does not match the length of the lines.</p>

<h2>The ranking</h2>
${rankcard(1, "Taishoken San Francisco", "Mission District · ★ 4.6 (487 reviews) · $$",
  "450 dish mentions · <b>91% loved</b>")}
${rankcard(2, "Mensho Tokyo SF", "Lower Nob Hill · ★ 4.5 (3,343 reviews) · $$",
  "2,100 dish mentions · <b>93% loved</b>")}
${rankcard(3, "HINODEYA Ramen Japantown", "Japantown · ★ 4.5 (3,254 reviews) · $$",
  "1,500 dish mentions · <b>90% loved</b>")}
${rankcard(4, "Marufuku Ramen", "Japantown · ★ 4.5 (3,055 reviews) · $$",
  "4,200 dish mentions · <b>92% loved</b>")}
${rankcard(5, "Taniku Izakaya", "Tenderloin · ★ 4.8 (449 reviews)")}

<h2>What the numbers say</h2>
<p>Mensho actually has the highest love score at 93%, driven by its tori paitan. Marufuku is right behind at 92% with four thousand ramen mentions, by far the most talked-about bowl in the city. Taishoken takes the top slot on our blended rank because its score is achieved without the tourist volume: a Bayesian-weighted 4.6 from a crowd that mostly came specifically for tsukemen dipping noodles.</p>
<p>The honest summary: you will not order badly at any of the top four. Choose by style. Rich tonkotsu and a wait: Marufuku. Chicken paitan and no-tipping counter service: Mensho. Lighter, cleaner broth: Hinodeya. Dipping noodles: Taishoken.</p>
<a class="cta" href="/s/jpn-ramen">See the full ramen map →</a>

<h2>Related</h2>
<p>Also in Japantown territory: <a href="/s/jpn-udon">handmade udon</a>, <a href="/s/jpn-tonkatsu">tonkatsu and katsu sando</a>, and <a href="/s/jpn-matchalatte">the city's best matcha lattes</a>.</p>`,
  },
  // ── 3 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-pizza-san-francisco",
    title: "The Best Pizza in San Francisco by Style: Neapolitan, Detroit, and NY Slice (2026)",
    description:
      "Golden Boy, Tony's, Il Casaro, Square Pie Guys and more, ranked by what reviewers actually say about the pizza. One ranking per style, because comparing a Detroit square to a Margherita is unfair to both.",
    ogImage: "/og/ita-neapolitan.png",
    body: `
<p>Every "best pizza in SF" list makes the same mistake: it ranks a blistered Neapolitan Margherita against a focaccia square against a foldable New York slice, as if those are the same food. They are not. So we keep three separate rankings, each scored by how positively reviewers describe the pizza itself.</p>

<h2>Neapolitan</h2>
${rankcard(1, "Il Casaro Pizzeria", "North Beach · ★ 4.6 (2,502 reviews)", "88 mentions · <b>90% loved</b>")}
${rankcard(2, "Tony's Pizza Napoletana", "North Beach · ★ 4.5 (10,317 reviews)", "300 mentions · <b>88% loved</b>")}
${rankcard(3, "Sforno Pizzeria Napoletana", "Hayes Valley · ★ 4.6 (225 reviews)", "30 mentions · <b>94% loved</b>")}
<p>Tony's is the institution, with over ten thousand reviews and a trophy case from world pizza championships. But Il Casaro, a few blocks away in North Beach, edges it on love score without the wait. Sforno is the sleeper: tiny review count, but 94% of its pizza conversation is positive, the highest in the category.</p>

<h2>Detroit style</h2>
${rankcard(1, "Long Bridge Pizza Company", "Dogpatch · ★ 4.6 (1,177 reviews)", "40 mentions · <b>85% loved</b>")}
${rankcard(2, "Cellarmaker House of Pizza", "Bernal Heights · ★ 4.6 (701 reviews)", "99 mentions · <b>91% loved</b>")}
${rankcard(3, "Square Pie Guys", "SoMa · ★ 4.4 (996 reviews)", "150 mentions · <b>89% loved</b>")}
<p>Cellarmaker pairs the crispiest cheese-edge squares in the city with its own beer, and its 91% love score is the best of the style. Worth knowing: Joyride in Yerba Buena Gardens gets plenty of mentions but only 78% love, the closest thing SF pizza has to a hype trap.</p>

<h2>NY slice and classic</h2>
${rankcard(1, "Golden Boy Pizza", "North Beach · ★ 4.7 (4,915 reviews)", "250 mentions · <b>91% loved</b>")}
${rankcard(2, "Outta Sight Pizza", "Tenderloin · ★ 4.6 (709 reviews)", "60 mentions · <b>92% loved</b>")}
${rankcard(3, "The Pizza Shop", "Mission District · ★ 4.6 (661 reviews)", "40 mentions · <b>93% loved</b>")}
<p>Golden Boy is technically focaccia-style squares, not a New York fold, but it is the late-night slice institution of North Beach and reviewers adore it at scale. Purists chasing a true NY slice should head to Outta Sight, whose 92% love score comes almost entirely from people describing exactly that.</p>

<a class="cta" href="/s/ita-neapolitan">Open the pizza maps →</a>

<h2>Method</h2>
<p>Ratings are Bayesian-weighted by review volume, and love scores come from sentiment analysis of the reviews that mention the pizza. Full explanation: <a href="/blog/most-mentioned-isnt-best">why the most-mentioned dish is not the best</a>.</p>`,
  },
  // ── 4 ─────────────────────────────────────────────────────────────────────
  {
    slug: "most-mentioned-isnt-best",
    title: "High Mentions ≠ High Quality: How SF Eats Ranks Every Dish in San Francisco",
    description:
      "The most-mentioned dish in reviews is not always the best one. The methodology behind SF Eats: hype vs love, Bayesian-weighted ratings, and dish-level sentiment across thousands of Google reviews.",
    ogImage: "/og-image.png",
    body: `
<p>I have made 2,259 contributions to Google Maps with 6.3 million views, and my ordering strategy was always the same: open the reviews, see which dish gets mentioned the most, order that. It works until it does not.</p>
<p>The problem is that people also write about what they hated. A dish can rack up mentions because it is genuinely great, or because it is famous and mildly disappointing at scale. Mention count measures fame. It does not measure quality. That gap is the entire reason SF Eats exists.</p>

<h2>Two numbers instead of one</h2>
<p>Every spot on SF Eats gets scored on two independent signals:</p>
<ul>
<li><strong>Hype</strong>: how many reviews mention the specific dish. This is the number everyone already uses.</li>
<li><strong>Love</strong>: of the reviews that mention the dish, how positively they describe it. Sentiment analysis runs on the dish sentences themselves, not the whole review, so a rant about parking does not drag down the carnitas.</li>
</ul>
<p>When hype is high and love is low, we flag it as a hype trap. Fame without flavor.</p>

<h2>A real example: the burrito wars</h2>
<p>La Taqueria has 107 burrito mentions, the most in San Francisco. El Farolito has 85. El Metate has 45. Ranked by hype, El Metate does not even make the podium.</p>
<p>Ranked by love, it flips: El Metate 93%, La Taqueria 90%, El Farolito 82%. The least famous of the three has the happiest customers, and the 1am-line legend has a quarter of its burrito reviews carrying complaints. Both numbers are true at once. You just need to see them separately. Full ranking: <a href="/blog/best-burrito-san-francisco">the best Mission burrito in SF</a>.</p>

<h2>The other correction: small-sample stars</h2>
<p>Raw star ratings have their own trap: a 4.9 from 12 reviews beats a 4.6 from 3,000 on paper and loses to it in real life. We use a Bayesian weight (roughly, every place starts with 200 phantom average reviews) so ratings only mean something once enough people have voted.</p>

<h2>Where the data comes from</h2>
<ul>
<li>Places and ratings: the Google Places API, restricted to San Francisco proper, permanently-closed places removed.</li>
<li>Dish sentiment: reviews that name the dish, scored with a lexicon-based sentiment model with negation handling.</li>
<li>A manual verification layer: for many spots I have read the reviews myself and hand-set the scores. Those entries always win over the automatic numbers.</li>
<li>Community picks: visitor-submitted recommendations, moderated before they publish.</li>
</ul>
<p>61 dishes, 300+ spots, 8 cuisines, refreshed regularly.</p>
<a class="cta" href="/">Explore the map →</a>`,
  },
  // ── 5 ─────────────────────────────────────────────────────────────────────
  {
    slug: "what-to-eat-in-san-francisco",
    title: "What to Eat in San Francisco: One Gold-Standard Dish per Cuisine (2026 Guide)",
    description:
      "A data-driven SF food itinerary: the single best-reviewed spot for burritos, birria, ramen, pho, banh mi, Peking duck, Korean BBQ, kebab and more, chosen from thousands of Google reviews.",
    ogImage: "/og-image.png",
    body: `
<p>If you only have a weekend in San Francisco, you do not need a list of 300 restaurants. You need one confident answer per craving. These are the gold standards: for each cuisine, the dish and spot where our review analysis is most emphatic. Every love score below means "of the reviews that mention this dish, this share are positive."</p>

<h2>Mexican: Quesabirria at Cocina Mamá Cholita</h2>
<p>Bernal Heights. A 4.9 average across 340 reviews and a 96% love score, the highest of any Mexican dish we track. The consommé does the convincing. Runner-up craving: <a href="/s/mex-burrito">the Mission burrito</a>, which has its own <a href="/blog/best-burrito-san-francisco">full ranking</a>.</p>

<h2>Italian: NY-style squares at Golden Boy Pizza</h2>
<p>North Beach institution, 4.7 stars over nearly five thousand reviews, 91% love. Get the clam and garlic. For sit-down Neapolitan, Il Casaro around the corner is the pick. Full breakdown: <a href="/blog/best-pizza-san-francisco">SF pizza by style</a>.</p>

<h2>Japanese: Izakaya at Rintaro</h2>
<p>The highest Japanese love score in our data at 94%. Binchotan-grilled yakitori and a level of care that reviewers describe in unusually specific detail. For noodles instead, <a href="/blog/best-ramen-san-francisco">the ramen ranking</a> has four strong answers.</p>

<h2>Chinese: Peking Duck at Z & Y Peking Duck</h2>
<p>Chinatown, 94% love. A dedicated duck house from the Z & Y team, carved tableside. Book ahead. Also elite: <a href="/s/chn-xiaolongbao">xiao long bao at Dumpling Story</a> at 91%.</p>

<h2>Vietnamese: Banh Mi at Saigon Sandwich</h2>
<p>A Tenderloin counter with a line out the door and a 95% love score, the best sandwich number in the city. Cash, fast, under ten dollars. Pair with <a href="/s/viet-coffee">Vietnamese coffee</a>.</p>

<h2>Korean: KBBQ at Brothers Restaurant</h2>
<p>Inner Richmond charcoal tables, 91% love. Order the galbi. If you want the trend instead, <a href="/s/kor-friedchx">Korean fried chicken</a> runs strong at K Soul Chicken.</p>

<h2>Turkish: Lahmacun at Turquaz</h2>
<p>93% love for the thin, crisped lahmacun, and the same kitchen takes the Adana kebab crown too. SF's Turkish scene is small but the top spots are genuinely strong.</p>

<h2>Indian: Butter Chicken at Himalayan Cuisine SF</h2>
<p>90% love, and reviewers keep using the word "creamy" unprompted. The biryani at the same address holds 88%.</p>

<a class="cta" href="/">Open the full map: 61 dishes, 300+ spots →</a>

<h2>How this list was made</h2>
<p>No sponsorships, no press dinners. Rankings come from Bayesian-weighted Google ratings plus sentiment analysis of dish-mentioning reviews, with a hand-verified layer on top. The method: <a href="/blog/most-mentioned-isnt-best">high mentions ≠ high quality</a>.</p>`,
  },
];

// ── render ────────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, "blog");
fs.mkdirSync(outDir, { recursive: true });

function layout({ title, description, canonical, ogImage, bodyHtml, jsonLd }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<meta name="description" content="${description.replace(/"/g, "&quot;")}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />
<meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />
<meta property="og:image" content="${SITE}${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title.replace(/"/g, "&quot;")}" />
<meta name="twitter:description" content="${description.replace(/"/g, "&quot;")}" />
<meta name="twitter:image" content="${SITE}${ogImage}" />
${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ""}
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
${bodyHtml}
<footer>SF Eats · ranked by Google review consensus · <a href="/">sfeats.vercel.app</a> · <a href="/blog/">blog</a></footer>
</div>
</body>
</html>
`;
}

for (const post of POSTS) {
  const canonical = `${SITE}/blog/${post.slug}`;
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: PUBLISHED,
    author: { "@type": "Person", name: "Selinay" },
    publisher: { "@type": "Organization", name: "SF Eats", url: SITE },
    mainEntityOfPage: canonical,
    image: `${SITE}${post.ogImage}`,
  });
  const bodyHtml = `
<a class="brand" href="/">SF EATS</a>
<div class="crumb"><a href="/blog/">Blog</a> · San Francisco</div>
<h1>${post.title}</h1>
<div class="byline">By ${AUTHOR} · ${PUBLISHED}</div>
<article>${post.body}</article>
<div class="more">
  <h3>More from the blog</h3>
  <div class="postlist">
    ${others.map((p) => `<a class="post" href="/blog/${p.slug}"><div class="pt">${p.title}</div></a>`).join("\n    ")}
  </div>
</div>`;
  fs.writeFileSync(path.join(outDir, `${post.slug}.html`), layout({ ...post, canonical, bodyHtml, jsonLd }));
}

// index
const indexBody = `
<a class="brand" href="/">SF EATS</a>
<div class="crumb">Blog</div>
<h1>The SF Eats Blog</h1>
<div class="byline">Data-driven answers to "where should I eat in San Francisco?"</div>
<div class="postlist">
${POSTS.map((p) => `  <a class="post" href="/blog/${p.slug}"><div class="pt">${p.title}</div><div class="pd">${p.description}</div></a>`).join("\n")}
</div>
<a class="cta" href="/">Open the interactive map →</a>`;
fs.writeFileSync(
  path.join(outDir, "index.html"),
  layout({
    title: "SF Eats Blog: Data-Driven Guides to Eating in San Francisco",
    description: "Rankings and guides built from thousands of Google reviews: the best burrito, ramen, and pizza in SF, plus the methodology behind hype vs love scores.",
    canonical: `${SITE}/blog/`,
    ogImage: "/og-image.png",
    bodyHtml: indexBody,
  })
);

console.log(`Wrote ${POSTS.length} posts + index to blog/`);
