// 重建 js/music-data.js：
//   1) 载入现有 48 条发行数据，补 id 字段，并合并 .tmpfetch/itunes/<品番>.json 的完整曲目表
//   2) 追加新分类条目（剧场版/电视动画相关/成员独唱专辑/配信限定/系列合同曲/翻唱曲目），
//      曲目来自 .tmpfetch/itunes2/<collectionId>.json 或脚本内手工整理
//   数据来源：萌娘百科音乐列表（Wayback 20251214222910 快照）、LLWiki 翻唱曲列表、
//   日文维基百科（カバー曲游戏实装日表，经 weblio 镜像抓取）、iTunes JP 商店曲目表。
// 运行：node tools/build-music-data.mjs
import fs from "fs";
import path from "path";
import vm from "vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const CACHE1 = path.join(ROOT, ".tmpfetch/itunes");   // 按品番缓存的 48 张
const CACHE2 = path.join(ROOT, ".tmpfetch/itunes2");  // 按 collectionId 缓存

/* ---------- 1. 现有数据 ---------- */
const win = {};
vm.runInNewContext(read("js/music-data.js"), { window: win });
const existing = win.MUSIC_DATA;
if (!Array.isArray(existing) || existing.length !== 48) {
  console.error("现有 music-data.js 条目数异常:", existing && existing.length);
  process.exit(1);
}

function normBy(by) {
  if (!by) return by;
  by = by.replace(/\s*[（(]\s*CV[.．・]?[^）)]*[）)]/g, "").trim();
  by = by.replace(/みらくらぱーく!/g, "みらくらぱーく！");
  return by;
}

function fromCache1(catNo) {
  const key = String(catNo || "").split("/")[0].trim();
  const f = path.join(CACHE1, key + ".json");
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, "utf8"));
}
function fromCache2(cid) {
  const f = path.join(CACHE2, cid + ".json");
  if (!fs.existsSync(f)) { console.error("缺缓存 itunes2/" + cid); process.exit(1); }
  return JSON.parse(fs.readFileSync(f, "utf8"));
}
function mapTracks(j) {
  return j.tracks.map(t => {
    const o = { no: t.no, t: t.t, by: normBy(t.by) };
    if (t.disc > 1) o.disc = t.disc;
    if (t.ms) o.ms = t.ms;
    return o;
  });
}

/* ---------- 2. 新条目（手工整理） ---------- */
const CLUB = "蓮ノ空女学院スクールアイドルクラブ";

