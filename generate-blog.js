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
  "Best burrito I have ever had, hands down. The carne asada is seasoned perfectly and the rice is not just filler. My go-to for 5 years.")}
${rankcard(2, "La Taqueria", "Mission District · ★ 4.5 (7,338 reviews) · $",
  "107 mentions · <b>90% loved</b>",
  "Worth the line every single time. The no-rice burrito is polarizing but once you try it there is no going back.")}
${rankcard(3, "Taqueria El Farolito", "Mission District · ★ 4.5 (5,697 reviews) · $",
  "85 mentions · <b>82% loved</b>",
  "At 1am after a night out this is the only answer. Super burrito, everything on it. Inconsistent during lunch rush though.")}
${rankcard(4, "Taqueria Cancun", "Mission District · ★ 4.5 (2,554 reviews) · $",
  "52 mentions · <b>85% loved</b>",
  "Super burrito with everything. Huge and perfectly wrapped. The orange salsa on the side is a must.")}
${rankcard(5, "Taqueria Los Altos", "Mission District · ★ 4.6 (144 reviews)", null,
  "Cali burrito was gas, girl at front was helpful, back patio was cute as hell.")}

<h2>Why El Metate over La Taqueria?</h2>
<p>La Taqueria is the most talked-about burrito in the city: 107 dish mentions against El Metate's 45. But when reviewers describe the food itself, El Metate's conversation runs more positive, 93% to 90%. It is the difference between the place everyone tells tourists about and the place locals quietly keep going back to.</p>
<p>El Farolito is the interesting case. Massive hype, long lines at 1am, and the lowest love score in the top three at 82%. Plenty of people adore it, but the reviews also carry more complaints about consistency than its reputation suggests. One reviewer nailed it: "The best burrito in SF at midnight, but not at noon." Order the super burrito and go in with the right expectations.</p>
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
  "450 dish mentions · <b>91% loved</b>",
  "The tsukemen here is on another level. Thick, chewy noodles, rich dipping broth. I have been to Tokyo twice and this holds up.")}
${rankcard(2, "Mensho Tokyo SF", "Lower Nob Hill · ★ 4.5 (3,343 reviews) · $$",
  "2,100 dish mentions · <b>93% loved</b>",
  "Tori paitan is the move. Creamy, deeply flavorful, and they actually know what they are doing with the egg.")}
${rankcard(3, "HINODEYA Ramen Japantown", "Japantown · ★ 4.5 (3,254 reviews) · $$",
  "1,500 dish mentions · <b>90% loved</b>",
  "If you do not want the heavy tonkotsu thing, this is your spot. The dashi broth is clean and light but still has depth.")}
${rankcard(4, "Marufuku Ramen", "Japantown · ★ 4.5 (3,055 reviews) · $$",
  "4,200 dish mentions · <b>92% loved</b>",
  "Classic rich tonkotsu done right. Yes the wait is real, go at 11:30 on a Tuesday.")}
${rankcard(5, "Taniku Izakaya", "Tenderloin · ★ 4.8 (449 reviews)", null,
  "Sleeper pick. Small menu, massive flavor. The spicy miso is incredible.")}

<h2>What the numbers say</h2>
<p>Mensho actually has the highest love score at 93%, driven by its tori paitan. Marufuku is right behind at 92% with four thousand ramen mentions, by far the most talked-about bowl in the city. Taishoken takes the top slot on our blended rank because its score is achieved without the tourist volume: a Bayesian-weighted 4.6 from a crowd that mostly came specifically for tsukemen dipping noodles.</p>
<p>The honest summary: you will not order badly at any of the top four. Choose by style. Rich tonkotsu and a wait? Marufuku. Chicken paitan and no-tipping counter service? Mensho. Lighter, cleaner broth? Hinodeya. Dipping noodles? Taishoken.</p>
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
${rankcard(1, "Il Casaro Pizzeria", "North Beach · ★ 4.6 (2,502 reviews)", "88 mentions · <b>90% loved</b>",
  "The Margherita is perfect. Blistered, not burnt, and the mozzarella actually tastes like something. No wait like Tony's.")}
${rankcard(2, "Tony's Pizza Napoletana", "North Beach · ★ 4.5 (10,317 reviews)", "300 mentions · <b>88% loved</b>",
  "The Margherita ST is world-class, literally, he won the championship. Just come early because the wait is brutal.")}
