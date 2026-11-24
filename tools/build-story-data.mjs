// ============================================================
// 剧情数据生成脚本（Node 运行：node tools/build-story-data.mjs）
// 作用：读取本地档案，为 46 篇活动记录各生成一个按需加载的数据文件，
//       输出到 js/stories/<话号ID>.js，供 story-detail.html 渲染。
// 输入：
//   LLLLstories/分析/index.txt        —— 46 篇目录（ID、期/话、中日标题、公开日、分节、字数、文件名、原站链接）
//   LLLLstories/译文/<文件名>.txt     —— 中文译本文本（说话人：台词 逐行 +【Part N】等分节标签）
//   LLLLstories/分析/05-分话精读.txt  —— 逐话七栏精读（定位/场景推进/关键台词/情感线/性格揭示/意象与伏笔/前后衔接）
// 输出：js/stories/<ID>.js，内容为 window.STORY_PAGE = {...}
// ============================================================
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");

/* ---------- 1. 从 index.txt 目录解析 46 篇元信息 ---------- */
const catalog = [];
for (const line of read("LLLLstories/分析/index.txt").split(/\r?\n/)) {
  const m = line.match(/^\s*(\d{6})\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(\d+)节\s*\|\s*(\d+)字\s*\|\s*(.+?\.txt)\s*\|\s*(https?\S+)/);
  if (m) catalog.push({
    id: m[1], eraLabel: m[2].trim(), titleJa: m[3].trim(), titleZh: m[4].trim(),
    date: m[5], sections: +m[6], words: +m[7], file: "LLLLstories/译文/" + m[8].trim(), url: m[9].trim()
  });
}
if (catalog.length !== 46) throw new Error("index.txt 目录应为 46 篇，实际 " + catalog.length);

/* ---------- 2. 解析单篇译文：分节台词数组 ---------- */
function parseStory(item) {
  const lines = read(item.file).split(/\r?\n/);
  const sepIdx = lines.findIndex(l => /^={10,}\s*$/.test(l));
  if (sepIdx < 0) throw new Error(item.id + " 未找到正文分隔线");
  const headLink = (lines.slice(0, sepIdx).join("\n").match(/stories\/(\d{6})/) || [])[1];
  if (headLink && headLink !== item.id) throw new Error(item.id + " 头部链接与目录不一致: " + headLink);

  const parts = [];
  let cur = null;
  for (const l of lines.slice(sepIdx + 1)) {
    const t = l.trim();
    if (!t || /^={10,}\s*$/.test(t)) continue;
    if (/^【.+】$/.test(t)) { cur = { label: t.slice(1, -1), lines: [] }; parts.push(cur); continue; }
    const ci = t.indexOf("：");
    if (ci > 0 && ci < 40) {
      cur = cur || { label: "正文", lines: [] };
      cur.lines.push([t.slice(0, ci), t.slice(ci + 1)]);
    } else if (cur && cur.lines.length) {
      cur.lines[cur.lines.length - 1][1] += "\n" + t; // 罕见：无说话人前缀的续行
    } else if (cur) {
      cur.lines.push(["独白", t]);
    }
  }
  return parts;
}

/* ---------- 3. 解析 05-分话精读.txt：每话块与七栏小节 ---------- */
const an = read("LLLLstories/分析/05-分话精读.txt").split(/\r?\n/);
// 话标题行：如「一、103 期第 1 話『花咲きたい！』（…）」「104 期第 6 話『対よろ！！！』『一、102001『～Shades of Stars～』」
const HEAD_RE = /^(?:[一二三四五六七八九十]{1,3}、)?\s*(?:10[2-5]\s*期\s*第\s*(\d+)\s*話|(\d{6}))\s*『/;
// 小节标题行：不同批次或作「1. 本话定位」「一、本话定位」，或裸题「本话定位」
// 用精确白名单，避免长正文行被误判为标题
const SEC_RE = /^(?:[一二三四五六七八九十\d]{1,3}\s*[、.．]\s*)?(本话定位|场景推进(?:（[^（）]*）)?|关键台词|情感线|性格揭示(?:[／/·]?与?变化)?|意象与伏笔|与?前后话?衔接)$/;
// 精读稿中各批次横幅/体例说明的开头，混入正文块时需要剔除
const NOISE_RE = /^05-|^覆盖|^引文|^专名|^剧内|^体例|^标注|^LLL|^分话精读|^各片|^已精读|^目录/;

