// 无头校验：轮播图探针（node tools/test-banner-probe.mjs）
// 模拟 index.html 的 <span class="slide-bg" data-src="images/banner-1.jpg"><img></span>，
// 且 banner-1.jpg 不存在、banner-1.png 存在：断言探针回退扩展名并把 src 写进子 <img>。
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");

function makeEl(tag) {
  const el = {
    tagName: (tag || "DIV").toUpperCase(), _html: "", classes: [],
    style: { setProperty() {}, getPropertyValue() { return ""; } },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    classList: {
      add(...c) { el.classes.push(...c); }, remove() {}, toggle() {},
      contains(c) { return el.classes.includes(c); },
    },
    addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; },
    setAttribute() {}, getAttribute() { return null; }, appendChild() {},
    scrollIntoView() {}, closest() { return null; },
  };
  return el;
}

const registry = {};
const docListeners = {};
const document = {
  readyState: "loading",
  addEventListener(t, fn) { (docListeners[t] = docListeners[t] || []).push(fn); },
  getElementById(x) { return registry[x] || (registry[x] = makeEl("div")); },
  querySelector() { return null; },
  createElement(t) { return makeEl(t); },
  body: makeEl("body"), documentElement: makeEl("html"),
};

// 轮播帧：span.slide-bg 挂 data-src，内部有裸 <img>
const childImg = makeEl("img");
const slide = makeEl("span");
slide.classList = { add(...c) { slide.classes.push(...c); }, remove() {}, toggle() {} };
slide.getAttribute = k => (k === "data-src" ? "images/banner-1.jpg" : null);
slide.querySelector = sel => (sel === "img" ? childImg : null);
slide.closest = sel => (String(sel).includes(".slide-bg") ? slide : null);
document.querySelectorAll = sel => (sel === "[data-src]" ? [slide] : []);

// Image stub：.jpg 一律 404，.png 成功（模拟真实探针的扩展名回退链）
let loadedPaths = [];
class Image {
  set src(p) {
    if (/\.png$/.test(p)) { loadedPaths.push(p); if (this.onload) this.onload(); }
    else if (this.onerror) this.onerror();
  }
}

const window = { location: { search: "" }, scrollTo() {}, addEventListener: document.addEventListener };
const ctx = vm.createContext({ window, document, location: window.location, console, Image });
ctx.global = ctx;
vm.runInContext(read("js/main.js"), ctx);
(docListeners["DOMContentLoaded"] || []).forEach(fn => fn());

let fail = 0;
if (childImg.src !== "images/banner-1.png") { fail++; console.log("FAIL 子img.src =", childImg.src || "(空)"); }
else console.log("探针回退 ok：banner-1.jpg 缺失 → 命中 banner-1.png，src 已写入子 <img>");
if (!slide.classes.includes("is-real")) { fail++; console.log("FAIL 未加 is-real，占位渐变不会隐藏"); }
else console.log("占位隐藏 ok：.slide-bg 已加 has-img/is-real");
console.log("尝试链:", loadedPaths.join(", ") || "(jpg 失败路径不记录)");
console.log(fail ? "轮播探针失败" : "BANNER-PROBE-OK");
process.exit(fail ? 1 : 0);
