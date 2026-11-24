// 拉取全部相关专辑的完整曲目表 + 从 artwork 文件名解析条码→品番
// node tools/fetch-all-tracks.cjs → .tmpfetch/itunes2/<collectionId>.json
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, ".tmpfetch", "itunes2");
fs.mkdirSync(OUT, { recursive: true });

const get = async url => (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).json();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const HASU = /蓮ノ空|スリーズ|DOLLCHESTRA|みらくら|Edel Note|Edel Weiss|日野下|乙宗|村野|夕霧|藤島|安養寺|大沢|百生|徒町|セラス|桂城|大賀美|Ruri&To|PRINCE|蓮ノ休日|かほめぐ|るりのと|藤澤慶昌/;

// 条码(4540774+5位品番+校验位) → LACM/LACA-xxxxx；专辑类前缀由 25/24 开头无法区分，交给调用方
function catNoFromArt(art) {
  const m = /\/(4540774\d{6})\./.exec(art || "");
  return m ? m[1].slice(7, 12) : "";
}

(async () => {
  const albums = JSON.parse(fs.readFileSync(path.join(ROOT, ".tmpfetch", "albums.json"), "utf8"));
  // 追加搜索：独唱专辑系列全量 + 剧场版 + 可能的电视动画
  const extraTerms = ["Star Sign Memories", "Full Bloom Memories", "Petals of History", "Bloom Garden Party", "ソレイユスマイル", "映画 ラブライブ 蓮ノ空"];
  for (const t of extraTerms) {
    try {
      const j = await get("https://itunes.apple.com/search?country=jp&entity=album&limit=40&term=" + encodeURIComponent(t));
      for (const r of j.results || []) {
        if (!HASU.test(r.artistName || "") && !HASU.test(r.collectionName || "")) continue;
        if (!albums.some(a => a.collectionId === r.collectionId)) albums.push({
          collectionId: r.collectionId, name: r.collectionName, artist: r.artistName,
          date: (r.releaseDate || "").slice(0, 10), tracks: r.trackCount,
          art: (r.artworkUrl100 || "").replace(/\/\d+x\d+bb\./, "/600x600bb."),
        });
      }
    } catch (e) { console.log("search fail", t, e.message); }
    await sleep(400);
  }
  console.log("albums total:", albums.length);

  let done = 0;
  for (const a of albums) {
    const dest = path.join(OUT, a.collectionId + ".json");
    if (fs.existsSync(dest)) { done++; continue; }
    try {
      const lk = await get("https://itunes.apple.com/lookup?id=" + a.collectionId + "&country=jp&entity=song&limit=300");
      const coll = (lk.results || []).find(r => r.wrapperType === "collection");
      const songs = (lk.results || []).filter(r => r.wrapperType === "track")
        .sort((x, y) => x.discNumber - y.discNumber || x.trackNumber - y.trackNumber);
      const art = (coll && coll.artworkUrl100 || a.art || "").replace(/\/\d+x\d+bb\./, "/600x600bb.");
      fs.writeFileSync(dest, JSON.stringify({
        collectionId: a.collectionId, name: coll ? coll.collectionName : a.name,
        artist: coll ? coll.artistName : a.artist, date: a.date,
        catDigits: catNoFromArt(art), art,
        tracks: songs.map(s => ({ disc: s.discNumber, no: s.trackNumber, t: s.trackName, by: s.artistName, ms: s.trackTimeMillis })),
      }, null, 1));
      done++;
      console.log(done + "/" + albums.length, a.date, a.name, "|", songs.length, "songs | cat?", catNoFromArt(art));
    } catch (e) { console.log("FAIL", a.collectionId, a.name, e.message); }
    await sleep(350);
  }
})();
