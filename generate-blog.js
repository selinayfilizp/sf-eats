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
    title: "New Coffee Shops, Matcha Cafes & Restaurants in San Francisco 2026: An Honest Review Roundup",
    description:
      "Every notable new San Francisco opening of 2026 with live Google Maps ratings and what early reviewers actually say, good and bad: Kope House, Side Characters, Constance Tea & Matcha, Maria Isabel, SIGNAL Coffee, and more.",
    ogImage: "/og-image.png",
    published: "2026-07-09",
    spotList: [
      "Kopê House", "Side Characters", "elaichi co. chai house", "SIGNAL Coffee Roasters",
      "Hardware Coffee Co. West Portal", "Stray Dog Coffee & Bar", "Constance Tea & Matcha",
      "Moriwa Matcha", "Kiss of Matcha Irving St", "Maria Isabel", "JouJou", "Catalyst Coffee Lab"
    ],
    body: `
<p>Here's the thing about new spots. The Instagram posts all look the same, every opening gets called a "hidden gem" within a week, and by the time the food press writes the roundup, half the info is already outdated. So I did what I always do: pulled the live Google ratings and read the actual reviews, including the unhappy ones. Some of these places are great. Some are fine. A couple are coasting on aesthetics. Here is what the early reviews actually say about each.</p>
<p>One caveat before we start. Most of these places are weeks old, so the review counts are small. A 5.0 from 20 people is a good sign, not a guarantee. I flagged the sample size on every spot so you can judge for yourself.</p>

<h2>New coffee shops in San Francisco (2026)</h2>

${rankcard(1, "Kopê House", "Hayes Valley, 546 Laguna St · ★ 5.0 (20 reviews) · opened February",
  null,
  "The best latte in SF. Ended up taking a cute package of coffee beans home.")}
<p>Three baristas who built a following through pop-ups, now with their own space. The menu leans experimental (espresso mai tais, a gochujang latte), which will either be your thing or it will not. The 5.0 is real but it comes from 20 reviews, most of them from the opening weeks when the crowd was mostly people who already followed them. There is no indoor seating, just the sidewalk in front of an old flower shop, so factor in the weather. Whether late-night coffee works in Hayes Valley is an open question they have not had time to answer yet.</p>

${rankcard(2, "Side Characters", "Polk Gulch, 2216 Polk St · ★ 4.8 (32 reviews)",
  null,
  "Great vibes, chill music, good coffee and friendly service. Pistachio Latte is delish! They even give you Marcona almonds with wine.")}
<p>Flying under the radar because the food press has not caught up yet. The reviews keep mentioning the same three things: the pistachio butter latte, the hojicha latte, and the sound system. It turns into a wine spot in the evenings with Marcona almonds on the side. Worth knowing: at 32 reviews, most of them are from regulars and soft-opening visitors, the kind of crowd that skews friendly. Multiple people call out the owner Sam by name, which usually means a small operation where the owner is always there. Whether that survives them getting busy is the thing to watch.</p>

${rankcard(3, "elaichi co. chai house", "SoMa, 360 3rd St · ★ 4.8 (113 reviews) · opened April",
  null,
  "My favorite is the karak chai, sweet cardamom bliss. I also love the paratha quiche.")}
<p>All chai, all the time, from the team behind the Berkeley shop of the same name. The karak chai is the order, and the paratha quiche keeps showing up as the sleeper hit. 113 reviews at 4.8 in three months is the strongest sample of any new coffee spot this year, so the number means something here. The critiques that exist are mild but consistent: it gets crowded inside fast, and one long-time follower who made the pilgrimage called the chai good but the ambience "okay, nothing that stood out either way." If you are going for the drink, you will be happy. If you are going for a place to sit for two hours, maybe not.</p>

${rankcard(4, "SIGNAL Coffee Roasters", "Fisherman's Wharf, 2701 Leavenworth St · ★ 4.7 (75 reviews) · opened May",
  null,
  "I can firmly say that the coffee here is hands down the best I have had anywhere in the US. I went at least once every day during my stay.")}
<p>An Alameda roaster's first SF location, in the old Cafe de Casa space. The iced black sesame oat latte and the Mexican mocha get named constantly, and the breakfast sandwich has its own fan club. Now the other side: the space is small and gets packed, and the service complaints are real. One reviewer had their order forgotten and waited over ten minutes while noting the owner was kind the whole time, which is the classic new-cafe problem: heart in the right place, systems not there yet. If lines annoy you, give them another month or two.</p>

${rankcard(5, "Hardware Coffee Co., West Portal", "32 W Portal Ave · ★ 4.6 (59 reviews) · opened May",
  null,
  "The baristas are very knowledgeable, they know their craft well, akin to coffee sommeliers. Ample space to work on the computer.")}
<p>Two stories in the former Papenhausen Hardware store, with a full florist in the back. The reviews are clear about what this place actually is: a laptop cafe. Lots of tables, outlets, working wifi, plus beer and wine. The coffee gets described as "good," not remarkable, and at 4.6 it has the lowest rating of the new coffee class. Nobody is driving across town for the espresso. But if you live near West Portal and want somewhere to work that is not your kitchen, that is the use case, and for that it delivers.</p>

${rankcard(6, "Stray Dog Coffee & Bar", "Mission, 2545 24th St · ★ 4.9 (15 reviews)",
  null,
  "The drinks are amazing. I highly recommend the Sit Stay Matcha, honestly the best drink ever. Stray Dog is truly a hidden gem.")}
<p>Coffee shop by day, bar by night, from the owner of Lost Cat. The drink names commit to the theme (Sit Stay Matcha, dirty pistachio latte) and the big space open late is genuinely useful in the Mission. But read the 4-star reviews and a pattern shows up: "the strawberry matcha cloud isn't too strong," "cold brew could have been stronger," "I wish there was more of it." The drinks look better than they hit right now. Fifteen reviews is nothing, and soft-opening kinks are normal, but the early signal is style ahead of substance. Worth a visit for the space, not yet for the coffee.</p>

<h2>New matcha cafes in San Francisco (2026)</h2>

${rankcard(1, "Constance Tea & Matcha", "Outer Richmond, 3512 Balboa St · ★ 4.9 (163 reviews) · opened May 31",
  null,
  "They serve freshly milled matcha, which is something I have only experienced in Japan. You can immediately taste the difference. Incredibly fresh, smooth, aromatic.")}
<p>The most defensible numbers of any 2026 opening: 4.9 across 163 reviews, held through day-one lines with two-hour waits, which almost never happens. The pitch is real too. First shop in the Bay Area milling matcha on-site with commercial stone mills, and the only one stocking black matcha. The catch is price and patience: the fresh milled reserve latte runs about $12, the space is small (bench seating and a little counter), and the waits have not fully gone away. There is a normal-priced latte if $12 matcha offends you, and it should. Whether freshly milled is worth double the going rate is a personal call. The 163 people who reviewed it mostly think yes.</p>

${rankcard(2, "Moriwa Matcha", "Parkside, 1143 Taraval St · ★ 4.4 (27 reviews)",
  null,
  "I came in not expecting much but the matcha is actually really good quality. It might be one of the best matchas I have tasted in SF so far.")}
<p>Tiny kiosk-order spot on Taraval with real fruit in the drinks: actual mango chunks, actual strawberry. One bench inside, one person often working alone, so expect a wait on weekends. The 4.4 is dragged down by early service hiccups more than the drinks themselves. One reviewer wrote "worth 5 stars despite other reviews," which is the shape of a place still finding its feet: the matcha quality is there, the operation is not yet.</p>

${rankcard(3, "Kiss of Matcha, Irving St", "Sunset, 2127 Irving St · ★ 4.1 (55 reviews)",
  null,
  "Soft serves are super good but they are hollow inside, so you are not getting as much as it looks like.")}
<p>The third location of a local favorite, closer to Ocean Beach. Regulars are happy it exists and the parfait gets real love (black sesame ice cream, warabi mochi, a warm croffle on top). But at 4.1 it is the weakest rating of the matcha wave, and the honest reviews mention hollow soft serve and a light hand with the matcha. Go for the parfait, keep expectations calibrated on the rest.</p>

<h2>New restaurants in San Francisco (2026)</h2>

${rankcard(1, "Maria Isabel", "Presidio Heights, 500 Presidio Ave · ★ 4.9 (101 reviews) · opened February",
  null,
  "The smoked mussel sope was the most memorable single dish I have had in months. The dry aged ribeye taco was so simple and flavorful.")}
<p>The best-rated 2026 opening with a real sample size. This is the new spot from Laura and Sayat Ozyilmaz, the chefs behind Dalida, doing coastal Acapulco-inspired Mexican, and a 4.9 over 101 reviews for a sit-down restaurant is rare. One grain of salt: a lot of those early reviewers are self-described fans who followed the chefs from their pop-up days, so the sample skews devoted. The dishes named are specific though (the smoked mussel sope, the dry-aged ribeye taco, the conchita), and specificity is usually a better signal than stars. Book ahead, and expect Presidio Heights prices.</p>

${rankcard(2, "JouJou", "SoMa, 65 Division St · ★ 4.1 (105 reviews)",
  null,
  "The restaurant SF was missing. Classy but comfortable. Elevated but not pretentious. Do not sleep on the Louie. And get down on that heavenly butter.")}
<p>The buzzy French one. Here is the interesting part: the written reviews are glowing (the baba au rhum, the chopped-onion French onion soup, the butter that gets its own sentences) but the overall rating sits at 4.1, well below the hype. That gap usually means the misses are real when they happen. I would still go for the classics and the room, just with eyes open. This is exactly the hype-vs-love gap <a href="/blog/most-mentioned-isnt-best">our whole site is built around</a>.</p>

${rankcard(3, "Catalyst Coffee Lab", "Embarcadero, Pier 15 at the Exploratorium · ★ 5.0 (5 reviews)",
  null,
  "I got the breakfast burrito and it was SO GOOD. Vegetarian with a couple types of sweet potatoes, loads of eggs, and the green sauce was the star.")}
<p>A refresh of the Exploratorium's cafe with a new operator and, by the early accounts, better food than before. Five reviews is not a rating, it is an anecdote. Nobody should make a trip for this. But if you are already at Pier 15 with kids, knowing the breakfast burrito is decent is genuinely useful information, and that is the only claim I will make for it.</p>

<h2>Opening later in 2026: what's still coming</h2>
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
  // ── 11 ────────────────────────────────────────────────────────────────────
  {
    slug: "michelin-star-restaurants-san-francisco",
    title: "Every Michelin Star Restaurant in San Francisco (2026): The Full List, With Google Ratings",
    description:
      "All 25 Michelin-starred restaurants in San Francisco: 4 three-stars, 6 two-stars, 15 one-stars. Google ratings for each, plus where the stars actually buy their ingredients.",
    ogImage: "/og-image.png",
    published: "2026-08-29",
    spotList: [
      "Atelier Crenn", "Californios", "Quince", "Benu", "Lazy Bear", "Saison", "Birdsong",
      "Kiln", "Sons & Daughters", "Acquerello", "State Bird Provisions", "Niku Steakhouse",
      "Mister Jiu's", "Nisei", "Sorrel", "Wolfsbane", "The Progress", "Hilda and Jesse",
      "Nari", "Restaurant Naides", "Kin Khao", "Angler", "7 Adams", "San Ho Won", "Ssal"
    ],
    body: `
