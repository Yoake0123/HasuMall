// 补齐 8 张 2026 年发行封面：来自 iTunes/Apple Music 官方唱片美术（mzstatic 图床）。
// 条码与品番对应：4540774<品番数字>校验位。node tools/download-music-covers-2026.cjs
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const MAP = {
  "LACM-24778": "Music221/v4/e5/3d/3e/e53d3e8a-2d3d-f2ce-fb01-d82fbc568af1/4540774247783.png",
  "LACM-24779": "Music221/v4/fb/f8/f2/fbf8f230-8f2b-bea6-4594-6ead8241d318/4540774247790.png",
  "LACA-25300": "Music211/v4/8a/c2/4d/8ac24d16-c532-932a-75a6-27ea76327d1f/4540774253005.png",
  "LACM-24812": "Music211/v4/6e/e4/bb/6ee4bb14-4b78-46c9-f4bd-53a4788fd56d/4540774248124.png",
  "LACM-24815": "Music221/v4/3c/b7/22/3cb72239-8840-10d2-c0e2-765fa0b816a0/4540774248155.png",
  "LACM-24816": "Music221/v4/91/9e/6d/919e6ddb-9e9d-f8fc-6887-98397c50638a/4540774248162.png",
  "LACM-24817": "Music221/v4/33/37/62/33376210-c831-370d-4460-8777a2314ab4/4540774248179.png",
  "LACM-24818": "Music221/v4/26/a7/81/26a781e7-9406-56d8-6ce8-9f6caa069341/4540774248186.png",
};

const outDir = path.resolve(__dirname, "..", "images", "music");
let ok = 0, bad = [];
for (const [catNo, rel] of Object.entries(MAP)) {
  const dest = path.join(outDir, catNo + ".jpg");
  if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) continue;
  const url = "https://is1-ssl.mzstatic.com/image/thumb/" + rel + "/600x600bb.jpg";
  try {
    execFileSync("curl", ["-sL", "--fail", "--max-time", "60", "-A", "Mozilla/5.0", url, "-o", dest], { shell: false });
    const buf = fs.readFileSync(dest);
    const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
    const isPng = buf[0] === 0x89 && buf[1] === 0x50;
    if (!isJpg && !isPng || buf.length < 8000) { bad.push(catNo + " 非图片(" + buf.length + "B)"); fs.unlinkSync(dest); continue; }
    ok++;
  } catch (e) { bad.push(catNo + " " + e.message.split("\n")[0]); }
}
console.log("新下载", ok, "失败", bad.length, bad.join(" | "));
