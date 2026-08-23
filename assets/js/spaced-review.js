/* 间隔复习（遗忘曲线 1-3-7-30 天）
 * 错题：答错自动排期（angui-review-v1），复习答对推进间隔，答错重置回第 1 天；
 * 费曼：记录保存后按 1/3/7/30 天提醒复习（angui-feynman-review-v1）。
 * 面板：#reviewPanel（答题页错题队列）、#feynReview（费曼区复习提醒）。
 */
(function () {
  "use strict";
  var REVIEW_KEY = "angui-review-v1";
  var FEYN_REVIEW_KEY = "angui-feynman-review-v1";
  var FEYN_REC_KEY = "angui-feynman-v1";
  var WRONG_KEY = "angui-wrong-v1";
  var INTERVALS = [1, 3, 7, 30]; // 天
  var DAY = 86400000;

  function esc(t) { var d = document.createElement("div"); d.textContent = t == null ? "" : String(t); return d.innerHTML; }
  function toast(m) { if (window.AnGuiUX && window.AnGuiUX.toast) window.AnGuiUX.toast(m); }
  function load(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch (e) { return def; } }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }

  // ---------- 错题排期 ----------
  function getReview() { return load(REVIEW_KEY, {}); }

  // 推进一条排期：返回 "mastered" | "next:N" | null
  function advance(rv, q) {
    var e = rv[q];
    if (!e) return null;
    e.lv = (e.lv || 0) + 1;
    e.last = Date.now();
    if (e.lv >= INTERVALS.length) { delete rv[q]; return "mastered"; }
    e.next = Date.now() + INTERVALS[e.lv] * DAY;
    return "next:" + INTERVALS[e.lv];
  }

  // 答题结果挂钩：quiz-engine finishAnswer 调用
  function onAnswer(item, correct) {
    if (!item || !item.q) return;
    var rv = getReview();
    var q = item.q;
    var now = Date.now();
    if (correct) {
      if (!rv[q]) return; // 没答错过的题不排期
      advance(rv, q);
    } else {
      rv[q] = { lv: 0, next: now + INTERVALS[0] * DAY, first: rv[q] ? rv[q].first : now, last: now };
    }
    save(REVIEW_KEY, rv);
  }

  function dueItems() {
    var rv = getReview();
    var now = Date.now();
    var wrong = load(WRONG_KEY, []);
    return wrong.filter(function (w) {
      var e = rv[w.q];
      return e && e.next && e.next <= now && (e.lv || 0) < INTERVALS.length;
    });
  }
  function pendingCount() { return Object.keys(getReview()).length; }
  function nextDueText(now) {
    var rv = getReview();
    var best = null;
    Object.keys(rv).forEach(function (q) { var n = rv[q].next; if (n > now && (!best || n < best)) best = n; });
    if (!best) return "—";
    var d = new Date(best);
    return (d.getMonth() + 1) + " 月 " + d.getDate() + " 日";
  }

  function answerText(w) {
    if (w.type === "multi") return (w.answer || []).map(function (x) { return w.options[x]; }).join("、");
    if (w.type === "judge") return w.answer === 0 ? "正确" : "错误";
    return w.options[w.answer];
  }

  function renderReviewPanel() {
    var box = document.getElementById("reviewPanel");
    if (!box) return;
    var due = dueItems();
    var total = pendingCount();
    var now = Date.now();
    var html = '<p style="margin:0 0 10px;font-size:13.5px;color:var(--muted)">答错的题自动排期：<b>第 1 天</b>复习 → 答对隔 <b>3 天</b> → <b>7 天</b> → <b>30 天</b> → 掌握。复习答错会重新从第 1 天开始。</p>';
    if (!total) {
      html += '<p style="color:var(--muted);margin:6px 0 0">还没有错题进入排期：答题时答错的题会自动加入，先去做几道题吧。</p>';
      box.innerHTML = html;
      return;
    }
    html += '<div class="link-row">' +
      '<button type="button" class="btn btn-primary" id="reviewStartBtn">▶ 开始复习今日队列（' + due.length + ' 题）</button>' +
      '<button type="button" class="btn" id="reviewMarkAllBtn"' + (due.length ? "" : " disabled") + '>✓ 全部标记已复习</button></div>';
    if (due.length) {
      html += '<p class="quiz-count" style="margin-top:10px">今日到期 ' + due.length + ' 题：</p>' +
        '<div class="card" style="margin:8px 0 0">' +
        due.map(function (w, i) {
          return '<div class="wrong-item"><p><b>' + (i + 1) + '. ' + esc(w.q) + "</b>" +
            '<button type="button" class="btn review-done" data-q="' + esc(w.q) + '" style="float:right;font-size:12px;padding:2px 10px">✓ 复习完成</button></p>' +
            '<p style="color:var(--muted);font-size:13px">正确答案：' + esc(answerText(w)) + "</p></div>";
        }).join("") + "</div>";
    } else {
      html += '<p style="color:var(--muted);margin:10px 0 0">今日没有到期题目。排期中还有 ' + total + ' 道，下一批到期：' + nextDueText(now) + '。</p>';
    }
    box.innerHTML = html;

    var sb = document.getElementById("reviewStartBtn");
    if (sb) sb.addEventListener("click", function () {
      var d = dueItems();
      if (!d.length) { toast("今日队列为空"); return; }
      if (window.startQuiz) window.startQuiz(d);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    var mb = document.getElementById("reviewMarkAllBtn");
    if (mb) mb.addEventListener("click", function () {
      var rv = getReview();
      due.forEach(function (w) { advance(rv, w.q); });
      save(REVIEW_KEY, rv);
      toast("今日复习已全部推进");
      renderReviewPanel();
    });
    box.querySelectorAll(".review-done").forEach(function (b) {
      b.addEventListener("click", function () {
        var q = b.getAttribute("data-q");
        var rv = getReview();
        var res = advance(rv, q);
        save(REVIEW_KEY, rv);
        toast(res === "mastered" ? "🎉 已掌握，退出排期" : "已复习，隔 " + INTERVALS[Math.min((rv[q] ? rv[q].lv : 4), 3)] + " 天再来");
        renderReviewPanel();
      });
    });
  }

  // ---------- 费曼排期 ----------
  function cumDays(stage) { var s = 0; for (var i = 0; i < stage; i++) s += INTERVALS[i]; return s; }
  function feynKey(r) { return r.id + "|" + r.date; }
  function getFeynState() { return load(FEYN_REVIEW_KEY, {}); }

  function renderFeynReview() {
    var box = document.getElementById("feynReview");
    if (!box) return;
    var recs = load(FEYN_REC_KEY, []);
    if (!recs.length) {
      box.innerHTML = '<p style="color:var(--muted);margin:0">还没有费曼记录：抽一张卡讲一遍并保存后，这里会按 1 / 3 / 7 / 30 天提醒你复习。</p>';
      return;
    }
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var today = now.getTime();
    var st = getFeynState();
    var rows = recs.map(function (r) {
      var k = feynKey(r);
      var stage = (st[k] && st[k].stage) || 0;
      var created = new Date(r.date + "T00:00:00").getTime();
      if (isNaN(created)) created = today;
      var next = created + cumDays(stage) * DAY;
      var due = stage < 4 && next <= today;
      var daysLeft = Math.max(0, Math.ceil((next - today) / DAY));
      var badge, label;
      if (stage >= 4) { badge = '<span class="ms-badge ms-pass">🏆 已掌握</span>'; label = "四轮复习全部完成"; }
      else if (due) { badge = '<span class="ms-badge" style="background:rgba(255,149,0,.15);color:#b0651c">🔔 今天该复习</span>'; label = "第 " + (stage + 1) + " 轮复习（1 / 3 / 7 / 30 天中的第 " + INTERVALS[stage] + " 天节点）"; }
      else { badge = '<span class="ms-badge">⏳ 未到期</span>'; label = "距第 " + (stage + 1) + " 轮复习还有 " + daysLeft + " 天"; }
      return { r: r, stage: stage, due: due, badge: badge, label: label };
    });
    var dueCount = rows.filter(function (x) { return x.due; }).length;
    var html = '<div class="link-row">' +
      '<button type="button" class="btn btn-primary" id="feynReviewAllBtn"' + (dueCount ? "" : " disabled") + '>✓ 完成今日全部复习（' + dueCount + '）</button></div>' +
      '<p class="quiz-count" style="margin-top:8px">共 ' + recs.length + ' 条记录 · 今日待复习 ' + dueCount + ' 条</p>' +
      rows.map(function (x) {
        return '<div class="feyn-rec">' +
          "<p><b>" + esc(x.r.title) + '</b> <span style="color:var(--muted);font-size:12px">' + esc(x.r.date) + "</span> " + x.badge +
          (x.due ? ' <button type="button" class="btn feyn-done" data-key="' + esc(feynKey(x.r)) + '" style="float:right;font-size:12px;padding:2px 10px">✓ 完成本次复习</button>' : "") +
          "</p>" +
          (x.label ? '<p style="font-size:12.5px;color:var(--muted);margin:2px 0">' + x.label + "</p>" : "") +
          (x.r.text ? '<p style="font-size:12.5px;color:var(--muted);margin:4px 0 0;max-height:54px;overflow:hidden">' + esc(x.r.text) + "</p>" : "") +
          "</div>";
      }).join("");
    box.innerHTML = html;
    box.querySelectorAll(".feyn-done").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-key");
        var st2 = getFeynState();
        var cur = (st2[k] && st2[k].stage) || 0;
        st2[k] = { stage: cur + 1 };
        save(FEYN_REVIEW_KEY, st2);
        toast(cur + 1 >= 4 ? "🎉 四轮复习完成，已掌握" : "已推进到第 " + (cur + 2) + " 轮");
        renderFeynReview();
      });
    });
    var fab = document.getElementById("feynReviewAllBtn");
    if (fab) fab.addEventListener("click", function () {
      var st2 = getFeynState();
      rows.filter(function (x) { return x.due; }).forEach(function (x) {
        var cur = (st2[feynKey(x.r)] && st2[feynKey(x.r)].stage) || 0;
        st2[feynKey(x.r)] = { stage: cur + 1 };
      });
      save(FEYN_REVIEW_KEY, st2);
      toast("今日费曼复习已全部推进");
      renderFeynReview();
    });
  }

  // 复习徽章样式（quiz.html 复用 knowledge.html 的 ms-badge 命名）
  (function () {
    if (document.getElementById("spacedReviewStyle")) return;
    var st = document.createElement("style");
    st.id = "spacedReviewStyle";
    st.textContent =
      ".ms-badge{display:inline-block;font-size:12px;font-weight:700;border-radius:999px;padding:3px 10px;margin-left:8px;background:var(--card-2);color:var(--muted)}" +
      ".ms-badge.ms-pass{background:#1d7a46;color:#fff}";
    document.head.appendChild(st);
  })();

  window.SpacedReview = { onAnswer: onAnswer, render: renderReviewPanel, renderFeyn: renderFeynReview };

  function init() {
    renderReviewPanel();
    renderFeynReview();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