<p>San Francisco holds 25 Michelin-starred restaurants in 2026: four with three stars, six with two, fifteen with one. This is the full list, with a number the Michelin Guide will not give you: what Google reviewers actually rate each one.</p>
<p>Why put those side by side? Because stars and crowd satisfaction measure different things. A starred kitchen can leave a chunk of its Google reviewers cold, usually over price, portion, or formality, and that gap is worth knowing about before you commit a few hundred dollars to a tasting menu.</p>

<h2>Three Michelin stars in San Francisco</h2>
${rankcard(1, "Quince", "Jackson Square · ★ 4.7 on Google · $$$$", null,
  "Michael Tusk's farm-to-table tasting menu. An entire Bolinas farm, Fresh Run Farm, grows exclusively for this restaurant.")}
${rankcard(2, "Atelier Crenn", "Cow Hollow · ★ 4.6 on Google · $$$$", null,
  "Dominique Crenn's poetic culinaria, supplied by her own Bleu Belle Farm in Sonoma.")}
${rankcard(3, "Californios", "SoMa · ★ 4.6 on Google · $$$$", null,
  "Val Cantu's Mexican fine dining, publicly tied to Tierra Vegetables' heirloom corn and masa.")}
${rankcard(4, "Benu", "SoMa · ★ 4.5 on Google · $$$$", null,
  "Corey Lee's tasting menu blends Korean, Chinese, and French technique.")}
<p>All four sit between 4.5 and 4.7 on Google, which sounds unremarkable until you remember these are $400+ dinners being judged by people spending their own money. Nobody hands a three-star restaurant a five easily. Quince edging the group at 4.7 tracks with what its reviews emphasize: consistency, not fireworks.</p>

<h2>Two Michelin stars</h2>
${rankcard(1, "Saison", "SoMa · ★ 4.6 on Google · $$$$")}
${rankcard(2, "Acquerello", "Nob Hill · ★ 4.6 on Google · $$$$", null,
  "Refined Italian in a former chapel, one of the city's longest-running starred rooms.")}
${rankcard(3, "Kiln", "Hayes Valley · ★ 4.6 on Google · $$$$")}
${rankcard(4, "Lazy Bear", "Mission · ★ 4.5 on Google · $$$$", null,
  "The communal dinner party format. David Barzelay has bought from Tierra Vegetables for nearly two decades.")}
${rankcard(5, "Birdsong", "SoMa · ★ 4.5 on Google · $$$$")}
<p>Sons & Daughters (★ 4.5) rounds out the two-star group from its Nob Hill room at 708 Bush St, with an announced move to a larger Mission space. If you want the two-star experience with the least ceremony, Lazy Bear's shared tables are the outlier format in the whole starred list.</p>

<h2>One Michelin star: where the interesting gaps live</h2>
<p>The fifteen one-stars are where Google ratings and Michelin's opinion diverge most, in both directions.</p>
${rankcard(1, "Nisei", "Russian Hill · ★ 4.7 on Google", null,
  "Washoku-inspired tasting menu. Sells a 'Day in the Life' experience that starts with sourcing at the farmers market.")}
${rankcard(2, "Sorrel", "Pacific Heights · ★ 4.7 on Google", null,
  "Bay Area farmers markets plus a rooftop garden.")}
${rankcard(3, "State Bird Provisions", "Fillmore · ★ 4.6 on Google · $$$", null,
  "Dim-sum-cart California cooking. Eater once documented its Ferry Plaza market walk naming the exact farms.")}
