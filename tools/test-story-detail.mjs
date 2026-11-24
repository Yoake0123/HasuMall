// 无头校验：story-detail 渲染（node tools/test-story-detail.mjs）
// 用最小 DOM stub 跑 js/main.js 的 initStoryDetail，对样例话做标签配平与结构检查。
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");

function makeEl(id) {
  const listeners = {};
  const el = {
    id, _html: "", hidden: false, children: [], _q: {},
    set innerHTML(v) { this._html = v; },
    get innerHTML() { return this._html; },
    textContent: "",
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    fire(t, ev) { (listeners[t] || []).forEach(fn => fn(ev)); },
    querySelector(sel) { return this._q[sel] || (this._q[sel] = makeEl(id + " " + sel)); },
    scrollIntoView() {},
    setAttribute() {}, getAttribute() { return null; },
    appendChild(c) { this.children.push(c); if (c.tagName === "SCRIPT") c._attach && c._attach(); },
  };
  return el;
}

function runDetail(id, throwHistory) {
  const root = makeEl("story-detail-root");
  const byId = { "story-detail-root": root };
  const docListeners = {};
  const createdScripts = [];
  const document = {
    readyState: "loading",
    addEventListener(t, fn) { (docListeners[t] = docListeners[t] || []).push(fn); },
    getElementById(x) { return byId[x] || (byId[x] = makeEl(x)); },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement(tag) {
      const el = makeEl("new"); el.tagName = tag.toUpperCase();
      if (tag === "script") {
        let src = "";
        Object.defineProperty(el, "src", {
          set(v) { src = v; }, get() { return src; },
        });
        el._attach = () => {
          const code = read(src);
          vm.runInContext(code, ctx);
          el.onload && el.onload();
        };
        createdScripts.push(el);
      }
      return el;
    },
    body: makeEl("body"),
    documentElement: makeEl("html"),
    head: makeEl("head"),
  };
  const location = { search: "?id=" + id, href: "story-detail.html?id=" + id };
  const window = {
    location, scrollTo() {}, addEventListener: document.addEventListener,
    matchMedia: () => ({ matches: false, addEventListener() {} }),
  };
  // throwHistory 模拟 Chrome/Edge 在 file:// 下对 replaceState 抛 SecurityError
  const history = throwHistory
    ? { replaceState() { throw new Error("SecurityError: origin null"); } }
    : { replaceState() {} };
  const ctx = vm.createContext({ window, document, location, console, history });
  ctx.global = ctx; ctx.self = window;
  vm.runInContext(read("js/main.js"), ctx);
  (docListeners["DOMContentLoaded"] || []).forEach(fn => fn());
  return { html: root._html, root, scripts: createdScripts };
}

/* 标签配平检查 */
const VOID = new Set(["meta", "link", "br", "img", "hr", "input"]);
function tagBalance(html) {
  const stack = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9-]*)[^>]*?>/g;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    if (VOID.has(tag) || m[0].endsWith("/>")) continue;
    if (m[0][1] === "/") {
      if (stack.pop() !== tag) return "mismatch at " + tag + " pos " + m.index;
    } else stack.push(tag);
  }
  return stack.length ? "unclosed: " + stack.join(",") : "ok";
}

let fail = 0;
for (const id of ["103001", "102001", "105012", "200002"]) {
  const { html } = runDetail(id);
  const checks = [
    ["非空", html.length > 1000],
    ["标题区", html.includes("sd-head") && html.includes("sd-meta")],
    ["精读区", id === "200002" ? true : html.includes("分话精读")],
    ["剧本区", html.includes("sd-script-body") && html.includes("sd-toggle")],
    ["翻页", html.includes("sd-pager")],
    ["配平", tagBalance(html) === "ok"],
    // 12 名主要角色的名牌必须带内联代表色（未着色形态 = spk-xx">名字<）
    ["主角无漏色", !new RegExp('spk spk-\\w+">(日野下花帆|花帆|乙宗梢|梢|百生吟子|吟子|村野さやか|さやか|夕霧綴理|綴理|徒町小鈴|小鈴|大沢瑠璃乃|瑠璃乃|藤島慈|慈|安養寺姫芽|姫芽|セラス|桂城泉|泉|大賀美沙知|沙知)</span>').test(html)],
    // 出现角色名牌（非独白）时，至少有一枚带内联代表色；纯独白篇目不适用
    ["已着色行数>0", (() => {
      const chips = (html.match(/class="spk /g) || []).length - (html.match(/line-monologue/g) || []).length;
      const colored = (html.match(/style="background:#[0-9a-f]{6};color:/g) || []).length;
      return chips <= 0 || colored > 0;
    })()],
  ];
  const bad = checks.filter(c => !c[1]);
  if (bad.length) { fail++; console.log(id, "FAIL:", bad.map(b => b[0] + (b[0] === "配平" ? " " + tagBalance(html) : "")).join(" | ")); }
  else console.log(id, "ok", "(", (html.length / 1024).toFixed(1), "KB )");
}

/* 无 id 参数时给出提示页 */
const htmlNoId = runDetail("").html;
if (!htmlNoId.includes("未指定话号")) { fail++; console.log("no-id FAIL: 未显示提示"); }
else console.log("no-id ok");

/* file:// 模拟：replaceState 抛 SecurityError 时，翻页仍应加载下一话 */
{
  const r = runDetail("103001", true);
  const pager = r.root._q[".sd-pager"];
  const anchor = { getAttribute: k => (k === "data-goto" ? "103002" : null) };
  let threw = null;
  try {
    pager.fire("click", { target: { closest: () => anchor }, preventDefault() {} });
  } catch (e) { threw = e; }
  const loaded = r.scripts.some(s => s.src.endsWith("103002.js"));
  if (threw || !loaded) {
    fail++;
    console.log("pager-file:// FAIL", { threw: threw && threw.message, loaded });
  } else console.log("pager ok：replaceState 抛异常时仍载入 103002");
}

console.log(fail ? "失败 " + fail + " 项" : "story-detail 渲染校验通过");
process.exit(fail ? 1 : 0);
