// ============================================================
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

  // ===== 编号单曲 =====
  {id: "LACM-24468", cat: "编号单曲", no: "1st", date: "2024-01-17", titleJa: "Link to the FUTURE", catNo: "LACM-24468", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "Trick & Cute", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 232594},
    {no: 2, t: "ツバサ・ラ・リベルテ", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 297191},
    {no: 3, t: "Link to the FUTURE", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 299823},
    {no: 4, t: "Trick & Cute (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 232594},
    {no: 5, t: "ツバサ・ラ・リベルテ (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 297191},
    {no: 6, t: "Link to the FUTURE (Off Vocal)", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 299824}
  ]},
  {id: "LACM-24527", cat: "编号单曲", no: "2nd", date: "2024-04-03", titleJa: "抱きしめる花びら", titleZh: "抱紧的花瓣", catNo: "LACM-24527", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "抱きしめる花びら", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 299533},
    {no: 2, t: "STEP UP !", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 247120},
    {no: 3, t: "抱きしめる花びら (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 299547},
    {no: 4, t: "STEP UP ! (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 247133}
  ]},
  {id: "LACM-24571", cat: "编号单曲", no: "3rd", date: "2024-07-17", titleJa: "Bloom the smile, Bloom the dream!", catNo: "LACM-24571", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "Bloom the smile, Bloom the dream!", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 237022},
    {no: 2, t: "365 Days", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 218470},
    {no: 3, t: "Bloom the smile, Bloom the dream! (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 236578},
    {no: 4, t: "365 Days (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 218470}
  ]},
  {id: "LACM-24652", cat: "编号单曲", no: "4th", date: "2025-02-05", titleJa: "KEY of Like！", catNo: "LACM-24652", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "KEY of Like!", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 251707},
    {no: 2, t: "Now or Never", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 260353},
    {no: 3, t: "KEY of Like! (Off Vocal)", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 251707},
    {no: 4, t: "Now or Never (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 260353}
  ]},
  {id: "LACM-24659", cat: "编号单曲", no: "5th", date: "2025-02-26", titleJa: "AURORA FLOWER", catNo: "LACM-24659", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "全国決勝大会出場曲", tracks: [
    {no: 1, t: "AURORA FLOWER", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 246987},
    {no: 2, t: "ゲッカビジン", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 225494},
    {no: 3, t: "AURORA FLOWER (Off Vocal)", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 246987},
    {no: 4, t: "ゲッカビジン (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 225493}
  ]},
  {id: "LACM-24685", cat: "编号单曲", no: "6th", date: "2025-04-09", titleJa: "いつでも、いつまでも", titleZh: "无论何时，直到永远", catNo: "LACM-24685", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "いつでも、いつまでも", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 267089},
    {no: 2, t: "いったん", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 180219},
    {no: 3, t: "いつでも、いつまでも (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 267089},
    {no: 4, t: "いったん (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 180219}
  ]},
  {id: "LACM-24697", cat: "编号单曲", no: "7th", date: "2025-07-09", titleJa: "アイドゥーミー！", titleZh: "I Do Me！", catNo: "LACM-24697", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "105期新体制首张团体单曲", tracks: [
    {no: 1, t: "アイドゥーミー!", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 242040},
    {no: 2, t: "とーひょー☆スター!", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 206867},
    {no: 3, t: "アイドゥーミー! (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 242053},
    {no: 4, t: "とーひょー☆スター! (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 206873}
  ]},
  {id: "LACM-24777", cat: "编号单曲", no: "8th", date: "2025-12-24", titleJa: "はじまりの羽音", titleZh: "启程的振翅之声", catNo: "LACM-24777", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "原定 2025-11-26，后延期", tracks: [
    {no: 1, t: "はじまりの羽音", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 244820},
    {no: 2, t: "チャーミングな花束を!", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 255439},
    {no: 3, t: "Runway", by: "村野さやか", ms: 302812},
    {no: 4, t: "はじまりの羽音 (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 244821},
    {no: 5, t: "チャーミングな花束を! (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 255438},
    {no: 6, t: "Runway (Off Vocal)", by: "村野さやか", ms: 301812}
  ]},
  {id: "LACM-24778", cat: "编号单曲", no: "9th", date: "2026-01-28", titleJa: "Echoes Beyond", catNo: "LACM-24778", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "Echoes Beyond", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 227765},
    {no: 2, t: "JOKER.", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 195320},
    {no: 3, t: "Echoes Beyond (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 227765},
    {no: 4, t: "JOKER. (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 195320}
  ]},
  {id: "LACM-24779", cat: "编号单曲", no: "10th", date: "2026-04-15", titleJa: "今、過去、未来の三原色", titleZh: "现在、过去、未来的三原色", catNo: "LACM-24779", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "一生に夢が咲くように", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 284649},
    {no: 2, t: "雪舞う空と二秒の永遠", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 279620},
    {no: 3, t: "今、過去、未来の三原色", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 260960},
    {no: 4, t: "一生に夢が咲くように (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 284649},
    {no: 5, t: "雪舞う空と二秒の永遠 (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 279620},
    {no: 6, t: "今、過去、未来の三原色 (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 260960}
  ]},
  {id: "LACM-24836", cat: "编号单曲", no: "Extra", date: "2026-10-14", titleJa: "ソレイユスマイル", titleZh: "太阳微笑", catNo: "LACM-24836", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "官方 Extra シングル", tracks: [
    {no: 1, t: "ソレイユスマイル", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 225647},
    {no: 2, t: "百億年分のしあわせ", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 238321},
    {no: 3, t: "ソレイユスマイル (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 224413},
    {no: 4, t: "百億年分のしあわせ (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 238321}
  ]},

  // ===== 迷你专辑 =====
  {id: "LACA-25045", cat: "迷你专辑", no: "Debut", date: "2023-03-29", titleJa: "Dream Believers", catNo: "LACA-25045", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "出道迷你专辑", tracks: [
    {no: 1, t: "Dream Believers", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 317740},
    {no: 2, t: "On your mark", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 236053},
    {no: 3, t: "水彩世界", by: "スリーズブーケ", ms: 216312},
    {no: 4, t: "AWOKE", by: "DOLLCHESTRA", ms: 182344},
    {no: 5, t: "ド!ド!ド!", by: "みらくらぱーく！", ms: 267337},
    {no: 6, t: "永遠のEuphoria", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 276373}
  ]},
  {id: "LACA-25089", cat: "迷你专辑", no: "2nd", date: "2024-04-17", titleJa: "Dream Believers (104期 Ver.)", catNo: "LACA-25089", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "Dream Believers (104期 Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 317740},
    {no: 2, t: "On your mark (104期 Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 236653},
    {no: 3, t: "アオクハルカ", by: "スリーズブーケ", ms: 214657},
    {no: 4, t: "レディバグ", by: "DOLLCHESTRA", ms: 216798},
    {no: 5, t: "みらくりえーしょん", by: "みらくらぱーく！", ms: 214492},
    {no: 6, t: "永遠のEuphoria (104期 Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 276373}
  ]},
  {id: "LACA-25154", cat: "迷你专辑", no: "3rd", date: "2025-04-30", titleJa: "Dream Believers (105期 Ver.)", catNo: "LACA-25154", teams: ["蓮ノ空女学院スクールアイドルクラブ"], tracks: [
    {no: 1, t: "Dream Believers (105期Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 318440},
    {no: 2, t: "Celebration!", by: "スリーズブーケ", ms: 215339},
    {no: 3, t: "アンペア", by: "DOLLCHESTRA", ms: 203931},
    {no: 4, t: "WAWO!", by: "みらくらぱーく！", ms: 215651},
    {no: 5, t: "Edelied", by: "Edel Note", ms: 206209},
    {no: 6, t: "Hello, new dream!", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 246168}
  ]},

  // ===== 编号专辑 =====
  {id: "LACA-25071", cat: "编号专辑", no: "1st", date: "2023-09-20", titleJa: "夏めきペイン", titleZh: "夏意渐浓之痛", catNo: "LACA-25071", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "首张全辑", tracks: [
    {no: 1, t: "夏めきペイン", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 203828},
    {no: 2, t: "Yup! Yup! Yup!", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 217490},
    {no: 3, t: "ココン東西", by: "みらくらぱーく！", ms: 190745},
    {no: 4, t: "残陽", by: "スリーズブーケ", ms: 220574},
    {no: 5, t: "青春の輪郭", by: "DOLLCHESTRA", ms: 278626},
    {no: 6, t: "ハクチューアラモード", by: "みらくらぱーく！", ms: 179371},
    {no: 7, t: "Dear my future", by: "スリーズブーケ", ms: 244406},
    {no: 8, t: "パラレルダンサー", by: "DOLLCHESTRA", ms: 194931},
    {no: 9, t: "明日の空の僕たちへ", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 196707},
    {no: 10, t: "Legato", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 291762}
  ]},
  {id: "LACA-25149", cat: "编号专辑", no: "SPECIAL", date: "2025-03-26", titleJa: "おいでよ！石川大観光", titleZh: "快来吧！石川大观光", catNo: "LACA-25149", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "石川县联动特别专辑", tracks: [
    {no: 1, t: "おいでよ!石川大観光", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 229960},
    {no: 2, t: "恋景色昭和ロマン", by: "スリーズブーケ", ms: 235067},
    {no: 3, t: "ベジ・ラブ・ルー", by: "DOLLCHESTRA", ms: 235227},
    {no: 4, t: "マハラジャンボリーⅡ", by: "みらくらぱーく！", ms: 259187},
    {no: 5, t: "恥は人生のかきすて", by: "百生吟子, 徒町小鈴 & 安養寺姫芽", ms: 240867},
    {no: 6, t: "Love it! Wonderful Trip!", by: "日野下花帆, 村野さやか & 大沢瑠璃乃", ms: 242787},
    {no: 7, t: "アステリズム", by: "乙宗 梢, 夕霧綴理 & 藤島 慈", ms: 234347}
  ]},
  {id: "LACA-25300", cat: "编号专辑", no: "2ND SPECIAL", date: "2026-09-21", titleJa: "おいでよ！石川大観光Ⅱ", titleZh: "快来吧！石川大观光Ⅱ", catNo: "LACA-25300", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "石川县第五弹联动", tracks: [
    {no: 1, t: "おいでよ!石川大観光Ⅱ", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 253584},
    {no: 2, t: "ぱやっぱ♪リズミックハート", by: "Ruri&To", ms: 218633},
    {no: 3, t: "女王の椅子", by: "PRINCEε>ε>", ms: 184440},
    {no: 4, t: "全部、春風になった", by: "百生吟子, 徒町小鈴, 安養寺姫芽, 桂城 泉 & セラス 柳田 リリエンフェルト", ms: 251992},
    {no: 5, t: "繋いだ今日の僕たちより", by: "乙宗 梢, 夕霧綴理 & 藤島 慈", ms: 220310},
    {no: 6, t: "ペレニアル", by: "日野下花帆, 村野さやか & 大沢瑠璃乃", ms: 267372}
  ]},

  // ===== 小队单曲 =====
  {id: "LACM-24371", cat: "小队单曲", no: "CB 1st", date: "2023-04-26", titleJa: "Reflection in the mirror", catNo: "LACM-24371", teams: ["スリーズブーケ"], note: "スリーズブーケ出道单", tracks: [
    {no: 1, t: "Reflection in the mirror", by: "スリーズブーケ", ms: 246563},
    {no: 2, t: "フォーチュンムービー", by: "スリーズブーケ", ms: 218233},
    {no: 3, t: "Mix shake!!", by: "スリーズブーケ", ms: 248531},
    {no: 4, t: "Reflection in the mirror (Off Vocal)", by: "スリーズブーケ", ms: 246563},
    {no: 5, t: "フォーチュンムービー (Off Vocal)", by: "スリーズブーケ", ms: 218984},
    {no: 6, t: "Mix shake!! (Off Vocal)", by: "スリーズブーケ", ms: 247779}
  ]},
  {id: "LACM-24408", cat: "小队单曲", no: "CB 2nd", date: "2023-08-09", titleJa: "眩耀夜行", catNo: "LACM-24408", teams: ["スリーズブーケ"], tracks: [
    {no: 1, t: "DEEPNESS", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 263733},
    {no: 2, t: "Kawaii no susume", by: "スリーズブーケ", ms: 239893},
    {no: 3, t: "眩耀夜行", by: "スリーズブーケ", ms: 245986},
    {no: 4, t: "DEEPNESS (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 263733},
    {no: 5, t: "Kawaii no susume (Off Vocal)", by: "スリーズブーケ", ms: 239894},
    {no: 6, t: "眩耀夜行 (Off Vocal)", by: "スリーズブーケ", ms: 245985}
  ]},
  {id: "LACM-24456", cat: "小队单曲", no: "CB 3rd", date: "2023-11-15", titleJa: "素顔のピクセル", titleZh: "素颜的像素", catNo: "LACM-24456", teams: ["スリーズブーケ"], tracks: [
    {no: 1, t: "素顔のピクセル", by: "スリーズブーケ", ms: 222439},
    {no: 2, t: "シュガーメルト", by: "スリーズブーケ", ms: 244223},
    {no: 3, t: "千変万華", by: "スリーズブーケ", ms: 204888},
    {no: 4, t: "素顔のピクセル (Off Vocal)", by: "スリーズブーケ", ms: 222439},
    {no: 5, t: "シュガーメルト (Off Vocal)", by: "スリーズブーケ", ms: 244223},
    {no: 6, t: "千変万華 (Off Vocal)", by: "スリーズブーケ", ms: 204888}
  ]},
  {id: "LACM-24625", cat: "小队单曲", no: "CB 4th", date: "2024-09-04", titleJa: "月夜見海月", catNo: "LACM-24625", teams: ["スリーズブーケ"], tracks: [
    {no: 1, t: "月夜見海月", by: "スリーズブーケ", ms: 233733},
    {no: 2, t: "Reflection in the mirror (104期NEW Ver.)", by: "スリーズブーケ", ms: 304640},
    {no: 3, t: "月夜見海月 (Off Vocal)", by: "スリーズブーケ", ms: 233733},
    {no: 4, t: "Reflection in the mirror (104期NEW Ver.) [Off Vocal]", by: "スリーズブーケ", ms: 304653}
  ]},
  {id: "LACM-24668", cat: "小队单曲", no: "CB 5th", date: "2025-03-19", titleJa: "ユメワズライ", titleZh: "梦想的烦恼", catNo: "LACM-24668", teams: ["スリーズブーケ"], tracks: [
    {no: 1, t: "ユメワズライ", by: "スリーズブーケ", ms: 237960},
    {no: 2, t: "Chu! Chocolate", by: "スリーズブーケ", ms: 178735},
    {no: 3, t: "ユメワズライ (Off Vocal)", by: "スリーズブーケ", ms: 237960},
    {no: 4, t: "Chu! Chocolate (Off Vocal)", by: "スリーズブーケ", ms: 178736}
  ]},
  {id: "LACM-24708", cat: "小队单曲", no: "CB 6th", date: "2025-08-20", titleJa: "フルーツパンチ", titleZh: "Fruit Punch", catNo: "LACM-24708", teams: ["スリーズブーケ"], tracks: [
    {no: 1, t: "フルーツパンチ", by: "スリーズブーケ", ms: 235280},
    {no: 2, t: "My Lucky Clover", by: "スリーズブーケ", ms: 258853},
    {no: 3, t: "フルーツパンチ (Off Vocal)", by: "スリーズブーケ", ms: 235283},
    {no: 4, t: "My Lucky Clover (Off Vocal)", by: "スリーズブーケ", ms: 258870}
  ]},
  {id: "LACM-24815", cat: "小队单曲", no: "CB 7th", date: "2026-04-08", titleJa: "不思議と君とライブラリー", titleZh: "不可思议与你与图书馆", catNo: "LACM-24815", teams: ["スリーズブーケ"], tracks: [
    {no: 1, t: "不思議と君とライブラリー", by: "スリーズブーケ", ms: 196717},
    {no: 2, t: "不思議と君とライブラリー (B. G. P. Ver.)", by: "スリーズブーケ", ms: 197218},
    {no: 3, t: "金沢片恋慕", by: "スリーズブーケ", ms: 215304},
    {no: 4, t: "不思議と君とライブラリー (Off Vocal)", by: "スリーズブーケ", ms: 197217},
    {no: 5, t: "金沢片恋慕 (Off Vocal)", by: "スリーズブーケ", ms: 215304}
  ]},
  {id: "LACM-24372", cat: "小队单曲", no: "DOLL 1st", date: "2023-04-26", titleJa: "Sparkly Spot", catNo: "LACM-24372", teams: ["DOLLCHESTRA"], note: "DOLLCHESTRA出道单", tracks: [
    {no: 1, t: "Sparkly Spot", by: "DOLLCHESTRA", ms: 188813},
    {no: 2, t: "ツキマカセ", by: "DOLLCHESTRA", ms: 251080},
    {no: 3, t: "希望的プリズム", by: "DOLLCHESTRA", ms: 257493},
    {no: 4, t: "Sparkly Spot (Off Vocal)", by: "DOLLCHESTRA", ms: 188813},
    {no: 5, t: "ツキマカセ (Off Vocal)", by: "DOLLCHESTRA", ms: 251080},
    {no: 6, t: "希望的プリズム (Off Vocal)", by: "DOLLCHESTRA", ms: 257307}
  ]},
  {id: "LACM-24409", cat: "小队单曲", no: "DOLL 2nd", date: "2023-08-09", titleJa: "Mirage Voyage", catNo: "LACM-24409", teams: ["DOLLCHESTRA"], tracks: [
    {no: 1, t: "DEEPNESS", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 263733},
    {no: 2, t: "ジブンダイアリー", by: "DOLLCHESTRA", ms: 159750},
    {no: 3, t: "Mirage Voyage", by: "DOLLCHESTRA", ms: 250721},
    {no: 4, t: "DEEPNESS (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 263733},
    {no: 5, t: "ジブンダイアリー (Off Vocal)", by: "DOLLCHESTRA", ms: 159750},
    {no: 6, t: "Mirage Voyage (Off Vocal)", by: "DOLLCHESTRA", ms: 250721}
  ]},
  {id: "LACM-24457", cat: "小队单曲", no: "DOLL 3rd", date: "2023-11-22", titleJa: "Take It Over", catNo: "LACM-24457", teams: ["DOLLCHESTRA"], tracks: [
    {no: 1, t: "Take It Over", by: "DOLLCHESTRA", ms: 226653},
    {no: 2, t: "飴色", by: "DOLLCHESTRA", ms: 188250},
    {no: 3, t: "KNOT", by: "DOLLCHESTRA", ms: 214441},
    {no: 4, t: "Take It Over (Off Vocal)", by: "DOLLCHESTRA", ms: 227631},
    {no: 5, t: "飴色 (Off Vocal)", by: "DOLLCHESTRA", ms: 187273},
    {no: 6, t: "KNOT (Off Vocal)", by: "DOLLCHESTRA", ms: 214441}
  ]},
  {id: "LACM-24626", cat: "小队单曲", no: "DOLL 4th", date: "2024-09-11", titleJa: "Proof", catNo: "LACM-24626", teams: ["DOLLCHESTRA"], tracks: [
    {no: 1, t: "Proof", by: "DOLLCHESTRA", ms: 256707},
    {no: 2, t: "Sparkly Spot (104期NEW Ver.)", by: "DOLLCHESTRA", ms: 231360},
    {no: 3, t: "Proof (Off Vocal)", by: "DOLLCHESTRA", ms: 256707},
    {no: 4, t: "Sparkly Spot (104期NEW Ver.) [Off Vocal]", by: "DOLLCHESTRA", ms: 231373}
  ]},
  {id: "LACM-24669", cat: "小队单曲", no: "DOLL 5th", date: "2025-03-19", titleJa: "COMPASS", catNo: "LACM-24669", teams: ["DOLLCHESTRA"], tracks: [
    {no: 1, t: "COMPASS", by: "DOLLCHESTRA", ms: 220617},
    {no: 2, t: "レム", by: "DOLLCHESTRA", ms: 248730},
    {no: 3, t: "COMPASS (Off Vocal)", by: "DOLLCHESTRA", ms: 220627},
    {no: 4, t: "レム (Off Vocal)", by: "DOLLCHESTRA", ms: 248733}
  ]},
  {id: "LACM-24709", cat: "小队单曲", no: "DOLL 6th", date: "2025-08-20", titleJa: "太陽であれ！", titleZh: "成为太阳吧！", catNo: "LACM-24709", teams: ["DOLLCHESTRA"], tracks: [
    {no: 1, t: "太陽であれ!", by: "DOLLCHESTRA", ms: 203573},
    {no: 2, t: "diamondz", by: "DOLLCHESTRA", ms: 207053},
    {no: 3, t: "太陽であれ! (Off Vocal)", by: "DOLLCHESTRA", ms: 203573},
    {no: 4, t: "diamondz (Off Vocal)", by: "DOLLCHESTRA", ms: 207060}
  ]},
  {id: "LACM-24816", cat: "小队单曲", no: "DOLL 7th", date: "2026-04-08", titleJa: "アイシイ", titleZh: "Icy", catNo: "LACM-24816", teams: ["DOLLCHESTRA"], tracks: [
    {no: 1, t: "アイシイ", by: "DOLLCHESTRA", ms: 191986},
    {no: 2, t: "アイシイ (B. G. P. Ver.)", by: "DOLLCHESTRA", ms: 191986},
    {no: 3, t: "アンブレラ", by: "DOLLCHESTRA", ms: 180837},
    {no: 4, t: "アイシイ (Off Vocal)", by: "DOLLCHESTRA", ms: 191986},
    {no: 5, t: "アンブレラ (Off Vocal)", by: "DOLLCHESTRA", ms: 180837}
  ]},
  {id: "LACM-24458", cat: "小队单曲", no: "MCP 1st", date: "2023-11-29", titleJa: "アイデンティティ", titleZh: "Identity", catNo: "LACM-24458", teams: ["みらくらぱーく！"], note: "みらくらぱーく！出道单", tracks: [
    {no: 1, t: "アイデンティティ", by: "みらくらぱーく！", ms: 197086},
    {no: 2, t: "天才なのかもしれない", by: "みらくらぱーく！", ms: 228371},
    {no: 3, t: "ノンフィクションヒーローショー", by: "みらくらぱーく！", ms: 216442},
    {no: 4, t: "アイデンティティ (Off Vocal)", by: "みらくらぱーく！", ms: 197086},
    {no: 5, t: "天才なのかもしれない (Off Vocal)", by: "みらくらぱーく！", ms: 228776},
    {no: 6, t: "ノンフィクションヒーローショー (Off Vocal)", by: "みらくらぱーく！", ms: 216037}
  ]},
  {id: "LACM-24523", cat: "小队单曲", no: "MCP 2nd", date: "2024-03-27", titleJa: "以心☆電信", titleZh: "以心☆电信", catNo: "LACM-24523", teams: ["みらくらぱーく！"], tracks: [
    {no: 1, t: "以心☆電信", by: "みらくらぱーく！", ms: 220720},
    {no: 2, t: "BANG YOU グラビティ", by: "みらくらぱーく！", ms: 211093},
    {no: 3, t: "マハラジャンボリー", by: "みらくらぱーく！", ms: 211573},
    {no: 4, t: "以心☆電信 (Off Vocal)", by: "みらくらぱーく！", ms: 220733},
    {no: 5, t: "BANG YOU グラビティ (Off Vocal)", by: "みらくらぱーく！", ms: 211080},
    {no: 6, t: "マハラジャンボリー (Off Vocal)", by: "みらくらぱーく！", ms: 211600}
  ]},
  {id: "LACM-24577", cat: "小队单曲", no: "MCP 3rd", date: "2024-10-02", titleJa: "ファンファーレ!!!", titleZh: "Fanfare!!!", catNo: "LACM-24577", teams: ["みらくらぱーく！"], tracks: [
    {no: 1, t: "ファンファーレ!!!", by: "みらくらぱーく！", ms: 202273},
    {no: 2, t: "アイデンティティ (104期NEW Ver.)", by: "みらくらぱーく！", ms: 194221},
    {no: 3, t: "ファンファーレ!!! (Off Vocal)", by: "みらくらぱーく！", ms: 202273},
    {no: 4, t: "アイデンティティ (104期NEW Ver.) [Off Vocal]", by: "みらくらぱーく！", ms: 194221}
  ]},
  {id: "LACM-24670", cat: "小队单曲", no: "MCP 4th", date: "2025-03-19", titleJa: "全方位キュン♡", titleZh: "全方位心动♡", catNo: "LACM-24670", teams: ["みらくらぱーく！"], tracks: [
    {no: 1, t: "全方位キュン♡", by: "みらくらぱーく！", ms: 256853},
    {no: 2, t: "かくれんぼしよう", by: "みらくらぱーく！", ms: 216067},
    {no: 3, t: "全方位キュン♡ (Off Vocal)", by: "みらくらぱーく！", ms: 256867},
    {no: 4, t: "かくれんぼしよう (Off Vocal)", by: "みらくらぱーく！", ms: 216080}
  ]},
  {id: "LACM-24773", cat: "小队单曲", no: "MCP 5th", date: "2025-10-01", titleJa: "ニャオシグニャル", titleZh: "Nyao Signyal", catNo: "LACM-24773", teams: ["みらくらぱーく！"], tracks: [
    {no: 1, t: "ニャオシグニャル", by: "みらくらぱーく！", ms: 179988},
    {no: 2, t: "ハートにQ", by: "みらくらぱーく！", ms: 187073},
    {no: 3, t: "ニャオシグニャル (Off Vocal)", by: "みらくらぱーく！", ms: 179988},
    {no: 4, t: "ハートにQ (Off Vocal)", by: "みらくらぱーく！", ms: 187073}
  ]},
  {id: "LACM-24817", cat: "小队单曲", no: "MCP 6th", date: "2026-04-08", titleJa: "トモダチになれる場所", titleZh: "能成为朋友的地方", catNo: "LACM-24817", teams: ["みらくらぱーく！"], tracks: [
    {no: 1, t: "トモダチになれる場所", by: "みらくらぱーく！", ms: 244125},
    {no: 2, t: "トモダチになれる場所 (B. G. P. Ver.)", by: "みらくらぱーく！", ms: 244125},
    {no: 3, t: "センパイ", by: "みらくらぱーく！", ms: 230169},
    {no: 4, t: "トモダチになれる場所 (Off Vocal)", by: "みらくらぱーく！", ms: 244125},
    {no: 5, t: "センパイ (Off Vocal)", by: "みらくらぱーく！", ms: 230169}
  ]},
  {id: "LACM-24689", cat: "小队单曲", no: "EN 1st", date: "2025-05-21", titleJa: "Retrofuture", catNo: "LACM-24689", teams: ["Edel Note"], note: "Edel Note出道单", tracks: [
    {no: 1, t: "Retrofuture", by: "Edel Note", ms: 199515},
    {no: 2, t: "天地黎明", by: "Edel Note", ms: 223275},
    {no: 3, t: "チリコンカン", by: "Edel Note", ms: 211779},
    {no: 4, t: "Retrofuture (Off Vocal)", by: "Edel Note", ms: 201614},
    {no: 5, t: "天地黎明 (Off Vocal)", by: "Edel Note", ms: 223275},
    {no: 6, t: "チリコンカン (Off Vocal)", by: "Edel Note", ms: 211779}
  ]},
  {id: "LACM-24774", cat: "小队单曲", no: "EN 2nd", date: "2025-10-01", titleJa: "片翼のトリバガ", titleZh: "单翼的羽蛾", catNo: "LACM-24774", teams: ["Edel Note"], tracks: [
    {no: 1, t: "片翼のトリバガ", by: "Edel Note", ms: 268707},
    {no: 2, t: "ドライブ・スペード・クレイジー", by: "Edel Note", ms: 220333},
    {no: 3, t: "片翼のトリバガ (Off Vocal)", by: "Edel Note", ms: 268720},
    {no: 4, t: "ドライブ・スペード・クレイジー (Off Vocal)", by: "Edel Note", ms: 220350}
  ]},
  {id: "LACM-24818", cat: "小队单曲", no: "EN 3rd", date: "2026-04-08", titleJa: "EdelinieN", catNo: "LACM-24818", teams: ["Edel Note"], tracks: [
    {no: 1, t: "EdelinieN", by: "Edel Note", ms: 198469},
    {no: 2, t: "ミアモーレ・ミーアキャット", by: "Edel Note", ms: 227171},
    {no: 3, t: "A出るノート", by: "Edel Note", ms: 284854},
    {no: 4, t: "EdelinieN (Off Vocal)", by: "Edel Note", ms: 198469},
    {no: 5, t: "ミアモーレ・ミーアキャット (Off Vocal)", by: "Edel Note", ms: 227171},
    {no: 6, t: "A出るノート (Off Vocal)", by: "Edel Note", ms: 284854}
  ]},

  // ===== 小队合发单曲 =====
  {id: "LACM-24391", cat: "小队合发单曲", no: "1st 合发", date: "2023-06-14", titleJa: "Holiday∞Holiday / Tragic Drops", catNo: "LACM-24391/24392", teams: ["スリーズブーケ", "DOLLCHESTRA"], tracks: [
    {no: 1, t: "謳歌爛漫", by: "スリーズブーケ", ms: 218608},
    {no: 2, t: "スケイプゴート", by: "DOLLCHESTRA", ms: 249840},
    {no: 3, t: "Holiday∞Holiday", by: "スリーズブーケ", ms: 256290},
    {no: 4, t: "Tragic Drops", by: "DOLLCHESTRA", ms: 224700}
  ]},
  {id: "LACM-24512", cat: "小队合发单曲", no: "2nd 合发", date: "2024-02-14", titleJa: "Special Thanks / 青とシャボン / ミルク", titleZh: "特别感谢 / 青色与泡泡 / 牛奶", catNo: "LACM-24512", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！"], tracks: [
    {no: 1, t: "Special Thanks", by: "スリーズブーケ", ms: 206331},
    {no: 2, t: "青とシャボン", by: "DOLLCHESTRA", ms: 253415},
    {no: 3, t: "ミルク", by: "みらくらぱーく！", ms: 292108},
    {no: 4, t: "Special Thanks (Off Vocal)", by: "スリーズブーケ", ms: 206331},
    {no: 5, t: "青とシャボン (Off Vocal)", by: "DOLLCHESTRA", ms: 253415},
    {no: 6, t: "ミルク (Off Vocal)", by: "みらくらぱーく！", ms: 292107}
  ]},
  {id: "LACM-24505", cat: "小队合发单曲", no: "shuffle 1st", date: "2024-03-20", titleJa: "Colorfulness / ハッピー至上主義！ / Pleasure Feather", catNo: "LACM-24505", teams: ["るりのとゆかいなつづりたち", "かほめぐ♡じぇらーと", "蓮ノ休日"], note: "シャッフルユニット（临时混合小队）", tracks: [
    {no: 1, t: "Colorfulness", by: "るりのとゆかいなつづりたち", ms: 214387},
    {no: 2, t: "ハッピー至上主義!", by: "かほめぐ♡じぇらーと", ms: 228599},
    {no: 3, t: "Pleasure Feather", by: "蓮ノ休日", ms: 256919},
    {no: 4, t: "Colorfulness (Off Vocal)", by: "るりのとゆかいなつづりたち", ms: 213611},
    {no: 5, t: "ハッピー至上主義! (Off Vocal)", by: "かほめぐ♡じぇらーと", ms: 228611},
    {no: 6, t: "Pleasure Feather (Off Vocal)", by: "蓮ノ休日", ms: 256919}
  ]},
  {id: "LACM-24639", cat: "小队合发单曲", no: "3rd 合发", date: "2024-12-04", titleJa: "ハナムスビ / バアドケージ / ジョーショーキリュー", titleZh: "花结 / Birdcage / 上升气流", catNo: "LACM-24639", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！"], tracks: [
    {no: 1, t: "ハナムスビ", by: "スリーズブーケ", ms: 218069},
    {no: 2, t: "バアドケージ", by: "DOLLCHESTRA", ms: 234620},
    {no: 3, t: "ジョーショーキリュー", by: "みらくらぱーく！", ms: 255391},
    {no: 4, t: "ハナムスビ (Off Vocal)", by: "スリーズブーケ", ms: 218069},
    {no: 5, t: "バアドケージ (Off Vocal)", by: "DOLLCHESTRA", ms: 235920},
    {no: 6, t: "ジョーショーキリュー (Off Vocal)", by: "みらくらぱーく！", ms: 253540}
  ]},
  {id: "LACM-24696", cat: "小队合发单曲", no: "4小队 1st", date: "2025-07-02", titleJa: "37.5℃のファンタジー / アイマイメーデー / BLAST!! / 十六夜セレーネ", titleZh: "37.5℃的幻想 / 我·谜·Mayday / BLAST!! / 十六夜塞勒涅", catNo: "LACM-24696", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"], note: "Edel Note 加入后的首张四小队合发", tracks: [
    {no: 1, t: "37.5℃のファンタジー", by: "スリーズブーケ", ms: 192907},
    {no: 2, t: "アイマイメーデー", by: "DOLLCHESTRA", ms: 175587},
    {no: 3, t: "BLAST!!", by: "みらくらぱーく！", ms: 195813},
    {no: 4, t: "十六夜セレーネ", by: "Edel Note", ms: 236013},
    {no: 5, t: "37.5℃のファンタジー (Off Vocal)", by: "スリーズブーケ", ms: 192907},
    {no: 6, t: "アイマイメーデー (Off Vocal)", by: "DOLLCHESTRA", ms: 175600},
    {no: 7, t: "BLAST!! (Off Vocal)", by: "みらくらぱーく！", ms: 195813},
    {no: 8, t: "十六夜セレーネ (Off Vocal)", by: "Edel Note", ms: 236027}
  ]},
  {id: "LACM-24743", cat: "小队合发单曲", no: "4小队 2nd", date: "2025-09-03", titleJa: "可惜夜花火 / ブルウモーメント / Very! Very! COCO夏っ / フュージョンクラスト", catNo: "LACM-24743", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"], note: "官方称「2ndユニットスプリットシングル」", tracks: [
    {no: 1, t: "可惜夜花火", by: "スリーズブーケ", ms: 236191},
    {no: 2, t: "ブルウモーメント", by: "DOLLCHESTRA", ms: 247143},
    {no: 3, t: "Very! Very! COCO夏っ", by: "みらくらぱーく！", ms: 193788},
    {no: 4, t: "フュージョンクラスト", by: "Edel Note", ms: 269863},
    {no: 5, t: "可惜夜花火 (Off Vocal)", by: "スリーズブーケ", ms: 236191},
    {no: 6, t: "ブルウモーメント (Off Vocal)", by: "DOLLCHESTRA", ms: 247623},
    {no: 7, t: "Very! Very! COCO夏っ (Off Vocal)", by: "みらくらぱーく！", ms: 193307},
    {no: 8, t: "フュージョンクラスト (Off Vocal)", by: "Edel Note", ms: 269863}
  ]},
  {id: "LACM-24780", cat: "小队合发单曲", no: "shuffle 2nd", date: "2025-12-03", titleJa: "ちょ、尊いLOVE / Nεw Black", titleZh: "哇，尊入爱河", catNo: "LACM-24780", teams: ["Ruri&To", "PRINCEε>ε>"], note: "シャッフルユニットスプリットシングル（官方名）", tracks: [
    {no: 1, t: "ちょ、尊いLOVE", by: "Ruri&To", ms: 226005},
    {no: 2, t: "平成ギャルズ!!!!", by: "Ruri&To", ms: 247847},
    {no: 3, t: "Nεw Black", by: "PRINCEε>ε>", ms: 184222},
    {no: 4, t: "IcHiGo milK love", by: "PRINCEε>ε>", ms: 231490},
    {no: 5, t: "ちょ、尊いLOVE (Off Vocal)", by: "Ruri&To", ms: 226006},
    {no: 6, t: "平成ギャルズ!!!! (Off Vocal)", by: "Ruri&To", ms: 247847},
    {no: 7, t: "Nεw Black (Off Vocal)", by: "PRINCEε>ε>", ms: 184222},
    {no: 8, t: "IcHiGo milK love (Off Vocal)", by: "PRINCEε>ε>", ms: 231490}
  ]},
  {id: "LACM-24747", cat: "小队合发单曲", no: "4小队 3rd", date: "2025-12-10", titleJa: "乙女詞華集 / ガランドFlash / バイタルサイン / シアター生き様", catNo: "LACM-24747", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"], tracks: [
    {no: 1, t: "乙女詞華集", by: "スリーズブーケ", ms: 211436},
    {no: 2, t: "ガランドFlash", by: "DOLLCHESTRA", ms: 195756},
    {no: 3, t: "バイタルサイン", by: "みらくらぱーく！", ms: 201522},
    {no: 4, t: "シアター生き様", by: "Edel Note", ms: 197108},
    {no: 5, t: "乙女詞華集 (Off Vocal)", by: "スリーズブーケ", ms: 211436},
    {no: 6, t: "ガランドFlash (Off Vocal)", by: "DOLLCHESTRA", ms: 195756},
    {no: 7, t: "バイタルサイン (Off Vocal)", by: "みらくらぱーく！", ms: 201522},
    {no: 8, t: "シアター生き様 (Off Vocal)", by: "Edel Note", ms: 197108}
  ]},
  {id: "LACM-24812", cat: "小队合发单曲", no: "4小队 4th", date: "2026-02-18", titleJa: "Sayo-Shigure / リブウト / Hip, hip, hooray! / 令嬢モブ！", catNo: "LACM-24812", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"], tracks: [
    {no: 1, t: "Sayo-Shigure", by: "スリーズブーケ", ms: 208021},
    {no: 2, t: "リブウト", by: "DOLLCHESTRA", ms: 245179},
    {no: 3, t: "Hip, hip, hooray!", by: "みらくらぱーく！", ms: 190900},
    {no: 4, t: "令嬢モブ!", by: "Edel Note", ms: 269876},
    {no: 5, t: "Sayo-Shigure (Off Vocal)", by: "スリーズブーケ", ms: 208021},
    {no: 6, t: "リブウト (Off Vocal)", by: "DOLLCHESTRA", ms: 245179},
    {no: 7, t: "Hip, hip, hooray! (Off Vocal)", by: "みらくらぱーく！", ms: 190900},
    {no: 8, t: "令嬢モブ! (Off Vocal)", by: "Edel Note", ms: 269877}
  ]},

  // ===== 剧场版 =====
  {id: "LACM-24717", cat: "剧场版", no: "插入曲", date: "2026-06-03", titleJa: "ハナ咲けばユメ駆ける / 光の中で花咲いて", catNo: "LACM-24717", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "电影《Bloom Garden Party》插入曲单曲，另收录 Dream Believers（B. G. P. Ver.）", tracks: [
    {no: 1, t: "ハナ咲けばユメ駆ける", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 204693},
    {no: 2, t: "光の中で花咲いて", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 288147},
    {no: 3, t: "Dream Believers (B. G. P. Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 318440},
    {no: 4, t: "ハナ咲けばユメ駆ける (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 204693},
    {no: 5, t: "光の中で花咲いて (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 288147},
    {no: 6, t: "Dream Believers (Off Vocal)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 318187}
  ]},
  {id: "berry-merry-goround", cat: "剧场版", no: "特典曲", date: "2026-05-09", dateLabel: "2026-05-09 配信", titleJa: "Berry Merry Go Round / フリジア / PANAI☆ / 咲かnow!", catNo: "配信限定", teams: ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"], note: "电影预售券（4 弹）特典曲，四小队各一首，后汇总数字配信", tracks: [
    {no: 1, t: "Berry Merry Go Round", by: "スリーズブーケ", ms: 224880},
    {no: 2, t: "フリジア", by: "DOLLCHESTRA", ms: 217206},
    {no: 3, t: "PANAI☆", by: "みらくらぱーく！", ms: 240458},
    {no: 4, t: "咲かnow!", by: "Edel Note", ms: 229560},
    {no: 5, t: "Berry Merry Go Round (Off Vocal)", by: "スリーズブーケ", ms: 224907},
    {no: 6, t: "フリジア (Off Vocal)", by: "DOLLCHESTRA", ms: 217206},
    {no: 7, t: "PANAI☆ (Off Vocal)", by: "みらくらぱーく！", ms: 240458},
    {no: 8, t: "咲かnow! (Off Vocal)", by: "Edel Note", ms: 228920}
  ]},
  {id: "LACA-25282", cat: "剧场版", no: "OST", date: "2026-07-22", titleJa: "映画オリジナルサウンドトラック「Petals of History」", catNo: "LACA-25282", teams: ["藤澤慶昌", "蓮ノ空女学院スクールアイドルクラブ"], note: "电影《Bloom Garden Party》原声配乐，末轨为 光の中で花咲いて（Short Ver.）", tracks: [
    {no: 1, t: "録画開始!", by: "藤澤慶昌", ms: 109413},
    {no: 2, t: "登る先には…", by: "藤澤慶昌", ms: 167800},
    {no: 3, t: "繋がりの風吹く坂", by: "藤澤慶昌", ms: 114133},
    {no: 4, t: "にぎやかな予感", by: "藤澤慶昌", ms: 141440},
    {no: 5, t: "いつかまた、みんなで", by: "藤澤慶昌", ms: 141520},
    {no: 6, t: "鼓動の向こうへ", by: "藤澤慶昌", ms: 134720},
    {no: 7, t: "待ち望んでいた時間", by: "藤澤慶昌", ms: 133813},
    {no: 8, t: "笑顔の種蒔き", by: "藤澤慶昌", ms: 125747},
    {no: 9, t: "さくらんぼ色の花束", by: "藤澤慶昌", ms: 115200},
    {no: 10, t: "笑顔の天才が実るまで", by: "藤澤慶昌", ms: 153987},
    {no: 11, t: "みらくらパフォーマー", by: "藤澤慶昌", ms: 176293},
    {no: 12, t: "それでも前へ", by: "藤澤慶昌", ms: 170640},
    {no: 13, t: "騎士と姫の戯れ", by: "藤澤慶昌", ms: 138707},
    {no: 14, t: "変わりたい?", by: "藤澤慶昌", ms: 133040},
    {no: 15, t: "夕焼けに溶ける声", by: "藤澤慶昌", ms: 158200},
    {no: 16, t: "きっと、ここから", by: "藤澤慶昌", ms: 87333},
    {no: 17, t: "花びらは覚えてる", by: "藤澤慶昌", ms: 126320},
    {no: 18, t: "見つけた!", by: "藤澤慶昌", ms: 98507},
    {no: 19, t: "心動かすリズム", by: "藤澤慶昌", ms: 102640},
    {no: 20, t: "三華終律", by: "藤澤慶昌", ms: 183547},
    {no: 21, t: "泣いてもいい夜だから", by: "藤澤慶昌", ms: 114733},
    {no: 22, t: "君へ、咲き継ぐ", by: "藤澤慶昌", ms: 131627},
    {no: 23, t: "光の中で花咲いて (Short Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 153000}
  ]},

  // ===== 电视动画相关 =====
  {id: "db-106-start", cat: "电视动画相关", no: "主题曲", date: "未定", dateLabel: "2026-11-14 发表 · 尚未发行", titleJa: "Dream Believers（106期START Ver.）", catNo: "未定", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "TV 动画《Love Live! 蓮ノ空女学院スクールアイドルクラブ》（2027-01-10 起播出）主题曲", tracks: [
    {no: 1, t: "Dream Believers（106期START Ver.）", by: "蓮ノ空女学院スクールアイドルクラブ"}
  ]},

  // ===== 成员独唱专辑 =====
  {id: "LACA-19123", cat: "成员独唱专辑", no: "102nd Solo", date: "2025-06-04", titleJa: "102nd Graduation Album ～Star Sign Memories～ 乙宗 梢", catNo: "LACA-19123", teams: ["乙宗 梢"], note: "新曲「be proud」収録", tracks: [
    {no: 1, t: "水彩世界", by: "乙宗 梢", ms: 216312},
    {no: 2, t: "謳歌爛漫", by: "乙宗 梢", ms: 218608},
    {no: 3, t: "Reflection in the mirror", by: "乙宗 梢", ms: 246563},
    {no: 4, t: "Holiday∞Holiday", by: "乙宗 梢", ms: 256290},
    {no: 5, t: "眩耀夜行", by: "乙宗 梢", ms: 245986},
    {no: 6, t: "素顔のピクセル", by: "乙宗 梢", ms: 222439},
    {no: 7, t: "千変万華", by: "乙宗 梢", ms: 204888},
    {no: 8, t: "Special Thanks", by: "乙宗 梢", ms: 206327},
    {disc: 2, no: 1, t: "アオクハルカ", by: "乙宗 梢", ms: 214653},
    {disc: 2, no: 2, t: "月夜見海月", by: "乙宗 梢", ms: 233747},
    {disc: 2, no: 3, t: "ハナムスビ", by: "乙宗 梢", ms: 218067},
    {disc: 2, no: 4, t: "ユメワズライ", by: "乙宗 梢", ms: 237960},
    {disc: 2, no: 5, t: "明日の空の僕たちへ", by: "乙宗 梢", ms: 196907},
    {disc: 2, no: 6, t: "DEEPNESS", by: "乙宗 梢", ms: 264733},
    {disc: 2, no: 7, t: "Dream Believers (SAKURA Ver.)", by: "乙宗 梢", ms: 317400},
    {disc: 2, no: 8, t: "be proud", by: "乙宗 梢", ms: 202766}
  ]},
  {id: "LACA-19125", cat: "成员独唱专辑", no: "102nd Solo", date: "2025-06-04", titleJa: "102nd Graduation Album ～Star Sign Memories～ 夕霧綴理", catNo: "LACA-19125", teams: ["夕霧綴理"], note: "新曲「幸せのリボン」収録", tracks: [
    {no: 1, t: "AWOKE", by: "夕霧綴理", ms: 182344},
    {no: 2, t: "スケイプゴート", by: "夕霧綴理", ms: 249840},
    {no: 3, t: "Sparkly Spot", by: "夕霧綴理", ms: 189816},
    {no: 4, t: "Tragic Drops", by: "夕霧綴理", ms: 224700},
    {no: 5, t: "Mirage Voyage", by: "夕霧綴理", ms: 250721},
    {no: 6, t: "Take It Over", by: "夕霧綴理", ms: 226653},
    {no: 7, t: "KNOT", by: "夕霧綴理", ms: 214441},
    {no: 8, t: "青とシャボン", by: "夕霧綴理", ms: 253415},
    {disc: 2, no: 1, t: "レディバグ", by: "夕霧綴理", ms: 216798},
    {disc: 2, no: 2, t: "Proof", by: "夕霧綴理", ms: 256717},
    {disc: 2, no: 3, t: "バアドケージ", by: "夕霧綴理", ms: 234620},
    {disc: 2, no: 4, t: "COMPASS", by: "夕霧綴理", ms: 220626},
    {disc: 2, no: 5, t: "ツバサ・ラ・リベルテ", by: "夕霧綴理", ms: 297191},
    {disc: 2, no: 6, t: "DEEPNESS", by: "夕霧綴理", ms: 264733},
    {disc: 2, no: 7, t: "Dream Believers (SAKURA Ver.)", by: "夕霧綴理", ms: 317407},
    {disc: 2, no: 8, t: "幸せのリボン", by: "夕霧綴理", ms: 233697}
  ]},
  {id: "LACA-19127", cat: "成员独唱专辑", no: "102nd Solo", date: "2025-06-04", titleJa: "102nd Graduation Album ～Star Sign Memories～ 藤島 慈", catNo: "LACA-19127", teams: ["藤島 慈"], note: "新曲「やっぱ天使！」収録", tracks: [
    {no: 1, t: "ド!ド!ド!", by: "藤島 慈", ms: 267337},
    {no: 2, t: "ハクチューアラモード", by: "藤島 慈", ms: 179371},
    {no: 3, t: "ココン東西", by: "藤島 慈", ms: 190745},
    {no: 4, t: "アイデンティティ", by: "藤島 慈", ms: 197086},
    {no: 5, t: "ノンフィクションヒーローショー", by: "藤島 慈", ms: 216442},
    {no: 6, t: "ミルク", by: "藤島 慈", ms: 292108},
    {no: 7, t: "以心☆電信", by: "藤島 慈", ms: 220732},
    {no: 8, t: "BANG YOU グラビティ", by: "藤島 慈", ms: 211084},
    {disc: 2, no: 1, t: "みらくりえーしょん", by: "藤島 慈", ms: 214492},
    {disc: 2, no: 2, t: "ファンファーレ!!!", by: "藤島 慈", ms: 201973},
    {disc: 2, no: 3, t: "ジョーショーキリュー", by: "藤島 慈", ms: 255391},
    {disc: 2, no: 4, t: "全方位キュン♡", by: "藤島 慈", ms: 256858},
    {disc: 2, no: 5, t: "夏めきペイン", by: "藤島 慈", ms: 203828},
    {disc: 2, no: 6, t: "DEEPNESS", by: "藤島 慈", ms: 264733},
    {disc: 2, no: 7, t: "Dream Believers (SAKURA Ver.)", by: "藤島 慈", ms: 317407},
    {disc: 2, no: 8, t: "やっぱ天使!", by: "藤島 慈", ms: 222088}
  ]},
  {id: "LACA-19176", cat: "成员独唱专辑", no: "103rd Solo", date: "2026-07-01", titleJa: "103rd Graduation Album ～Full Bloom Memories～ 日野下花帆", catNo: "LACA-19176", teams: ["日野下花帆"], note: "新曲「プレイリスト／「あの日」」収録", tracks: [
    {no: 1, t: "水彩世界", by: "日野下花帆", ms: 216312},
    {no: 2, t: "謳歌爛漫", by: "日野下花帆", ms: 218608},
    {no: 3, t: "Reflection in the mirror", by: "日野下花帆", ms: 246553},
    {no: 4, t: "Holiday∞Holiday", by: "日野下花帆", ms: 256300},
    {no: 5, t: "眩耀夜行", by: "日野下花帆", ms: 245986},
    {no: 6, t: "素顔のピクセル", by: "日野下花帆", ms: 222439},
    {no: 7, t: "千変万華", by: "日野下花帆", ms: 204888},
    {no: 8, t: "Special Thanks", by: "日野下花帆", ms: 206331},
    {disc: 2, no: 1, t: "アオクハルカ", by: "日野下花帆", ms: 214657},
    {disc: 2, no: 2, t: "月夜見海月", by: "日野下花帆", ms: 233742},
    {disc: 2, no: 3, t: "ハナムスビ", by: "日野下花帆", ms: 218069},
    {disc: 2, no: 4, t: "ユメワズライ", by: "日野下花帆", ms: 237960},
    {disc: 2, no: 5, t: "Celebration!", by: "日野下花帆", ms: 215339},
    {disc: 2, no: 6, t: "フルーツパンチ", by: "日野下花帆", ms: 235286},
    {disc: 2, no: 7, t: "乙女詞華集", by: "日野下花帆", ms: 211436},
    {disc: 2, no: 8, t: "不思議と君とライブラリー", by: "日野下花帆", ms: 196717},
    {disc: 2, no: 9, t: "今、過去、未来の三原色", by: "日野下花帆", ms: 260960},
    {disc: 2, no: 10, t: "アイドゥーミー!", by: "日野下花帆", ms: 242049},
    {disc: 2, no: 11, t: "Dream Believers (SAKURA Ver.)", by: "日野下花帆", ms: 317740},
    {disc: 2, no: 12, t: "プレイリスト/「あの日」", by: "日野下花帆", ms: 191907}
  ]},
  {id: "LACA-19178", cat: "成员独唱专辑", no: "103rd Solo", date: "2026-07-01", titleJa: "103rd Graduation Album ～Full Bloom Memories～ 村野さやか", catNo: "LACA-19178", teams: ["村野さやか"], note: "新曲「Bless you!」収録", tracks: [
    {no: 1, t: "AWOKE", by: "村野さやか", ms: 182344},
    {no: 2, t: "スケイプゴート", by: "村野さやか", ms: 249840},
    {no: 3, t: "Sparkly Spot", by: "村野さやか", ms: 189816},
    {no: 4, t: "Tragic Drops", by: "村野さやか", ms: 224700},
    {no: 5, t: "Mirage Voyage", by: "村野さやか", ms: 250721},
    {no: 6, t: "Take It Over", by: "村野さやか", ms: 226653},
    {no: 7, t: "KNOT", by: "村野さやか", ms: 214441},
    {no: 8, t: "青とシャボン", by: "村野さやか", ms: 253415},
    {disc: 2, no: 1, t: "レディバグ", by: "村野さやか", ms: 216798},
    {disc: 2, no: 2, t: "Proof", by: "村野さやか", ms: 256717},
    {disc: 2, no: 3, t: "バアドケージ", by: "村野さやか", ms: 234620},
    {disc: 2, no: 4, t: "COMPASS", by: "村野さやか", ms: 220626},
    {disc: 2, no: 5, t: "アンペア", by: "村野さやか", ms: 203933},
    {disc: 2, no: 6, t: "アイマイメーデー", by: "村野さやか", ms: 175593},
    {disc: 2, no: 7, t: "太陽であれ!", by: "村野さやか", ms: 203576},
    {disc: 2, no: 8, t: "アイシイ", by: "村野さやか", ms: 191983},
    {disc: 2, no: 9, t: "はじまりの羽音", by: "村野さやか", ms: 244820},
    {disc: 2, no: 10, t: "アイドゥーミー!", by: "村野さやか", ms: 242049},
    {disc: 2, no: 11, t: "Dream Believers (SAKURA Ver.)", by: "村野さやか", ms: 317407},
    {disc: 2, no: 12, t: "Bless you!", by: "村野さやか", ms: 247047}
  ]},
  {id: "LACA-19180", cat: "成员独唱专辑", no: "103rd Solo", date: "2026-07-01", titleJa: "103rd Graduation Album ～Full Bloom Memories～ 大沢瑠璃乃", catNo: "LACA-19180", teams: ["大沢瑠璃乃"], note: "新曲「ミジンコトランスフォーメーション」収録", tracks: [
    {no: 1, t: "ド!ド!ド!", by: "大沢瑠璃乃", ms: 267333},
    {no: 2, t: "ハクチューアラモード", by: "大沢瑠璃乃", ms: 179373},
    {no: 3, t: "ココン東西", by: "大沢瑠璃乃", ms: 190747},
    {no: 4, t: "アイデンティティ", by: "大沢瑠璃乃", ms: 197080},
    {no: 5, t: "ノンフィクションヒーローショー", by: "大沢瑠璃乃", ms: 216440},
    {no: 6, t: "ミルク", by: "大沢瑠璃乃", ms: 292107},
    {no: 7, t: "以心☆電信", by: "大沢瑠璃乃", ms: 220733},
    {no: 8, t: "BANG YOU グラビティ", by: "大沢瑠璃乃", ms: 211080},
    {disc: 2, no: 1, t: "みらくりえーしょん", by: "大沢瑠璃乃", ms: 214493},
    {disc: 2, no: 2, t: "ファンファーレ!!!", by: "大沢瑠璃乃", ms: 201973},
    {disc: 2, no: 3, t: "ジョーショーキリュー", by: "大沢瑠璃乃", ms: 255400},
    {disc: 2, no: 4, t: "全方位キュン♡", by: "大沢瑠璃乃", ms: 256853},
    {disc: 2, no: 5, t: "WAWO!", by: "大沢瑠璃乃", ms: 215653},
    {disc: 2, no: 6, t: "BLAST!!", by: "大沢瑠璃乃", ms: 195813},
    {disc: 2, no: 7, t: "ニャオシグニャル", by: "大沢瑠璃乃", ms: 179987},
    {disc: 2, no: 8, t: "トモダチになれる場所", by: "大沢瑠璃乃", ms: 244120},
    {disc: 2, no: 9, t: "Echoes Beyond", by: "大沢瑠璃乃", ms: 227773},
    {disc: 2, no: 10, t: "アイドゥーミー!", by: "大沢瑠璃乃", ms: 242040},
    {disc: 2, no: 11, t: "Dream Believers (SAKURA Ver.)", by: "大沢瑠璃乃", ms: 317413},
    {disc: 2, no: 12, t: "ミジンコトランスフォーメーション", by: "大沢瑠璃乃", ms: 255433}
  ]},

  // ===== 配信限定 =====
  {id: "LZC-3130", cat: "配信限定", no: "Collection", date: "2025-05-20", titleJa: "蓮ノ空女学院スクールアイドルクラブ 104th Collection", catNo: "LZC-3130", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "104期阵容全曲重录合集，共 27 曲（含各期 Ver.）", tracks: [
    {no: 1, t: "DEEPNESS (ReC Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 264733},
    {no: 2, t: "夏めきペイン (104期Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 203828},
    {no: 3, t: "Trick & Cute (104期Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 232594},
    {no: 4, t: "ツバサ・ラ・リベルテ (104期Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 297191},
    {no: 5, t: "Link to the FUTURE (104期Ver.)", by: "スリーズブーケ, DOLLCHESTRA & みらくらぱーく！", ms: 299824},
    {no: 6, t: "Dream Believers (SAKURA Ver.)", by: "蓮ノ空女学院スクールアイドルクラブ", ms: 317740},
    {disc: 2, no: 1, t: "水彩世界 (104期Ver.)", by: "スリーズブーケ", ms: 216312},
    {disc: 2, no: 2, t: "Mix shake!! (104期Ver.)", by: "スリーズブーケ", ms: 248531},
    {disc: 2, no: 3, t: "Holiday∞Holiday (104期Ver.)", by: "スリーズブーケ", ms: 256290},
    {disc: 2, no: 4, t: "眩耀夜行 (104期Ver.)", by: "スリーズブーケ", ms: 245986},
    {disc: 2, no: 5, t: "素顔のピクセル (104期Ver.)", by: "スリーズブーケ", ms: 222439},
    {disc: 2, no: 6, t: "千変万華 (104期Ver.)", by: "スリーズブーケ", ms: 204888},
    {disc: 2, no: 7, t: "シュガーメルト (104期Ver.)", by: "スリーズブーケ", ms: 244223},
    {disc: 3, no: 1, t: "AWOKE (104期Ver.)", by: "DOLLCHESTRA", ms: 182344},
    {disc: 3, no: 2, t: "希望的プリズム (104期Ver.)", by: "DOLLCHESTRA", ms: 257493},
    {disc: 3, no: 3, t: "Tragic Drops (104期Ver.)", by: "DOLLCHESTRA", ms: 224700},
    {disc: 3, no: 4, t: "Mirage Voyage (104期Ver.)", by: "DOLLCHESTRA", ms: 250721},
    {disc: 3, no: 5, t: "Take It Over (104期Ver.)", by: "DOLLCHESTRA", ms: 226653},
    {disc: 3, no: 6, t: "KNOT (104期Ver.)", by: "DOLLCHESTRA", ms: 214441},
    {disc: 3, no: 7, t: "青春の輪郭 (104期Ver.)", by: "DOLLCHESTRA", ms: 278627},
    {disc: 4, no: 1, t: "ド!ド!ド! (104期Ver.)", by: "みらくらぱーく！", ms: 267337},
    {disc: 4, no: 2, t: "ハクチューアラモード (104期Ver.)", by: "みらくらぱーく！", ms: 179371},
    {disc: 4, no: 3, t: "ココン東西 (104期Ver.)", by: "みらくらぱーく！", ms: 190745},
    {disc: 4, no: 4, t: "ノンフィクションヒーローショー (104期Ver.)", by: "みらくらぱーく！", ms: 216442},
    {disc: 4, no: 5, t: "以心☆電信 (104期Ver.)", by: "みらくらぱーく！", ms: 220731},
    {disc: 4, no: 6, t: "マハラジャンボリー (104期Ver.)", by: "みらくらぱーく！", ms: 211578},
    {disc: 4, no: 7, t: "天才なのかもしれない (104期Ver.)", by: "みらくらぱーく！", ms: 228371}
  ]},
  {id: "game-ver", cat: "配信限定", no: "Game Ver.", date: "アプリ内実装", dateLabel: "《Link! Like! Love Live!》游戏内限定", titleJa: "ゲーム限定音源（Game Ver. 曲目）", catNo: "游戏限定", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "仅存在于游戏内演出，未在任何平台正式发行", tracks: [
    {no: 1, t: "On your mark（102期Ver.） Game Ver", by: "蓮ノ空女学院スクールアイドルクラブ"},
    {no: 2, t: "ハロめぐ讃歌 Game Ver", by: "蓮ノ空女学院スクールアイドルクラブ"},
    {no: 3, t: "夏めきペイン（105期Ver.） Game Ver", by: "蓮ノ空女学院スクールアイドルクラブ"}
  ]},

  // ===== 系列合同曲 =====
  {id: "LACM-24470", cat: "系列合同曲", no: "合同", date: "2023-12-06", titleJa: "異次元★♥BIGBANG", catNo: "LACM-24470", teams: ["異次元フェス"], note: "「異次元フェス アイドルマスター★♥ラブライブ！歌合戦」主题曲（蓮ノ空代表：日野下花帆），2023-11-08 先行配信", tracks: [
    {no: 1, t: "異次元★♥BIGBANG", by: "島村卯月, 最上静香, 月岡恋鐘, 高海千歌, 上原歩夢, 澁谷かのん & 日野下花帆", ms: 316214},
    {no: 2, t: "異次元★♥BIGBANG (Off Vocal)", by: "島村卯月, 最上静香, 月岡恋鐘, 高海千歌, 上原歩夢, 澁谷かのん & 日野下花帆", ms: 316214}
  ]},
  {id: "LACM-24630", cat: "系列合同曲", no: "合同", date: "2024-09-20", titleJa: "Bring the LOVE！", catNo: "LACM-24630", teams: ["ラブライブ！シリーズ"], note: "Love Live! 系列亚洲巡演主题曲（蓮ノ空代表：日野下花帆）", tracks: [
    {no: 1, t: "Bring the LOVE!", by: "渡辺 曜, 上原歩夢, 澁谷かのん, 日野下花帆 & 高坂穂乃果", ms: 223520},
    {no: 2, t: "Bring the LOVE! (Off Vocal)", by: "渡辺 曜, 上原歩夢, 澁谷かのん, 日野下花帆 & 高坂穂乃果", ms: 222267}
  ]},
  {id: "LZC-3507", cat: "系列合同曲", no: "合同", date: "2026-05-23", titleJa: "NEXT CARD", catNo: "LZC-3507", teams: ["AiScReam"], note: "《Love Live! 系列官方卡牌游戏》主题曲；新体制 AiScReam（含セラス・柳田・リリエンフェルト）", tracks: [
    {no: 1, t: "NEXT CARD", by: "AiScReam", ms: 192859},
    {no: 2, t: "NEXT CARD (Off Vocal)", by: "AiScReam", ms: 193402}
  ]},

  // ===== 翻唱曲目 =====
  {id: "cover-all", cat: "翻唱曲目", no: "全体", date: "2023-05-20～2026-03-10", dateLabel: "2023-05 ～ 2026-03 逐曲公开", titleJa: "学園アイドルステージ カバー曲（蓮ノ空女学院スクールアイドルクラブ）", catNo: "配信限定", teams: ["蓮ノ空女学院スクールアイドルクラブ"], note: "手机游戏《Link! Like! Love Live!》「学園アイドルステージ」与官方 YouTube 公开的翻唱曲，无实体/配信发行", tracks: [
    {t: "僕らのLIVE 君とのLIFE", by: "", orig: "μ's", date: "2023-05-20"},
    {t: "CHANGE!!!!", by: "", orig: "765PRO ALLSTARS", date: "2023-12-10"},
    {t: "ダイヤモンドハッピー", by: "乙宗 梢・夕霧綴理・藤島 慈", orig: "わか・ふうり・すなお from STAR☆ANIS", date: "2024-02-20"},
    {t: "lucky train!", by: "日野下花帆・村野さやか・大沢瑠璃乃", orig: "るか・もな・みき from AIKATSU☆STARS!", date: "2024-02-20"},
    {t: "Snow halation", by: "", orig: "μ's", date: "2024-05-19"},
    {t: "夏色えがおで1,2,Jump!", by: "", orig: "μ's", date: "2024-08-11"},
    {t: "STARTLINER", by: "", orig: "オンゲキシューターズ", date: "2024-12-12"},
    {t: "僕らは今のなかで", by: "", orig: "μ's", date: "2025-10-14"},
    {t: "Blessing", by: "", orig: "halyosy feat. 初音ミク・鏡音リン・鏡音レン・巡音ルカ・KAITO・MEIKO", date: "2026-03-10"}
  ]},
  {id: "cover-cb", cat: "翻唱曲目", no: "CB", date: "2023-05-20～2026-02-20", dateLabel: "2023-05 ～ 2026-02 逐曲公开", titleJa: "学園アイドルステージ カバー曲（スリーズブーケ）", catNo: "配信限定", teams: ["スリーズブーケ"], note: "含成员个人名义翻唱（日野下花帆・乙宗 梢・百生吟子）", tracks: [
    {t: "君のこころは輝いてるかい？", by: "", orig: "Aqours", date: "2023-05-20"},
    {t: "Preserved Roses", by: "", orig: "T.M.Revolution×水樹奈々", date: "2023-05-20"},
    {t: "ハッピーシンセサイザ", by: "", orig: "EasyPop feat. 巡音ルカ・GUMI", date: "2023-05-20"},
    {t: "ビバハピ", by: "日野下花帆", orig: "Mitchie M feat. 初音ミク", date: "2023-05-20"},
    {t: "深愛", by: "乙宗 梢", orig: "水樹奈々", date: "2023-05-20"},
    {t: "心予報", by: "", orig: "Eve feat. 初音ミク", date: "2023-07-13"},
    {t: "御旗のもとに", by: "", orig: "巴里華撃団", date: "2024-02-10"},
    {t: "NEO SKY, NEO MAP!", by: "", orig: "虹ヶ咲学園スクールアイドル同好会", date: "2024-06-20"},
    {t: "ルージュの伝言", by: "百生吟子", orig: "荒井由実", date: "2024-09-22"},
    {t: "Welcome!", by: "乙宗 梢", orig: "デ・ジ・キャラット（かとうひろこ、真田アサミ）", date: "2025-02-17"},
    {t: "コネクト", by: "", orig: "ClariS", date: "2025-03-20"},
    {t: "START!! True dreams", by: "", orig: "Liella!", date: "2025-08-10"},
    {t: "もういちど ルミナス", by: "", orig: "Pastel*Palettes", date: "2026-01-05"},
    {t: "気まぐれロマンティック", by: "", orig: "いきものがかり", date: "2026-02-20"}
  ]},
  {id: "cover-doll", cat: "翻唱曲目", no: "DOLL", date: "2023-05-20～2026-01-05", dateLabel: "2023-05 ～ 2026-01 逐曲公开", titleJa: "学園アイドルステージ カバー曲（DOLLCHESTRA）", catNo: "配信限定", teams: ["DOLLCHESTRA"], note: "含成员个人名义翻唱（村野さやか・夕霧綴理・徒町小鈴）", tracks: [
    {t: "始まりは君の空", by: "", orig: "Liella!", date: "2023-05-20"},
    {t: "名前のない怪物", by: "", orig: "EGOIST", date: "2023-05-20"},
    {t: "そばかす", by: "村野さやか", orig: "JUDY AND MARY", date: "2023-05-20"},
    {t: "ロストワンの号哭", by: "夕霧綴理", orig: "Neru feat. 鏡音リン", date: "2023-05-20"},
    {t: "ヴィラン", by: "", orig: "てにをは feat. flower", date: "2023-06-21"},
    {t: "威風堂々", by: "", orig: "梅とら feat. 巡音ルカ・初音ミク・鏡音リン・GUMI・IA", date: "2023-09-09"},
    {t: "祝福", by: "", orig: "YOASOBI", date: "2024-01-20"},
    {t: "Daydream Warrior", by: "", orig: "Aqours", date: "2024-07-21"},
    {t: "ビビデバ", by: "徒町小鈴", orig: "星街すいせい", date: "2024-10-19"},
    {t: "雑踏、僕らの街", by: "", orig: "トゲナシトゲアリ", date: "2025-01-18"},
    {t: "虹色Passions！", by: "", orig: "虹ヶ咲学園スクールアイドル同好会", date: "2025-07-09"},
    {t: "BOW AND ARROW", by: "", orig: "米津玄師", date: "2025-12-19"},
    {t: "壱雫空", by: "", orig: "MyGO!!!!!", date: "2026-01-05"}
  ]},
  {id: "cover-mira", cat: "翻唱曲目", no: "MIRA", date: "2023-05-20～2026-01-05", dateLabel: "2023-05 ～ 2026-01 逐曲公开", titleJa: "学園アイドルステージ カバー曲（みらくらぱーく！）", catNo: "配信限定", teams: ["みらくらぱーく！"], note: "含成员个人名义翻唱（大沢瑠璃乃・藤島 慈・安養寺姫芽）", tracks: [
    {t: "いーあるふぁんくらぶ", by: "", orig: "みきとP feat. GUMI・鏡音リン", date: "2023-05-20"},
    {t: "TOKIMEKI Runners", by: "", orig: "虹ヶ咲学園スクールアイドル同好会", date: "2023-05-20"},
    {t: "狙いうち", by: "大沢瑠璃乃", orig: "山本リンダ", date: "2023-05-20"},
    {t: "♡桃色片想い♡", by: "藤島 慈", orig: "松浦亜弥", date: "2023-05-20"},
    {t: "強風オールバック", by: "", orig: "ゆこぴ feat. 歌愛ユキ", date: "2023-09-09"},
    {t: "ダンスロボットダンス", by: "", orig: "ナユタン星人 feat. 初音ミク", date: "2023-11-10"},
    {t: "ミラクルショッピング ～ドン・キホーテのテーマ～", by: "", orig: "田中マイミ", date: "2024-07-27"},
    {t: "常夏☆サンシャイン", by: "", orig: "Liella!", date: "2024-08-21"},
    {t: "This game", by: "安養寺姫芽", orig: "鈴木このみ", date: "2024-11-04"},
    {t: "きゅうくらりん", by: "", orig: "いよわ feat. 可不", date: "2025-02-05"},
    {t: "青空Jumping Heart", by: "", orig: "Aqours", date: "2025-06-14"},
    {t: "テレパシ", by: "", orig: "DECO*27 feat. 初音ミク", date: "2025-11-30"},
    {t: "キミがいなくちゃっ！", by: "", orig: "ハロー、ハッピーワールド！", date: "2026-01-05"}
  ]},
  {id: "cover-edel", cat: "翻唱曲目", no: "EDEL", date: "2025-04-22～2026-01-31", dateLabel: "2025-04 ～ 2026-01 逐曲公开", titleJa: "学園アイドルステージ カバー曲（Edel Note）", catNo: "配信限定", teams: ["Edel Note"], note: "含成员个人名义翻唱（セラス・柳田・リリエンフェルト・桂城 泉）", tracks: [
    {t: "輪舞-revolution", by: "", orig: "奥井雅美", date: "2025-04-22"},
    {t: "ロミオとシンデレラ", by: "セラス・柳田・リリエンフェルト", orig: "doriko feat. 初音ミク", date: "2025-05-10"},
    {t: "月光", by: "桂城 泉", orig: "鬼束ちひろ", date: "2025-06-22"},
    {t: "Shocking Party", by: "", orig: "A-RISE", date: "2025-09-09"},
    {t: "FIRE BIRD", by: "", orig: "Roselia", date: "2026-01-05"},
    {t: "あんなに一緒だったのに", by: "", orig: "See-Saw", date: "2026-01-31"}
  ]},
];