<p>At the other end: Kin Khao holds a star and a 4.3 on Google across 2,100 reviews, the lowest in the starred set. Mister Jiu's and Hilda and Jesse sit at 4.4. None of those are bad numbers, but the pattern is consistent: the further a starred restaurant leans into casual volume service, the more its Google score converges toward ordinary. The full fifteen: State Bird Provisions, Niku Steakhouse, Mister Jiu's, Nisei, Sorrel, Wolfsbane, The Progress, Hilda and Jesse, Nari, Restaurant Naides, Kin Khao, Angler, 7 Adams, San Ho Won, and Ssal.</p>

<h2>The part nobody else covers: where the stars buy their food</h2>
<p>SF Eats keeps a sourcing map for the starred restaurants, built from public reporting, and a lot of it is places you can shop yourself. Tierra Vegetables sells the same heirloom corn Californios uses, at the Ferry Plaza Saturday market. The Butcher Shop by Niku retails the same A5 wagyu program as Niku Steakhouse. State Bird's produce trail runs through vendors any of us can visit on a Saturday morning. The map on the site marks which suppliers are public and which are restaurant-only.</p>
<a class="cta" href="/#michelin/mic-1star">Open the Michelin sourcing map →</a>

<h2>Honest notes</h2>
<p>Google ratings here are as of mid-2026 and drift over time. A 4.5 at a $$$$ tasting counter is not comparable to a 4.5 at a taqueria; expensive restaurants attract tougher graders and higher expectations. And a Michelin star measures a specific thing (technique, consistency, vision as judged by anonymous professional inspectors), which is exactly why the crowd number beside it is useful context rather than a contradiction. For how we think about ratings generally: <a href="/blog/most-mentioned-isnt-best">high mentions do not mean high quality</a>.</p>`,
  },
  // ── 12 ────────────────────────────────────────────────────────────────────
  {
    slug: "best-omakase-sushi-san-francisco",
    title: "Best Omakase in San Francisco (2026): Sushi Counters Ranked by 2,000+ Reviews",
    description:
      "Ju-Ni, KEN, Omakase, Kusakabe and more, ranked by how positively reviewers describe the actual sushi. Plus what each counter costs and how to book.",
    ogImage: "/og-image.png",
    published: "2026-08-29",
    spotList: ["Ju-Ni", "KEN", "Omakase", "Chisai Sushi Club", "KUSAKABE"],
    body: `
<p>Omakase in San Francisco runs from about $120 to over $300 a seat, the menus all promise roughly the same arc of nigiri, and every counter has a 4.5 or better on Google. The star ratings cannot separate them. So we read the reviews that actually describe the sushi and scored how positive they are.</p>

<h2>The ranking</h2>
${rankcard(1, "KEN", "Lower Haight · ★ 4.9 (157 reviews)",
  "90 dish mentions · <b>96% loved</b>",
  "By far the best and most memorable omakase experience I have ever had!")}
${rankcard(2, "Omakase", "Showplace Square · ★ 4.6 (460 reviews) · $$$$",
  "800 dish mentions · <b>94% loved</b>",
  "We even got to see the chef's amazing sushi knives, some worth thousands, and his hilarious stories.")}
${rankcard(3, "Ju-Ni", "North of the Panhandle · ★ 4.7 (514 reviews) · $$$$",
  "500 dish mentions · <b>92% loved</b>",
  "Twelve seats, twelve courses. The uni and A5 wagyu courses are the ones people cannot stop writing about.")}
${rankcard(4, "KUSAKABE", "North Beach · ★ 4.7 (786 reviews) · $$$$", null,
  "Really love the contrast of the dry aged fish sushi and the fresh fish sushi.")}
${rankcard(5, "Chisai Sushi Club", "Bernal Heights · ★ 4.8 (372 reviews)", null,
  "The neighborhood option: a small Bernal counter with a rare vegan omakase track that reviewers rate surprisingly well.")}

<h2>Reading the numbers honestly</h2>
<p>KEN tops the list at 96% love, but note the sample: 157 total reviews, 90 of them describing the omakase. That is a small, devoted crowd, the kind a 14-seat counter with hard-to-get reservations selects for. People who fight for a booking arrive wanting to love it. The score is real, just understand what produced it.</p>
<p>Omakase (the restaurant named Omakase) has the strongest large-sample number: 94% positive across 800 sushi mentions. Ju-Ni sits at 92% across 500. The practical difference between 92 and 94 at these volumes is nothing you would taste. What actually separates them is format: Ju-Ni serves everything in a strict 12-course seating with two time slots, Omakase runs slightly looser and takes later bookings.</p>
<p>KUSAKABE is the one to watch if you care about technique specifics. Its dry-aged fish program comes up constantly in reviews. We have not finished scoring its full review set, so it sits unranked on love for now, and it would be dishonest to invent a number.</p>

<h2>Which one should you book?</h2>
<p>First omakase ever: Ju-Ni, because the 12-seat format explains itself as it goes. Special occasion where budget is not the constraint: KEN, booked well ahead. Best odds of a seat this week: Omakase or KUSAKABE. Sushi-curious but not $250-curious: Chisai's Bernal counter is the gentlest entry point, and the only one with a serious vegan path.</p>
<a class="cta" href="/s/jpn-omakase">See the full omakase map →</a>

<h2>Related</h2>
<p>Japanese food beyond sushi: <a href="/blog/best-ramen-san-francisco">the ramen ranking</a>, <a href="/s/jpn-izakaya">izakaya and yakitori</a> (Rintaro holds the highest Japanese love score we track at 94%), and <a href="/s/jpn-udon">handmade udon</a>.</p>`,
  },
  // ── 13 ────────────────────────────────────────────────────────────────────
  {
    slug: "best-korean-bbq-san-francisco",
    title: "Best Korean BBQ in San Francisco (2026): Ranked by What 3,700+ Reviewers Say",
    description:
      "Brothers, Han Il Kwan, um.ma, Kogi Gogi, and San Ho Won compared: galbi quality, charcoal vs gas, AYCE or not, and what reviewers actually complain about.",
    ogImage: "/og-image.png",
    published: "2026-08-29",
    spotList: ["Brothers Restaurant", "Han Il Kwan", "um.ma", "Kogi Gogi BBQ", "San Ho Won"],
    body: `
<p>Korean BBQ is a category where San Francisco punches below its weight, and locals know it. The serious KBBQ crowd drives to Santa Clara or Oakland. But if you are staying in the city, there is a real ranking to be had, and the review data is clear about both the order and the complaints.</p>

<h2>The ranking</h2>
${rankcard(1, "Brothers Restaurant", "Inner Richmond · ★ 4.5 (684 reviews) · $$",
  "280 dish mentions · <b>91% loved</b>",
  "Overall 10/10, fav kbbq in sf hands down.")}
${rankcard(2, "Han Il Kwan", "Central Richmond · ★ 4.4 (1,505 reviews) · $$",
  "320 dish mentions · <b>90% loved</b>",
  "Great portion for the BBQ, every dish is so flavorful, I absolutely love everything including the banchan.")}
${rankcard(3, "um.ma", "Inner Sunset · ★ 4.4 (929 reviews) · $$",
  "190 dish mentions · <b>88% loved</b>",
  "Galbi wasn't too fatty and was delish, bulgogi was slightly too sweet but still tasty.")}
${rankcard(4, "Kogi Gogi BBQ", "Inner Sunset · ★ 4.2 (602 reviews) · $$",
  "250 dish mentions · <b>87% loved</b>",
  "I would definitely recommend choosing marinated meats as the bulgogi and galbi were our favorites.")}
${rankcard(5, "San Ho Won", "Mission · ★ 4.6 (723 reviews) · $$$", null,
  "The Michelin-starred one, from the Benu team. Charcoal galbi in a reservation-required, not-all-you-can-eat format.")}

