// 第一步：为 music-data.js 里的 48 张发行在 iTunes JP 找专辑并拉完整曲目表
// node tools/fetch-itunes-tracks.cjs   （输出 .tmpfetch/itunes/<catNo>.json）
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, ".tmpfetch", "itunes");
fs.mkdirSync(OUT, { recursive: true });

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/music-data.js"), "utf8"), ctx);
const DATA = ctx.window.MUSIC_DATA;

const get = async url => {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return r.json();
};
const sleep = ms => new Promise(r => setTimeout(r, ms));

function matchScore(rel, r) {
  let s = 0;
  const artist = r.artistName || "";
  if (/蓮ノ空|スリーズブーケ|DOLLCHESTRA|みらくらぱーく|Edel Note|Ruri&To|PRINCE|るりのとゆかいな|かほめぐ|蓮ノ休日/.test(artist)) s += 50;
  else if (/日野下|乙宗|村野|夕霧|藤島|安養寺|大沢|百生|徒町|セラス|桂城|大賀美/.test(artist)) s += 40;
  const rd = (r.releaseDate || "").slice(0, 10);
  if (rd === rel.date) s += 40;
  else if (Math.abs(new Date(rd) - new Date(rel.date)) < 3 * 864e5) s += 20;
  const norm = s => s.replace(/！/g, "!").replace(/？/g, "?").replace(/〜/g, "~");
  const name = norm(r.collectionName || "");
  // 表题出现在专辑名里（合发单曲取第一首）
  const lead = norm(rel.titleJa.split(" / ")[0]);
  if (name.includes(lead)) s += 30;
  else if (name.includes(lead.slice(0, 6))) s += 15;
  return s;
}

(async () => {
  const report = [];
  for (const rel of DATA) {
    const key = rel.catNo.split("/")[0];
    const dest = path.join(OUT, key + ".json");
    if (fs.existsSync(dest)) { report.push(key + " cached"); continue; }
    const lead = rel.titleJa.split(" / ")[0];
    const term = lead.length > 30 ? lead.slice(0, 30) : lead;
    // 小队单曲用小队名做搜索后缀；团体曲用 蓮ノ空
    const suffix = rel.teams[0] === "蓮ノ空女学院スクールアイドルクラブ" ? "蓮ノ空" : rel.teams[0];
    let j;
    try {
      j = await get("https://itunes.apple.com/search?country=jp&entity=album&limit=15&term=" + encodeURIComponent(term + " " + suffix));
      if (!j.resultCount) j = await get("https://itunes.apple.com/search?country=jp&entity=album&limit=15&term=" + encodeURIComponent(term));
    } catch (e) { report.push(key + " SEARCH-ERR " + e.message); continue; }
    let best = null, bestS = 0;
    for (const r of j.results || []) {
      const s = matchScore(rel, r);
      if (s > bestS) { bestS = s; best = r; }
    }
    if (!best || bestS < 80) {
      report.push(key + " NO-MATCH(best " + bestS + ") " + rel.titleJa + " :: " + j.results.map(r => r.collectionName + "|" + r.artistName + "|" + (r.releaseDate || "").slice(0, 10)).join(" ; "));
      await sleep(400);
      continue;
    }
    const lk = await get("https://itunes.apple.com/lookup?id=" + best.collectionId + "&country=jp&entity=song&limit=300");
    const songs = (lk.results || []).filter(r => r.wrapperType === "track").sort((a, b) => a.discNumber - b.discNumber || a.trackNumber - b.trackNumber);
    fs.writeFileSync(dest, JSON.stringify({
      catNo: rel.catNo, titleJa: rel.titleJa, date: rel.date,
      collectionId: best.collectionId, collectionName: best.collectionName,
      artistName: best.artistName, releaseDate: best.releaseDate,
      artworkUrl: (best.artworkUrl100 || "").replace(/\/\d+x\d+bb\./, "/600x600bb."),
      tracks: songs.map(s => ({ disc: s.discNumber, no: s.trackNumber, t: s.trackName, by: s.artistName, ms: s.trackTimeMillis })),
    }, null, 1));
    report.push(key + " ok " + songs.length + " tracks :: " + best.collectionName + " | " + best.artistName);
    await sleep(400);
  }
  fs.writeFileSync(path.join(OUT, "_report.txt"), report.join("\n"));
  console.log(report.join("\n"));
})();
