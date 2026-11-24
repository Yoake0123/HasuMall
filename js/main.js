/* ============================================================
   蓮ノ空女学院 · 公共脚本
   导航 / 轮播 / 滚动显现 / 图片占位探测 / 角色弹窗 / 时间线
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 小队元信息 ---------- */
  var TEAMS = {
    "スリーズブーケ": { key: "sleez", zh: "樱色花束" },
    "DOLLCHESTRA": { key: "doll", zh: "人偶乐队" },
    "みらくらぱーく！": { key: "mira", zh: "奇迹公园" },
    "Edel Note": { key: "edel", zh: "高岭之音" }
  };
  function teamKey(name) {
    return TEAMS[name] ? TEAMS[name].key : "gen";
  }

  /* ---------- 角色代表色（数据见 characters-data.js 的 color 字段） ---------- */
  var HEX6 = /^#[0-9a-fA-F]{6}$/;
  function rgbOf(hex) {
    return [parseInt(hex.substr(1, 2), 16), parseInt(hex.substr(3, 2), 16), parseInt(hex.substr(5, 2), 16)];
  }
  // 浅色底用墨色字，深色底用白字，保证名牌/首字可读
  function inkOn(hex) {
    var c = rgbOf(hex);
    return (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000 > 150 ? "#37474f" : "#ffffff";
  }
  // 向白色混合得到柔和底色（p 越大越浅）
  function tint(hex, p) {
    var c = rgbOf(hex);
    var m = function (v) { return Math.round(v + (255 - v) * p); };
    return "rgb(" + m(c[0]) + "," + m(c[1]) + "," + m(c[2]) + ")";
  }
  function avatarStyle(c) {
    if (!HEX6.test(c.color || "")) return "";
    return ' style="background:linear-gradient(160deg, rgba(255,255,255,.5), rgba(255,255,255,.06) 55%), ' + c.color + '"';
  }
  function initialStyle(c) {
    if (!HEX6.test(c.color || "")) return "";
    return ' style="color:' + inkOn(c.color) + ';text-shadow:0 4px 14px rgba(55,71,79,.25)"';
  }

  /* ---------- 移动端导航 ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var list = document.querySelector(".nav-list");
    if (!toggle || !list) return;
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      list.classList.toggle("open");
    });
  }

  /* ---------- 首页轮播 ---------- */
  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;
    var track = root.querySelector(".carousel-track");
    var slides = root.querySelectorAll(".carousel-slide");
    var dotsBox = root.querySelector(".carousel-dots");
    var total = slides.length;
    var index = 0;
    var timer = null;
    var INTERVAL = 5000;

    for (var i = 0; i < total; i++) {
      (function (n) {
        var b = document.createElement("button");
        b.setAttribute("aria-label", "切换到第" + (n + 1) + "张");
        b.addEventListener("click", function () { go(n); restart(); });
        dotsBox.appendChild(b);
      })(i);
    }
    var dots = dotsBox.querySelectorAll("button");

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === index);
      }
    }
    function go(n) { index = (n + total) % total; render(); }

    function start() {
      if (timer) return;
      timer = setInterval(function () { go(index + 1); }, INTERVAL);
    }
    function stop() { clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }

    root.querySelector(".carousel-btn.prev").addEventListener("click", function () { go(index - 1); restart(); });
    root.querySelector(".carousel-btn.next").addEventListener("click", function () { go(index + 1); restart(); });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    var startX = null;
    root.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
      start();
    }, { passive: true });

    render();
    start();
  }

  /* ---------- 滚动显现 ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("visible");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  /* ---------- 图片占位探测 ----------
     元素带 data-src="images/xxx.jpg"，图片存在则显示，缺失保持占位样式。 */
  // 图片探针：按 data-src 加载；扩展名不符时自动尝试 .jpg/.png/.webp
  var IMG_EXTS = [".jpg", ".png", ".webp"];
  function probeImage(el, src, onOk) {
    var tried = {};
    function tryLoad(path) {
      if (tried[path]) return;
      tried[path] = true;
      var img = new Image();
      img.onload = function () {
        // data-src 可能挂在 <img> 上，也可能挂在容器（如轮播 .slide-bg）上
        var target = el.tagName === "IMG" ? el : el.querySelector("img");
        if (target) target.src = path;
        else el.style.backgroundImage = 'url("' + path + '")';
        if (onOk) onOk();
      };
      img.onerror = function () {
        var base = path.replace(/\.(jpe?g|png|webp)$/i, "");
        for (var i = 0; i < IMG_EXTS.length; i++) {
          if (!tried[base + IMG_EXTS[i]]) { tryLoad(base + IMG_EXTS[i]); return; }
        }
      };
      img.src = path;
    }
    tryLoad(src);
  }
  function initImageProbes() {
    var nodes = document.querySelectorAll("[data-src]");
    for (var i = 0; i < nodes.length; i++) {
      (function (el) {
        var src = el.getAttribute("data-src");
        if (!src) return;
        var show = function () {
          var holder = el.closest(".img-placeholder, .avatar, .cover, .modal-avatar, .slide-bg");
          if (holder) holder.classList.add("has-img", "is-real");
        };
        probeImage(el, src, show);
      })(nodes[i]);
    }
  }

  /* ---------- 角色页：卡片渲染 + 弹窗 ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // 小队/成员名 → 配色徽章（音乐页与播放页共用）
  function teamChip(name) {
    return '<span class="tchip tchip-' + teamKey(name) + '">' + esc(name) + "</span>";
  }

  function initCharactersPage() {
    var grid = document.getElementById("character-grid");
    if (!grid) return;
    var data = window.CHARACTERS_DATA;
    if (!Array.isArray(data) || !data.length) {
      grid.innerHTML = '<div class="empty-hint" style="grid-column:1/-1"><div class="big">✿</div>角色数据尚未载入</div>';
      return;
    }

    function avatarClass(c) { return "av-" + teamKey(c.team); }

    function cardHTML(c) {
      var tk = teamKey(c.team);
      var colorAttr = HEX6.test(c.color || "") ? ' style="--char-color:' + esc(c.color) + '"' : "";
      return (
        '<button class="character-card reveal" data-id="' + esc(c.id) + '" type="button"' + colorAttr + '>' +
          '<div class="avatar ' + avatarClass(c) + '"' + avatarStyle(c) + '>' +
            '<span class="avatar-initial"' + initialStyle(c) + '>' + esc((c.nameJa || c.name || "?").trim().charAt(0)) + "</span>" +
            '<img alt="' + esc(c.name) + '" data-src="images/characters/' + esc(c.id) + '.jpg">' +
          "</div>" +
          '<div class="card-body">' +
            "<h3>" + esc(c.nameJa || c.name) + "</h3>" +
            '<div class="reading">' + esc(c.reading) + "</div>" +
            '<div class="meta-row">' +
              '<span class="tag team t-' + tk + '">' + esc(c.team) + "</span>" +
              '<span class="tag">' + esc(c.generation) + "</span>" +
            "</div>" +
            '<p class="tagline">' + esc(c.tagline) + "</p>" +
          "</div>" +
        "</button>"
      );
    }

    function render(list) {
      grid.innerHTML = list.map(cardHTML).join("");
      initImageProbes();
      initReveal();
    }
    render(data);

    /* 小队筛选 */
    var bar = document.querySelector("[data-team-filter]");
    if (bar) {
      var buttons = bar.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
          for (var k = 0; k < buttons.length; k++) buttons[k].classList.remove("active");
          this.classList.add("active");
          var team = this.getAttribute("data-team");
          var list;
          if (team === "all") list = data;
          else if (team === "other") list = data.filter(function (c) { return teamKey(c.team) === "gen"; });
          else list = data.filter(function (c) { return c.team === team; });
          render(list);
        });
      }
    }

    /* 弹窗 */
    var modal = document.getElementById("character-modal");
    var panel = modal.querySelector(".modal-panel");

    function openModal(c) {
      var tk = teamKey(c.team);
      var hasColor = HEX6.test(c.color || "");
      panel.style.setProperty("--char-color", hasColor ? c.color : "");
      panel.style.setProperty("--char-soft", hasColor ? tint(c.color, 0.86) : "");
      var quotes = (c.quotes || []).map(function (q) {
        return '<div class="modal-quote">「' + esc(q.text) + "」<span class='src'>—— " + esc(q.source) + "</span></div>";
      }).join("");
      panel.innerHTML =
        '<button class="modal-close" type="button" aria-label="关闭">✕</button>' +
        '<div class="modal-head">' +
          '<div class="modal-avatar ' + avatarClass(c) + '"' + avatarStyle(c) + '>' +
            '<span class="avatar-initial"' + initialStyle(c) + '>' + esc((c.nameJa || c.name || "?").trim().charAt(0)) + "</span>" +
            '<img alt="' + esc(c.name) + '" data-src="images/characters/' + esc(c.id) + '.jpg">' +
          "</div>" +
          '<div class="modal-headinfo">' +
            "<h2>" + esc(c.nameJa || c.name) + "</h2>" +
            '<div class="reading">' + esc(c.reading) + "　CV：" + esc(c.cv) + "</div>" +
            '<div class="meta-row">' +
              '<span class="tag team t-' + tk + '">' + esc(c.team) + "</span>" +
              '<span class="tag">' + esc(c.generation) + "</span>" +
              (c.catchphrase ? '<span class="tag">口癖：' + esc(c.catchphrase) + "</span>" : "") +
            "</div>" +
            '<p class="tagline">' + esc(c.tagline) + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="modal-body">' +
          "<h4>性格与语言特征</h4><p>" + esc(c.personality) + "</p>" +
          "<h4>角色弧线</h4><p>" + esc(c.arc) + "</p>" +
          (c.notable ? "<h4>更多信息</h4><p>" + esc(c.notable) + "</p>" : "") +
          (quotes ? "<h4>代表台词</h4>" + quotes : "") +
        "</div>";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      initImageProbes();
      panel.querySelector(".modal-close").addEventListener("click", closeModal);
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".character-card");
      if (!card) return;
      var c = data.find(function (x) { return x.id === card.getAttribute("data-id"); });
      if (c) openModal(c);
    });
    modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  /* ---------- 音乐页 ---------- */
  function initMusicPage() {
    var grid = document.getElementById("music-grid");
    if (!grid) return;
    var data = window.MUSIC_DATA;
    if (!Array.isArray(data) || !data.length) {
      grid.innerHTML =
        '<div class="empty-hint" style="grid-column:1/-1">' +
          '<div class="big">♪</div>' +
          "曲目资料整理中——待 <code>js/music-data.js</code> 数据载入后自动展示。<br>" +
          "你可将曲目清单提供给开发者，卡片版式已就绪。" +
        "</div>";
      return;
    }

    var CAT_ORDER = ["编号单曲", "迷你专辑", "编号专辑", "小队单曲", "小队合发单曲",
      "剧场版", "电视动画相关", "成员独唱专辑", "配信限定", "系列合同曲", "翻唱曲目"];
    var CAT_DESC = {
      "编号单曲": "俱乐部名义的编号单曲",
      "迷你专辑": "Dream Believers 系列迷你专辑",
      "编号专辑": "全辑与石川联动特别专辑",
      "小队单曲": "四支小队各自的正式单曲",
      "小队合发单曲": "多小队同张发行，含 shuffle 临时小队",
      "剧场版": "映画「Bloom Garden Party」插入曲 / 特典曲 / 原声盘",
      "电视动画相关": "2027 年 TV 动画主题曲等",
      "成员独唱专辑": "毕业纪念独唱专辑（Solo Ver. + 新曲）",
      "配信限定": "重录合集与游戏内限定音源",
      "系列合同曲": "Love Live! 系列跨团合作曲目",
      "翻唱曲目": "学園アイドルステージ公开翻唱曲（按小队分组）"
    };

    function cardHTML(s) {
      // 单一演唱方用小队配色封面，团体/合发用俱乐部配色
      var tk = s.teams.length === 1 ? teamKey(s.teams[0]) : "gen";
      var teamRow = s.teams.length > 1
        ? '<div class="artist">' + s.teams.map(teamChip).join("") + "</div>"
        : '<div class="artist">' + teamChip(s.teams[0]) + "</div>";
      // 封面：品番（LAC/LZC 开头）对应 images/music/<品番>.jpg，配信等伪品番回退到 id
      var coverTok = String(s.catNo || "").split("/")[0].trim();
      var coverKey = /^(LAC|LZC)/.test(coverTok) ? coverTok : s.id;
      return (
        '<a class="music-card reveal" href="music-detail.html?id=' + encodeURIComponent(s.id) + '">' +
          '<div class="cover av-' + tk + '">' +
            '<span class="note">♪</span>' +
            '<img alt="' + esc(s.titleJa) + '" data-src="images/music/' + esc(coverKey) + '.jpg">' +
            '<span class="rel-no">' + esc(s.no) + "</span>" +
          "</div>" +
          '<div class="info">' +
            "<h3>" + esc(s.titleJa) + "</h3>" +
            (s.titleZh ? '<div class="title-zh">' + esc(s.titleZh) + "</div>" : "") +
            teamRow +
            '<div class="date">' + esc(s.dateLabel || s.date + " 发售") + " ｜ " + esc(s.catNo) + "</div>" +
            (s.note ? '<div class="note-text">' + esc(s.note) + "</div>" : "") +
            (Array.isArray(s.tracks) && s.tracks.length
              ? '<div class="track-count">♪ 全 ' + s.tracks.length + " 曲 · 点击进入播放页试听 →</div>"
              : "") +
          "</div>" +
        "</a>"
      );
    }

    // 小队单曲按四队分节，每节带 id 供首页小队卡片直达（music.html#team-sleez 等）
    var TEAM_ORDER = ["スリーズブーケ", "DOLLCHESTRA", "みらくらぱーく！", "Edel Note"];
    function teamGroupsHTML(list) {
      var html = "";
      for (var i = 0; i < TEAM_ORDER.length; i++) {
        var t = TEAM_ORDER[i], k = teamKey(t);
        var sub = list.filter(function (s) { return s.teams.length === 1 && s.teams[0] === t; });
        html +=
          '<div class="team-sub" id="team-' + k + '">' +
            '<div class="team-sub-head">' + teamChip(t) +
              '<span class="cat-desc">' + sub.length + " 张正式小队单曲</span></div>" +
            sub.map(cardHTML).join("") +
          "</div>";
      }
      return html;
    }

    function renderCat(cat) {
      var list = cat === "all" ? data : data.filter(function (s) { return s.cat === cat; });
      if (cat === "all") {
        // 全部视图按分类分节展示
        var html = "";
        for (var c = 0; c < CAT_ORDER.length; c++) {
          var name = CAT_ORDER[c];
          var sub = list.filter(function (s) { return s.cat === name; });
          var body = name === "小队单曲" ? teamGroupsHTML(sub) : sub.map(cardHTML).join("");
          html +=
            '<div class="cat-block">' +
              '<div class="cat-head"><h2>' + esc(name) + "</h2>" +
              "<span class=\"cat-desc\">" + esc(CAT_DESC[name] || "") + "</span></div>" +
              body +
            "</div>";
        }
        grid.innerHTML = html;
      } else if (cat === "小队单曲") {
        grid.innerHTML = teamGroupsHTML(list);
      } else {
        grid.innerHTML = list.map(cardHTML).join("");
      }
      initImageProbes();
      initReveal();
    }

    renderCat("all");

    var bar = document.querySelector("[data-cat-filter]");
    if (bar) {
      var buttons = bar.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
          for (var k = 0; k < buttons.length; k++) buttons[k].classList.remove("active");
          this.classList.add("active");
          renderCat(this.getAttribute("data-cat"));
        });
      }
    }

    // 首页小队卡片跳转：#team-<key> → 切到「小队单曲」标签并滚到对应小节
    var hashMatch = /^#team-(sleez|doll|mira|edel)$/.exec(location.hash || "");
    if (hashMatch) {
      var tabBtn = document.querySelector('[data-cat="小队单曲"]');
      if (tabBtn) tabBtn.click();
      var anchor = document.getElementById("team-" + hashMatch[1]);
      if (anchor) {
        var y = anchor.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - 90;
        window.scrollTo(0, y);
      }
    }
  }

  /* ---------- 剧情时间线页 ---------- */
  function initStoryPage() {
    var root = document.getElementById("timeline-root");
    if (!root) return;
    var source = document.getElementById("story-data");
    var entries;
    try {
      entries = JSON.parse(source.textContent);
    } catch (err) {
      root.innerHTML = '<div class="empty-hint">剧情数据解析失败</div>';
      return;
    }

    var eras = [];
    entries.forEach(function (it) {
      if (eras.indexOf(it.era) === -1) eras.push(it.era);
    });

    function itemHTML(it) {
      var special = it.era.indexOf("特别") !== -1;
      return (
        '<article class="tl-item reveal' + (special ? " tl-special" : "") + '">' +
          '<a class="tl-card" href="story-detail.html' + (it.id ? "?id=" + esc(it.id) : "") + '">' +
            '<div class="tl-date">' + esc(it.date) + "</div>" +
            "<h3>" + esc(it.titleZh) + "</h3>" +
            '<div class="tl-ja">' + esc(it.titleJa) + "</div>" +
            '<div class="tl-meta">' +
              '<span class="tag">' + esc(it.era) + "</span>" +
              (it.sections ? '<span class="tag">' + esc(it.sections) + " 节</span>" : "") +
              (it.words ? '<span class="tag">' + esc(it.words) + " 字</span>" : "") +
              '<span class="tag tag-open">精读 · 全文 →</span>' +
            "</div>" +
            (it.summary ? '<p class="tl-summary">' + esc(it.summary) + "</p>" : "") +
          "</a>" +
        "</article>"
      );
    }

    function render(filter) {
      var html = "";
      eras.forEach(function (era) {
        if (filter !== "all" && filter !== era) return;
        var eraClass = era.indexOf("特别") !== -1 ? " era-special" : "";
        html += '<div class="tl-era reveal' + eraClass + '">' + esc(era) + "</div>";
        html += entries.filter(function (it) { return it.era === era; }).map(itemHTML).join("");
      });
      root.innerHTML = html;
      initReveal();
    }
    render("all");

    var bar = document.querySelector("[data-era-filter]");
    if (bar) {
      var buttons = bar.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
          for (var k = 0; k < buttons.length; k++) buttons[k].classList.remove("active");
          this.classList.add("active");
          render(this.getAttribute("data-era"));
        });
      }
    }
  }

  /* ---------- 剧情详情子页（story-detail.html） ---------- */
  // 上一话/下一话的跳转顺序：与档案 index.txt 目录一致（102 特别篇在最前）
  var STORY_ORDER = ["102001",
    "103001","103002","103003","103004","103005","103006","103007","103008","103009","103010",
    "103011","103012","103013","103014","103015","103016","103017","103018",
    "104001","104002","104003","104004","104005","104006","104007","104008","104009","104010",
    "104011","104012","104013",
    "105001","105002","105003","105004","105005","105006","105007","105008","105009","105010",
    "105011","105012",
    "200001","200002"];
  // 说话人 → 小队配色（剧本内说话人用短名）
  var SPEAKER_TEAM = (function () {
    var map = {
      sleez: ["日野下花帆", "花帆", "乙宗梢", "梢", "百生吟子", "吟子"],
      doll:  ["村野さやか", "さやか", "夕霧綴理", "綴理", "徒町小鈴", "小鈴"],
      mira:  ["大沢瑠璃乃", "瑠璃乃", "藤島慈", "慈", "安養寺姫芽", "姫芽"],
      edel:  ["桂城泉", "泉", "セラス", "セラス・柳田・リリエンフェルト"]
    };
    var out = {};
    for (var k in map) { for (var i = 0; i < map[k].length; i++) out[map[k][i]] = k; }
    return out;
  })();
  // 说话人 → 官方角色代表色（与 characters-data.js 的 color 字段一致；
  // story-detail 页不加载角色数据，故在此内置，未匹配到的角色回退小队色）
  var SPEAKER_COLOR = (function () {
    var map = {
      "#f8b500": ["日野下花帆", "花帆"],
      "#68be8d": ["乙宗梢", "梢"],
      "#a2d7dd": ["百生吟子", "吟子"],
      "#5383c3": ["村野さやか", "さやか"],
      "#ba2636": ["夕霧綴理", "綴理"],
      "#fad764": ["徒町小鈴", "小鈴"],
      "#e7609e": ["大沢瑠璃乃", "瑠璃乃"],
      "#c8c2c6": ["藤島慈", "慈"],
      "#9d8de2": ["安養寺姫芽", "姫芽"],
      "#f56455": ["セラス", "セラス·柳田·リリエンフェルト", "セラス・柳田・リリエンフェルト"],
      "#1ebecd": ["桂城泉", "泉"],
      "#0d6f00": ["大賀美沙知", "沙知"]
    };
    var out = {};
    for (var hex in map) { for (var i = 0; i < map[hex].length; i++) out[map[hex][i]] = hex; }
    return out;
  })();

  function initStoryDetail() {
    var root = document.getElementById("story-detail-root");
    if (!root) return;
    var back = '<a class="sd-back" href="story.html">← 返回剧情时间线</a>';
    var m = (location.search || "").match(/[?&]id=(\d{6})/);
    if (!m) {
      root.innerHTML = back + '<div class="empty-hint"><div class="big">？</div>未指定话号，请从剧情时间线点击进入。</div>';
      return;
    }
    var id = m[1];
    root.innerHTML = back + '<div class="sd-loading">正在载入第 ' + id + ' 话数据…</div>';

    function render(p) {
      var idx = STORY_ORDER.indexOf(p.id);
      var prev = idx > 0 ? STORY_ORDER[idx - 1] : null;
      var next = idx >= 0 && idx < STORY_ORDER.length - 1 ? STORY_ORDER[idx + 1] : null;
      function loadOther(other) {
        var s = document.createElement("script");
        s.src = "js/stories/" + other + ".js";
        s.onload = function () {
          if (window.STORY_PAGE && window.STORY_PAGE.id === other) {
            render(window.STORY_PAGE);
            window.scrollTo(0, 0);
          }
        };
        document.body.appendChild(s);
        root.innerHTML = back + '<div class="sd-loading">正在载入…</div>';
      }

      var nav = p.parts.map(function (pt, i) {
        return '<a class="sd-chip" href="#part-' + i + '" data-part="' + i + '">' + esc(pt.label) + "</a>";
      }).join("");

      var noteHtml = p.note.map(function (sec) {
        return '<div class="sd-sec"><h3>' + esc(sec.h) + "</h3>" +
          sec.ps.map(function (pp) { return "<p>" + esc(pp) + "</p>"; }).join("") + "</div>";
      }).join("");

      var partsHtml = p.parts.map(function (pt, i) {
        return '<section class="sd-part" id="part-' + i + '">' +
          '<h3 class="sd-part-title">【' + esc(pt.label) + '】</h3>' +
          pt.lines.map(function (l) {
            var tk = SPEAKER_TEAM[l[0]] || "gen";
            var scol = SPEAKER_COLOR[l[0]] || "";
            var spkStyle = scol ? ' style="background:' + scol + ";color:" + inkOn(scol) + '"' : "";
            return '<div class="sd-line' + (l[0] === "独白" ? " line-monologue" : "") + '">' +
              '<span class="spk spk-' + tk + '"' + spkStyle + ">" + esc(l[0]) + "</span>" +
              '<span class="txt">' + esc(l[1]) + "</span></div>";
          }).join("") + "</section>";
      }).join("");

      root.innerHTML = back +
        '<header class="sd-head">' +
          '<div class="sd-era">' + esc(p.eraLabel) + '<span class="sd-id">No.' + esc(p.id) + "</span></div>" +
          "<h1>" + esc(p.titleZh) + "</h1>" +
          '<div class="sd-ja">' + esc(p.titleJa) + "</div>" +
          '<div class="sd-meta">' +
            '<span class="tag">' + esc(p.date) + " 公开</span>" +
            '<span class="tag">' + p.sections + " 节</span>" +
            '<span class="tag">' + p.words + " 字</span>" +
            '<span class="tag">' + p.lineCount + " 句台词</span>" +
            '<a class="tag tag-src" href="' + esc(p.url) + '" target="_blank" rel="noopener">档案站原页 ↗</a>' +
          "</div>" +
        "</header>" +
        '<section class="sd-note">' +
          '<h2 class="sd-block-title">分话精读<span class="sd-block-sub">译本正文见下方展开</span></h2>' +
          noteHtml +
        "</section>" +
        '<section class="sd-script">' +
          '<div class="sd-script-bar">' +
            '<h2 class="sd-block-title">中文译本全文</h2>' +
            '<button class="sd-toggle" id="sd-toggle" type="button">展开全文剧本（' + p.lineCount + " 行）</button>" +
          "</div>" +
          '<div class="sd-chips" id="sd-chips" hidden>' + nav + "</div>" +
          '<div id="sd-script-body" hidden>' + partsHtml + "</div>" +
        "</section>" +
        '<nav class="sd-pager">' +
          (prev ? '<a href="#" data-goto="' + prev + '">← 上一话 ' + prev + "</a>" : "<span></span>") +
          (next ? '<a href="#" data-goto="' + next + '">下一话 ' + next + " →</a>" : "<span></span>") +
        "</nav>";

      var body = document.getElementById("sd-script-body");
      var chips = document.getElementById("sd-chips");
      var toggle = document.getElementById("sd-toggle");
      function openScript() {
        body.hidden = false;
        chips.hidden = false;
        toggle.textContent = "收起全文剧本";
      }
      toggle.addEventListener("click", function () {
        if (body.hidden) { openScript(); }
        else {
          body.hidden = true; chips.hidden = true;
          toggle.textContent = "展开全文剧本（" + p.lineCount + " 行）";
          toggle.scrollIntoView({ block: "center" });
        }
      });
      chips.addEventListener("click", function (e) {
        var a = e.target.closest(".sd-chip");
        if (!a) return;
        e.preventDefault();
        openScript();
        var t = document.getElementById("part-" + a.getAttribute("data-part"));
        if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      root.querySelector(".sd-pager").addEventListener("click", function (e) {
        var a = e.target.closest("a[data-goto]");
        if (!a) return;
        e.preventDefault();
        var target = a.getAttribute("data-goto");
        // Chrome/Edge 在 file:// 下禁止 replaceState，地址更新失败也不应阻断翻页
        try { history.replaceState(null, "", "story-detail.html?id=" + target); } catch (err) { /* 忽略 */ }
        loadOther(target);
      });
    }

    var sc = document.createElement("script");
    sc.src = "js/stories/" + id + ".js";
    sc.onload = function () {
      if (window.STORY_PAGE && window.STORY_PAGE.id === id) render(window.STORY_PAGE);
      else root.innerHTML = back + '<div class="empty-hint">数据文件内容异常</div>';
    };
    sc.onerror = function () {
      root.innerHTML = back + '<div class="empty-hint"><div class="big">♪</div>未找到第 ' + id +
        " 话数据文件。<br>请先运行 <code>node tools/build-story-data.mjs</code> 生成 js/stories/ 。</div>";
    };
    document.body.appendChild(sc);
  }

  /* ---------- 音乐播放子页（music-detail.html?id=xx） ---------- */
  function initMusicDetail() {
    var root = document.getElementById("music-detail-root");
    if (!root) return;
    var data = Array.isArray(window.MUSIC_DATA) ? window.MUSIC_DATA : [];
    var FILES = window.MUSIC_FILES || {};
    var back = '<a class="sd-back" href="music.html">← 返回音乐作品</a>';

    var m = /[?&]id=([^&]+)/.exec(location.search || "");
    var id = m ? decodeURIComponent(m[1]) : "";
    var entry = null;
    for (var i = 0; i < data.length; i++) if (data[i].id === id) { entry = data[i]; break; }
    if (!entry) {
      root.innerHTML = back +
        '<div class="empty-hint"><div class="big">♪</div>未找到对应发行' +
        (id ? "（id=" + esc(id) + "）" : "") + "，请从音乐作品页点击卡片进入。</div>";
      return;
    }

    function fmtTime(sec) {
      if (!isFinite(sec) || sec < 0) return "--:--";
      var mm = Math.floor(sec / 60), ss = Math.floor(sec % 60);
      return mm + ":" + (ss < 10 ? "0" : "") + ss;
    }

    var tracks = entry.tracks || [];
    var audioFiles = FILES[entry.id] || [];
    var playable = [];
    for (i = 0; i < tracks.length; i++) if (audioFiles[i]) playable.push(i);

    document.title = entry.titleJa + " | 蓮ノ空モール";
    var tk = entry.teams.length === 1 ? teamKey(entry.teams[0]) : "gen";
    var coverKey = String(entry.catNo || "").split("/")[0].trim();

    /* 当前曲信息面板（大封面 / 碟名 / 品番 / 演唱小队） */
    var panelHTML =
      '<div class="md-panel reveal">' +
        '<div class="md-cover cover av-' + tk + '">' +
          '<span class="note">♪</span>' +
          '<img alt="' + esc(entry.titleJa) + '" data-src="images/music/' + esc(coverKey) + '.jpg">' +
          '<span class="rel-no">' + esc(entry.no) + "</span>" +
        "</div>" +
        '<div class="md-info">' +
          '<div class="md-cat">' + esc(entry.cat) + "</div>" +
          "<h1>" + esc(entry.titleJa) + "</h1>" +
          (entry.titleZh ? '<div class="title-zh">' + esc(entry.titleZh) + "</div>" : "") +
          '<div class="md-teams">' + entry.teams.map(teamChip).join("") + "</div>" +
          '<div class="md-meta">' + esc(entry.dateLabel || entry.date + " 发售") + " ｜ " + esc(entry.catNo) + "</div>" +
          (entry.note ? '<div class="note-text">' + esc(entry.note) + "</div>" : "") +
        "</div>" +
      "</div>";

    /* 播放条 */
    var playerHTML = playable.length
      ? '<div class="md-player">' +
          '<div class="md-now">' +
            '<div class="md-now-t" id="md-now-t">点击下方列表或 ▶ 开始播放</div>' +
            '<div class="md-now-sub" id="md-now-sub"></div>' +
          "</div>" +
          '<div class="md-seek">' +
            '<span class="md-time" id="md-cur">0:00</span>' +
            '<input type="range" class="md-bar" id="md-bar" min="0" max="1000" value="0" step="1" aria-label="播放进度">' +
            '<span class="md-time" id="md-dur">--:--</span>' +
          "</div>" +
          '<div class="md-controls">' +
            '<button type="button" class="md-pill" id="md-mode" title="切换循环模式">列表循环</button>' +
            '<button type="button" class="md-btn" id="md-prev" aria-label="上一曲">«</button>' +
            '<button type="button" class="md-btn md-play" id="md-play" aria-label="播放">▶︎</button>' +
            '<button type="button" class="md-btn" id="md-next" aria-label="下一曲">»</button>' +
            '<div class="md-vol">' +
              '<button type="button" class="md-pill" id="md-mute" aria-label="静音开关">静音</button>' +
              '<input type="range" class="md-bar" id="md-vol" min="0" max="100" value="10" step="1" aria-label="音量">' +
            "</div>" +
          "</div>" +
        "</div>"
      : '<div class="empty-hint md-noaudio"><div class="big">♪</div>该发行暂无本地音频，曲目清单如下。</div>';

    /* 播放列表（无音频的曲目置灰禁用） */
    var listHTML = tracks.map(function (t, n) {
      var has = !!audioFiles[n];
      return '<li class="md-track' + (has ? "" : " disabled") + '" data-i="' + n + '"' +
          (has ? "" : ' title="暂无本地音频，不可播放"') + ">" +
        '<span class="md-no">' + esc(t.no != null ? t.no : n + 1) + "</span>" +
        '<span class="md-t">' + esc(t.t) + (t.disc ? "<em>Disc " + esc(t.disc) + "</em>" : "") + "</span>" +
        teamChip(t.by || entry.teams[0]) +
        (t.orig ? '<span class="md-orig">原唱：' + esc(t.orig) + (t.date ? " · " + esc(t.date) + " 实装" : "") + "</span>" : "") +
        '<span class="md-dur">' + (t.ms ? fmtTime(t.ms / 1000) : "--:--") + "</span>" +
        '<span class="md-state" aria-hidden="true">▶︎</span>' +
      "</li>";
    }).join("");

    root.innerHTML = back + panelHTML + playerHTML +
      '<section class="md-list-sec">' +
        '<h2 class="sd-block-title">播放列表<span class="sd-block-sub">' +
          playable.length + " / " + tracks.length + " 曲有本地音频</span></h2>" +
        '<ol class="md-list" id="md-list">' + listHTML + "</ol>" +
      "</section>";
    initImageProbes();
    initReveal();

    if (!playable.length) return;

    /* ---------- 播放器逻辑 ---------- */
    var audio = new Audio();
    audio.preload = "none";
    audio.volume = 0.1;

    var MODES = ["list", "one", "shuffle"];
    var MODE_LABEL = { list: "列表循环", one: "单曲循环", shuffle: "随机播放" };
    var cur = -1, modeIdx = 0, dragging = false;

    var elPlay = document.getElementById("md-play");
    var elPrev = document.getElementById("md-prev");
    var elNext = document.getElementById("md-next");
    var elMode = document.getElementById("md-mode");
    var elMute = document.getElementById("md-mute");
    var elBar = document.getElementById("md-bar");
    var elVol = document.getElementById("md-vol");
    var elCur = document.getElementById("md-cur");
    var elDur = document.getElementById("md-dur");
    var elNowT = document.getElementById("md-now-t");
    var elNowSub = document.getElementById("md-now-sub");
    var rows = root.querySelectorAll(".md-track");

    function load(n, autoplay) {
      if (n < 0 || !audioFiles[n]) return;
      cur = n;
      audio.src = "music_source/" + encodeURIComponent(audioFiles[n]);
      var t = tracks[n];
      elNowT.textContent = t.t;
      elNowSub.innerHTML = teamChip(t.by || entry.teams[0]) +
        (t.orig ? '<span class="md-orig">原唱：' + esc(t.orig) + "</span>" : "");
      elBar.value = 0;
      paintBar(elBar);
      elCur.textContent = "0:00";
      elDur.textContent = t.ms ? fmtTime(t.ms / 1000) : "--:--";
      for (var k = 0; k < rows.length; k++) rows[k].classList.toggle("playing", k === n);
      if (autoplay) {
        audio.play().catch(function () { /* file:// 下浏览器拒绝时保持静默 */ });
        if (rows[n].scrollIntoView) rows[n].scrollIntoView({ block: "nearest" });
      }
    }

    function stepIdx(dir) {
      if (MODES[modeIdx] === "shuffle") {
        if (playable.length === 1) return playable[0];
        var p;
        do { p = playable[Math.floor(Math.random() * playable.length)]; } while (p === cur);
        return p;
      }
      var at = playable.indexOf(cur);
      if (at < 0) return dir > 0 ? playable[0] : playable[playable.length - 1];
      return playable[(at + dir + playable.length) % playable.length];
    }

    elPlay.addEventListener("click", function () {
      if (cur < 0) { load(playable[0], true); return; }
      if (audio.paused) audio.play().catch(function () {});
      else audio.pause();
    });
    elPrev.addEventListener("click", function () { load(stepIdx(-1), true); });
    elNext.addEventListener("click", function () { load(stepIdx(1), true); });
    elMode.addEventListener("click", function () {
      modeIdx = (modeIdx + 1) % MODES.length;
      elMode.textContent = MODE_LABEL[MODES[modeIdx]];
    });
    elMute.addEventListener("click", function () {
      audio.muted = !audio.muted;
      elMute.classList.toggle("active", audio.muted);
    });
    elVol.addEventListener("input", function () {
      audio.volume = elVol.value / 100;
      paintBar(elVol);
      if (audio.volume > 0 && audio.muted) { audio.muted = false; elMute.classList.remove("active"); }
    });
    paintBar(elVol);

    // 进度拖拽：input 期间只更新时间标签，松手（change）再跳转
    function paintBar(el) { el.style.setProperty("--fill", (el.value / el.max * 100) + "%"); }
    elBar.addEventListener("input", function () {
      dragging = true;
      paintBar(elBar);
      if (isFinite(audio.duration)) elCur.textContent = fmtTime(elBar.value / 1000 * audio.duration);
    });
    elBar.addEventListener("change", function () {
      if (isFinite(audio.duration)) audio.currentTime = elBar.value / 1000 * audio.duration;
      dragging = false;
    });
    audio.addEventListener("timeupdate", function () {
      if (dragging || !isFinite(audio.duration)) return;
      elBar.value = Math.round(audio.currentTime / audio.duration * 1000);
      paintBar(elBar);
      elCur.textContent = fmtTime(audio.currentTime);
      elDur.textContent = fmtTime(audio.duration);
    });
    audio.addEventListener("play", function () {
      elPlay.textContent = "❙❙";
      elPlay.setAttribute("aria-label", "暂停");
    });
    audio.addEventListener("pause", function () {
      elPlay.textContent = "▶︎";
      elPlay.setAttribute("aria-label", "播放");
    });
    audio.addEventListener("ended", function () {
      if (MODES[modeIdx] === "one") {
        audio.currentTime = 0;
        audio.play().catch(function () {});
        return;
      }
      load(stepIdx(1), true);
    });
    audio.addEventListener("error", function () {
      if (cur >= 0) elNowT.textContent = tracks[cur].t + "（音频加载失败）";
      elPlay.textContent = "▶︎";
    });

    document.getElementById("md-list").addEventListener("click", function (e) {
      var row = e.target.closest(".md-track");
      if (!row || row.classList.contains("disabled")) return;
      var n = parseInt(row.getAttribute("data-i"), 10);
      if (n === cur) {
        if (audio.paused) audio.play().catch(function () {});
        else audio.pause();
        return;
      }
      load(n, true);
    });
  }

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initCarousel();
    initCharactersPage();
    initMusicPage();
    initMusicDetail();
    initStoryPage();
    initStoryDetail();
    initImageProbes();
    initReveal();
  });
})();
