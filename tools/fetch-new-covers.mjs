// 下载新分类发行封面（iTunes 600x600 图）→ images/music/<品番或id>.jpg
// 运行：node tools/fetch-new-covers.mjs
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "images/music");

// [目标文件名, itunes2 缓存 collectionId]
const JOBS = [
  ["LACM-24836", 6812995082],   // ソレイユスマイル
  ["LACM-24717", 1895905444],   // 剧场版插入曲单
  ["LACA-25282", 6781922141],   // 剧场版 OST
  ["berry-merry-goround", 1890364666], // 前売券特典曲
  ["LACA-19123", 1811958191],   // SSM 乙宗梢
  ["LACA-19125", 1811958648],   // SSM 夕霧綴理
  ["LACA-19127", 1811960062],   // SSM 藤島慈
  ["LACA-19176", 6775688809],   // FBM 日野下花帆
  ["LACA-19178", 6775689609],   // FBM 村野さやか
  ["LACA-19180", 6775688961],   // FBM 大沢瑠璃乃
  ["LZC-3130", 1808844404],     // 104th Collection
  ["LACM-24470", 1710539357],   // 異次元★♥BIGBANG
  ["LACM-24630", 1764266421],   // Bring the LOVE!
  ["LZC-3507", 1894215796],     // NEXT CARD
];

let fail = 0;
for (const [name, cid] of JOBS) {
  const dest = path.join(OUT, name + ".jpg");
  if (fs.existsSync(dest)) { console.log("跳过（已存在）", name); continue; }
  const cache = path.join(ROOT, ".tmpfetch/itunes2", cid + ".json");
  const art = JSON.parse(fs.readFileSync(cache, "utf8")).art;
  try {
    const res = await fetch(art, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log("OK", name, fs.statSync(dest).size, "bytes");
  } catch (e) {
    fail++;
    console.error("FAIL", name, e.message);
  }
}
process.exit(fail ? 1 : 0);
