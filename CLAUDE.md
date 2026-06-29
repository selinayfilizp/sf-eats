# SF Eats — project context for Claude Code

A dish-first way to find where to eat in SF. Pick a cuisine → a dish → see the best
spots for *that dish*, ranked, mapped, and scored on two signals: **hype** (how
talked-about a dish is) and **love** (how positively reviewers speak of it).

Plain Node + a static HTML front-end. No framework, no build step, no dependencies.

## Run it

```bash
cp .env.example .env          # then paste your keys in .env
node generate-data.js --dry-run   # offline: writes fake sample data, no keys needed
node generate-data.js             # live: needs GOOGLE_PLACES_API_KEY (+ reviews key)
open index.html             # static front-end; loads sf-food-data.js
```

Requires Node 18+ (uses global `fetch`). There is no package to install.

## Files

- `index.html` — the whole front-end (Leaflet map + dish panel + ranked spots).
  Loads `sf-food-data.js` via a `<script>` tag, so it works from `file://` (no server).
- `generate-data.js` — CLI generator. Queries Google Places (New) per dish, ranks SF
  spots (Bayesian-weighted in `score()`), pulls a review quote, computes hype/love, and
  writes `sf-food-data.js`. Flags: `--dry-run`, `--no-reviews`, `--top N`.
- `dishes.js` — the catalog: cuisines → dishes → `{ id, name, emoji, query, keywords }`.
  Edit this to add/remove dishes. `query` drives the Places search; `keywords` drive
  review matching.
- `reviews-provider.js` — pulls the FULL review list per place (SerpAPI or Outscraper)
  and computes mentions + approval over every dish-mentioning review. `dishStats()` is the
  entry point. Returns `approvalStars`/`approvalText`/`approvalHybrid` for transparency.
- `sentiment.js` — lightweight dish-sentence sentiment (lexicon + negation). No model/API.
- `verified-dishes.js` — manual override layer for hype/love, keyed by dish id + place
  name. A manual entry wins over the automatic API number.
- `test-reviews.js` — cheap single-place sanity check before a full run:
  `node test-reviews.js <place_id> "carne asada" burrito`
- `sf-food-data.js` — GENERATED output. Do not hand-edit; re-run the generator.
- `SETUP.md` — key setup walkthrough. `MENTIONS-METHOD.md` — how hype/love is sourced.

## Data shape (one spot)

```js
{ name, neighborhood, rating, reviews, price, why, address, lat, lng, mapsUri,
  dishMentions, dishApproval, dishSample, dishChip, dishSource, dishVerified }
```

`dishApproval == null` → the card shows "not yet rated". The front-end flags a "hype
trap" when `dishMentions >= 60 && dishApproval < 70`.

## Config (.env)

`GOOGLE_PLACES_API_KEY` (required) · `REVIEWS_PROVIDER` (serpapi|outscraper|none) ·
`SERPAPI_KEY` / `OUTSCRAPER_KEY` · `REVIEWS_MAX` (cost cap) · `APPROVAL_MIN_STARS` ·
`APPROVAL_MODE` (hybrid|text|stars). See `.env.example`.

## Conventions

- Keep it dependency-free and single-file-per-concern. Prefer plain Node + `fetch`.
- `sf-food-data.js` is build output — never edit by hand; change `generate-data.js` or
  `dishes.js` and regenerate.
- Never commit `.env` or real keys (see `.gitignore`).

## Open next steps

- Add a `SERPAPI_KEY`, validate with `test-reviews.js`, then run the full generator so
  every spot gets approval scored over all reviews (currently spots are "not yet rated"
  until a live run, except manual entries in `verified-dishes.js`).
- Optional: a "via sentiment · N reviews" source tag on each spot card (front-end).
- Optional: expand `dishes.js` beyond Mexican/Italian/Turkish.
