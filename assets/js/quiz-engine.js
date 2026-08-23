// 测验引擎增强（v1.2+）：在 quiz-v2.js 之后加载，覆盖原引擎函数
// 新增：题型（单选/判断/多选/情景/计算/查表）、难度筛选、分模块成绩统计、键盘答题、题目收藏
(function () {
  "use strict";

  // 合并精选 + 扩充题库 + 面试题库
  var FULL_BANK = (typeof QUIZ_BANK === "undefined" ? [] : QUIZ_BANK)
    .concat(typeof QUIZ_BANK_EXTRA === "undefined" ? [] : QUIZ_BANK_EXTRA)
    .concat(typeof QUIZ_INTERVIEW === "undefined" ? [] : QUIZ_INTERVIEW);
  // 去重：同一题干只保留一题（避免重复刷题）
  var seenQ = {};
  FULL_BANK = FULL_BANK.filter(function (q) {
    if (!q || !q.q) return false;
    if (seenQ[q.q]) return false;
    seenQ[q.q] = 1;
    return true;
  });
  var INTERVIEW_COUNT = FULL_BANK.filter(function (q) { return q.interview; }).length;

  var MODULE_LABELS = {
    clearance: "电气间隙", creepage: "爬电距离", surge: "雷击浪涌", hipot: "耐压测试",
    shock: "防电击", energy: "能量危险", fire: "防火", thermal: "热量/温升",
    mechanical: "机械", radiation: "辐射", chemical: "化学", reliability: "可靠性",
    ip: "IP 防护", ik: "IK 冲击", leakage: "泄漏电流", grounding: "接地", selv: "SELV",
    emc: "EMC", battery: "电池", materials: "材料/CTI", certification: "认证", framework: "标准结构"
  };
  var TYPE_LABELS = { single: "单选", judge: "判断", multi: "多选", scenario: "情景", calc: "计算", lookup: "查表", fill: "填空", write: "写答" };
  var DIFF_LABELS = { 1: "基础", 2: "进阶", 3: "拔高" };
  var STATS_KEY = "angui-quiz-stats-v1";
  var FLAG_KEY = "angui-quiz-flag-v1";

  var activeDifficulty = "all"; // "all" | 1 | 2 | 3
  var activeType = "all"; // "all" | single | judge | multi | fill | write | interview

  function answerText(item) {
    if (!item) return "";
    if (item.type === "multi") {
      return (item.answer || []).map(function (i) { return item.options[i]; }).join("、");
    }
    if (item.type === "judge") return item.answer === 0 ? "正确" : "错误";
    if (item.type === "fill") return (item.accepted || [])[0] || "";
    if (item.type === "write") return "开放作答（参考答案见解析）";
    return item.options[item.answer];
  }

  function getStats() { try { return JSON.parse(localStorage.getItem(STATS_KEY)) || {}; } catch (e) { return {}; } }
  function getFlags() { try { return JSON.parse(localStorage.getItem(FLAG_KEY)) || []; } catch (e) { return []; } }

  function recordStat(module, correct) {
    var s = getStats();
    var key = module || "auto";
    var m = s[key] || { n: 0, c: 0 };
    m.n += 1; if (correct) m.c += 1;
    s[key] = m;
    try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }

  /* ===== 覆盖：题库列表（含难度筛选） ===== */
  function currentList() {
    var bank;
    if (activeModule === "all") bank = FULL_BANK.slice().concat(AUTO_SAMPLE);
    else if (activeModule === "auto") bank = AUTO_QUESTIONS.slice();
    else bank = FULL_BANK.concat(AUTO_QUESTIONS).filter(function (q) { return q.module === activeModule; });

    // 题型筛选
    if (activeType === "interview") {
      bank = bank.filter(function (q) { return q.interview; });
    } else if (activeType !== "all") {
      bank = bank.filter(function (q) { return (q.type || "single") === activeType; });
    }

    if (activeDifficulty !== "all") {
      bank = bank.filter(function (q) {
        if (q.auto) return false; // 难度筛选只看精选题库
        return (q.difficulty || 1) === activeDifficulty;
      });
    }
    return bank;
  }

  /* ===== 覆盖：开始答题 ===== */
  function startQuiz(custom) {
    state.list = shuffle((custom && Array.isArray(custom)) ? custom : currentList());
    if (state.list.length === 0) { if (window.AnGuiUX) window.AnGuiUX.toast("该筛选下暂无题目"); return; }
    state.index = 0;
    state.score = 0;
    state.answered = false;
    state.multiSel = [];
    $("quizIntro").hidden = true;
    $("quizScore").hidden = true;
    $("quizBox").hidden = false;
    renderQuestion();
  }

  function buildTags(item) {
    var tags = "";
    if (item.interview) tags += '<span class="quiz-interview-tag">💼 面试题</span>';
    if (item.auto) tags += '<span class="quiz-auto-tag">⚙ 自动生成</span>';
    var t = item.type || "single";
    if (t !== "single" && TYPE_LABELS[t]) tags += '<span class="quiz-type-tag t-' + t + '">' + TYPE_LABELS[t] + '</span>';
    var d = item.difficulty || 1;
    if (d > 1) tags += '<span class="quiz-diff d' + d + '">' + (DIFF_LABELS[d] || "") + '</span>';
    return tags;
  }

  /* ===== 覆盖：渲染题目 ===== */
  function renderQuestion() {
    var item = state.list[state.index];
    state.answered = false;
    state.multiSel = [];
    $("quizCurrent").textContent = state.index + 1;
    $("quizTotal").textContent = state.list.length;
    $("quizQuestion").textContent = item.q;
    $("quizBar").style.width = ((state.index / state.list.length) * 100) + "%";

    var tags = document.getElementById("quizTags");
    if (tags) tags.innerHTML = buildTags(item);

    var sc = document.getElementById("quizScenario");
    if (sc) { sc.innerHTML = item.scenario || ""; sc.hidden = !item.scenario; }

    var isMulti = item.type === "multi";
    var isFill = item.type === "fill";
    var isWrite = item.type === "write";

    var box = $("quizOptions");
    box.innerHTML = "";
    if (isFill) {
      box.innerHTML = '<input type="text" id="quizFillInput" class="quiz-fill-input" placeholder="填写答案后回车，或点「检查答案」" autocomplete="off" autocapitalize="off">' +
        '<p style="margin-top:12px"><button type="button" class="btn btn-primary" id="quizFillBtn">检查答案</button> ' +
        '<button type="button" class="btn" id="quizFillPeek">看答案（记错题）</button></p>';
      var fi = document.getElementById("quizFillInput");
      if (fi) {
        fi.focus();
        fi.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submitFill(); } });
      }
      var fb = document.getElementById("quizFillBtn");
      if (fb) fb.addEventListener("click", submitFill);
      var fp = document.getElementById("quizFillPeek");
      if (fp) fp.addEventListener("click", function () {
        var input = document.getElementById("quizFillInput");
        if (input) input.value = (item.accepted || [])[0] || "";
        state.answered = true;
        finishAnswer(false);
      });
    } else if (isWrite) {
      box.innerHTML = '<textarea id="quizWriteArea" class="quiz-write-area" rows="5" placeholder="用你自己的话回答，把逻辑讲清楚（重在思路，不怕口语化）。写完后可直接对照参考答案，或直接下一题。"></textarea>' +
        '<p style="margin-top:12px"><button type="button" class="btn btn-primary" id="quizWriteShow">查看参考答案</button> ' +
        '<button type="button" class="btn" id="quizWriteNext">直接下一题</button></p>';
      var wa = document.getElementById("quizWriteArea");
      if (wa) wa.focus();
      var ws = document.getElementById("quizWriteShow");
      if (ws) ws.addEventListener("click", function () { showWriteRef(item); });
      var wn = document.getElementById("quizWriteNext");
      if (wn) wn.addEventListener("click", function () { state.answered = true; finishAnswer(true); });
    } else {
      var options = isMulti ? item.options : (item.type === "judge" ? ["正确", "错误"] : item.options);
      options.forEach(function (text, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option" + (isMulti ? " multi" : "");
        btn.textContent = (isMulti ? "☐ " : "") + text;
        btn.addEventListener("click", function () { if (isMulti) toggleMulti(i); else choose(i); });
        box.appendChild(btn);
      });
    }

    var flagBtn = document.getElementById("quizFlag");
    if (flagBtn) {
      var flags = getFlags();
      var on = flags.some(function (f) { return f.q === item.q; });
      flagBtn.classList.toggle("on", on);
      flagBtn.textContent = on ? "★ 已标记" : "☆ 标记";
    }

    $("quizExplain").hidden = true;
    $("quizExplain").textContent = "";
    // 多选：直接显示「提交答案」；其他题型：作答后再显示「下一题」
    var nextBtn = $("quizNext");
    if (isMulti) {
      nextBtn.textContent = "提交答案";
      nextBtn.style.display = "inline-block";
    } else {
      nextBtn.style.display = "none";
    }
  }

  function finishAnswer(correct) {
    var item = state.list[state.index];
    if (correct) state.score += 1; else saveWrong(item);
    recordStat(item.module, correct);
    if (window.SpacedReview) window.SpacedReview.onAnswer(item, correct);
    var explain = $("quizExplain");
    var hint = (!correct && item.type === "fill") ? "正确答案：" + answerText(item) + "。" : "";
    explain.textContent = (correct ? "回答正确。" : "回答错误。" + hint) + (item.explain || "");
    explain.hidden = false;
    var next = $("quizNext");
    next.textContent = state.index === state.list.length - 1 ? "查看成绩" : "下一题";
    next.style.display = "inline-block";
    renderStats();
  }

  /* ===== 覆盖：单选/判断作答 ===== */
  function choose(i) {
    if (state.answered) return;
    var item = state.list[state.index];
    if (item.type === "multi") return;
    state.answered = true;
    var buttons = $("quizOptions").querySelectorAll(".quiz-option");
    buttons.forEach(function (btn, idx) {
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add("correct");
      if (idx === i && i !== item.answer) btn.classList.add("wrong");
    });
    finishAnswer(i === item.answer);
  }

  /* ===== 多选 ===== */
  function toggleMulti(i) {
    if (state.answered) return;
    var idx = state.multiSel.indexOf(i);
    if (idx >= 0) state.multiSel.splice(idx, 1); else state.multiSel.push(i);
    var item = state.list[state.index];
    var buttons = $("quizOptions").querySelectorAll(".quiz-option");
    buttons.forEach(function (btn, k) {
      var on = state.multiSel.indexOf(k) >= 0;
      btn.classList.toggle("selected", on);
      btn.textContent = (on ? "☑ " : "☐ ") + item.options[k];
    });
  }

  function confirmMulti() {
    if (state.answered) return;
    var item = state.list[state.index];
    if (item.type !== "multi") return;
    state.answered = true;
    var ans = (item.answer || []).slice().sort();
    var sel = state.multiSel.slice().sort();
    var correct = sel.length === ans.length && sel.every(function (v, k) { return v === ans[k]; });
    var buttons = $("quizOptions").querySelectorAll(".quiz-option");
    buttons.forEach(function (btn, k) {
      btn.disabled = true;
      var isRight = (item.answer || []).indexOf(k) >= 0;
      var isPicked = state.multiSel.indexOf(k) >= 0;
      if (isRight) btn.classList.add("correct");
      if (isPicked && !isRight) btn.classList.add("wrong");
    });
    var confirmBtn = document.getElementById("quizConfirm");
    if (confirmBtn) confirmBtn.style.display = "none";
    finishAnswer(correct);
  }

  /* ===== 填空 ===== */
  function normAns(s) {
    return String(s || "").trim().toLowerCase()
      .replace(/[，。；、：！？\s·\-—\/]+/g, "")
      .replace(/(?<=\d)(毫米|伏特|千伏|千伏特|伏|微安|毫安|ua|ma|µa|μa|毫克|千克|kg|mg|赫兹|ac|dc|mm|kv|hz|°c|℃|度|米|克|g|安|a|m|v)+/g, "");
  }
  function submitFill() {
    if (state.answered) return;
    var item = state.list[state.index];
    if (item.type !== "fill") return;
    var input = document.getElementById("quizFillInput");
    var val = input ? input.value : "";
    var ok = (item.accepted || []).some(function (a) { return normAns(a) === normAns(val); });
    state.answered = true;
    if (input) {
      input.disabled = true;
      input.style.borderColor = ok ? "#1d7a46" : "#b3261e";
    }
    finishAnswer(ok);
  }
  function escHtml(t) {
    var d = document.createElement("div");
    d.textContent = t == null ? "" : String(t);
    return d.innerHTML;
  }
  /* ===== 写答：查看参考答案（对照自检，不判分、不卡流程） ===== */
  function showWriteRef(item) {
    var holder = document.getElementById("quizWriteRefHolder");
    if (!holder) {
      holder = document.createElement("div");
      holder.id = "quizWriteRefHolder";
      holder.className = "quiz-write-ref";
      $("quizOptions").appendChild(holder);
    }
    holder.innerHTML = '<p class="feyn-label"><b>参考答案（来自站内知识体系，对照自检即可）：</b></p>' +
      '<div class="feyn-ref">' + escHtml(item.ref || "（暂无参考答案）") + "</div>" +
      (item.points && item.points.length
        ? '<p class="feyn-label"><b>考察点：</b></p><div class="feyn-gaps">' +
          item.points.map(function (p) { return '<span class="feyn-gap">' + escHtml(p) + "</span>"; }).join("") + "</div>"
        : "") +
      '<p style="margin-top:12px"><button type="button" class="btn btn-primary" id="quizWriteNext2">下一题</button></p>';
    var n2 = document.getElementById("quizWriteNext2");
    if (n2) n2.addEventListener("click", function () { state.answered = true; finishAnswer(true); });
  }

  /* ===== 覆盖：下一题 ===== */
  function nextQuestion() {
    var item = state.list[state.index];
    if (item && item.type === "multi" && !state.answered) { confirmMulti(); return; }
    if (!state.answered) return;
    if (state.index < state.list.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      $("quizBox").hidden = true;
      var scoreBox = $("quizScore");
      scoreBox.hidden = false;
      $("quizScoreNum").textContent = state.score + " / " + state.list.length;
      $("quizScoreText").textContent =
        state.score === state.list.length ? "全部答对，基本功很扎实！"
          : state.score >= state.list.length * 0.75 ? "掌握得不错，再复习一下错题对应的章节。"
          : "建议回到对应章节重新学习一遍。";
      renderStats();
    }
  }

  /* ===== 覆盖：题量提示 ===== */
  function updateQuizCount() {
    var el = document.getElementById("quizCount");
    if (!el) return;
    var diffTag = activeDifficulty === "all" ? "" : " · " + DIFF_LABELS[activeDifficulty];
    if (activeModule === "all") {
      el.textContent = "题库 " + FULL_BANK.length + " 题（含面试题 " + INTERVIEW_COUNT + " 题）+ 自动生成 " + AUTO_SAMPLE.length + " 题（随机抽样）" + diffTag;
    } else if (activeModule === "auto") {
      el.textContent = "自动生成题库：" + AUTO_QUESTIONS.length + " 题（由知识卡 / 标准 / 可靠性数据自动生成）";
    } else {
      el.textContent = "当前题库：" + currentList().length + " 题（每次随机出题）" + diffTag;
    }
  }

  /* ===== 覆盖：错题本渲染（支持多选/判断） ===== */
  function renderWrongBook() {
    var box = document.getElementById("wrongBook");
    if (!box) return;
    var list = getWrong();
    var count = document.getElementById("wrongCount");
    if (count) count.textContent = list.length;
    box.innerHTML = list.length
      ? list.map(function (w, i) {
          var a = w.answerText || answerText(w);
          return '<div class="wrong-item"><p><b>' + (i + 1) + '. ' + w.q + "</b></p>" +
            '<p style="color:var(--muted);font-size:13px">正确答案：' + a + "　" + (w.explain || "") + "</p></div>";
        }).join("")
      : '<p style="color:var(--muted)">还没有错题，继续加油。</p>';
  }

  /* ===== 成绩统计 / 掌握度 ===== */
  function renderStats() {
    var box = document.getElementById("statsPanel");
    if (!box) return;
    var s = getStats();
    var rows = Object.keys(s).filter(function (k) { return k !== "auto"; })
      .map(function (k) { return { key: k, label: MODULE_LABELS[k] || k, n: s[k].n, c: s[k].c }; })
      .filter(function (r) { return r.n > 0; })
      .sort(function (a, b) { return (a.c / a.n) - (b.c / b.n); });
    if (!rows.length) {
      box.innerHTML = '<p style="color:var(--muted);margin:0">还没有答题记录，做完题后这里会显示各模块掌握度与最薄弱环节。</p>';
      return;
    }
    var weakest = rows[0];
    box.innerHTML = rows.map(function (r) {
      var pct = Math.round(r.c / r.n * 100);
      var cls = pct >= 80 ? "good" : (pct >= 60 ? "mid" : "weak");
      return '<div class="stat-row"><span class="stat-label">' + r.label + '</span>' +
        '<span class="stat-bar"><span class="stat-fill ' + cls + '" style="width:' + pct + '%"></span></span>' +
        '<span class="stat-num">' + r.c + '/' + r.n + ' · ' + pct + '%</span></div>';
    }).join("") +
      '<p class="stat-weak">最薄弱：<b>' + weakest.label + '</b>（' + Math.round(weakest.c / weakest.n * 100) + '%）</p>' +
      '<p><button type="button" class="btn btn-primary" id="weakRetryBtn">重练薄弱模块</button> ' +
      '<button type="button" class="btn" id="statsResetBtn">清空统计</button></p>';
    var wr = document.getElementById("weakRetryBtn");
    if (wr) wr.addEventListener("click", function () {
      activeModule = weakest.key;
      activeDifficulty = "all";
      syncChips();
      syncDiffChips();
      updateQuizCount();
      startQuiz();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    var sr = document.getElementById("statsResetBtn");
    if (sr) sr.addEventListener("click", function () {
      try { localStorage.removeItem(STATS_KEY); } catch (e) { /* ignore */ }
      renderStats();
      if (window.AnGuiUX) window.AnGuiUX.toast("统计已清空");
    });
  }

  function syncChips() {
    document.querySelectorAll("[data-qmodule]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-qmodule") === activeModule);
      b.setAttribute("aria-pressed", b.getAttribute("data-qmodule") === activeModule ? "true" : "false");
    });
  }

  function syncDiffChips() {
    document.querySelectorAll("[data-qdiff]").forEach(function (b) {
      var on = b.getAttribute("data-qdiff") === String(activeDifficulty);
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  /* ===== 题型筛选按钮（单选/判断/多选/填空/写答/面试） ===== */
  function syncTypeChips() {
    document.querySelectorAll("[data-qtype]").forEach(function (b) {
      var on = b.getAttribute("data-qtype") === activeType;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-qtype]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeType = btn.getAttribute("data-qtype");
      syncTypeChips();
      updateQuizCount();
      startQuiz();
    });
  });

  /* ===== 题目收藏 / 标记 ===== */
  function flagCurrent() {
    if (!state.list.length || state.index >= state.list.length) return;
    var item = state.list[state.index];
    var flags = getFlags();
    var i = flags.findIndex(function (f) { return f.q === item.q; });
    var btn = document.getElementById("quizFlag");
    if (i >= 0) {
      flags.splice(i, 1);
      if (btn) { btn.classList.remove("on"); btn.textContent = "☆ 标记"; }
      if (window.AnGuiUX) window.AnGuiUX.toast("已取消标记");
    } else {
      flags.push(item);
      if (btn) { btn.classList.add("on"); btn.textContent = "★ 已标记"; }
      if (window.AnGuiUX) window.AnGuiUX.toast("已标记，可在下方「标记收藏」重练");
    }
    try { localStorage.setItem(FLAG_KEY, JSON.stringify(flags)); } catch (e) { /* ignore */ }
    renderFlags();
  }

  function renderFlags() {
    var box = document.getElementById("flagBook");
    if (!box) return;
    var flags = getFlags();
    var cnt = document.getElementById("flagCount");
    if (cnt) cnt.textContent = flags.length;
    box.innerHTML = flags.length
      ? flags.map(function (w, i) {
          var a = w.answerText || answerText(w);
          return '<div class="flag-item"><p><b>' + (i + 1) + '. ' + w.q + '</b></p><p style="color:var(--muted);font-size:13px">正确答案：' + a + "　" + (w.explain || "") + "</p></div>";
        }).join("")
      : '<p style="color:var(--muted)">还没有标记的题目，答题时可点「标记」收藏。</p>';
  }

  /* ===== 键盘答题 ===== */
  document.addEventListener("keydown", function (e) {
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (!state.list || !state.list.length) return;
    if ($("quizBox") && $("quizBox").hidden) return;
    var item = state.list[state.index];
    if (!item) return;
    if (item.type === "fill" || item.type === "write") return;
    var isMulti = item.type === "multi";
    var n = isMulti ? item.options.length : (item.type === "judge" ? 2 : item.options.length);
    if (e.key >= "1" && e.key <= "4") {
      var i = parseInt(e.key, 10) - 1;
      if (i < n) { if (isMulti) toggleMulti(i); else choose(i); }
    } else if (e.key === "Enter") {
      if (isMulti && !state.answered) confirmMulti();
      else if (state.answered) nextQuestion();
    } else if (e.key === "f" || e.key === "F") {
      flagCurrent();
    }
  });

  /* ===== 难度筛选按钮 ===== */
  document.querySelectorAll("[data-qdiff]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var v = btn.getAttribute("data-qdiff");
      activeDifficulty = v === "all" ? "all" : parseInt(v, 10);
      document.querySelectorAll("[data-qdiff]").forEach(function (b) {
        var on = b.getAttribute("data-qdiff") === String(activeDifficulty);
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      updateQuizCount();
      startQuiz();
    });
  });

  /* ===== 新增按钮 ===== */
  var confirmBtn = document.getElementById("quizConfirm");
  if (confirmBtn) confirmBtn.addEventListener("click", confirmMulti);
  var flagBtn = document.getElementById("quizFlag");
  if (flagBtn) flagBtn.addEventListener("click", flagCurrent);
  var flagRetry = document.getElementById("flagRetryBtn");
  if (flagRetry) flagRetry.addEventListener("click", function () {
    if (getFlags().length) { startQuiz(getFlags()); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else if (window.AnGuiUX) window.AnGuiUX.toast("还没有标记的题目");
  });
  var flagClear = document.getElementById("flagClearBtn");
  if (flagClear) flagClear.addEventListener("click", function () {
    try { localStorage.removeItem(FLAG_KEY); } catch (e) { /* ignore */ }
    renderFlags();
    if (window.AnGuiUX) window.AnGuiUX.toast("标记已清空");
  });

  /* 覆盖全局函数引用（供 quiz-v2.js 中已绑定的按钮调用到新实现） */
  window.startQuiz = startQuiz;
  window.nextQuestion = nextQuestion;
  window.choose = choose;
  window.currentList = currentList;
  window.updateQuizCount = updateQuizCount;
  window.renderWrongBook = renderWrongBook;

  /* 填空/写答/面试题样式 */
  (function () {
    if (document.getElementById("quizNewTypesStyle")) return;
    var st = document.createElement("style");
    st.id = "quizNewTypesStyle";
    st.textContent =
      ".quiz-fill-input{width:100%;max-width:420px;padding:10px 14px;border:2px solid var(--border);border-radius:10px;background:var(--card);color:var(--fg);font-size:15px;font-family:inherit}" +
      ".quiz-fill-input:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:var(--accent)}" +
      ".quiz-write-area{width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:10px;background:var(--card);color:var(--fg);font-size:14px;line-height:1.7;font-family:inherit;resize:vertical}" +
      ".quiz-write-area:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:var(--accent)}" +
      ".quiz-write-ref{margin-top:14px;border-top:1px dashed var(--border);padding-top:10px}" +
      ".quiz-interview-tag{display:inline-block;font-size:11.5px;font-weight:600;color:#6d5a8a;background:rgba(109,90,138,.12);border-radius:999px;padding:2px 9px;margin-right:6px}";
    document.head.appendChild(st);
  })();

  /* 初始化：刷新题量与界面 */
  updateQuizCount();
  renderWrongBook();
  renderStats();
  renderFlags();

  // 支持 ?module=xxx 直达（场景向导 / 卡片自测入口）
  (function () {
    var qs = new URLSearchParams(location.search);
    var m = qs.get("module");
    var valid = ["all", "auto", "clearance", "creepage", "surge", "hipot", "shock", "energy", "fire", "thermal", "mechanical", "radiation", "chemical", "reliability", "ip", "ik", "leakage", "grounding", "selv", "emc", "battery", "materials", "certification", "framework"];
    if (m && valid.indexOf(m) !== -1) {
      activeModule = m;
      syncChips();
      syncDiffChips();
      updateQuizCount();
    }
  })();
})();
