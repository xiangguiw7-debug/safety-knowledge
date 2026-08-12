var KNOW_NOTES_KEY = "angui-know-notes-v1";

function getNotes() {
  try { return JSON.parse(localStorage.getItem(KNOW_NOTES_KEY)) || {}; } catch (e) { return {}; }
}

function saveNotes(n) {
  try { localStorage.setItem(KNOW_NOTES_KEY, JSON.stringify(n)); } catch (e) { /* ignore */ }
}

function initKnowledgeNotes() {
  document.querySelectorAll(".card[id]").forEach(function (card) {
  var id = card.id;
  var st = getNotes()[id] || { done: false, note: "" };

  var bar = document.createElement("div");
  bar.className = "know-actions";
  bar.innerHTML =
    '<button type="button" class="btn know-done"></button>' +
    '<textarea rows="2" placeholder="写笔记…（自动保存到本地浏览器）"></textarea>';

  var btn = bar.querySelector(".know-done");
  var ta = bar.querySelector("textarea");

  function renderBtn() {
    btn.textContent = st.done ? "✓ 已读" : "标记已读";
    btn.classList.toggle("btn-primary", !st.done);
  }

  function persist() {
    var all = getNotes();
    all[id] = { done: st.done, note: ta.value };
    saveNotes(all);
  }

  renderBtn();
  ta.value = st.note || "";
  btn.addEventListener("click", function () {
    st.done = !st.done;
    renderBtn();
    persist();
  });
  ta.addEventListener("input", function () {
    st.note = ta.value;
    persist();
  });

    card.appendChild(bar);
  });
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initKnowledgeNotes);
else initKnowledgeNotes();
