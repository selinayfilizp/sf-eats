/* =========================================================================
   DISH SENTIMENT — does this review actually praise the DISH (not just the place)?

   A review can give a restaurant 3★ for the wait yet call the dish "the
   highlight." Scoring the overall star misses that. This module reads the
   sentence(s) in a review that mention the dish and judges sentiment on those,
   with simple negation handling ("not great", "wasn't worth it").

   It's a lightweight lexicon — no model, no API, no dependency — good enough to
   separate clearly-positive from clearly-negative dish talk. Neutral/ambiguous
   reviews fall back to the star rating in reviews-provider.js.

   sentiment(text, keywords) -> { label: "pos"|"neg"|"neu", score, sentences }
   ========================================================================= */

const POS = new Set([
  "delicious","amazing","best","perfect","perfection","incredible","favorite",
  "love","loved","loves","excellent","fantastic","crispy","juicy","flavorful",
  "worth","highlight","outstanding","heavenly","divine","great","tasty","yummy",
  "phenomenal","superb","stellar","solid","recommend","recommended","must",
  "must-order","must-try","bomb","fire","banging","craveable","addictive",
  "moist","tender","fresh","authentic","generous","wonderful","delight",
  "delightful","mouthwatering","scrumptious","legendary","iconic","unbeatable",
  "exceptional","impressive","nailed","perfectly","beautifully","gorgeous","special"
]);
const NEG = new Set([
  "bland","dry","overrated","overhyped","disappointing","disappointed","mediocre",
  "soggy","cold","tough","greasy","overpriced","meh","underwhelming","underwhelmed",
  "worst","bad","awful","terrible","lacking","flavorless","mushy","burnt","burned",
  "rubbery","stale","chewy","oily","watery","tasteless","forgettable","skip","avoid",
  "mushy","gross","nasty","inedible","sad","sloppy","subpar","lackluster",
  "unremarkable","pricey","expensive","small","tiny","skimpy","dry","cold"
]);
// "just okay" style faint praise → mild negative
const FAINT = ["okay","ok","fine","decent","average","nothing special"];
const NEGATORS = new Set(["not","no","never","without","wasn't","wasnt","isn't","isnt",
  "aren't","arent","didn't","didnt","don't","dont","hardly","barely","lacks","lacked","nothing"]);
const INTENS = new Set(["very","really","so","absolutely","incredibly","truly","super","quite","seriously"]);

function splitSentences(t) {
  return t.replace(/\s+/g, " ").split(/(?<=[.!?])\s+|\n+|;\s+/).filter(Boolean);
}

function scoreTokens(tokens) {
  let score = 0;
  for (let i = 0; i < tokens.length; i++) {
    const w = tokens[i];
    let val = 0;
    if (POS.has(w)) val = 1;
    else if (NEG.has(w)) val = -1;
    else if (FAINT.includes(w)) val = -0.5;
    if (val === 0) continue;
    // intensifier just before
    if (i > 0 && INTENS.has(tokens[i - 1])) val *= 1.5;
    // negation within 3 tokens before flips sign
    for (let j = Math.max(0, i - 3); j < i; j++) {
      if (NEGATORS.has(tokens[j])) { val = -val; break; }
    }
    score += val;
  }
  return score;
}

function sentiment(text, keywords) {
  const t = (text || "").toLowerCase();
  const kws = (keywords || []).map(k => k.toLowerCase()).filter(Boolean);
  if (!t || !kws.length) return { label: "neu", score: 0, sentences: [] };

  // sentences that mention the dish; if none, use the whole review
  let sents = splitSentences(t).filter(s => kws.some(k => s.includes(k)));
  if (!sents.length) sents = splitSentences(t);

  let score = 0;
  for (const s of sents) score += scoreTokens(s.split(/[^a-z'-]+/).filter(Boolean));

  const label = score > 0.5 ? "pos" : score < -0.5 ? "neg" : "neu";
  return { label, score: Math.round(score * 100) / 100, sentences: sents };
}

module.exports = { sentiment };