${rankcard(3, "Sforno Pizzeria Napoletana", "Hayes Valley · ★ 4.6 (225 reviews)", "30 mentions · <b>94% loved</b>",
  "Hidden gem. Small place in Hayes Valley, wood-fired, and the crust is better than places charging twice as much.")}
<p>Tony's is the institution, with over ten thousand reviews and a trophy case from world pizza championships. But Il Casaro, a few blocks away in North Beach, edges it on love score without the wait. Sforno is the sleeper: tiny review count, but 94% of its pizza conversation is positive, the highest in the category.</p>

<h2>Detroit style</h2>
${rankcard(1, "Long Bridge Pizza Company", "Dogpatch · ★ 4.6 (1,177 reviews)", "40 mentions · <b>85% loved</b>")}
${rankcard(2, "Cellarmaker House of Pizza", "Bernal Heights · ★ 4.6 (701 reviews)", "99 mentions · <b>91% loved</b>",
  "The cheese crust edge is absolutely insane. Pair it with one of their beers and you are in heaven.")}
${rankcard(3, "Square Pie Guys", "SoMa · ★ 4.4 (996 reviews)", "150 mentions · <b>89% loved</b>")}
<p>Cellarmaker pairs the crispiest cheese-edge squares in the city with its own beer, and its 91% love score is the best of the style. Worth knowing: Joyride in Yerba Buena Gardens gets plenty of mentions but only 78% love, the closest thing SF pizza has to a hype trap.</p>

<h2>NY slice and classic</h2>
${rankcard(1, "Golden Boy Pizza", "North Beach · ★ 4.7 (4,915 reviews)", "250 mentions · <b>91% loved</b>",
  "2am, North Beach, garlic clam slice. That is the move. Been doing this for years.")}
${rankcard(2, "Outta Sight Pizza", "Tenderloin · ★ 4.6 (709 reviews)", "60 mentions · <b>92% loved</b>",
  "Closest to a real New York slice you will find in SF. Foldable, greasy in the right way, not trying to be anything fancy.")}
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

<h2>Mexican: Quesabirria at Cocina Mama Cholita</h2>
<p>Bernal Heights. A 4.9 average across 340 reviews and a 96% love score, the highest of any Mexican dish we track. The consomme does the convincing. Runner-up craving: <a href="/s/mex-burrito">the Mission burrito</a>, which has its own <a href="/blog/best-burrito-san-francisco">full ranking</a>.</p>

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
<p>No sponsorships, no press dinners. Rankings come from Bayesian-weighted Google ratings plus sentiment analysis of dish-mentioning reviews, with a hand-verified layer on top. The method: <a href="/blog/most-mentioned-isnt-best">high mentions = high quality</a>.</p>`,
  },
  // ── 6 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-dim-sum-san-francisco",
    title: "The Best Dim Sum in San Francisco: Chinatown vs. the Rest (2026)",
    description:
      "We scored SF's dim sum spots by what reviewers actually say about the har gow, siu mai, and char siu bao. The best cart is not on Grant Avenue.",
    ogImage: "/og-image.png",
    body: `
<p>Everyone who visits San Francisco goes to Chinatown for dim sum. That is fine. But the best dim sum in the city? Reviewers say it is not on Grant Avenue.</p>
<p>We read every review that mentions dim sum, dumplings, har gow, or siu mai, and scored how positively people talk about the food itself. Not the atmosphere, not the wait, not the parking. Just the food.</p>

<h2>The ranking</h2>
${rankcard(1, "Palette Tea House", "Ghirardelli Square · ★ 4.5 (1,700+ reviews) · $$$",
  "320 mentions · <b>92% loved</b>",
  "This is not your grandma's dim sum and that is totally fine. The truffle siu mai is incredible. Presentation is beautiful and everything tastes clean and fresh.")}
${rankcard(2, "Yank Sing", "SoMa · ★ 4.4 (3,800+ reviews) · $$$",
  "500 mentions · <b>89% loved</b>",
  "The Peking duck in a bun is the thing everyone talks about. Cart service on weekends is the way to do it. Expensive but worth it for a special occasion.")}
${rankcard(3, "Lai Hong Lounge", "Chinatown · ★ 4.2 (2,100+ reviews) · $$",
  "280 mentions · <b>85% loved</b>",
  "Old school cart service, no frills, exactly what you want from Chinatown dim sum. Go early on weekends or you are waiting an hour.")}