<h2>What the reviews actually argue about</h2>
<p>Brothers wins on the meat itself: charcoal tables, aged galbi, and a 91% love score from 280 mentions. The recurring complaint is everything around the meat, namely waits with no real system and brusque service on busy nights. Reviewers keep saying the food is worth it, which is exactly what a 4.5 with a 91% dish score looks like: great product, rough edges.</p>
<p>Han Il Kwan is the volume pick, the most-mentioned KBBQ in the city at 320. It is an old-school Richmond institution where the banchan spread does a lot of the work. The critical reviews cluster on inconsistency during rushes. um.ma runs a more modern menu (their kimchi fried rice finishes tableside) and reads slightly behind on pure grill quality at 88%.</p>
<p>Kogi Gogi is the all-you-can-eat entry, and its 87% needs that context: AYCE reviews always run lower because the format invites quantity judgments. For what it is, the marinated meats hold up.</p>

<h2>The San Ho Won question</h2>
<p>San Ho Won holds a Michelin star and a 4.6, the highest rating in this group, but we score dishes on what reviewers say about them, and its full review set is still being processed, so it carries no love score yet. What the reviews already show: the charcoal galbi is the dish everyone orders, the portions read small to people expecting KBBQ abundance, and it is a different product category, closer to a Korean grill restaurant than a wrap-it-yourself KBBQ night. Judge it on that axis and it belongs at or near the top. Judge it as AYCE-style KBBQ and you will leave hungry and lighter by $90.</p>
<a class="cta" href="/s/kor-bbq">See the full KBBQ map →</a>

<h2>Related</h2>
<p>More Korean: <a href="/s/kor-friedchx">Korean fried chicken</a>, <a href="/s/kor-jjigae">kimchi jjigae and stews</a>, and <a href="/s/kor-tteokbokki">tteokbokki and street food</a>.</p>`,
  },
  // ── 14 ────────────────────────────────────────────────────────────────────
  {
    slug: "best-soup-dumplings-xiao-long-bao-san-francisco",
    title: "Best Soup Dumplings in San Francisco (2026): Xiao Long Bao Ranked, Including One Hype Trap",
    description:
      "Dumpling Story, Dumpling Zone, Yuanbao Jiaozi, Dumpling Time, Dumpling Home: SF's xiao long bao ranked by review sentiment. The most famous one scores the lowest.",
    ogImage: "/og-image.png",
    published: "2026-08-29",
    spotList: ["Dumpling Story", "Dumpling Zone", "Yuanbao Jiaozi", "Dumpling Time", "Dumpling Home"],
    body: `
<p>Xiao long bao is an unforgiving dish. The skin has to be thin enough to see the soup through and strong enough to survive the chopstick lift, and the difference between great and average is about eight seconds of steam. San Francisco has five spots people argue about. The review data settles a few of those arguments, including one result the Instagram crowd will not like.</p>

<h2>The ranking</h2>
${rankcard(1, "Dumpling Zone", "West of Twin Peaks · ★ 4.8 (258 reviews) · $$",
  "35 dish mentions · <b>93% loved</b>",
  "Literally some of the best XLB I might have ever had.")}
${rankcard(2, "Dumpling Story", "Valencia St, Mission Dolores · ★ 4.8 (500 reviews) · $$",
  "55 dish mentions · <b>91% loved</b>",
  "The pan fried soup dumplings were so incredibly tasty. And the curry lamb steamed dumplings.")}
${rankcard(3, "Yuanbao Jiaozi 元寶餃子", "Outer Sunset · ★ 4.6 (694 reviews) · $",
  "40 dish mentions · <b>90% loved</b>",
  "That was an exceptional place to eat the freshest dumplings you will ever eat!")}
${rankcard(4, "Dumpling Home", "Civic Center · ★ 4.5 (1,644 reviews) · $$", null,
  "We had the pork xiao long bao, pan-fried juicy pork bao (my favorite) and the dry-fried chicken wings.")}
${rankcard(5, "Dumpling Time", "Design District · ★ 4.5 (2,800 reviews) · $$",
  "70 dish mentions · <b>82% loved</b>",
  "The Wagyu XLB is one of the best things I've ever eaten.")}

<h2>The hype trap: Dumpling Time</h2>
<p>Dumpling Time is the most famous name here, with 2,800 reviews, a Design District flagship, and the Instagram-bait King Dum giant soup dumpling. It also has the lowest love score of the five at 82%. Read the mentioning reviews and the pattern is consistent: people love the theater, then note the XLB skins run thick and the soup runs thin. The wagyu XLB gets genuine praise; the standard pork is where the disappointment concentrates. This is the exact pattern our <a href="/blog/most-mentioned-isnt-best">hype-vs-love scoring</a> exists to catch: maximum fame, weakest dish sentiment.</p>

<h2>The quiet winners</h2>
<p>Dumpling Zone at 93% is a strip-mall-plain room by Twin Peaks that tourists never reach. Small sample caveat applies: 35 XLB mentions is enough to trust the direction but not to declare an eight-point gap over Yuanbao meaningful. Dumpling Story on Valencia is the strongest all-rounder, with the pan-fried sheng jian bao variant earning as much praise as the classic steamed. Yuanbao in the Outer Sunset is the value pick, a dollar-sign cheaper with handmade wrappers you can watch being rolled.</p>
<p>Dumpling Home sits unscored for now (its full review set is still processing), but its 1,644-review 4.5 and the specificity of its praise suggest it will land in the upper half when the numbers come in.</p>

<h2>Ordering notes from the reviews</h2>
<p>Consensus across all five: order the classic pork XLB as the benchmark before any truffle or wagyu variant, ask for black vinegar with ginger if it does not come automatically, and skip XLB delivery entirely. Every one-star XLB review that mentions DoorDash describes the same collapsed, soup-less result. This dish does not travel.</p>
<a class="cta" href="/s/chn-xiaolongbao">See the full soup dumpling map →</a>

<h2>Related</h2>
<p>More Chinese: <a href="/blog/best-dim-sum-san-francisco">the dim sum ranking</a>, <a href="/s/chn-roastduck">Peking duck</a>, and <a href="/s/chn-mapo">mapo tofu and Sichuan</a>.</p>`,
  },
  // ── 15 ────────────────────────────────────────────────────────────────────
  {
    slug: "mission-district-food-guide",
    title: "Mission District Food Guide (2026): The Best Thing to Order on Every Block",
    description:
      "What to eat in SF's Mission District, dish by dish: burritos, tamales, birria, omakase-level izakaya, tsukemen, Japanese curry, soup dumplings, and a Michelin dinner party. All ranked from review data.",
    ogImage: "/og-image.png",
    published: "2026-08-29",
    spotList: [
      "La Palma Mexicatessen", "Donaji", "El Metate", "La Taqueria", "Rintaro",
      "Taishoken", "Curry Hyuga", "Dumpling Story", "Pakwan", "Baklavastory",
      "Hi Hat", "Stonemill Matcha", "Lazy Bear", "San Ho Won"
    ],
    body: `
<p>The Mission is the highest-density great-food neighborhood in San Francisco, and most guides cover exactly one dimension of it: the burritos. Fair, the burritos matter, and <a href="/blog/best-burrito-san-francisco">we ranked those separately</a>. But our data covers 60+ dishes across the city, and when you filter it to the Mission, a much stranger and better neighborhood shows up: the city's best izakaya, its best tsukemen, its best Japanese curry, its best tamales, and its best baklava are all within about fifteen blocks of each other.</p>
<p>Every score below means: of the Google reviews that mention this dish at this spot, this share describe it positively.</p>