const blocks = [];
for (let i = 0; i < an.length; i++) {
  const m = an[i].match(HEAD_RE);
  if (!m) continue;
  let id;
  if (m[2]) id = m[2];
  else {
    const era = an[i].match(/10([2-5])\s*期/)[1];
    id = "10" + era + String(+m[1]).padStart(3, "0");
  }
  blocks.push({ id, start: i });
}
const noteById = {};
for (let bi = 0; bi < blocks.length; bi++) {
  const end = bi + 1 < blocks.length ? blocks[bi + 1].start : an.length;
  const secs = [];
  let sec = null;
  const body = an.slice(blocks[bi].start + 1, end);
  for (let i = 0; i < body.length; i++) {
    let l = body[i].replace(/\s+$/, "");
    if (/^-{3,}$/.test(l) || /^={3,}$/.test(l)) continue;
    const wrap = l.match(/^-+\s*(.*?)\s*-+$/); // 「--- 4. 情感线 ---」包裹式小节标题
    if (wrap) l = wrap[1];
    let sm = l.match(SEC_RE);
    if (!sm) {
      // 「N. 标题」+ 下一行破折底线 = 栏标题（特别篇批次：「1. 定位与结构特殊性」等）
      const nh = l.match(/^[一二三四五六七八九十\d]{1,3}[、.．]\s*(.{2,16})$/);
      if (nh && /^[=\s]*-{3,}/.test((body[i + 1] || "").trim()) && !/[，。：；]/.test(nh[1])) sm = [null, nh[1]];
    }
    if (sm) { sec = { h: sm[1].indexOf("性格揭示") === 0 ? "性格揭示/变化" : sm[1], raw: [] }; secs.push(sec); continue; }
    if (!sec) continue; // 话标题与第一栏之间的公开日/体例说明不收录
    if (NOISE_RE.test(l.trim())) { sec = null; continue; } // 块尾混入下一批次横幅，截断当前栏
    sec.raw.push(l.trim());
  }
  // 硬换行折叠：空行分段，段内逐行直接拼接（中日文不需要补空格）
  const out = [];
  for (const s of secs) {
    const ps = [];
    let para = [];
    for (const l of s.raw) {
      if (l === "") { if (para.length) { ps.push(para.join("")); para = []; } }
      else para.push(l);
    }
    if (para.length) ps.push(para.join(""));
    out.push({ h: s.h, ps });
  }
  noteById[blocks[bi].id] = out;
}

/* ---------- 4. 汇总输出 ---------- */
const outDir = path.join(ROOT, "js", "stories");
fs.mkdirSync(outDir, { recursive: true });
let totalBytes = 0;
const warn = [];
for (const item of catalog) {
  const parts = parseStory(item);
  const note = noteById[item.id];
  if (!note || !note.length) warn.push(item.id + " 缺精读小节");
  const page = {
    id: item.id, eraLabel: item.eraLabel, titleJa: item.titleJa, titleZh: item.titleZh,
    date: item.date, sections: item.sections, words: item.words, url: item.url,
    lineCount: parts.reduce((n, p) => n + p.lines.length, 0),
    note: note || [], parts
  };
  const js = "// 自动生成：story-detail.html 数据（话 " + item.id + "）。来源：LLLLstories 档案，更新请运行 node tools/build-story-data.mjs\n" +
    "window.STORY_PAGE = " + JSON.stringify(page).replace(/<\//g, "<\\/") + ";\n";
  fs.writeFileSync(path.join(outDir, item.id + ".js"), js, "utf8");
  totalBytes += Buffer.byteLength(js);
}
console.log("生成 46 篇 ->", path.relative(ROOT, outDir), "总计", (totalBytes / 1048576).toFixed(2), "MB");
console.log(warn.length ? "警告:\n" + warn.join("\n") : "精读小节全部命中 46/46");