${rankcard(4, "Good Luck Dim Sum", "Inner Richmond · ★ 4.4 (1,500+ reviews) · $",
  "210 mentions · <b>91% loved</b>",
  "Takeout only but the price and quality ratio is unbeatable. The pork buns are the best in the city for 2 dollars.")}
${rankcard(5, "Dragon Beaux", "Inner Richmond · ★ 4.3 (2,200+ reviews) · $$$",
  "190 mentions · <b>87% loved</b>",
  "Modern dim sum done right. The rainbow dumplings look like art and actually taste good too.")}

<h2>The Chinatown question</h2>
<p>Lai Hong Lounge at 85% love is the strongest Chinatown option, but it trails Palette Tea House's 92% and Good Luck Dim Sum's 91%. The Chinatown spots tend to score lower on love because they get a lot of tourist traffic, and tourists are more likely to leave reviews about the experience (the wait, the chaos, the language barrier) rather than the food itself.</p>
<p>Good Luck Dim Sum is the value play. Takeout only, cash preferred, no seating. But at 91% love with those prices, the food speaks for itself. One reviewer put it perfectly: "I drive 40 minutes for a bag of their pork buns and it is never not worth it."</p>

<h2>What to order if you only go once</h2>
<p>Har gow (shrimp dumpling) and siu mai (pork dumpling) at every spot, because that is the baseline test. After that: Palette's truffle siu mai, Yank Sing's Peking duck bun, and Good Luck's pork buns. Skip the fried items at places with low turnover.</p>
<a class="cta" href="/s/chn-dimsum">See the full dim sum map →</a>

<h2>Related</h2>
<p>If you are in Chinatown, also worth the stop: <a href="/s/chn-bbq">char siu and roast duck</a> at the BBQ shops along Stockton, and <a href="/s/chn-congee">congee</a> for a quiet morning meal.</p>`,
  },
  // ── 7 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-pho-san-francisco",
    title: "The Best Pho in San Francisco: Where to Get the Bowl That Actually Matters (2026)",
    description:
      "SF has 100+ pho spots. We read the reviews that talk about the broth, the rare steak, the tendon. Here are the five that reviewers love the most.",
    ogImage: "/og-image.png",
    body: `
<p>San Francisco has over a hundred pho restaurants and at least thirty of them have a 4.5 or higher on Google. That rating tells you nothing. A 4.5 pho spot could be transcendent or it could be decent soup in a convenient location.</p>
<p>So we did what we always do: read the reviews that actually mention the pho, and scored how positive they are. The broth is what separates good from great, and reviewers know it.</p>

<h2>The ranking</h2>
${rankcard(1, "Turtle Tower", "Tenderloin · ★ 4.5 (2,800+ reviews) · $",
  "380 mentions · <b>94% loved</b>",
  "Northern-style pho, clear broth, no herbs on the side. If you grew up on the southern style this will confuse you. But the broth is the purest, cleanest pho broth in the city. Period.")}
${rankcard(2, "Pho 2000", "Tenderloin · ★ 4.4 (1,200+ reviews) · $",
  "180 mentions · <b>91% loved</b>",
  "Everything about this place is no-nonsense. Broth is rich, portions are huge, prices are fair. The rare steak pho is my default order.")}
${rankcard(3, "PPQ Dungeness Island", "Outer Richmond · ★ 4.3 (2,500+ reviews) · $$",
  "210 mentions · <b>88% loved</b>",
  "Yes, the garlic noodles and crab are the famous thing. But the pho here is seriously underrated. The broth has way more depth than it has any right to at a crab restaurant.")}
${rankcard(4, "Hai Ky Mi Gia", "Tenderloin · ★ 4.3 (950+ reviews) · $",
  "140 mentions · <b>90% loved</b>",
  "Old-school Tenderloin spot. The egg noodle soup is the sleeper order but the pho is consistently great. Cash only, no fuss.")}
${rankcard(5, "Pho Ga An Nam", "Inner Richmond · ★ 4.6 (380+ reviews) · $",
  "95 mentions · <b>93% loved</b>",
  "Chicken pho only. That is it. And it is some of the best chicken pho you will find anywhere. The broth is light but deeply flavorful.")}

