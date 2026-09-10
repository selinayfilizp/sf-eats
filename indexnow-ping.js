/* =========================================================================
   INDEXNOW PING — submits every sitemap URL to the IndexNow API, which
   feeds Bing (and Seznam/Naver/Yandex). Bing's index is a major substrate
   for ChatGPT search, so this is the fastest path to AI-search visibility.
   No Bing account required; the key file at /<key>.txt proves ownership.

   Run AFTER the site (with the key file) is deployed:
       npm run indexnow
   Re-run after any content change; duplicate submissions are harmless.
   ========================================================================= */
const fs = require("fs");
const path = require("path");

require("fs").readFileSync(path.join(__dirname, ".env"), "utf8").split("\n")
  .forEach((l) => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; });

const KEY = process.env.INDEXNOW_KEY;
const HOST = "sfeats.vercel.app";

(async () => {
  if (!KEY) { console.error("Missing INDEXNOW_KEY in .env"); process.exit(1); }
  const sitemap = fs.readFileSync(path.join(__dirname, "sitemap.xml"), "utf8");
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urlList.length) { console.error("No URLs found in sitemap.xml"); process.exit(1); }

  // sanity check: the key file must be live before search engines will accept the batch
  const keyUrl = `https://${HOST}/${KEY}.txt`;
  const live = await fetch(keyUrl).then((r) => (r.ok ? r.text() : null)).catch(() => null);
  if (live?.trim() !== KEY) {
    console.error(`Key file not live yet at ${keyUrl} — deploy first, then re-run.`);
    process.exit(1);
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList }),
  });
  console.log(`Submitted ${urlList.length} URLs to IndexNow: HTTP ${res.status}${res.status === 200 || res.status === 202 ? " (accepted)" : ""}`);
  if (!(res.status === 200 || res.status === 202)) console.log(await res.text());
})();