<h2>The Mexican core</h2>
<p><strong>Tamales at La Palma Mexicatessen</strong> (24th St): 94% love across 95 mentions, and the masa is ground on site. Donaji nearby scores higher at 96% on a smaller sample of 55. Either way, the Mission's tamale game is stronger than its burrito game and nobody writes about it.</p>
<p><strong>Burritos</strong>: El Metate at 93% is the data's pick over La Taqueria's 90%, with the caveat that La Taqueria's rice-less style is its own category. The full argument is in <a href="/blog/best-burrito-san-francisco">the burrito ranking</a>.</p>
<p><strong>Chilaquiles at el Mil Amores</strong>: 95% across 60 mentions, the best brunch number in the neighborhood. <strong>Mole at La Oaxaqueña</strong>: 91%, and its tamales score 93% too.</p>

<h2>The Japanese block nobody expects</h2>
<p>Within a few blocks of 18th and Valencia the Mission quietly hosts the top of our entire Japanese ranking:</p>
${rankcard(1, "Rintaro", "Izakaya · ★ 4.5 (1,387 reviews)", "900 mentions · <b>94% loved</b>",
  "Our favorite was the mushroom yakitori. If we came back we'd try more yakitori.")}
${rankcard(2, "Taishoken", "Tsukemen · ★ 4.6 (487 reviews)", "450 mentions · <b>91% loved</b>")}
${rankcard(3, "Curry Hyuga", "Japanese curry · ★ 4.7 (157 reviews)", "180 mentions · <b>93% loved</b>",
  "Killer casual Japanese curry in the Mission district.")}
<p>Rintaro's 94% over 900 mentions is the highest large-sample Japanese score we track. Taishoken is the city's best tsukemen (<a href="/blog/best-ramen-san-francisco">it tops our ramen ranking</a>). Curry Hyuga's 93% comes from a small room, so expect a wait at peak.</p>

<h2>The rest of the map</h2>
<p><strong>Soup dumplings at Dumpling Story</strong> (Valencia): 91%, strongest all-rounder in <a href="/blog/best-soup-dumplings-xiao-long-bao-san-francisco">our XLB ranking</a>. <strong>Goat curry at Pakwan</strong>: 92% across 310 mentions, cash only, BYO chai expectations. <strong>Baklava at Baklavastory</strong>: a 4.9-star shop whose 97% love score is the highest Turkish number we track. <strong>Pizza at Hi Hat</strong>: 96% on the slice. <strong>Matcha at Stonemill</strong>: 93%, though reviewers flag the line and the prices in the same breath.</p>

<h2>The fine-dining tier</h2>
<p>The Mission holds two Michelin stars: Lazy Bear (two stars, the communal dinner party, ★ 4.5) and San Ho Won (one star, charcoal Korean grill, ★ 4.6), with Sons & Daughters announced to join once its move from Nob Hill completes. Details in <a href="/blog/michelin-star-restaurants-san-francisco">the full Michelin list</a>.</p>

<h2>Honest limits of this guide</h2>
<p>Our data ranks dishes we track city-wide, so a Mission spot that is beloved for something we do not score yet will be missing here. The neighborhood also changes fast, and review sentiment lags reality by months. Treat this as a data-grounded starting map, not a census. When a place has a small mention count we said so inline.</p>
<a class="cta" href="/">Open the full interactive map →</a>`,
  },
  // ── 16 ────────────────────────────────────────────────────────────────────
  {
    slug: "best-lunch-spots-san-francisco",
    title: "Best Lunch Spots in San Francisco (2026): Where to Eat In, and What Actually Survives Delivery",
    description:
      "The best lunch in San Francisco ranked by review data: Saigon Sandwich, Golden Boy, Muracci's, El Metate, Pho 2000. Plus which dishes to order in, and which fall apart in a delivery bag.",
    ogImage: "/og-image.png",
    published: "2026-08-29",
    spotList: [
      "Saigon Sandwich", "El Metate", "Golden Boy Pizza", "Muracci's Japanese Curry",
      "Pho 2000", "Manna", "Hai Ky Mi Gia", "Yummy Yummy", "La Palma Mexicatessen",
      "Pakwan", "Volcano Curry", "Cafe Bunn Mi"
    ],
    body: `
<p>Lunch is a different problem than dinner. You have an hour, maybe less, and the question is not "what is the best restaurant" but "what is the best thing I can be eating twenty minutes from now." So this guide is ranked for exactly that, in two halves: where to go when you can leave the desk, and what to order in when you cannot. The second half matters more than people admit, because some of the best lunch food in this city turns into a sad, steamed version of itself inside a delivery bag.</p>
<p>As always, the love score means: of the Google reviews that mention the dish, this share describe it positively.</p>

<h2>Best lunch spots in San Francisco: eat there</h2>

${rankcard(1, "Saigon Sandwich", "Tenderloin, 560 Larkin St · ★ 4.6 (1,609 reviews) · $",
  "1,100 banh mi mentions · <b>95% loved</b>",
  "The roast pork was very tender and slightly sweet, definitely not your usual banh mi filling.")}
<p>The best lunch number in our entire dataset. Under ten dollars, cash, a line that moves fast, and 95% positive across eleven hundred mentions. The honest caveats: it is a counter with nowhere to sit, and the Larkin Street block requires a tolerance for the Tenderloin at midday. Neither has dented the score.</p>

${rankcard(2, "Muracci's Japanese Curry & Grill", "Chinatown, near FiDi · ★ 4.5 (696 reviews) · $$",
  "1,400 curry mentions · <b>89% loved</b>",
  "The katsu curry at lunch rush is the order. Expect a line of office workers who all know each other's orders.")}
<p>1,400 mentions makes this the most talked-about lunch dish we track downtown. An 89% love score is good, not elite, and the critical reviews are consistent about why: portions read small for the price, and peak-hour waits stretch. It ranks this high because of what it is: the only serious Japanese curry within walking distance of the Financial District.</p>

${rankcard(3, "El Metate", "Mission, 2406 Bryant St · ★ 4.6 (448 reviews) · $$",
  "45 mentions · <b>93% loved</b>",
  "Actual tables, fast counter service, and the burrito that beats the famous names in our ranking.")}
<p>If your lunch hour can absorb a trip to the Mission, this is the sit-down-without-the-sit-down-tax option. The full argument for it over La Taqueria is in <a href="/blog/best-burrito-san-francisco">the burrito ranking</a>.</p>

${rankcard(4, "Golden Boy Pizza", "North Beach, 542 Green St · ★ 4.7 (4,974 reviews) · $",
  "250 mentions · <b>91% loved</b>",
  "Two focaccia squares and you are done in fifteen minutes. The clam and garlic is the one.")}

${rankcard(5, "Pho 2000", "Little Saigon, Tenderloin · ★ 4.7 (560 reviews) · $",
  "480 pho mentions · <b>90% loved</b>",
  "Broth is rich, portions are huge, prices are fair. In and out in forty minutes.")}
<p>Worth knowing about the pho tier: Turtle Tower's newer Marina location actually scores higher at 94%, but from only 55 total reviews so far, too few to rank it above a 560-review 4.7. Small samples get named, not crowned.</p>

<h2>The rest of the eat-in shortlist</h2>
<p><strong>Manna</strong> (Inner Sunset): the best bibimbap number in the city, 91% across 380 mentions, and a lunch line of UCSF people who treat it as a cafeteria. <strong>Hai Ky Mi Gia</strong> (Little Saigon): wonton noodle soup at 88%, cash only, nothing on the menu over about twelve dollars. <strong>Yummy Yummy</strong> (Inner Sunset): com tam broken rice at 87% and the 900-mention pho as backup. <strong>La Palma Mexicatessen</strong> (Mission): 94% tamales you can be holding within five minutes of walking in.</p>

