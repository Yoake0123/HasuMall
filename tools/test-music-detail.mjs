// 无头校验：music-detail.html 播放器逻辑（node tools/test-music-detail.mjs）
// 断言：信息面板/播放列表渲染、点歌加载正确 mp3、禁用行不可播、上一/下一曲、
//       循环模式切换与单曲循环重播、静音、进度拖拽、音量、无音频发行与未知 id 的降级。
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const DATA_SRC = read("js/music-data.js");
const FILES_SRC = read("js/music-files.js");
const MAIN_SRC = read("js/main.js");

let fail = 0;
function ok(cond, msg) {
  if (cond) console.log("  ok " + msg);
  else { fail++; console.log("  FAIL " + msg); }
}

function makeEl(id) {
  const listeners = {};
  const el = {
    id, _html: "", tagName: "DIV", classes: [], value: "", max: 1000,
    style: { setProperty() {}, getPropertyValue() { return ""; } },
    set innerHTML(v) { this._html = v; if (this._onHtml) this._onHtml(v); },
    get innerHTML() { return this._html; },
    textContent: "",
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    fire(t, ev) { (listeners[t] || []).forEach(fn => fn.call(this, ev)); },
    querySelector() { return null; }, querySelectorAll() { return []; },
    scrollIntoView() {}, getBoundingClientRect() { return { top: 500 }; },
    setAttribute() {}, getAttribute() { return null; },
    appendChild() {}, closest() { return null; }, hidden: false,
  };
  el.classList = {
    add(...c) { el.classes.push(...c); },
    remove(...c) { c.forEach(x => { const i = el.classes.indexOf(x); if (i >= 0) el.classes.splice(i, 1); }); },
    toggle(c, on) { if (on === undefined) on = !el.classes.includes(c); if (on) { if (!el.classes.includes(c)) el.classes.push(c); } else { const i = el.classes.indexOf(c); if (i >= 0) el.classes.splice(i, 1); } return on; },
    contains(c) { return el.classes.includes(c); },
  };
  return el;
}

function boot(search) {
  const reg = {};
  const getEl = id => (reg[id] = reg[id] || makeEl(id));

  // root：innerHTML 写入后按标记生成 .md-track 行桩
  const root = getEl("music-detail-root");
  root._rows = [];
  root._onHtml = html => {
    root._rows = [];
    const re = /class="md-track( disabled)?" data-i="(\d+)"/g;
    let m;
    while ((m = re.exec(html))) {
      const dis = !!m[1], idx = m[2];
      const row = makeEl("row-" + idx);
      if (dis) row.classes.push("disabled");
      row.getAttribute = k => (k === "data-i" ? idx : null);
      root._rows.push(row);
    }
  };
  root.querySelectorAll = sel => (sel === ".md-track" ? root._rows : []);

  let audioInst = null;
  class AudioStub {
    constructor() {
      audioInst = this;
      this._h = {}; this.paused = true; this.duration = NaN; this.currentTime = 0;
      this.volume = 1; this.muted = false; this.src = ""; this.preload = ""; this.plays = 0;
    }
    addEventListener(t, fn) { (this._h[t] = this._h[t] || []).push(fn); }
    fire(t, ev) { (this._h[t] || []).forEach(fn => fn.call(this, ev)); }
    play() { this.plays++; this.paused = false; this.fire("play"); return Promise.resolve(); }
    pause() { this.paused = true; this.fire("pause"); }
  }

  const docListeners = {};
  const document = {
    readyState: "loading",
    addEventListener(t, fn) { (docListeners[t] = docListeners[t] || []).push(fn); },
    getElementById: getEl,
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement(t) { const e = makeEl(t); e.tagName = t.toUpperCase(); return e; },
    body: makeEl("body"),
  };
  document.documentElement = makeEl("html");
  document.documentElement.scrollTop = 0;

  const window = {
    location: { search, hash: "" }, scrollTo() {}, pageYOffset: 0,
    addEventListener: document.addEventListener,
  };
  const ctx = vm.createContext({
    window, document, location: window.location, console,
    Image: class { set src(p) { if (this.onerror) this.onerror(); } },
    Audio: AudioStub,
  });
  ctx.global = ctx;
  vm.runInContext(DATA_SRC, ctx);
  vm.runInContext(FILES_SRC, ctx);
  vm.runInContext(MAIN_SRC, ctx);
  (docListeners["DOMContentLoaded"] || []).forEach(fn => fn());

  const clickRow = i => getEl("md-list").fire("click", { target: { closest: sel => (sel === ".md-track" ? root._rows[i] : null) } });
  return { reg, getEl, root, clickRow, audio: () => audioInst, docListeners };
}

