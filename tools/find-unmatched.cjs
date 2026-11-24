// 差集分析：music_source 文件名 vs 48 张发行的 iTunes 曲目表 → 找出未归属曲目
// node tools/find-unmatched.cjs
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const norm = s => s
  .replace(/[（]/g, "(").replace(/[）]/g, ")")
  .replace(/[！]/g, "!").replace(/[？]/g, "?").replace(/[：]/g, ":")
  .replace(/[．]/g, ".").replace(/[，]/g, ",")
  .replace(/[〜～]/g, "~").replace(/[　\s]+/g, "")
  .replace(/[♡♥☆★♪・]/g, "");

const itDir = path.join(ROOT, ".tmpfetch", "itunes");
const known = new Map(); // normTitle -> [catNo...]
for (const f of fs.readdirSync(itDir).filter(x => x.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync(path.join(itDir, f), "utf8"));
  for (const t of j.tracks) {
    const k = norm(t.t);
    if (!known.has(k)) known.set(k, []);
    known.get(k).push(j.catNo.split("/")[0]);
  }
}

const files = fs.readdirSync(path.join(ROOT, "music_source"));
const unmatched = [];
for (const f of files) {
  const base = f.replace(/^ZGCrsNii - /, "").replace(/\.mp3$/, "");
  if (!known.has(norm(base))) unmatched.push(base);
}
console.log("iTunes 曲目总数(去重前):", [...known.values()].reduce((a, b) => a + b.length, 0));
console.log("mp3 总数:", files.length, " 未归属:", unmatched.length);
fs.writeFileSync(path.join(ROOT, ".tmpfetch", "unmatched.txt"), unmatched.join("\n"));
console.log(unmatched.join("\n"));
