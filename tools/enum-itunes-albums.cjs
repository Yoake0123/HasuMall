// 用 iTunes lookup(artistId, entity=album) 枚举蓮ノ空相关艺人的全部专辑
// node tools/enum-itunes-albums.cjs  → .tmpfetch/albums.json
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, ".tmpfetch");

const get = async url => (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).json();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 种子专辑：从已抓的 48 张 + 探测发现的新专辑里收集 artistId
const SEED_COLLECTIONS = [1765319251, 1862693194, 1890364666, 6775688809, 1811960062, 1895905444];

(async () => {
  const artistIds = new Map(); // id -> name
  for (const cid of SEED_COLLECTIONS) {
    const j = await get("https://itunes.apple.com/lookup?id=" + cid + "&country=jp&entity=album&limit=5");
    for (const r of j.results || []) {
      if (r.artistId) artistIds.set(r.artistId, r.artistName);
      // 合发专辑常有多个 artist（primary/featured）
      (r.artistIds || []).forEach((id, i) => artistIds.set(id, (r.artistNames || [])[i] || ""));
    }
    await sleep(300);
  }
  // 补种子：小队/成员艺人名直接搜索（album 搜索命中的 artistId）
  for (const t of ["DOLLCHESTRA", "Edel Note", "スリーズブーケ 蓮ノ空", "みらくらぱーく 蓮ノ空", "乙宗梢", "夕霧綴理", "藤島慈", "安養寺姫芽", "セラス", "桂城泉", "百生吟子", "徒町小鈴", "大賀美沙知", "日野下花帆", "大沢瑠璃乃", "村野さやか", "Ruri&To", "蓮ノ休日", "かほめぐ"]) {
    try {
      const j = await get("https://itunes.apple.com/search?country=jp&entity=album&limit=10&term=" + encodeURIComponent(t));
      for (const r of j.results || []) if (r.artistId && /蓮ノ空|スリーズ|DOLLCHESTRA|みらくら|Edel|日野下|乙宗|村野|夕霧|藤島|安養寺|大沢|百生|徒町|セラス|桂城|大賀美|Ruri|蓮ノ休日|かほめぐ|るりのと/.test(r.artistName || "")) artistIds.set(r.artistId, r.artistName);
    } catch (e) {}
    await sleep(300);
  }
  console.log("artistIds:", artistIds.size, [...artistIds.values()].join(" / "));

  const albums = new Map(); // collectionId -> info
  for (const [aid, aname] of artistIds) {
    try {
      const j = await get("https://itunes.apple.com/lookup?id=" + aid + "&country=jp&entity=album&limit=200");
      for (const r of j.results || []) {
        if (r.wrapperType !== "collection") continue;
        if (!/蓮ノ空|スリーズ|DOLLCHESTRA|みらくら|Edel Note|日野下|乙宗|村野|夕霧|藤島|安養寺|大沢|百生|徒町|セラス|桂城|大賀美|Ruri&To|PRINCE|蓮ノ休日|かほめぐ|るりのと/.test(r.artistName || "")) continue;
        if (!albums.has(r.collectionId)) albums.set(r.collectionId, {
          collectionId: r.collectionId, name: r.collectionName, artist: r.artistName,
          date: (r.releaseDate || "").slice(0, 10), tracks: r.trackCount,
          art: (r.artworkUrl100 || "").replace(/\/\d+x\d+bb\./, "/600x600bb."),
        });
      }
    } catch (e) { console.log("lookup fail", aid, e.message); }
    await sleep(300);
  }
  const list = [...albums.values()].sort((a, b) => a.date < b.date ? -1 : 1);
  fs.writeFileSync(path.join(OUT, "albums.json"), JSON.stringify(list, null, 1));
  console.log("albums:", list.length);
  list.forEach(a => console.log(a.date, a.collectionId, a.name, "|", a.artist, "|", a.tracks, "tracks"));
})();
