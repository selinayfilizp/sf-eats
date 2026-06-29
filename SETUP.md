# SF Eats — going live with Google Places

This turns the prototype into a **live** app: a small script pulls real ratings,
review counts, locations, and a review quote for each dish straight from Google,
ranks the SF spots, and writes the data file the page loads. You run it about
**once a month**.

```
sf-eats/
├─ sf-food-map.html     ← open this in your browser (the app)
├─ generate-data.js     ← the script that calls Google Places
├─ dishes.js            ← the dish list + search queries (edit to add dishes)
├─ sf-food-data.js      ← AUTO-GENERATED live data (created when you run the script)
├─ .env.example         ← copy to .env and paste your key
├─ package.json
└─ SETUP.md             ← you are here
```

---

## Step 1 — Get a Google Places API key (~8 min, one time)

You already have Chrome open — go to **https://console.cloud.google.com** and sign in.

1. **Create a project.** Top bar → project dropdown → **New Project** → name it
   `sf-eats` → **Create**. Make sure it's selected afterward.
2. **Enable billing.** Left menu → **Billing** → link a billing account (a card is
   required even for free usage — Google won't charge you within the free tier, see
   "Cost" below). 
3. **Enable the API.** Search bar → type **"Places API (New)"** → open it → **Enable**.
   ⚠️ It must be **Places API (New)**, not the old "Places API".
4. **Make a key.** Left menu → **APIs & Services → Credentials** →
   **+ Create credentials → API key**. Copy the key it shows you.
5. **(Recommended) Lock it down.** Click the new key → under **API restrictions**
   choose **Restrict key** → check **Places API (New)** → **Save**. This stops the
   key being usable for anything else if it ever leaks.

---

## Step 2 — Add your key

1. In the `sf-eats` folder, copy `.env.example` to `.env`.
2. Open `.env` and paste your key:
   ```
   GOOGLE_PLACES_API_KEY=AIza...your-key...
   ```
   The key lives only in this local file. It is **never** written into
   `sf-food-data.js` or the web page, so it's safe to share the app output.

---

## Step 3 — Run it

You need **Node.js 18+** (check with `node -v`; if missing, get it from nodejs.org).
In a terminal, from inside the `sf-eats` folder:

```bash
node generate-data.js
```

You'll see each dish print as it's fetched, then:

```
✓ Wrote sf-food-data.js — 29 dishes, ~110 spots
```

Now open **sf-food-map.html** — the badge top-right should read
**"● Live · Google Places · updated <today>"**.

**No key yet / just want to see it work?**
```bash
node generate-data.js --dry-run
```
writes sample data so you can test the whole pipeline without calling Google.

Useful flags: `--no-reviews` (skip the review-quote calls, fewer API requests),
`--top 5` (keep 5 spots per dish instead of 4).

---

## Step 4 — Refresh monthly

Just re-run `node generate-data.js` once a month and reopen the page. That's it.
(If you'd like, I can set this up as an automatic monthly scheduled task so it
refreshes itself.)

---

## Cost — effectively free for this project

Google **retired the old universal $200/month credit in March 2025**. The free
tier is now a **per-SKU monthly allowance**: ~**10,000** free calls/month for
Essentials, **5,000** for Pro, **1,000** for Enterprise. ([pricing details](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing))

What this app uses **per monthly run**:

| Call | Count/run | SKU tier | Free allowance/mo |
|---|---|---|---|
| Text Search (1 per dish) | ~29 | Pro* | 5,000 |
| Place Details for review quote (1 per spot) | ~110 | Enterprise* | 1,000 |

\* The tier is set by which fields you request; ratings/review-counts push Text
Search to Pro, and pulling `reviews` puts Place Details in Enterprise. ([how field masks set the SKU](https://developers.google.com/maps/billing-and-pricing/pricing))

≈140 calls/month sits far under every free limit → **$0** in practice. Running
`--no-reviews` drops it to ~29 calls. To be safe you can set a low **budget alert**
in Cloud Console → Billing → Budgets & alerts.

---

## Adding cuisines or dishes

Open `dishes.js` and add an entry — `id`, `name`, `emoji`, a `query` (the text
Google searches, e.g. `"khachapuri San Francisco"`), and `keywords` (used to pick
a review quote that names the dish). Re-run the script. The app picks it up
automatically. Yelp as a second source can be bolted on later the same way.

---

## How ranking works

For each dish the script does a Text Search restricted to a San Francisco bounding
box, keeps operational, rated places, then sorts by a **Bayesian-weighted score**
that blends each place's star rating toward the citywide average using its review
count — so a 4.9 with 12 reviews can't leapfrog a 4.6 with 3,000. It keeps the top
few and attaches a real ≤150-char review quote that mentions the dish when one
exists. Tune the constants near the top of `generate-data.js`
(`PRIOR_MEAN`, `PRIOR_WEIGHT`, `MIN_REVIEWS`).