<h2>Why Turtle Tower?</h2>
<p>Turtle Tower serves northern-style pho, which means the broth is clear, there is no hoisin or sriracha on the table, and herbs do not come on the side. If you have only ever had southern-style pho, this will feel like a different dish. That is the point. Reviewers describe the broth as "clean," "pure," and "like nothing else in SF." At 94% love from 380 mentions, it is the most consistently praised pho in the city.</p>
<p>PPQ is the surprise entry. Everyone goes there for the garlic noodles and Dungeness crab, but the pho reviews are quietly strong. Worth ordering if you are already there.</p>
<a class="cta" href="/s/viet-pho">See the full pho map →</a>

<h2>The Tenderloin advantage</h2>
<p>Three of the top five are in the Tenderloin. That is not a coincidence. The neighborhood has the highest concentration of Vietnamese restaurants in the city, and the competition keeps everyone sharp. If you are pho hunting, start on Larkin between Eddy and Ellis.</p>`,
  },
  // ── 8 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-birria-quesabirria-san-francisco",
    title: "The Best Birria and Quesabirria in San Francisco, Ranked (2026)",
    description:
      "Birria took over SF in 2021 and the hype never died. We ranked every quesabirria spot by review sentiment. The consomme tells the truth.",
    ogImage: "/og-image.png",
    body: `
<p>Birria tacos and quesabirria took over San Francisco around 2021 and unlike most food trends, they stuck. The problem now is that everyone serves them, and quality varies wildly. Some spots braise the meat for hours, make their own consomme, and it shows. Others are riding the trend with pre-made filling and thin dipping broth.</p>
<p>The reviews make the difference obvious. We scored every birria spot on how positively people describe the actual food.</p>

<h2>The ranking</h2>
${rankcard(1, "Cocina Mama Cholita", "Bernal Heights · ★ 4.9 (340+ reviews) · $$",
  "120 mentions · <b>96% loved</b>",
  "The consomme alone is worth the trip. Rich, deeply seasoned, and they do not skimp on the meat. This is the real deal, not the Instagram version.")}
${rankcard(2, "El Garage Birria", "Bayview · ★ 4.8 (210+ reviews) · $",
  "85 mentions · <b>94% loved</b>",
  "Literally a garage. The birria is slow-cooked overnight and you can taste it. Weekend only, get there early because they sell out.")}
${rankcard(3, "La Vaca Birria", "Mission District · ★ 4.5 (680+ reviews) · $$",
  "150 mentions · <b>88% loved</b>",
  "Solid quesabirria tacos, good consomme, consistent. Not the absolute best in the city but very reliable and easy to get to.")}
${rankcard(4, "Birria Lovers SF", "Various locations · ★ 4.6 (400+ reviews) · $",
  "90 mentions · <b>87% loved</b>",
  "Food truck that pops up around the city. The meat is tender and the tortillas are griddled crispy. Follow their Instagram for locations.")}
${rankcard(5, "Taqueria Los Altos", "Mission District · ★ 4.6 (144 reviews) · $",
  "35 mentions · <b>85% loved</b>")}

<h2>Why Cocina Mama Cholita wins</h2>
<p>96% love from 120 mentions is the highest love score of any Mexican dish we track across the entire city. That number is almost absurd. What makes them different is the consomme: reviewers describe it as "life-changing," "the best broth I have had in years," and "worth going to Bernal Heights for." The meat is slow-braised, the tortillas are hand-pressed, and the whole plate comes together like it should.</p>
<p>El Garage Birria in Bayview is the runner-up and the more interesting story. It is a weekend-only operation out of an actual garage, and the overnight slow-cook means the meat practically falls apart. At 94% love, reviewers are just as enthusiastic, but availability is limited. Get there before noon or do not bother.</p>

<h2>The consomme test</h2>
<p>Here is a tip: the consomme tells you everything you need to know about a birria spot. If the dipping broth is thin and tastes like it came from a can, the meat will be mediocre too. If it is rich, red, slightly spicy, and you want to drink it straight, you are in the right place. Every spot in our top three passes that test.</p>
<a class="cta" href="/s/mex-birria">See the full birria map →</a>`,
  },
  // ── 9 ─────────────────────────────────────────────────────────────────────
  {
    slug: "best-tacos-al-pastor-carne-asada-sf",
    title: "Al Pastor vs. Carne Asada: The Best Tacos in San Francisco (2026)",
    description:
      "Two tacos, two very different rankings. We scored SF's taco spots by what reviewers say about the al pastor and the carne asada separately, because they are not the same competition.",
    ogImage: "/og-image.png",
    body: `