<h2>Best lunch to order in: what survives the bag</h2>
<p>Delivery is a physics problem. Steam is the enemy. Here is what the review data and basic thermodynamics agree on.</p>
<p><strong>Order with confidence:</strong></p>
<ul>
<li><strong>Burritos.</strong> The foil wrap is genuinely protective; a Mission burrito arrives at 90% of its counter self. El Metate and Taqueria Cancun both hold up. This is the single safest delivery lunch in San Francisco.</li>
<li><strong>Japanese curry.</strong> Curry is already a held, stewed dish; there is nothing for the bag to ruin. Volcano Curry (88%, and a dollar-sign cheaper) is the delivery pick over Muracci's, whose katsu loses crispness in transit.</li>
<li><strong>Banh mi, with a clock.</strong> Cafe Bunn Mi (91%) survives a 15-to-20-minute ride fine. Past half an hour the baguette starts losing the argument with the pickled daikon.</li>
<li><strong>Indian.</strong> Curries and biryani are transport-proof. Pakwan's goat curry (92% across 310 mentions) arrives exactly as it left.</li>
<li><strong>Tamales.</strong> Masa is steam-stable by design. La Palma's travel better than almost anything else we track.</li>
</ul>
<p><strong>Do not order these for delivery, eat them there:</strong></p>
<ul>
<li><strong>Soup dumplings.</strong> Every one-star XLB review that mentions DoorDash describes the same collapsed, soup-less result. Covered in <a href="/blog/best-soup-dumplings-xiao-long-bao-san-francisco">the XLB ranking</a>.</li>
<li><strong>Dosa.</strong> One Udupi Palace reviewer put it better than I can: they ordered DoorDash a second time "knowing the dosa won't be crispy." That is a person negotiating with physics and losing. A dosa is 80% crispness.</li>
<li><strong>Neapolitan pizza.</strong> A blistered 90-second crust steams into flatbread inside ten minutes. Detroit and focaccia squares (Golden Boy, Square Pie Guys) reheat far better if you must.</li>
<li><strong>Pho, mostly.</strong> Good spots pack broth separately, which saves the soup but not the noodles, which arrive bloated. Acceptable in a pinch, never at its best.</li>
<li><strong>Anything fried.</strong> Karaage, katsu, Korean fried chicken: the steam problem, maximally expressed.</li>
</ul>

<h2>Honest notes</h2>
<p>This list skews cheap and fast because that is what lunch usually is; the tasting-counter crowd should read <a href="/blog/michelin-star-restaurants-san-francisco">the Michelin list</a> instead. Love scores come from all-day reviews, not lunch-specific ones, so a spot with a strong dinner reputation gets some halo here. And delivery quality depends on your distance as much as the kitchen: every "order with confidence" call above assumes a ride under about 25 minutes.</p>
<a class="cta" href="/">Open the full map: 60+ dishes, 300+ spots →</a>`,
  },
  // ── 17 ────────────────────────────────────────────────────────────────────
  {
    slug: "best-banh-mi-san-francisco",
    title: "Best Banh Mi in San Francisco (2026): 5 Sandwiches Ranked by 1,800+ Review Mentions",
    description:
      "Saigon Sandwich, Cafe Bunn Mi, L & G, Mong Thu, Banh Mi Viet: SF's banh mi ranked by what reviewers actually say about the sandwich. The prettiest star rating is not the best sandwich.",
    ogImage: "/og-image.png",
    published: "2026-09-12",
    spotList: ["Saigon Sandwich", "L & G Vietnamese Sandwich", "Cafe Bunn Mi", "Mong Thu Cafe", "Banh Mi Viet"],
    body: `
<p>The banh mi might be the best food deal left in San Francisco: a proper one still costs single digits, and the city's top spots are genuinely excellent. It is also a dish where the star rating misleads more than usual, because the highest-rated shop in this ranking has the weakest sandwich sentiment of the five. Mentions and love scores below come from reading every review that talks about the banh mi.</p>

<h2>The ranking</h2>
${rankcard(1, "Saigon Sandwich", "Tenderloin, 560 Larkin St · ★ 4.5 (1,647 reviews) · $",
  "1,100 mentions · <b>95% loved</b>",
  "The roast pork was very tender and slightly sweet, definitely not your usual banh mi filling.")}
${rankcard(2, "L & G Vietnamese Sandwich", "Little Saigon · ★ 4.6 (327 reviews) · $",
  "40 mentions · <b>95% loved</b>",
  "Their prices are extremely wallet friendly, and their meat portions in the banh mi are generous.")}
${rankcard(3, "Cafe Bunn Mi", "Inner Richmond, Clement St · ★ 4.3 (638 reviews) · $",
  "650 mentions · <b>91% loved</b>",
  "Perfect balance of meat and veggies. Grilled pork banh mi is the move.")}
${rankcard(4, "Mong Thu Cafe", "Tenderloin · ★ 4.7 (230 reviews) · $",
  "16 mentions · <b>94% loved</b>",
  "An oasis in the Tenderloin. The shop is clean, the staff are friendly.")}
${rankcard(5, "Banh Mi Viet", "Alamo Square · ★ 4.7 (263 reviews)",
  "58 mentions · <b>84% loved</b>",
  "Came on hot, fresh, super crunchy baguettes with generous helpings of pickled carrot.")}

<h2>Reading the numbers</h2>
<p>Saigon Sandwich is the rare case where the legend and the data agree: 1,100 banh mi mentions, 95% of them positive, at the biggest sample size in this category by far. The trade-offs are physical, not culinary. No seating, cash preferred, and a Larkin Street block that requires midday-Tenderloin tolerance.</p>
<p>L & G matches the 95% on a fraction of the volume (40 mentions), so treat the tie as directional rather than settled. What its reviews repeat is portion size relative to price, which in 2026 is its own kind of quality.</p>
<p>The interesting case is Banh Mi Viet: the highest star rating on this list at 4.7, and the lowest sandwich sentiment at 84%. People love the shop, the service, and the fresh baguettes; the complaints that exist are about balance, too much bread for the filling on some visits. A 4.7 star average and an 84% dish score are both true. That gap is <a href="/blog/most-mentioned-isnt-best">the whole reason we score dishes instead of restaurants</a>.</p>
<p>Mong Thu at 94% comes from only 16 mentions, the smallest sample here. Named, not crowned.</p>

<h2>Practical notes from the reviews</h2>
<p>Banh mi has a clock: the baguette holds its crunch for roughly 20 to 30 minutes, so these are eat-soon sandwiches, a point covered in <a href="/blog/best-lunch-spots-san-francisco">the lunch guide's delivery section</a>. Roast pork is the benchmark order at Saigon Sandwich; grilled pork at Cafe Bunn Mi. Everything on this list is under about ten dollars.</p>
<a class="cta" href="/s/viet-banhmi">See the full banh mi map →</a>

<h2>Related</h2>
<p>More Vietnamese: <a href="/blog/best-pho-san-francisco">the pho ranking</a>, <a href="/s/viet-comtam">com tam broken rice</a>, and <a href="/s/viet-coffee">Vietnamese coffee</a>.</p>`,
  },
  // ── 18 ────────────────────────────────────────────────────────────────────
  {
    slug: "chinatown-san-francisco-food-guide",
    title: "Chinatown San Francisco Food Guide (2026): What to Actually Eat, Ranked From Review Data",
    description:
      "The best food in SF Chinatown by dish: Z & Y's Peking duck, Good Mong Kok's char siu bao, Sam Wo congee, Golden Star pho, plus the tourist traps the reviews warn about.",
    ogImage: "/og-image.png",
    published: "2026-09-12",
    spotList: ["Z & Y Peking Duck", "Good Mong Kok Bakery", "QUACK HOUSE aka Hing Lung Company", "Sam Wo Restaurant", "Golden Star Vietnamese Restaurant", "Mister Jiu's", "Kingbob", "Muracci's Japanese Curry & Grill"],
    body: `
