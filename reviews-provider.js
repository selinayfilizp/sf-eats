/* =========================================================================
   REVIEWS PROVIDER — "read ALL the reviews" for the hype-vs-love metrics.

   Google's official Places API only returns up to 5 reviews per place, which
   isn't enough to score a dish honestly. This module pulls the FULL review
   list from a reviews data provider, filters to the reviews that mention the
   dish, and computes:

       mentions = # of reviews that name the dish
       approval = % of those reviews rated 4★ or 5★   (read over ALL of them)
       sample   = mentions (i.e. we actually read every one — no sampling)

   It is provider-agnostic. Ships with a working SerpAPI implementation
   (engine=google_maps_reviews); add others by implementing fetchAllReviews().

   CONFIG (env vars, e.g. in .env):
       REVIEWS_PROVIDER = serpapi          # default; or "none" to disable
       SERPAPI_KEY      = <your key>       # required for serpapi
       REVIEWS_MAX      = 400              # safety cap on reviews fetched/place
       APPROVAL_MIN_STARS = 4             # a review "approves" at >= this rating

   COST NOTE: providers charge per request (often a fraction of a cent). The
   REVIEWS_MAX cap bounds pages fetched per place so a full run stays cheap.
   ========================================================================= */

const { sentiment } = require("./sentiment.js");

const PROVIDER  = (process.env.REVIEWS_PROVIDER || "serpapi").toLowerCase();
const MAX       = parseInt(process.env.REVIEWS_MAX || "400", 10);
const MIN_STARS = parseInt(process.env.APPROVAL_MIN_STARS || "4", 10);
// How "approval" is decided per review:
//   "stars"  — rating >= APPROVAL_MIN_STARS (objective, ignores dish text)
//   "text"   — dish-sentence sentiment positive (reflects the DISH, not place)
//   "hybrid" — text sentiment when clear, else falls back to the star rating
const MODE = (process.env.APPROVAL_MODE || "hybrid").toLowerCase();

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Is this provider configured and usable?
function reviewsEnabled() {
  if (PROVIDER === "none") return false;
  if (PROVIDER === "serpapi") return !!process.env.SERPAPI_KEY;
  if (PROVIDER === "outscraper") return !!process.env.OUTSCRAPER_KEY;
  return false;
}

/* ---- SerpAPI: page through every review for a place ---------------------- */
async function fetchAllReviews_serpapi(place) {
  const key = process.env.SERPAPI_KEY;
  // SerpAPI's reviews engine accepts a Google place_id (ChIJ…) or a data_id.
  const idParam = place.dataId ? `data_id=${encodeURIComponent(place.dataId)}`
                               : `place_id=${encodeURIComponent(place.placeId)}`;
  const all = [];
  let pageToken = null, pages = 0;
  while (all.length < MAX && pages < 60) {
    const url = "https://serpapi.com/search.json?engine=google_maps_reviews"
      + `&${idParam}&sort_by=newest&api_key=${key}`
      + (pageToken ? `&num=20&next_page_token=${encodeURIComponent(pageToken)}` : "");
    let res, retries = 0;
    while (true) {
      res = await fetch(url);
      if (res.status === 429 && retries < 6) {
        const wait = 60;
        console.log(`    ⏳ rate-limited, waiting ${wait}s… (retry ${retries + 1})`);
        await sleep(wait * 1000);
        retries++;
        continue;
      }
      break;
    }
    if (!res.ok) throw new Error(`serpapi ${res.status}: ${(await res.text()).slice(0,120)}`);
    const j = await res.json();
    if (j.error) throw new Error(`serpapi: ${j.error}`);
    for (const r of (j.reviews || [])) {
      all.push({ rating: Number(r.rating) || 0, text: r.snippet || r.extracted_snippet?.original || "" });
    }
    pageToken = j.serpapi_pagination?.next_page_token || null;
    pages++;
    if (!pageToken) break;
    await sleep(2000);
  }
  return all;
}

/* ---- Outscraper: one call returns up to `reviewsLimit` reviews ------------ */
async function fetchAllReviews_outscraper(place) {
  const key = process.env.OUTSCRAPER_KEY;
  const q = place.dataId || place.placeId; // accepts place_id, name, or data_id
  const url = "https://api.outscraper.com/maps/reviews-v3"
    + `?query=${encodeURIComponent(q)}`
    + `&reviewsLimit=${MAX}&sort=newest&language=en&async=false`;
  const res = await fetch(url, { headers: { "X-API-KEY": key } });
  if (!res.ok) throw new Error(`outscraper ${res.status}: ${(await res.text()).slice(0,120)}`);
  const j = await res.json();
  // reviews-v3 shape: { data: [ { reviews_data: [ {review_rating, review_text}, ... ] } ] }
  const block = Array.isArray(j.data) ? (j.data[0] || {}) : (j.data || {});
  const list = block.reviews_data || block.reviews || [];
  return list.map(r => ({
    rating: Number(r.review_rating ?? r.rating) || 0,
    text:   r.review_text ?? r.text ?? ""
  }));
}

async function fetchAllReviews(place) {
  if (PROVIDER === "serpapi")    return fetchAllReviews_serpapi(place);
  if (PROVIDER === "outscraper") return fetchAllReviews_outscraper(place);
  throw new Error(`Unknown REVIEWS_PROVIDER "${PROVIDER}"`);
}

/* ---- the public call: full-review hype + love for one dish at one place --- */
async function dishStats(place, keywords) {
  const kws = (keywords || []).map(k => k.toLowerCase()).filter(Boolean);
  if (!kws.length) return null;
  const reviews = await fetchAllReviews(place);
  if (!reviews.length) return null;

  const matches = reviews.filter(r => {
    const t = r.text.toLowerCase();
    return kws.some(k => t.includes(k));
  });
  if (!matches.length) {
    return { mentions: 0, approval: null, sample: 0, totalRead: reviews.length, source: PROVIDER, mode: MODE };
  }

  // Score each mentioning review three ways for transparency.
  let starsPos = 0, textPos = 0, hybridPos = 0;
  for (const r of matches) {
    const byStar = r.rating >= MIN_STARS;
    const s = sentiment(r.text, kws);             // dish-sentence sentiment
    const byText = s.label === "pos" ? true : s.label === "neg" ? false : byStar;
    const byHybrid = s.label === "neu" ? byStar : (s.label === "pos");
    if (byStar)   starsPos++;
    if (byText)   textPos++;
    if (byHybrid) hybridPos++;
  }
  const n = matches.length;
  const pct = x => Math.round((x / n) * 100);
  const approvalStars = pct(starsPos);
  const approvalText  = pct(textPos);
  const approvalHybrid = pct(hybridPos);
  const approval = MODE === "stars" ? approvalStars
                 : MODE === "text"  ? approvalText
                 : approvalHybrid;
  return {
    mentions: n,
    approval,                          // chosen by APPROVAL_MODE
    approvalStars, approvalText, approvalHybrid,
    sample:   n,                       // we read every mentioning review
    totalRead: reviews.length,         // total reviews scanned for context
    source:   PROVIDER,
    mode:     MODE
  };
}

module.exports = { reviewsEnabled, dishStats, fetchAllReviews };
