// 对未归属 mp3 逐首做 iTunes song 搜索，找它们的数字发行专辑
// node tools/find-songs.cjs  → .tmpfetch/song-hits.json
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const norm = s => s
  .replace(/[（]/g, "(").replace(/[）]/g, ")").replace(/[！]/g, "!").replace(/[？]/g, "?")
  .replace(/[〜～]/g, "~").replace(/[．]/g, ".").replace(/[，]/g, ",")
  .replace(/[　\s]+/g, "").replace(/[♡♥☆★♪・]/g, "");

const get = async url => (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).json();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const HASU = /蓮ノ空|スリーズ|DOLLCHESTRA|みらくら|Edel|日野下|乙宗|村野|夕霧|藤島|安養寺|大沢|百生|徒町|セラス|桂城|大賀美|Ruri&To|PRINCE|蓮ノ休日|かほめぐ|るりのと/;

(async () => {
  const targets = fs.readFileSync(path.join(ROOT, ".tmpfetch", "unmatched2.txt"), "utf8").split("\n").filter(Boolean);
  const hits = {};
  if (fs.existsSync(path.join(ROOT, ".tmpfetch", "song-hits.json"))) Object.assign(hits, JSON.parse(fs.readFileSync(path.join(ROOT, ".tmpfetch", "song-hits.json"), "utf8")));
  let n = 0;
  for (const t of targets) {
    if (hits[t] !== undefined) { n++; continue; }
    // 去掉后缀做搜索词，提高命中
    let term = t.replace(/covered by.*$/, "").replace(/\(.*$/, "").replace(/（.*$/, "").replace(/\s*Game Ver.*$/, "").trim();
    if (!term) term = t;
    try {
      const j = await get("https://itunes.apple.com/search?country=jp&entity=song&limit=25&term=" + encodeURIComponent(term + " 蓮ノ空"));
      let pick = null;
      for (const r of j.results || []) {
        if (!HASU.test(r.artistName || "")) continue;
        const rn = norm(r.trackName), tn = norm(t);
        if (rn === tn || tn.includes(rn) || (r.trackName && norm(t.replace(/covered by.*/, "").trim()).includes(norm(r.trackName)))) { pick = r; break; }
        if (!pick) pick = r;
      }
      hits[t] = pick ? { track: pick.trackName, artist: pick.artistName, coll: pick.collectionName, collId: pick.collectionId, date: (pick.releaseDate || "").slice(0, 10) } : null;
    } catch (e) { hits[t] = undefined; console.log("ERR", t, e.message); }
    n++;
    if (n % 25 === 0) { console.log(n + "/" + targets.length); fs.writeFileSync(path.join(ROOT, ".tmpfetch", "song-hits.json"), JSON.stringify(hits, null, 1)); }
    await sleep(350);
  }
  fs.writeFileSync(path.join(ROOT, ".tmpfetch", "song-hits.json"), JSON.stringify(hits, null, 1));
  const found = Object.entries(hits).filter(([, v]) => v);
  console.log("done. found:", found.length, "/", targets.length);
  const byColl = {};
  for (const [k, v] of found) (byColl[v.coll + " | " + v.collId] = byColl[v.coll + " | " + v.collId] || []).push(k + "  →  " + v.track + " [" + v.artist + "]");
  for (const [c, list] of Object.entries(byColl)) { console.log("==", c, "(" + list.length + ")"); list.forEach(x => console.log("   ", x)); }
})();