<p>Chinatown is the neighborhood where tourists eat worst relative to what is available. The busiest blocks of Grant Avenue are lined with places trading on foot traffic, while the food worth crossing the city for sits one street over on Stockton or up toward Broadway. This guide is the dish-by-dish version, from our review analysis, including the places where the data says temper your expectations.</p>

<h2>The dishes worth a trip</h2>
${rankcard(1, "Peking Duck at Z & Y Peking Duck", "655 Jackson St · ★ 4.6 (1,666 reviews) · $$",
  "150 mentions · <b>94% loved</b>",
  "A dedicated duck house from the Z & Y team, carved tableside. Book ahead.")}
${rankcard(2, "Char siu bao at Good Mong Kok Bakery", "1039 Stockton St · ★ 4.2 (2,528 reviews) · $",
  "250 mentions · <b>93% loved</b>",
  "Cash only, line out the door, pork buns for about two dollars. The 4.2 star average is mostly people complaining about the line, not the buns.")}
${rankcard(3, "Char siu at QUACK HOUSE (Hing Lung Company)", "Broadway · ★ 4.5 (196 reviews)",
  "70 mentions · <b>90% loved</b>",
  "The roast meat counter with the theatrical name. Watch the cleaver work through the window.")}
<p>Good Mong Kok is the purest example of why we score dishes instead of stars in the whole dataset: a 4.2 rating that would scare most people off, hiding a 93% love score across 250 mentions. The low stars come from the queue and the brusque counter pace. The buns are not the problem.</p>

<h2>The institutions, scored honestly</h2>
<p><strong>Sam Wo</strong> (jook and late hours since 1907): 82% across 85 congee mentions. The reviews split between people who grew up on it and people who came expecting more than rice porridge. Go for the history and the jook, not for a revelation. <strong>QUACK HOUSE's roast duck</strong> scores 82% too, notably below its own char siu at 90%, so order the pork.</p>
<p>One warning the data flags: <strong>Rice Roll Express</strong> has a 58% congee score, the lowest Chinatown number we track. Its rice rolls may be fine; the congee reviews are not.</p>

<h2>The surprises inside the neighborhood</h2>
<p>Chinatown's borders hold more than Cantonese food now. <strong>Golden Star</strong> on Walter U Lum Place serves pho with an 89% score across 650 mentions, one of the highest-volume pho conversations in the city (<a href="/blog/best-pho-san-francisco">full pho ranking here</a>). <strong>Kingbob</strong> does Korean fried chicken at 92%, though from only 12 mentions so far. <strong>Muracci's</strong> Japanese curry on the Financial District edge pulls 1,400 mentions at 89%. And <strong>Mister Jiu's</strong> holds a Michelin star inside a former banquet hall on Waverly Place; its 4.4 Google average is on the low end for <a href="/blog/michelin-star-restaurants-san-francisco">the starred set</a>, which tracks with a menu priced well above its neighbors.</p>

<h2>How to do one afternoon well</h2>
<p>The review-data itinerary: Good Mong Kok buns from the Stockton line as the walking snack, the Waverly Place and Ross Alley blocks between bites, then either an early Z & Y Peking Duck dinner (reserve) or a Sam Wo jook nightcap. Skip anything on Grant with a host outside waving a menu; no spot on that stretch cracks our rankings.</p>
<a class="cta" href="/s/chn-roastduck">Open the Chinatown dish maps →</a>

