// 生成 js/music-files.js：曲目 → music_source/ 下 mp3 文件名映射（按曲目索引对齐，缺失为 null）
// 匹配规则：NFKC 归一化 + 去空白/去符号后精确匹配；翻唱曲追加 "covered by <演唱者>" 候选；
// 再退化为「归一化文件名以 曲名+coveredby 开头」的前缀匹配（处理（12 fan club）、103期生 等变体）。
// 运行：node tools/build-music-files.mjs
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "music_source");
const PREFIX = ""; // 2026-11-23 起文件名已去掉 "ZGCrsNii - " 前缀

const win = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/music-data.js"), "utf8"), { window: win });
const DATA = win.MUSIC_DATA;

const STRIP = /[\s\u3000♡★☆♥♪・·!！?？~〜～\-—－.。,、()（）[\]「」『』/／:：;；'’"”*+＋=＝<>%％#＃&＆_｜|@]/g;
// 变体选择符/零宽连接符/代理对（emoji，如 威🌪️堂々 文件名）一并去除
const EMOJI = /[\uFE00-\uFE0F\u200D]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function norm(s) {
  return String(s).normalize("NFKC").replace(EMOJI, "").toLowerCase().replace(STRIP, "");
}
// 文件名用了 emoji 替代汉字等无法归一化匹配的特例
const FILE_OVERRIDES = {
  "cover-doll|威風堂々": "威🌪️堂々 covered by DOLLCHESTRA",
};

const files = fs.readdirSync(SRC).filter(f => f.endsWith(".mp3"));
const byNorm = new Map();
for (const f of files) {
  const key = norm(f.slice(PREFIX.length, -4));
  if (byNorm.has(key)) console.warn("警告: 归一化文件名冲突", key, byNorm.get(key), "vs", f);
  else byNorm.set(key, f);
}
const usedFiles = new Set();

function findFile(track, entry) {
  const ovr = FILE_OVERRIDES[entry.id + "|" + track.t];
  if (ovr) {
    const hit = byNorm.get(norm(ovr));
    if (hit) { usedFiles.add(hit); return hit; }
    console.warn("警告: 特判文件不存在", ovr);
  }
  const cands = [];
  // 成员独唱专辑：曲目即「成员 Solo Ver.」录音，优先匹配 (成员 Solo Ver.) 文件（新曲回退到同名文件）
  if (entry.cat === "成员独唱专辑") {
    cands.push(norm(track.t + "(" + entry.teams[0] + " Solo Ver.)"));
  }
  cands.push(norm(track.t));
  if (track.orig) {
    const by = track.by || entry.teams[0];
    cands.push(norm(track.t + "coveredby" + by));
  }
  for (const c of cands) {
    const hit = byNorm.get(c);
    if (hit) { usedFiles.add(hit); return hit; }
  }
  // 前缀退化：曲名…coveredby…（如「いーあるふぁんくらぶ（12 fan club） covered by …」）
  const head = norm(track.t);
  const hits = [...byNorm.entries()].filter(([k, f]) => k.startsWith(head) && k.includes("coveredby")).map(([, f]) => f);
  if (hits.length === 1) { usedFiles.add(hits[0]); return hits[0]; }
  if (hits.length > 1) console.warn("警告: 前缀多义", track.t, hits.join(" / "));
  return null;
}

const OUT = {};
const unmatched = [];
for (const e of DATA) {
  OUT[e.id] = (e.tracks || []).map((t, i) => {
    const f = findFile(t, e);
    if (!f) unmatched.push([e.cat, e.id, t.t, t.by].join(" | "));
    return f;
  });
}

const body =
`// ============================================================
// 曲目 → 本地音频文件映射（由 tools/build-music-files.mjs 生成，请勿手改）
// 键为发行 id，值为与该发行 tracks 数组按索引对齐的文件名数组；null = 无本地音频（播放页置灰）
// 音频目录：music_source/（文件名即曲名，形如 "<曲名>.mp3"）
window.MUSIC_FILES = ${JSON.stringify(OUT, null, 1).replace(/^/gm, "")};
`;
fs.writeFileSync(path.join(ROOT, "js/music-files.js"), body, "utf8");

const total = files.length;
console.log("映射完成: " + DATA.length + " 条发行; mp3 共 " + total + " 个, 已使用 " + usedFiles.size + " 个, 未使用 " + (total - usedFiles.size) + " 个");
const missingTracks = unmatched.length;
console.log("无音频曲目: " + missingTracks + " 条（应为 Off Vocal / 未下载曲）");
const unused = files.filter(f => !usedFiles.has(f));
if (unused.length) console.log("未使用文件:\n  " + unused.join("\n  "));
fs.writeFileSync(path.join(ROOT, ".tmpfetch/unmatched-tracks.txt"), unmatched.join("\n"), "utf8");