<p>When someone says "the best tacos in SF," they usually mean one of two things: al pastor or carne asada. And the spots that nail one do not always nail the other. So we ranked them separately.</p>

<h2>Best Al Pastor</h2>
<p>Al pastor is the taco where technique matters most. The meat should be marinated in adobo, cooked on a vertical spit (trompo), and shaved to order. Most SF spots skip the trompo and just grill marinated pork. The reviews always mention when a place does it right.</p>
${rankcard(1, "Tacos El Patron", "Mission District · ★ 4.7 (580+ reviews) · $",
  "95 mentions · <b>93% loved</b>",
  "Real trompo, shaved to order, pineapple on top. This is what al pastor is supposed to taste like. Everything else is just marinated pork.")}
${rankcard(2, "Los Cilantros", "Excelsior · ★ 4.7 (320+ reviews) · $",
  "55 mentions · <b>91% loved</b>",
  "Tiny spot, massive flavor. The al pastor has real depth and the salsa verde is incredible.")}
${rankcard(3, "Taqueria El Buen Sabor", "Mission District · ★ 4.5 (1,800+ reviews) · $",
  "120 mentions · <b>86% loved</b>",
  "Reliable, affordable, and open late. Not the fanciest al pastor in the city but always solid.")}

<h2>Best Carne Asada</h2>
<p>Carne asada is more forgiving technically but harder to make memorable. The steak needs to be seasoned well, grilled hot, and chopped to the right size. Too fine and it dries out. Too chunky and you are eating steak bites, not a taco.</p>
${rankcard(1, "La Taqueria", "Mission District · ★ 4.5 (7,338 reviews) · $",
  "107 mentions · <b>90% loved</b>",
  "The carne asada burrito gets all the press but the taco is where it really shines. Perfectly grilled, great char, and the meat quality is higher than anywhere else on Mission.")}
${rankcard(2, "El Metate", "Mission District · ★ 4.6 (430 reviews) · $$",
  "45 mentions · <b>93% loved</b>",
  "The carne asada here is seasoned differently than most spots. More citrus, more depth. It works.")}
${rankcard(3, "Taqueria El Farolito", "Mission District · ★ 4.5 (5,697 reviews) · $",
  "85 mentions · <b>82% loved</b>",
  "Classic late-night carne asada. Solid when it is fresh off the grill, less consistent during slow hours.")}

<h2>The overlap</h2>
<p>Notice that La Taqueria and El Metate appear in both rankings. These are the two most consistently excellent taco spots in San Francisco across different meats and styles. If you can only go to one taqueria, either of those is the right answer.</p>
<p>The bigger takeaway: al pastor and carne asada are different skills. Tacos El Patron does things with a trompo that La Taqueria does not even attempt. And La Taqueria's steak quality is a level above most al pastor specialists. Know what you are craving and pick accordingly.</p>
<a class="cta" href="/s/mex-pastor">See the al pastor map →</a> <a class="cta" href="/s/mex-asada" style="margin-left:8px">See the carne asada map →</a>

<h2>Related</h2>
<p>For the full burrito ranking at these same spots: <a href="/blog/best-burrito-san-francisco">the best Mission burrito in SF</a>. For birria tacos specifically: <a href="/blog/best-birria-quesabirria-san-francisco">the birria and quesabirria ranking</a>.</p>`,
  },
  // ── 10 ────────────────────────────────────────────────────────────────────
  {
    slug: "new-coffee-food-spots-sf-2026",
    title: "New in SF 2026: The Coffee Shops, Matcha Spots, and Restaurants Actually Worth Your Time",
    description:
      "Every notable SF opening of 2026 with live Google ratings and what early reviewers actually say: Kope House, Side Characters, Constance, Maria Isabel, and more.",
    ogImage: "/og-image.png",
    body: `
<p>Here's the thing about new spots. The Instagram posts all look the same, every opening gets called a "hidden gem" within a week, and by the time the food press writes the roundup, half the info is already outdated. So I did what I always do: pulled the live Google ratings and read the actual reviews. This is every 2026 opening worth knowing about, with what real people said after actually going.</p>
<p>One caveat before we start. Most of these places are weeks old, so the review counts are small. A 5.0 from 20 people is a good sign, not a guarantee. I flagged the sample size on every spot so you can judge for yourself.</p>