/* ===== 场景 A：编号单曲 1st（3 可播 + 3 Off Vocal 置灰） ===== */
console.log("场景 A: ?id=LACM-24468");
{
  const { reg, getEl, root, clickRow, audio } = boot("?id=LACM-24468");
  const html = root._html;
  ok(html.includes("Link to the FUTURE"), "信息面板含碟名");
  ok(html.includes("LACM-24468") && html.includes("2024-01-17 发售"), "含品番与发售日");
  ok(html.includes("md-player"), "渲染播放条");
  ok(root._rows.length === 6, "播放列表 6 行");
  ok(root._rows.filter(r => r.classes.includes("disabled")).length === 3, "3 行 Off Vocal 置灰");
  ok(html.includes("3 / 6 曲有本地音频"), "可播计数 3/6");

  clickRow(3); // 置灰行
  ok(audio() && audio().src === "", "禁用行点击不加载音频");

  clickRow(0);
  const a = audio();
  ok(a.src === "music_source/" + encodeURIComponent("Trick & Cute.mp3"), "点歌加载正确 mp3 路径");
  ok(getEl("md-now-t").textContent === "Trick & Cute", "当前曲信息面板更新");
  ok(root._rows[0].classes.includes("playing") && a.paused === false, "行高亮 + 播放中");
  ok(getEl("md-play").textContent === "❙❙", "播放键切换为暂停图标");

  getEl("md-next").fire("click", {});
  ok(decodeURIComponent(a.src).includes("ツバサ・ラ・リベルテ"), "下一曲跳到下一可播曲目");
  getEl("md-prev").fire("click", {});
  ok(decodeURIComponent(a.src).includes("Trick & Cute"), "上一曲回退");

  getEl("md-mode").fire("click", {});
  ok(getEl("md-mode").textContent === "单曲循环", "模式切换：单曲循环");
  a.currentTime = 77;
  const plays = a.plays;
  a.fire("ended");
  ok(a.currentTime === 0 && a.plays === plays + 1, "单曲循环 ended 重播");
  getEl("md-mode").fire("click", {});
  ok(getEl("md-mode").textContent === "随机播放", "模式切换：随机播放");
  getEl("md-mode").fire("click", {});
  ok(getEl("md-mode").textContent === "列表循环", "模式切换回列表循环");

  a.fire("ended");
  ok(decodeURIComponent(a.src).includes("ツバサ・ラ・リベルテ"), "列表循环 ended 自动续播下一曲");

  getEl("md-mute").fire("click", {});
  ok(a.muted === true && getEl("md-mute").classes.includes("active"), "静音开关生效");

  a.duration = 100;
  getEl("md-bar").value = 500;
  getEl("md-bar").fire("input", {});
  ok(getEl("md-cur").textContent === "0:50", "拖拽中预览时间");
  getEl("md-bar").fire("change", {});
  ok(a.currentTime === 50, "松手跳转到 50s");

  getEl("md-vol").value = 40;
  getEl("md-vol").fire("input", {});
  ok(Math.abs(a.volume - 0.4) < 1e-9, "音量滑条 40%");
}

/* ===== 场景 B：OST 全无音频 ===== */
console.log("场景 B: ?id=LACA-25282 (OST 无本地音频)");
{
  const { root, reg } = boot("?id=LACA-25282");
  ok(root._html.includes("md-noaudio") && !root._html.includes("md-player"), "无播放条，显示降级提示");
  ok(root._rows.length === 23 && root._rows.every(r => r.classes.includes("disabled")), "23 行全部置灰");
}

/* ===== 场景 C：翻唱曲（原唱信息 + covered by 文件名） ===== */
console.log("场景 C: ?id=cover-mira");
{
  const { root, getEl, clickRow, audio } = boot("?id=cover-mira");
  ok(root._rows.length === 13, "みらくらぱーく！翻唱 13 行");
  ok(root._html.includes("原唱：山本リンダ"), "行内含原唱信息");
  clickRow(2); // 狙いうち
  ok(decodeURIComponent(audio().src) === "music_source/狙いうち covered by 大沢瑠璃乃.mp3", "翻唱曲映射到 covered by 文件");
  ok(getEl("md-now-sub")._html.includes("原唱"), "当前曲面板含原唱");
}

/* ===== 场景 D：成员独唱专辑 Solo Ver. 映射 ===== */
console.log("场景 D: ?id=LACA-19178 (FBM 村野さやか)");
{
  const { clickRow, audio } = boot("?id=LACA-19178");
  clickRow(0);
  ok(decodeURIComponent(audio().src).includes("AWOKE (村野さやか Solo Ver.)"), "独唱专辑曲目 → Solo Ver. 文件");
}

/* ===== 场景 E：未知 id / 缺 id ===== */
console.log("场景 E: 未知 id");
{
  const { root } = boot("?id=nope");
  ok(root._html.includes("未找到对应发行"), "未知 id 降级提示");
  const { root: r2 } = boot("");
  ok(r2._html.includes("未找到对应发行"), "缺 id 降级提示");
}

console.log(fail ? "\nMUSIC-DETAIL 失败 " + fail + " 项" : "\nMUSIC-DETAIL-OK");
process.exit(fail ? 1 : 0);