// 翻唱曲（学園アイドルステージ／官方 YouTube 公开，无 CD·配信发行；日期为游戏实装日）
function cv(t, orig, date, by) { return { t, by: by || null, orig, date }; }
const COVER_ENTRIES = [
  {
    id: "cover-all", cat: "翻唱曲目", no: "全体", catNo: "配信限定", teams: [CLUB],
    titleJa: "学園アイドルステージ カバー曲（蓮ノ空女学院スクールアイドルクラブ）", titleZh: "",
    date: "2023-05-20～2026-03-10", dateLabel: "2023-05 ～ 2026-03 逐曲公开",
    note: "手机游戏《Link! Like! Love Live!》「学園アイドルステージ」与官方 YouTube 公开的翻唱曲，无实体/配信发行",
    tracks: [
      cv("僕らのLIVE 君とのLIFE", "μ's", "2023-05-20"),
      cv("CHANGE!!!!", "765PRO ALLSTARS", "2023-12-10"),
      cv("ダイヤモンドハッピー", "わか・ふうり・すなお from STAR☆ANIS", "2024-02-20", "乙宗 梢・夕霧綴理・藤島 慈"),
      cv("lucky train!", "るか・もな・みき from AIKATSU☆STARS!", "2024-02-20", "日野下花帆・村野さやか・大沢瑠璃乃"),
      cv("Snow halation", "μ's", "2024-05-19"),
      cv("夏色えがおで1,2,Jump!", "μ's", "2024-08-11"),
      cv("STARTLINER", "オンゲキシューターズ", "2024-12-12"),
      cv("僕らは今のなかで", "μ's", "2025-10-14"),
      cv("Blessing", "halyosy feat. 初音ミク・鏡音リン・鏡音レン・巡音ルカ・KAITO・MEIKO", "2026-03-10"),
    ],
  },
  {
    id: "cover-cb", cat: "翻唱曲目", no: "CB", catNo: "配信限定", teams: ["スリーズブーケ"],
    titleJa: "学園アイドルステージ カバー曲（スリーズブーケ）", titleZh: "",
    date: "2023-05-20～2026-02-20", dateLabel: "2023-05 ～ 2026-02 逐曲公开",
    note: "含成员个人名义翻唱（日野下花帆・乙宗 梢・百生吟子）",
    tracks: [
      cv("君のこころは輝いてるかい？", "Aqours", "2023-05-20"),
      cv("Preserved Roses", "T.M.Revolution×水樹奈々", "2023-05-20"),
      cv("ハッピーシンセサイザ", "EasyPop feat. 巡音ルカ・GUMI", "2023-05-20"),
      cv("ビバハピ", "Mitchie M feat. 初音ミク", "2023-05-20", "日野下花帆"),
      cv("深愛", "水樹奈々", "2023-05-20", "乙宗 梢"),
      cv("心予報", "Eve feat. 初音ミク", "2023-07-13"),
      cv("御旗のもとに", "巴里華撃団", "2024-02-10"),
      cv("NEO SKY, NEO MAP!", "虹ヶ咲学園スクールアイドル同好会", "2024-06-20"),
      cv("ルージュの伝言", "荒井由実", "2024-09-22", "百生吟子"),
      cv("Welcome!", "デ・ジ・キャラット（かとうひろこ、真田アサミ）", "2025-02-17", "乙宗 梢"),
      cv("コネクト", "ClariS", "2025-03-20"),
      cv("START!! True dreams", "Liella!", "2025-08-10"),
      cv("もういちど ルミナス", "Pastel*Palettes", "2026-01-05"),
      cv("気まぐれロマンティック", "いきものがかり", "2026-02-20"),
    ],
  },
  {
    id: "cover-doll", cat: "翻唱曲目", no: "DOLL", catNo: "配信限定", teams: ["DOLLCHESTRA"],
    titleJa: "学園アイドルステージ カバー曲（DOLLCHESTRA）", titleZh: "",
    date: "2023-05-20～2026-01-05", dateLabel: "2023-05 ～ 2026-01 逐曲公开",
    note: "含成员个人名义翻唱（村野さやか・夕霧綴理・徒町小鈴）",
    tracks: [
      cv("始まりは君の空", "Liella!", "2023-05-20"),
      cv("名前のない怪物", "EGOIST", "2023-05-20"),
      cv("そばかす", "JUDY AND MARY", "2023-05-20", "村野さやか"),
      cv("ロストワンの号哭", "Neru feat. 鏡音リン", "2023-05-20", "夕霧綴理"),
      cv("ヴィラン", "てにをは feat. flower", "2023-06-21"),
      cv("威風堂々", "梅とら feat. 巡音ルカ・初音ミク・鏡音リン・GUMI・IA", "2023-09-09"),
      cv("祝福", "YOASOBI", "2024-01-20"),
      cv("Daydream Warrior", "Aqours", "2024-07-21"),
      cv("ビビデバ", "星街すいせい", "2024-10-19", "徒町小鈴"),
      cv("雑踏、僕らの街", "トゲナシトゲアリ", "2025-01-18"),
      cv("虹色Passions！", "虹ヶ咲学園スクールアイドル同好会", "2025-07-09"),
      cv("BOW AND ARROW", "米津玄師", "2025-12-19"),
      cv("壱雫空", "MyGO!!!!!", "2026-01-05"),
    ],
  },
  {
    id: "cover-mira", cat: "翻唱曲目", no: "MIRA", catNo: "配信限定", teams: ["みらくらぱーく！"],
    titleJa: "学園アイドルステージ カバー曲（みらくらぱーく！）", titleZh: "",
    date: "2023-05-20～2026-01-05", dateLabel: "2023-05 ～ 2026-01 逐曲公开",
    note: "含成员个人名义翻唱（大沢瑠璃乃・藤島 慈・安養寺姫芽）",
    tracks: [
      cv("いーあるふぁんくらぶ", "みきとP feat. GUMI・鏡音リン", "2023-05-20"),
      cv("TOKIMEKI Runners", "虹ヶ咲学園スクールアイドル同好会", "2023-05-20"),
      cv("狙いうち", "山本リンダ", "2023-05-20", "大沢瑠璃乃"),
      cv("♡桃色片想い♡", "松浦亜弥", "2023-05-20", "藤島 慈"),
      cv("強風オールバック", "ゆこぴ feat. 歌愛ユキ", "2023-09-09"),
      cv("ダンスロボットダンス", "ナユタン星人 feat. 初音ミク", "2023-11-10"),
      cv("ミラクルショッピング ～ドン・キホーテのテーマ～", "田中マイミ", "2024-07-27"),
      cv("常夏☆サンシャイン", "Liella!", "2024-08-21"),
      cv("This game", "鈴木このみ", "2024-11-04", "安養寺姫芽"),
      cv("きゅうくらりん", "いよわ feat. 可不", "2025-02-05"),
      cv("青空Jumping Heart", "Aqours", "2025-06-14"),
      cv("テレパシ", "DECO*27 feat. 初音ミク", "2025-11-30"),
      cv("キミがいなくちゃっ！", "ハロー、ハッピーワールド！", "2026-01-05"),
    ],
  },
  {
    id: "cover-edel", cat: "翻唱曲目", no: "EDEL", catNo: "配信限定", teams: ["Edel Note"],
    titleJa: "学園アイドルステージ カバー曲（Edel Note）", titleZh: "",
    date: "2025-04-22～2026-01-31", dateLabel: "2025-04 ～ 2026-01 逐曲公开",
    note: "含成员个人名义翻唱（セラス・柳田・リリエンフェルト・桂城 泉）",
    tracks: [
      cv("輪舞-revolution", "奥井雅美", "2025-04-22"),
      cv("ロミオとシンデレラ", "doriko feat. 初音ミク", "2025-05-10", "セラス・柳田・リリエンフェルト"),
      cv("月光", "鬼束ちひろ", "2025-06-22", "桂城 泉"),
      cv("Shocking Party", "A-RISE", "2025-09-09"),
      cv("FIRE BIRD", "Roselia", "2026-01-05"),
      cv("あんなに一緒だったのに", "See-Saw", "2026-01-31"),
    ],
  },
];