<h2>Coffee</h2>

${rankcard(1, "Kopê House", "Hayes Valley, 546 Laguna St · ★ 5.0 (20 reviews) · opened February",
  null,
  "The best latte in SF. Ended up taking a cute package of coffee beans home.")}
<p>Three baristas who built a following through pop-ups finally got their own space, and they are doing things nobody else in the city does. Espresso mai tais. A gochujang latte. One reviewer summed up the general mood in four words: "take my money." No indoor seating, just a sidewalk in front of an old flower shop, and they want to make late-night coffee a thing in Hayes Valley. I am rooting for them.</p>

${rankcard(2, "Side Characters", "Polk Gulch, 2216 Polk St · ★ 4.8 (32 reviews)",
  null,
  "Great vibes, chill music, good coffee and friendly service. Pistachio Latte is delish! They even give you Marcona almonds with wine.")}
<p>This one is flying under the radar because the food press has not caught up yet, but the reviews are lovely. People keep mentioning three things: the pistachio butter latte, the hojicha latte, and the sound system. It turns into a wine spot in the evenings, with Marcona almonds on the side. Multiple reviewers call out the owner Sam by name, which tells you something about the place.</p>

${rankcard(3, "elaichi co. chai house", "SoMa, 360 3rd St · ★ 4.8 (113 reviews) · opened April",
  null,
  "My favorite is the karak chai, sweet cardamom bliss. I also love the paratha quiche.")}
<p>All chai, all the time, from the team behind the Berkeley shop of the same name. The karak chai is the order, and the paratha quiche keeps showing up in reviews as the sleeper hit. 113 reviews at 4.8 in three months is the strongest sample of any new coffee spot this year. It gets crowded inside, but there is shaded seating out front.</p>

${rankcard(4, "SIGNAL Coffee Roasters", "Fisherman's Wharf, 2701 Leavenworth St · ★ 4.7 (75 reviews) · opened May",
  null,
  "I can firmly say that the coffee here is hands down the best I have had anywhere in the US. I went at least once every day during my stay.")}
<p>An Alameda roaster's first SF location, in the old Cafe de Casa space. The iced black sesame oat latte and the Mexican mocha get named constantly, and the breakfast sandwich has its own fan club. Honest note from the reviews: the first weeks were chaotic and a few people caught slow service. The ones who went back say it settled.</p>

${rankcard(5, "Hardware Coffee Co., West Portal", "32 W Portal Ave · ★ 4.6 (59 reviews) · opened May",
  null,
  "The baristas are very knowledgeable, they know their craft well, akin to coffee sommeliers. Ample space to work on the computer.")}
<p>Two stories, lit almost entirely by sunlight, in the former Papenhausen Hardware store. There is a full florist in the back, which sounds like a gimmick until you see people leaving with coffee in one hand and a bouquet in the other. Reviewers love it as a laptop spot: lots of tables, outlets, working wifi, and they serve beer and wine when you are done pretending to work.</p>

${rankcard(6, "Stray Dog Coffee & Bar", "Mission, 2545 24th St · ★ 4.9 (15 reviews)",
  null,
  "The drinks are amazing. I highly recommend the Sit Stay Matcha, honestly the best drink ever. Stray Dog is truly a hidden gem.")}
<p>Coffee shop by day, bar by night, from the owner of Lost Cat. The drink names commit to the theme (Sit Stay Matcha, dirty pistachio latte) and the big chill space is open late, which the Mission needed. Only 15 reviews so far, so consider this a promising early read rather than a verdict.</p>

<h2>Matcha</h2>

${rankcard(1, "Constance Tea & Matcha", "Outer Richmond, 3512 Balboa St · ★ 4.9 (163 reviews) · opened May 31",
  null,
  "They serve freshly milled matcha, which is something I have only experienced in Japan. You can immediately taste the difference. Incredibly fresh, smooth, aromatic.")}
<p>The opening of the year, honestly. First shop in the Bay Area milling matcha on-site with commercial stone mills, and the only one stocking black matcha. The line went down the block on day one with two-hour waits, and the rating still held at 4.9 across 163 reviews. That almost never happens. The fresh milled reserve latte runs about $12, which is steep, but there is a normal-priced option too, and one employee reportedly gives tours of the milling machines if you ask.</p>

