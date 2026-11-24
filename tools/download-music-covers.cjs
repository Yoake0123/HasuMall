// 从萌百图床下载音乐封面：node tools/download-music-covers.cjs
// 直链来源：zh.moegirl.org.cn《莲之空女学院学园偶像俱乐部/音乐列表》Wayback 快照(2025-12-14)，
// 图床 storage.moegirl.org.cn 本身可直连；!/fw/600 为 MediaWiki  thumbnails 缩放参数。
// 命名：images/music/<品番首号>.jpg，与 js/music-data.js 的 catNo 字段对应。
// 2026 年发行的 8 张不在该快照内：LACM-24778/24779/24812/24815/24816/24817/24818、LACA-25300。
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const B = "https://storage.moegirl.org.cn/moegirl/commons/";
const MAP = {
  // 编号单曲
  "LACM-24468": "5/50/Link_to_the_FUTURE.jpg",
  "LACM-24527": "1/16/%E6%8A%B1%E3%81%8D%E3%81%97%E3%82%81%E3%82%8B%E8%8A%B1%E3%81%B3%E3%82%89.jpg",
  "LACM-24571": "e/e9/Bloom_the_smile%2C_Bloom_the_dream%21.jpg",
  "LACM-24652": "2/20/KEY_of_Like%EF%BC%81.jpg",
  "LACM-24659": "b/b5/AURORA_FLOWER.jpg",
  "LACM-24685": "a/aa/%E3%81%84%E3%81%A4%E3%81%A7%E3%82%82%E3%80%81%E3%81%84%E3%81%A4%E3%81%BE%E3%81%A7%E3%82%82.jpg",
  "LACM-24697": "1/16/%E3%82%A2%E3%82%A4%E3%83%89%E3%82%A5%E3%83%BC%E3%83%9F%E3%83%BC%EF%BC%81.jpg",
  "LACM-24777": "6/65/%E3%81%AF%E3%81%98%E3%81%BE%E3%82%8A%E3%81%AE%E7%BE%BD%E9%9F%B3_New.jpg",
  // 迷你专辑 / 编号专辑
  "LACA-25045": "c/cb/Dream_Believers.jpg",
  "LACA-25089": "8/80/Dream_Believers_%28104%E6%9C%9F_Ver.%29.jpg",
  "LACA-25154": "2/25/Dream_Believers_%28105%E6%9C%9F_Ver.%29.jpg",
  "LACA-25071": "5/56/%E5%A4%8F%E3%82%81%E3%81%8D%E3%83%9A%E3%82%A4%E3%83%B3.jpg",
  "LACA-25149": "4/4f/%E3%81%8A%E3%81%84%E3%81%A7%E3%82%88%EF%BC%81%E7%9F%B3%E5%B7%9D%E5%A4%A7%E8%A6%B3%E5%85%89.jpg",
  // スリーズブーケ
  "LACM-24371": "1/11/Reflection_in_the_mirror.jpg",
  "LACM-24408": "8/84/%E7%9C%A9%E8%80%80%E5%A4%9C%E8%A1%8C.jpg",
  "LACM-24456": "3/30/%E7%B4%A0%E9%A1%94%E3%81%AE%E3%83%94%E3%82%AF%E3%82%BB%E3%83%AB.jpg",
  "LACM-24625": "3/32/%E6%9C%88%E5%A4%9C%E8%A6%8B%E6%B5%B7%E6%9C%88.jpg",
  "LACM-24668": "a/a8/%E3%83%A6%E3%83%A1%E3%83%AF%E3%82%BA%E3%83%A9%E3%82%A4.jpg",
  "LACM-24708": "0/03/%E3%83%95%E3%83%AB%E3%83%BC%E3%83%84%E3%83%91%E3%83%B3%E3%83%81.jpg",
  // DOLLCHESTRA
  "LACM-24372": "c/cd/Sparkly_Spot.jpg",
  "LACM-24409": "a/ae/Mirage_Voyage.jpg",
  "LACM-24457": "4/4b/Take_It_Over.jpg",
  "LACM-24626": "5/5b/Proof.jpg",
  "LACM-24669": "d/db/COMPASS.jpg",
  "LACM-24709": "7/7c/%E5%A4%AA%E9%99%BD%E3%81%A7%E3%81%82%E3%82%8C%EF%BC%81.jpg",
  // みらくらぱーく！
  "LACM-24458": "8/81/%E3%82%A2%E3%82%A4%E3%83%87%E3%83%B3%E3%83%86%E3%82%A3%E3%83%86%E3%82%A3.jpg",
  "LACM-24523": "d/d6/%E4%BB%A5%E5%BF%83%E2%98%86%E9%9B%BB%E4%BF%A1.jpg",
  "LACM-24577": "1/15/%E3%83%95%E3%82%A1%E3%83%B3%E3%83%95%E3%82%A1%E3%83%BC%E3%83%AC%EF%BC%81%EF%BC%81%EF%BC%81.jpg",
  "LACM-24670": "5/5b/%E5%85%A8%E6%96%B9%E4%BD%8D%E3%82%AD%E3%83%A5%E3%83%B3%E2%99%A1.jpg",
  "LACM-24773": "f/fc/%E3%83%8B%E3%83%A3%E3%82%AA%E3%82%B7%E3%82%B0%E3%83%8B%E3%83%A3%E3%83%AB.jpg",
  // Edel Note
  "LACM-24689": "d/d3/Retrofuture.jpg",
  "LACM-24774": "5/58/%E7%89%87%E7%BF%BC%E3%81%AE%E3%83%88%E3%83%AA%E3%83%90%E3%82%AC.jpg",
  // 合发 / shuffle（合发盘用第一队封面）
  "LACM-24391": "c/c2/Holiday%E2%88%9EHoliday_-_Tragic_Drops%E3%80%90%E3%82%B9%E3%83%AA%E3%83%BC%E3%82%BA%E3%83%96%E3%83%BC%E3%82%B1%E7%9B%A4%E3%80%91.jpg",
  "LACM-24512": "2/24/Special_Thanks_-_%E9%9D%92%E3%81%A8%E3%82%B7%E3%83%A3%E3%83%9C%E3%83%B3_-_%E3%83%9F%E3%83%AB%E3%82%AF.jpg",
  "LACM-24505": "2/2a/Colorfulness_-_%E3%83%8F%E3%83%83%E3%83%94%E3%83%BC%E8%87%B3%E4%B8%8A%E4%B8%BB%E7%BE%A9%EF%BC%81_-_Pleasure_Feather.jpg",
  "LACM-24639": "6/61/%E3%83%8F%E3%83%8A%E3%83%A0%E3%82%B9%E3%83%93_-_%E3%83%90%E3%82%A2%E3%83%89%E3%82%B1%E3%83%BC%E3%82%B8_-_%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%BC%E3%82%AD%E3%83%AA%E3%83%A5%E3%83%BC.jpg",
  "LACM-24696": "e/e3/37.5%E2%84%83%E3%81%AE%E3%83%95%E3%82%A1%E3%83%B3%E3%82%BF%E3%82%B8%E3%83%BC_-_%E3%82%A2%E3%82%A4%E3%83%9E%E3%82%A4%E3%83%A1%E3%83%BC%E3%83%87%E3%83%BC_-_BLAST%21%21_-_%E5%8D%81%E5%85%AD%E5%A4%9C%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8D.jpg",
  "LACM-24743": "e/ea/%E5%8F%AF%E6%83%9C%E5%A4%9C%E8%8A%B1%E7%81%AB_-_%E3%83%96%E3%83%AB%E3%82%A6%E3%83%A2%E3%83%BC%E3%83%A1%E3%83%B3%E3%83%88_-_Very%21_Very%21_COCO%E5%A4%8F%E3%81%A3_-_%E3%83%95%E3%83%A5%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%88.jpg",
  "LACM-24780": "b/bb/%E3%81%A1%E3%82%87%E3%80%81%E5%B0%8A%E3%81%84LOVE_-_N%CE%B5w_Black.jpg",
  "LACM-24747": "c/c0/%E4%B9%99%E5%A5%B3%E8%A9%9E%E8%8F%AF%E9%9B%86_-_%E3%82%AC%E3%83%A9%E3%83%B3%E3%83%89Flash_-_%E3%83%90%E3%82%A4%E3%82%BF%E3%83%AB%E3%82%B5%E3%82%A4%E3%83%B3_-_%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E7%94%9F%E3%81%8D%E6%A7%98.jpg",
};

const outDir = path.resolve(__dirname, "..", "images", "music");
fs.mkdirSync(outDir, { recursive: true });
let ok = 0, skip = 0, bad = [];
for (const [catNo, rel] of Object.entries(MAP)) {
  const dest = path.join(outDir, catNo + ".jpg");
  if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) { skip++; continue; }
  const url = B + rel + "!/fw/600";
  try {
    execFileSync("curl", ["-sL", "--fail", "--max-time", "60", "-A", "Mozilla/5.0", url, "-o", dest], { shell: false });
    const buf = fs.readFileSync(dest);
    const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
    if (!isJpg || buf.length < 8000) { bad.push(catNo + " 非JPEG或过小 " + buf.length); fs.unlinkSync(dest); continue; }
    ok++;
  } catch (e) {
    bad.push(catNo + " 下载失败: " + e.message.split("\n")[0]);
    try { if (fs.existsSync(dest)) fs.unlinkSync(dest); } catch (_) {}
  }
}
console.log("下载成功", ok, "已存在跳过", skip, "失败", bad.length);
if (bad.length) console.log(bad.join("\n"));