<h2>Related</h2>
<p><a href="/blog/best-dim-sum-san-francisco">The dim sum ranking</a> compares Chinatown's carts against the rest of the city, and <a href="/blog/best-soup-dumplings-xiao-long-bao-san-francisco">the soup dumpling ranking</a> explains why the best XLB is not here.</p>`,
  },
  // ── 19 ────────────────────────────────────────────────────────────────────
  {
    slug: "cheap-eats-san-francisco",
    title: "Best Cheap Eats in San Francisco (2026): 12 Spots Under $15 With the Highest Review Scores",
    description:
      "Every one of these SF spots is a single dollar sign on Google and scores 88%+ on dish sentiment: Donaji tamales, Saigon Sandwich, Good Mong Kok, North Beach Gyros, Golden Boy, Pakwan and more.",
    ogImage: "/og-image.png",
    published: "2026-09-12",
    spotList: ["Donaji", "Saigon Sandwich", "L & G Vietnamese Sandwich", "La Palma Mexicatessen", "Good Mong Kok Bakery", "Golden Boy Pizza", "Matcha Cafe Maiko", "Pakwan Restaurant", "North Beach Gyros", "La Taqueria", "The Pizza Shop", "Cafe Bunn Mi"],
    body: `
<p>"Cheap eats" lists usually mean "places the writer likes that happen to be cheap." This one is a database query: every spot below is a single dollar sign on Google AND holds a dish love score of 88% or higher from at least 20 review mentions. Cheap and beloved, proven separately. San Francisco's reputation says this list should not exist. It runs twelve deep.</p>

<h2>The top tier: 93% and up</h2>
${rankcard(1, "Donaji", "Mission District · ★ 4.7 (307 reviews) · $",
  "55 tamale mentions · <b>96% loved</b>",
  "Oaxacan tamales that outscore every burrito in the city.")}
${rankcard(2, "Saigon Sandwich", "Tenderloin · ★ 4.5 (1,647 reviews) · $",
  "1,100 mentions · <b>95% loved</b>",
  "The banh mi benchmark, still under ten dollars. Full ranking in the banh mi guide.")}
${rankcard(3, "La Palma Mexicatessen", "24th St, Mission · ★ 4.5 (1,361 reviews) · $",
  "95 tamale mentions · <b>94% loved</b>",
  "Masa ground on site. Tamales and chicharrones at counter prices.")}
${rankcard(4, "Good Mong Kok Bakery", "Chinatown · ★ 4.2 (2,528 reviews) · $",
  "250 mentions · <b>93% loved</b>",
  "Two-dollar pork buns. The star rating punishes the line, not the food.")}
${rankcard(5, "Golden Boy Pizza", "North Beach · ★ 4.7 (4,974 reviews) · $",
  "250 slice mentions · <b>93% on the square, 91% overall</b>",
  "Focaccia squares since 1978. Clam and garlic is the order.")}

<h2>The rest of the twelve</h2>
<p><strong>L & G Vietnamese Sandwich</strong> (Little Saigon, 95% on 40 mentions): the value banh mi. <strong>Matcha Cafe Maiko</strong> (Japantown, 92% across 1,100 mentions): the most-discussed cheap treat in the city, soft serve included. <strong>Pakwan</strong> (Mission, 92% on 310 mentions): goat curry, cash only, BYO expectations about decor. <strong>North Beach Gyros</strong> (91% on 95 mentions, and a 4.9 average over 5,633 reviews, the highest-rated spot in this entire dataset): doner and gyros with a fan base that borders on organized. <strong>La Taqueria</strong> (91% on carnitas, 90% on the burrito): famous for a reason, still a dollar sign. <strong>The Pizza Shop</strong> (Mission, 93% on 40 mentions): the neighborhood slice. <strong>Cafe Bunn Mi</strong> (Inner Richmond, 91% on 650 mentions): the Richmond's banh mi answer.</p>

<h2>What the list says about the city</h2>
<p>Three patterns worth noticing. First, the top of the list is dominated by handheld food from immigrant-owned counters: tamales, banh mi, buns, slices, doner. Second, four of the twelve have star ratings at 4.3 or below while their dish scores sit above 90%, the clearest evidence that stars measure the experience of waiting in line while sentiment measures the food. Third, nothing here is a secret. Every spot has hundreds or thousands of reviews. Cheap and great in SF is not hidden, it is just drowned out by lists that rank ambiance.</p>
<p>One honest limit: "$" on Google is self-reported and roughly means under $15 a person. A super burrito with extras or a loaded gyro plate can drift past that. Nothing on this list will surprise you past $20.</p>
<a class="cta" href="/">Open the full map: 60+ dishes, 300+ spots →</a>

<h2>Related</h2>
<p><a href="/blog/best-lunch-spots-san-francisco">The lunch guide</a> covers which of these travel for delivery, and <a href="/blog/best-banh-mi-san-francisco">the banh mi ranking</a> goes deep on the sandwich tier.</p>`,
  },
  // ── 20 ────────────────────────────────────────────────────────────────────
  {
    slug: "best-pasta-san-francisco",
    title: "Best Pasta in San Francisco (2026): Lasagna, Carbonara, Cacio e Pepe, and Bolognese Ranked",
    description:
      "SF's pasta ranked dish by dish from review sentiment: Marcella's Lasagneria's 95% lasagna, the Roma Antica vs Bella Trattoria carbonara tie, and where cacio e pepe actually disappoints.",
    ogImage: "/og-image.png",
    published: "2026-09-12",
    spotList: ["Marcella's Lasagneria", "Roma Antica", "Bella Trattoria", "Piccolo Forno", "Luisa's Restaurant", "54 Mint Cucina Romana", "Ideale", "Cotogna", "The Italian Homemade Company"],
    body: `
<p>"Best pasta in San Francisco" is four different questions wearing one trench coat. The place that nails a baked lasagna is rarely the place that nails a cacio e pepe, because one is about assembly and patience and the other is about sixty seconds of emulsion under pressure. So, as with <a href="/blog/best-pizza-san-francisco">pizza</a>, we rank them separately.</p>

<h2>Lasagna</h2>
${rankcard(1, "Marcella's Lasagneria", "Dogpatch · ★ 4.8 (695 reviews) · $$",
  "120 mentions · <b>95% loved</b>",
  "A restaurant that picked one dish and built everything around it. The bechamel does the convincing.")}
${rankcard(2, "Luisa's, since 1959", "Dolores Heights · ★ 4.7 (238 reviews) · $$",
  "35 mentions · <b>95% loved</b>",
  "Old-school red-sauce room. The lasagna order has survived six decades of menu changes for a reason.")}
${rankcard(3, "The Italian Homemade Company", "North Beach · ★ 4.5 (3,382 reviews) · $",
  "26 mentions · <b>88% loved</b>",
  "Counter-service trays, the budget option that still lands.")}
<p>Marcella's is the category's anchor: a Dogpatch shop whose entire identity is lasagna, with the highest-volume lasagna conversation in the city at 95% positive. Its bolognese scores 95% too, so the kitchen travels. Luisa's ties the score on a third of the sample.</p>

<h2>Carbonara</h2>
${rankcard(1, "Bella Trattoria", "Inner Richmond · ★ 4.6 (1,089 reviews) · $$",
  "50 mentions · <b>93% loved</b>")}
${rankcard(2, "Roma Antica", "Marina · ★ 4.5 (1,799 reviews) · $$",
  "50 mentions · <b>93% loved</b>")}
${rankcard(3, "Piccolo Forno", "Russian Hill · ★ 4.7 (2,373 reviews) · $$",
  "25 mentions · <b>88% loved</b>")}
<p>A dead tie at the top: 93% on identical 50-mention samples. Pick by neighborhood. Bella Trattoria's reviews emphasize the guanciale; Roma Antica's emphasize that it tastes like Rome, which its Roman owner would consider the point.</p>

<h2>Cacio e pepe</h2>
${rankcard(1, "Roma Antica", "Marina · ★ 4.5 (1,799 reviews) · $$",
  "100 mentions · <b>90% loved</b>")}
${rankcard(2, "54 Mint", "Mid-Market · ★ 4.4 (1,490 reviews) · $$",
  "45 mentions · <b>85% loved</b>")}
${rankcard(3, "Ideale", "North Beach · ★ 4.5 (513 reviews) · $$",
  "45 mentions · <b>80% loved</b>")}
<p>Notice the scores drop. Cacio e pepe is the hardest dish in this post to execute at restaurant pace, and the reviews show it: even the winner sits at 90%, and Ideale's 80% comes with the word "gluey" appearing more than once. If a menu offers it tableside in a cheese wheel, the data says order something else; theater and emulsion rarely coexist.</p>

<h2>Bolognese and ragu</h2>
<p>Marcella's again at 95% (20 mentions), Bella Trattoria at 88%, and one asterisk worth knowing: <strong>Cotogna's</strong> ragu scores 100% from just 8 mentions. Eight people is not a ranking, but when all eight rave about the same agnolotti at a Michelin-adjacent room, it is at least a strong lead.</p>
<a class="cta" href="/s/ita-lasagna">Open the pasta maps →</a>

<h2>Related</h2>
<p><a href="/blog/best-pizza-san-francisco">Pizza by style</a>, <a href="/s/ita-cioppino">cioppino</a> (San Francisco's own pasta-adjacent invention), and <a href="/s/ita-tiramisu">tiramisu</a> for after.</p>`,
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
<footer>SF Eats · ranked by Google review consensus · <a href="/">sfeats.vercel.app</a> · <a href="/blog/">blog</a> · <a href="https://sfgems.substack.com" rel="me">SF Gems newsletter</a></footer>
</div>
</body>
</html>
`;
}

for (const post of POSTS) {
  const canonical = `${SITE}/blog/${post.slug}`;
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const published = post.published || PUBLISHED;
  const schemas = [{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: published,
    dateModified: published,
    author: { "@type": "Person", name: "Selinay" },
    publisher: { "@type": "Organization", name: "SF Eats", url: SITE },
    mainEntityOfPage: canonical,
    image: `${SITE}${post.ogImage}`,
  }];
  if (post.spotList) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: post.title,
      itemListElement: post.spotList.map((name, i) => ({
        "@type": "ListItem", position: i + 1, name,
      })),
    });
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SF Eats", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  });
  const jsonLd = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  const bodyHtml = `
<a class="brand" href="/">SF EATS</a>
<div class="crumb"><a href="/blog/">Blog</a> · San Francisco</div>
<h1>${post.title}</h1>
<div class="byline">By ${AUTHOR} · ${published}</div>
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
<div class="byline">Data-driven answers to "where should I eat in San Francisco?" · Also: <a href="https://sfgems.substack.com">SF Gems</a>, my newsletter of favorite SF spots.</div>
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
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "The SF Eats Blog",
      url: `${SITE}/blog/`,
      description: "Data-driven guides to eating in San Francisco, built from thousands of Google reviews.",
      publisher: { "@type": "Organization", name: "SF Eats", url: SITE },
      blogPost: POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE}/blog/${p.slug}`,
        datePublished: p.published || PUBLISHED,
      })),
    }),
  })
);

console.log(`Wrote ${POSTS.length} posts + index to blog/`);