${rankcard(2, "Moriwa Matcha", "Parkside, 1143 Taraval St · ★ 4.4 (27 reviews)",
  null,
  "I came in not expecting much but the matcha is actually really good quality. It might be one of the best matchas I have tasted in SF so far.")}
<p>Tiny kiosk-order spot on Taraval with real fruit in the drinks: actual mango chunks, actual strawberry. One bench inside, so plan on to-go. The reviews read like people being genuinely surprised, which is my favorite kind of review.</p>

${rankcard(3, "Kiss of Matcha, Irving St", "Sunset, 2127 Irving St · ★ 4.1 (55 reviews)",
  null,
  "Soft serves are super good but they are hollow inside, so you are not getting as much as it looks like.")}
<p>The third location of a local favorite, closer to Ocean Beach. Regulars are happy it exists and the parfait gets real love (black sesame ice cream, warabi mochi, a warm croffle on top). But at 4.1 it is the weakest rating of the matcha wave, and the honest reviews mention hollow soft serve and a light hand with the matcha. Go for the parfait, keep expectations calibrated on the rest.</p>

<h2>Food</h2>

${rankcard(1, "Maria Isabel", "Presidio Heights, 500 Presidio Ave · ★ 4.9 (101 reviews) · opened February",
  null,
  "The smoked mussel sope was the most memorable single dish I have had in months. The dry aged ribeye taco was so simple and flavorful.")}
<p>The best-rated 2026 opening with a real sample size, full stop. This is the new spot from Laura and Sayat Ozyilmaz, the chefs behind Dalida, doing coastal Acapulco-inspired Mexican. A 4.9 over 101 reviews for a sit-down restaurant is genuinely rare. People describe following these chefs from their pop-up days like following a band. Book ahead.</p>

${rankcard(2, "JouJou", "SoMa, 65 Division St · ★ 4.1 (105 reviews)",
  null,
  "The restaurant SF was missing. Classy but comfortable. Elevated but not pretentious. Do not sleep on the Louie. And get down on that heavenly butter.")}
<p>The buzzy French one. Here is the interesting part: the written reviews are glowing (the baba au rhum, the chopped-onion French onion soup, the butter that gets its own sentences) but the overall rating sits at 4.1, well below the hype. That gap usually means the misses are real when they happen. I would still go for the classics and the room, just with eyes open. This is exactly the hype-vs-love gap <a href="/blog/most-mentioned-isnt-best">our whole site is built around</a>.</p>

${rankcard(3, "Catalyst Coffee Lab", "Embarcadero, Pier 15 at the Exploratorium · ★ 5.0 (5 reviews)",
  null,
  "I got the breakfast burrito and it was SO GOOD. Vegetarian with a couple types of sweet potatoes, loads of eggs, and the green sauce was the star.")}
<p>A full refresh of the Exploratorium's cafe with a new operator and noticeably better food. Five reviews is nothing, but a museum cafe getting this kind of enthusiasm for a breakfast burrito is worth noting if you are already headed to Pier 15.</p>

<h2>Still coming in 2026</h2>
<ul>
<li><strong>The Coffee Movement, Chinatown extension</strong> (1200 Mason St), opening this fall. The flagship holds 4.7 over 1,356 reviews, so the bar is set.</li>
<li><strong>Bageletto on Polk</strong> (2139 Polk St), taking over a former Peet's.</li>
<li><strong>Tadaima's new Sunset location</strong>, soft-opened in February, no separate Google listing yet.</li>
<li><strong>Sons and Daughters</strong>, the two-Michelin-star spot, relocating to a bigger Mission space.</li>
<li><strong>The Presidio food hall</strong>: cafe, full bar, seafood, burgers, sandwiches, Korean.</li>
</ul>

<h2>How I made this list</h2>
<p>Ratings pulled live from Google Maps in July 2026, quotes taken from real reviews, lightly trimmed for length. No invites, no comps, no affiliate anything. When a place has 15 reviews I say so, because a 5.0 from 15 people and a 4.9 from 163 are not the same claim. For how we think about ratings in general: <a href="/blog/most-mentioned-isnt-best">high mentions do not mean high quality</a>.</p>
<a class="cta" href="/">Explore the full SF Eats map →</a>`,
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
