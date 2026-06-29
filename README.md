# SF Eats

**What to eat & where in San Francisco.** Pick a cuisine, pick a dish, see the best spots for *that dish* — ranked, mapped, and scored.

Every spot is scored on two signals:

- **Hype** — how many Google reviews mention the dish by name
- **Love** — what percentage of those reviews are positive (4-5 stars or positive sentiment)

When a spot has high hype but low love, it gets flagged as a **hype trap** so you don't waste a meal.

## How it works

A static HTML front-end (Leaflet map + panels) loads pre-generated data from `sf-food-data.js`. The data is built by a Node CLI that queries Google Places API for each dish, pulls full review lists via SerpAPI, and computes hype/love scores using keyword matching + sentiment analysis. No framework, no build step.

Community recommendations are stored in a [Convex](https://convex.dev) backend — anyone viewing the app can submit their pick for the best spot for any dish, and it shows up for everyone immediately.

## Cuisines

Currently covers **Mexican**, **Italian**, and **Turkish** dishes:

| Mexican | Italian | Turkish |
|---------|---------|---------|
| Mission Burrito | Margherita Pizza | Manti |
| Carne Asada | Focaccia | Lahmacun |
| Quesabirria | Cacio e Pepe | Pide |
| Al Pastor | Bolognese | Turkish Breakfast |
| Carnitas | Squid Ink Pasta | Borek |
| Ceviche & Aguachile | Gnocchi | Adana Kebab |
| Tamales | Lasagna | Doner Kebab |
| Mole & Enchiladas | Ravioli | Lamb Chops |
| Horchata | Burrata | Red Lentil Soup |
| | Cioppino | Baklava |

Adding a cuisine is as simple as editing `dishes.js`.

## Quick start

```bash
# 1. Clone and set up keys
git clone https://github.com/selinayfilizp/sf-eats.git
cd sf-eats
cp .env.example .env
# Edit .env — add your GOOGLE_PLACES_API_KEY (required) and SERPAPI_KEY (optional)

# 2. Try it offline first (no keys needed)
node generate-data.js --dry-run
open sf-food-map.html

# 3. Generate live data
npm install           # installs convex (only dependency)
node generate-data.js
open sf-food-map.html
```

Requires **Node 18+** (uses global `fetch`).

## API keys you need

| Key | Required | Free tier | What it does |
|-----|----------|-----------|-------------|
| `GOOGLE_PLACES_API_KEY` | Yes | $200/mo credit | Finds restaurants, ratings, locations |
| `SERPAPI_KEY` | No | 100 searches/mo | Pulls full review lists for hype/love scoring |

Without a SerpAPI key, spots still show up with ratings and locations — they just won't have hype/love scores (shown as "not yet rated").

## Community recs

The app includes a **Community Picks** section below the ranked spots for each dish. Anyone can submit their recommendation for where to get a dish, with a note about why it's the best. Submissions are stored in Convex and shared across all users in real time.

## Project structure

```
sf-food-map.html      # The entire front-end (single file)
generate-data.js      # CLI data generator (Google Places + reviews)
dishes.js             # Cuisine/dish catalog — edit to add dishes
reviews-provider.js   # SerpAPI/Outscraper review fetching + scoring
sentiment.js          # Lightweight dish-sentence sentiment analysis
verified-dishes.js    # Manual override layer for hype/love scores
test-reviews.js       # Quick single-place sanity check
convex/               # Convex backend for community recommendations
  schema.ts           #   Database schema (recs table)
  recs.ts             #   Query + mutation functions
```

## Contributing

Want to add a cuisine or improve the scoring? PRs welcome. The main things to know:

- `sf-food-data.js` is generated — don't edit it by hand
- Never commit `.env` or API keys
- Keep it dependency-free and single-file-per-concern

## License

MIT