function solo(id, cat, no, date, member, cid, expectDigits, seriesJa, newSong) {
  const j = fromCache2(cid);
  if (j.catDigits !== expectDigits) console.error("警告: cid", cid, "catDigits", j.catDigits, "≠", expectDigits);
  return {
    id, cat, no, date,
    titleJa: seriesJa + " " + member, titleZh: "",
    catNo: "LACA-" + j.catDigits,
    teams: [member],
    note: "新曲「" + newSong + "」収録",
    tracks: mapTracks(j),
  };
}

const NEW_ENTRIES = [
  // ===== 剧场版 =====
  {
    id: "LACM-24717", cat: "剧场版", no: "插入曲", date: "2026-06-03",
    titleJa: "ハナ咲けばユメ駆ける / 光の中で花咲いて", titleZh: "",
    catNo: "LACM-24717", teams: [CLUB],
    note: "电影《Bloom Garden Party》插入曲单曲，另收录 Dream Believers（B. G. P. Ver.）",
    tracks: mapTracks(fromCache2(1895905444)),
  },
  {
    id: "berry-merry-goround", cat: "剧场版", no: "特典曲", date: "2026-05-09",
    titleJa: "Berry Merry Go Round / フリジア / PANAI☆ / 咲かnow!", titleZh: "",
    catNo: "配信限定", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"],
    dateLabel: "2026-05-09 配信",
    note: "电影预售券（4 弹）特典曲，四小队各一首，后汇总数字配信",
    tracks: mapTracks(fromCache2(1890364666)),
  },
  {
    id: "LACA-25282", cat: "剧场版", no: "OST", date: "2026-07-22",
    titleJa: "映画オリジナルサウンドトラック「Petals of History」", titleZh: "",
    catNo: "LACA-25282", teams: ["藤澤慶昌", CLUB],
    note: "电影《Bloom Garden Party》原声配乐，末轨为 光の中で花咲いて（Short Ver.）",
    tracks: mapTracks(fromCache2(6781922141)),
  },

  // ===== 电视动画相关 =====
  {
    id: "db-106-start", cat: "电视动画相关", no: "主题曲", date: "未定",
    titleJa: "Dream Believers（106期START Ver.）", titleZh: "",
    catNo: "未定", teams: [CLUB],
    dateLabel: "2026-11-14 发表 · 尚未发行",
    note: "TV 动画《Love Live! 蓮ノ空女学院スクールアイドルクラブ》（2027-01-10 起播出）主题曲",
    tracks: [{ no: 1, t: "Dream Believers（106期START Ver.）", by: CLUB }],
  },

  // ===== 成员独唱专辑 =====
  solo("LACA-19123", "成员独唱专辑", "102nd Solo", "2025-06-04", "乙宗 梢", 1811958191, "19123", "102nd Graduation Album ～Star Sign Memories～", "be proud"),
  solo("LACA-19125", "成员独唱专辑", "102nd Solo", "2025-06-04", "夕霧綴理", 1811958648, "19125", "102nd Graduation Album ～Star Sign Memories～", "幸せのリボン"),
  solo("LACA-19127", "成员独唱专辑", "102nd Solo", "2025-06-04", "藤島 慈", 1811960062, "19127", "102nd Graduation Album ～Star Sign Memories～", "やっぱ天使！"),
  solo("LACA-19176", "成员独唱专辑", "103rd Solo", "2026-07-01", "日野下花帆", 6775688809, "19176", "103rd Graduation Album ～Full Bloom Memories～", "プレイリスト／「あの日」"),
  solo("LACA-19178", "成员独唱专辑", "103rd Solo", "2026-07-01", "村野さやか", 6775689609, "19178", "103rd Graduation Album ～Full Bloom Memories～", "Bless you!"),
  solo("LACA-19180", "成员独唱专辑", "103rd Solo", "2026-07-01", "大沢瑠璃乃", 6775688961, "19180", "103rd Graduation Album ～Full Bloom Memories～", "ミジンコトランスフォーメーション"),

  // ===== 配信限定 =====
  {
    id: "LZC-3130", cat: "配信限定", no: "Collection", date: "2025-05-20",
    titleJa: "蓮ノ空女学院スクールアイドルクラブ 104th Collection", titleZh: "",
    catNo: "LZC-3130", teams: [CLUB],
    note: "104期阵容全曲重录合集，共 27 曲（含各期 Ver.）",
    tracks: mapTracks(fromCache2(1808844404)),
  },
  {
    id: "game-ver", cat: "配信限定", no: "Game Ver.", date: "アプリ内実装",
    titleJa: "ゲーム限定音源（Game Ver. 曲目）", titleZh: "",
    catNo: "游戏限定", teams: [CLUB],
    dateLabel: "《Link! Like! Love Live!》游戏内限定",
    note: "仅存在于游戏内演出，未在任何平台正式发行",
    tracks: [
      { no: 1, t: "On your mark（102期Ver.） Game Ver", by: CLUB },
      { no: 2, t: "ハロめぐ讃歌 Game Ver", by: CLUB },
      { no: 3, t: "夏めきペイン（105期Ver.） Game Ver", by: CLUB },
    ],
  },

  // ===== 系列合同曲 =====
  {
    id: "LACM-24470", cat: "系列合同曲", no: "合同", date: "2023-12-06",
    titleJa: "異次元★♥BIGBANG", titleZh: "",
    catNo: "LACM-24470", teams: ["異次元フェス"],
    note: "「異次元フェス アイドルマスター★♥ラブライブ！歌合戦」主题曲（蓮ノ空代表：日野下花帆），2023-11-08 先行配信",
    tracks: mapTracks(fromCache2(1710539357)).map(t =>
      t.t === "異次元 BIGBANG" ? { ...t, t: "異次元★♥BIGBANG" } :
      t.t === "異次元 BIGBANG (Off Vocal)" ? { ...t, t: "異次元★♥BIGBANG (Off Vocal)" } : t),
  },
  {
    id: "LACM-24630", cat: "系列合同曲", no: "合同", date: "2024-09-20",
    titleJa: "Bring the LOVE！", titleZh: "",
    catNo: "LACM-24630", teams: ["ラブライブ！シリーズ"],
    note: "Love Live! 系列亚洲巡演主题曲（蓮ノ空代表：日野下花帆）",
    tracks: mapTracks(fromCache2(1764266421)),
  },
  {
    id: "LZC-3507", cat: "系列合同曲", no: "合同", date: "2026-05-23",
    titleJa: "NEXT CARD", titleZh: "",
    catNo: "LZC-3507", teams: ["AiScReam"],
    note: "《Love Live! 系列官方卡牌游戏》主题曲；新体制 AiScReam（含セラス・柳田・リリエンフェルト）",
    tracks: mapTracks(fromCache2(1894215796)),
  },

  // ===== 翻唱曲目 =====
  ...COVER_ENTRIES,
];

