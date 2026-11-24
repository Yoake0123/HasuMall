// 无头校验：角色代表色渲染（node tools/test-char-colors.mjs）
// 用 DOM stub 跑 initCharactersPage + 弹窗，断言每张卡片/弹窗带官方色。
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const EXPECT = {
  kaho: "#f8b500", kozue: "#68be8d", ginko: "#a2d7dd", sayaka: "#5383c3",
  tsuzuri: "#ba2636", kosuzu: "#fad764", rurino: "#e7609e", megumi: "#c8c2c6",
  hime: "#9d8de2", seras: "#f56455", izumi: "#1ebecd", sachi: "#0d6f00",
};

function makeEl(id) {
  const listeners = {};
  const el = {
    id, _html: "", hidden: false, children: [],
    style: { _v: {}, setProperty(k, v) { this._v[k] = v; }, getPropertyValue(k) { return this._v[k]; } },
    set innerHTML(v) { this._html = v; },
    get innerHTML() { return this._html; },
    textContent: "",
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    fire(t, ev) { (listeners[t] || []).forEach(fn => fn(ev)); },
    querySelector(sel) { (this._q = this._q || {}); return this._q[sel] || (this._q[sel] = makeEl(id + " " + sel)); },
    querySelectorAll() { return []; },
    scrollIntoView() {},
    setAttribute() {}, getAttribute() { return null; },
    appendChild(c) { this.children.push(c); },
    closest() { return null; },
  };
  return el;
}

const registry = {};
const docListeners = {};
const document = {
  readyState: "loading",
  addEventListener(t, fn) { (docListeners[t] = docListeners[t] || []).push(fn); },
  getElementById(x) { return registry[x] || (registry[x] = makeEl(x)); },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement(tag) { const el = makeEl(tag); el.tagName = tag.toUpperCase(); return el; },
  body: makeEl("body"),
  documentElement: makeEl("html"),
};
const window = { location: { search: "" }, scrollTo() {}, addEventListener: document.addEventListener };
const ctx = vm.createContext({ window, document, location: window.location, console });
ctx.global = ctx;
vm.runInContext(read("js/characters-data.js"), ctx);
vm.runInContext(read("js/main.js"), ctx);
(docListeners["DOMContentLoaded"] || []).forEach(fn => fn());

let fail = 0;
const grid = registry["character-grid"];
for (const [id, color] of Object.entries(EXPECT)) {
  const okVar = grid.innerHTML.includes('data-id="' + id + '" type="button" style="--char-color:' + color + '"');
  const okAvatar = grid.innerHTML.includes("), " + color + '"');
  if (!okVar || !okAvatar) { fail++; console.log("卡片 FAIL", id, color, "var:", okVar, "avatar:", okAvatar); }
}
console.log(fail ? "卡片着色失败" : "角色卡片 12/12 官方色就位");

/* 弹窗：模拟点击 kaho 卡片，断言 modal-avatar 内联色与 --char-soft */
const card = makeEl("card");
card.getAttribute = () => "kaho";
registry["character-grid"].fire("click", { target: { closest: () => card } });
const modal = registry["character-modal"];
const panel = modal._q && modal._q[".modal-panel"];
if (!panel) { fail++; console.log("弹窗 FAIL: 未找到 modal-panel"); }
else {
  const okAv = panel.innerHTML.includes("55%), #f8b500");
  const okInk = /avatar-initial" style="color:#37474f/.test(panel.innerHTML);
  const soft = panel.style._v["--char-color"] === "#f8b500" && /^rgb\(\d+,\d+,\d+\)$/.test(panel.style._v["--char-soft"] || "");
  if (!okAv || !okInk || !soft) { fail++; console.log("弹窗 FAIL", { okAv, okInk, soft, color: panel.style._v["--char-color"] }); }
  else console.log("弹窗着色 ok（花帆 #f8b500，墨色首字，quote 柔底 " + panel.style._v["--char-soft"] + "）");
}
console.log(fail ? "共失败 " + fail + " 项" : "角色页着色校验通过");
process.exit(fail ? 1 : 0);
