// 无头校验：音乐页小队分节 + 首页卡片直达（node tools/test-music-teams.mjs）
// 断言：全部视图含 4 个 team-sub 锚点且张数正确；#team-mira 直达时切标签并滚动。
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");

function makeEl(id) {
  const listeners = {};
  return {
    id, _html: "", tagName: "DIV", classes: [],
    style: { setProperty() {}, getPropertyValue() { return ""; } },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    textContent: "",
    classList: { add(...c) { this._e.classes.push(...c); }, remove(...c) { const i = this._e.classes.indexOf(c[0]); if (i >= 0) this._e.classes.splice(i, 1); }, toggle() {}, contains(c) { return this._e.classes.includes(c); } },
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    fire(t, ev) { (listeners[t] || []).forEach(fn => fn.call(this, ev)); },
    querySelector() { return null; }, querySelectorAll() { return []; },
    scrollIntoView() {}, getBoundingClientRect() { return { top: 500 }; },
    setAttribute() {}, getAttribute() { return null; },
    appendChild() {}, closest() { return null; },
    _self: null,
  };
}
// classList 需要回指宿主
const reg = {};
function getEl(id) {
  if (!reg[id]) { reg[id] = makeEl(id); reg[id].classList._e = reg[id]; }
  return reg[id];
}

// 分类标签栏：全部 / 编号单曲 / … / 翻唱曲目（与 music.html 的 data-cat-filter 一致）
const cats = ["all", "编号单曲", "迷你专辑", "编号专辑", "小队单曲", "小队合发单曲",
  "剧场版", "电视动画相关", "成员独唱专辑", "配信限定", "系列合同曲", "翻唱曲目"];
const btns = cats.map(cat => {
  const b = getEl("btn-" + cat);
  b.getAttribute = k => (k === "data-cat" ? cat : null);
  b.click = () => b.fire("click", { target: b });
  return b;
});
const bar = getEl("cat-bar");
bar.querySelectorAll = () => btns;

const docListeners = {};
const document = {
  readyState: "loading",
  addEventListener(t, fn) { (docListeners[t] = docListeners[t] || []).push(fn); },
  getElementById: getEl,
  querySelector(sel) {
    if (sel === "[data-cat-filter]") return bar;
    if (sel === '[data-cat="小队单曲"]') return btns.find(b => b.getAttribute("data-cat") === "小队单曲");
    return null;
  },
  querySelectorAll() { return []; },
  createElement(t) { const e = makeEl(t); e.tagName = t.toUpperCase(); e.classList._e = e; return e; },
  body: makeEl("body"),
};
document.body.classList._e = document.body;
document.documentElement = makeEl("html");
document.documentElement.classList._e = document.documentElement;
document.documentElement.scrollTop = 0;

const scrolls = [];
const window = {
  location: { search: "", hash: "#team-mira" }, scrollTo(x, y) { scrolls.push([x, y]); },
  pageYOffset: 0, addEventListener: document.addEventListener,
};
const ctx = vm.createContext({ window, document, location: window.location, console, Image: class { set src(p) { if (this.onerror) this.onerror(); } } });
ctx.global = ctx;
vm.runInContext(read("js/music-data.js"), ctx);
vm.runInContext(read("js/main.js"), ctx);
(docListeners["DOMContentLoaded"] || []).forEach(fn => fn());

const html = reg["music-grid"]._html;
let fail = 0;
const EXPECT = { sleez: 7, doll: 7, mira: 6, edel: 3 };
for (const [k, n] of Object.entries(EXPECT)) {
  const seg = html.split('id="team-' + k + '"')[1];
  if (!seg) { fail++; console.log("FAIL 缺锚点 team-" + k); continue; }
  const count = (seg.split('id="team-')[0].match(/class="music-card reveal"/g) || []).length;
  if (count !== n) { fail++; console.log("FAIL team-" + k + " 张数", count, "≠", n); }
}
if (!fail) console.log("全部视图：四队分节锚点+张数 7/7/6/3 正确");

// 卡片应为指向播放页的链接
if (html.includes('href="music-detail.html?id=LACM-24371"')) console.log("卡片跳转链接 ok");
else { fail++; console.log("FAIL 卡片缺少 music-detail 跳转链接"); }

// hash 直达：应已点击「小队单曲」标签（grid 只剩分节视图），并滚动到 500-90=410
const now = reg["music-grid"]._html;
if (now.includes("cat-block")) { fail++; console.log("FAIL hash 直达后仍停留在全部视图"); }
if (!now.includes('id="team-mira"')) { fail++; console.log("FAIL 小队单曲视图缺分节"); }
if (!scrolls.length || scrolls[scrolls.length - 1][1] !== 410) { fail++; console.log("FAIL 未滚动到锚点，scrolls=", JSON.stringify(scrolls)); }
else console.log("直达 ok：切到小队单曲标签 + scrollTo(0, 410)");
if (btns.find(b => b.getAttribute("data-cat") === "小队单曲").classes.includes("active")) console.log("标签高亮 ok");
else { fail++; console.log("FAIL 「小队单曲」标签未激活"); }

console.log(fail ? "音乐小队分节失败 " + fail + " 项" : "MUSIC-TEAMS-OK");
process.exit(fail ? 1 : 0);