// 编号单曲追加：ソレイユスマイル（官方 Extra シングル）
const SOLEYU = {
  id: "LACM-24836", cat: "编号单曲", no: "Extra", date: "2026-10-14",
  titleJa: "ソレイユスマイル", titleZh: "太阳微笑",
  catNo: "LACM-24836", teams: [CLUB],
  note: "官方 Extra シングル",
  tracks: mapTracks(fromCache2(6812995082)),
};

/* ---------- 3. 合并现有条目 ---------- */
const merged = [];
for (const e of existing) {
  const id = String(e.catNo).split("/")[0].trim();
  const cache = fromCache1(e.catNo);
  if (!cache) { console.error("警告: 无曲目缓存", id, e.titleJa); merged.push({ id, ...e }); continue; }
  merged.push({ id, ...e, tracks: mapTracks(cache) });
}
merged.push(SOLEYU);

const CAT_ORDER = [
  "编号单曲", "迷你专辑", "编号专辑", "小队单曲", "小队合发单曲",
  "剧场版", "电视动画相关", "成员独唱专辑", "配信限定", "系列合同曲", "翻唱曲目",
];
const out = [];
for (const cat of CAT_ORDER) {
  out.push(...merged.filter(e => e.cat === cat));
  out.push(...NEW_ENTRIES.filter(e => e.cat === cat));
}
if (out.length !== merged.length + NEW_ENTRIES.length) {
  console.error("分类遗漏:", out.length, "≠", merged.length + NEW_ENTRIES.length);
  const known = new Set(CAT_ORDER);
  for (const e of [...merged, ...NEW_ENTRIES]) if (!known.has(e.cat)) console.error("  未知分类:", e.cat, e.titleJa);
  process.exit(1);
}
const ids = new Set();
for (const e of out) {
  if (ids.has(e.id)) { console.error("id 重复:", e.id); process.exit(1); }
  ids.add(e.id);
}

/* ---------- 4. 序列化 ---------- */
const q = s => JSON.stringify(String(s == null ? "" : s));
const FIELD_ORDER = ["id", "cat", "no", "date", "dateLabel", "titleJa", "titleZh", "catNo", "teams", "note"];
function trackLine(t) {
  const parts = [];
  if (t.disc) parts.push("disc: " + t.disc);
  if (t.no != null) parts.push("no: " + t.no);
  parts.push("t: " + q(t.t));
  parts.push("by: " + q(t.by));
  if (t.orig) parts.push("orig: " + q(t.orig));
  if (t.date) parts.push("date: " + q(t.date));
  if (t.ms) parts.push("ms: " + t.ms);
  return "{" + parts.join(", ") + "}";
}
function entryLine(e) {
  const parts = [];
  for (const f of FIELD_ORDER) {
    if (e[f] === undefined || e[f] === "") continue;
    parts.push(f === "teams" ? "teams: [" + e.teams.map(q).join(", ") + "]" : f + ": " + q(e[f]));
  }
  if (!e.tracks || !e.tracks.length) return "  {" + parts.join(", ") + "}";
  return "  {" + parts.join(", ") + ", tracks: [\n" +
    e.tracks.map(t => "    " + trackLine(t)).join(",\n") + "\n  ]}";
}

const header = `// ============================================================
// 音乐作品数据（分类结构对齐萌娘百科《莲之空女学院学园偶像俱乐部/音乐列表》，
// 并按站点内容补充：剧场版 / 电视动画相关 / 成员独唱专辑 / 配信限定 / 系列合同曲 / 翻唱曲目）
// 由 tools/build-music-data.mjs 生成，请勿手改；曲目表合并自 iTunes JP 商店缓存。
// 数据来源：
//   萌娘百科音乐列表: https://zh.moegirl.org.cn/莲之空女学院学园偶像俱乐部/音乐列表
//   （含 Wayback 20251214222910 快照的成员独唱专辑/配信曲目/翻唱曲部分）
//   LLWiki 翻唱曲列表: https://llwiki.org/zh/莲之空女学院学园偶像俱乐部翻唱曲列表
//   日文维基百科（翻唱曲游戏实装日）: https://ja.wikipedia.org/wiki/蓮ノ空女学院スクールアイドルクラブ
//   官网 MUSIC 页(日文表题与品番逐张核对): https://www.lovelive-anime.jp/hasunosora/music/cd/
// 字段：
//   id        稳定标识（品番或自定义 slug），music-detail.html?id=xx 使用
//   cat       分类
//   no        编号标签（1st / Extra / Solo / 合同…）
//   date      发售日 YYYY-MM-DD（未发行/游戏限定为说明文字）
//   dateLabel 卡片上的日期替代文案（可空）
//   titleJa / titleZh / catNo / teams / note
//   tracks    完整曲目 [{ disc?, no, t, by, orig?, date?, ms? }]
//             orig/date 仅翻唱曲使用（原演唱者 / 游戏实装日）；ms 为时长（毫秒）
window.MUSIC_DATA = [
`;

let body = "";
let lastCat = null;
for (const e of out) {
  if (e.cat !== lastCat) { body += "\n  // ===== " + e.cat + " =====\n"; lastCat = e.cat; }
  body += entryLine(e) + ",\n";
}
fs.writeFileSync(path.join(ROOT, "js/music-data.js"), header + body + "];\n", "utf8");

const total = out.reduce((s, e) => s + (e.tracks ? e.tracks.length : 0), 0);
console.log("OK: " + out.length + " 条发行, " + total + " 首曲目");
for (const cat of CAT_ORDER) console.log("  " + cat + ": " + out.filter(e => e.cat === cat).length + " 条");
