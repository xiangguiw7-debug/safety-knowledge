var QUIZ_BANK = [
  { module: "clearance", q: "电气间隙主要由什么电压决定？", options: ["市电有效值电压", "冲击耐受电压（峰值）", "设备额定功率", "泄漏电流"], answer: 1, explain: "空气击穿由瞬时电压峰值决定，因此按冲击耐受电压（1.2/50μs 波形）查表确定最小间隙。" },
  { module: "clearance", q: "230V 系统、插头连接的 II 类设备，冲击耐受电压通常为？", options: ["800V", "1500V", "2500V", "6000V"], answer: 2, explain: "230V 系统过电压类别 Ⅱ 的典型冲击耐受为 2500V；120V 系统才是 1500V。" },
  { module: "clearance", q: "过电压类别 Ⅱ 的典型安装位置是？", options: ["电表进线处", "插头连接的设备", "配电柜", "受 SPD 保护的设备"], answer: 1, explain: "类别 Ⅱ 是插头连接设备（家电、办公设备）；类别 Ⅳ 才是进线处。" },
  { module: "clearance", q: "海拔修正系数主要用于哪项参数？", options: ["爬电距离", "电气间隙", "CTI", "泄漏电流"], answer: 1, explain: "海拔越高空气越稀薄越易击穿，因此间隙要乘修正系数；爬电一般不直接修正。" },
  { module: "clearance", q: "冲击耐受 4000V 时，基本绝缘的简化最小间隙是？", options: ["2.0mm", "3.0mm", "5.5mm", "8.0mm"], answer: 1, explain: "教学简化表：4000V → 基本绝缘 3.0mm、加强绝缘 6.0mm。" },
  { module: "clearance", q: "查电气间隙时不需要哪个参数？", options: ["冲击耐受电压", "过电压类别", "材料组（CTI）", "绝缘类型"], answer: 2, explain: "材料组影响爬电距离；间隙只与冲击电压、海拔和绝缘类型有关。" },
  { module: "clearance", q: "加强绝缘的间隙约为基本绝缘的几倍？", options: ["1.2 倍", "1.414 倍", "2 倍", "5 倍"], answer: 2, explain: "工程上加强绝缘按基本绝缘约 2 倍取值，如 2500V 时 2.0 → 4.0mm。" },
  { module: "clearance", q: "230V 系统、固定安装的 III 类设备，冲击耐受通常为？", options: ["1500V", "2500V", "4000V", "8000V"], answer: 2, explain: "230V 系统类别 Ⅲ → 4000V；类别 Ⅳ 才是 6000V。" },
  { module: "clearance", q: "PCB 上开槽对电气间隙有什么作用？", options: ["显著增大间隙", "略有帮助", "基本无帮助", "会减小间隙"], answer: 2, explain: "间隙量的是空气直线距离，开槽不改变直线路径，只增加爬电路径。" },
  { module: "clearance", q: "120V 系统、插头连接设备（类别 Ⅱ）的冲击耐受通常为？", options: ["800V", "1500V", "2500V", "4000V"], answer: 1, explain: "120V 系统类别 Ⅱ → 1500V，比 230V 系统宽松一档。" },
  { module: "clearance", q: "空气击穿由什么决定？", options: ["有效值电压", "平均电压", "瞬时电压峰值", "电流大小"], answer: 2, explain: "击穿发生在电压瞬时值最高的时刻，所以峰值/冲击电压才是关键。" },

  { module: "creepage", q: "爬电距离沿什么路径测量？", options: ["空气最短直线", "绝缘体表面", "金属表面", "任意路径"], answer: 1, explain: "爬电距离是沿绝缘体表面测得的最短路径，用于防止表面漏电起痕。" },
  { module: "creepage", q: "以下哪个因素不影响爬电距离查表？", options: ["工作电压", "污染等级", "冲击耐受电压", "材料组（CTI）"], answer: 2, explain: "爬电看持续工作电压和表面条件；冲击耐受电压影响电气间隙。" },
  { module: "creepage", q: "污染等级 2 的定义最接近哪项？", options: ["完全密封无污染", "非导电污染但偶尔凝结", "持续导电污染", "不存在污染等级 2"], answer: 1, explain: "污染等级 2 是一般室内环境：只有非导电污染，偶尔因凝结而导电。" },
  { module: "creepage", q: "CTI 为 500 的材料属于哪个材料组？", options: ["Ⅰ", "Ⅱ", "Ⅲa", "Ⅲb"], answer: 1, explain: "材料组 Ⅱ：400 ≤ CTI < 600；Ⅰ 需要 CTI ≥ 600。" },
  { module: "creepage", q: "材料组 Ⅰ 的 CTI 要求是？", options: ["≥ 600", "400–600", "175–400", "100–175"], answer: 0, explain: "Ⅰ 组 CTI ≥ 600，抗漏电起痕能力最强，允许的爬电距离最短。" },
  { module: "creepage", q: "加强绝缘的爬电距离约为基本绝缘的？", options: ["1 倍", "1.5 倍", "2 倍", "3 倍"], answer: 2, explain: "工程上按 2× 基本绝缘；标准有专门表格时以专门表格为准。" },
  { module: "creepage", q: "250V、污染等级 2、材料组 Ⅲa 的基本绝缘简化值为？", options: ["2.0mm", "2.5mm", "3.2mm", "5.0mm"], answer: 2, explain: "教学简化表：250V · 污染 2 · Ⅲa/Ⅲb → 基本绝缘 3.2mm，加强 6.4mm。" },
  { module: "creepage", q: "普通 PCB 阻焊层能否计入爬电距离？", options: ["可以", "不能", "只要 1mm 以上就可以", "看颜色"], answer: 1, explain: "普通阻焊层不能计入；只有通过 IEC 60664-3 涂层试验的涂覆才能计入。" },
  { module: "creepage", q: "功能绝缘的主要作用是？", options: ["防触电", "保证设备正常工作", "防雷", "提供接地"], answer: 1, explain: "功能绝缘只保证正常工作，不提供防触电保护，查表规则也不同。" },
  { module: "creepage", q: "PCB 开槽主要改善哪个参数？", options: ["电气间隙", "爬电距离", "耐压", "泄漏电流"], answer: 1, explain: "开槽使表面路径绕过沟槽变长，是增加爬电距离的经典手段。" },
  { module: "creepage", q: "污染等级 3 的典型环境是？", options: ["密封电源内部", "普通室内", "工业粉尘/潮湿现场", "无尘车间"], answer: 2, explain: "污染等级 3 存在导电污染或潮湿凝结，工业现场最常见。" },

  { module: "surge", q: "1.2/50μs 表示什么波形？", options: ["开路电压波", "短路电流波", "操作过电压波", "ESD 波形"], answer: 0, explain: "1.2/50μs 是开路电压波；8/20μs 是短路电流波。" },
  { module: "surge", q: "8/20μs 表示什么波形？", options: ["开路电压波", "短路电流波", "EFT 脉冲串", "工频磁场"], answer: 1, explain: "8/20μs 是短路电流波，常用于 SPD 放电电流能力测试。" },
  { module: "surge", q: "MOV（压敏电阻）最常见的失效模式是？", options: ["开路，不影响电路", "短路，可能过热着火", "电容漂移", "无失效模式"], answer: 1, explain: "MOV 反复承受浪涌后老化，漏电流增大，最终短路并可能过热，需配过流保护。" },
  { module: "surge", q: "GDT（气体放电管）的特点是什么？", options: ["响应最快", "泄放能力很大但响应较慢", "钳位电压精确", "只适合低压"], answer: 1, explain: "GDT 响应是 μs 级、较慢，但能泄放很大电流，适合第一级。" },
  { module: "surge", q: "TVS 的特点是？", options: ["响应最快但能量小", "泄放能量最大", "导通后一直短路", "只用于交流"], answer: 0, explain: "TVS 响应 ps–ns 级最快，但泄放能量有限，适合末级精保护。" },
  { module: "surge", q: "组合波包含哪两种波形？", options: ["1.2/50 电压 + 8/20 电流", "10/700 电压 + 5/50 电流", "8/20 电压 + 1.2/50 电流", "EFT + ESD"], answer: 0, explain: "IEC 61000-4-5 综合测试仪输出 1.2/50μs 开路电压波和 8/20μs 短路电流波。" },
  { module: "surge", q: "多级防护之间为什么需要退耦元件？", options: ["为了省成本", "防止两级同时导通烧末级", "为了好看", "没有为什么"], answer: 1, explain: "没有退耦时两级器件同时导通，末级 TVS 先承受全部能量而烧毁。" },
  { module: "surge", q: "差模浪涌的注入路径是？", options: ["线-线（L-N）", "线-地（L/N-PE）", "外壳-地", "天线端口"], answer: 0, explain: "线-线注入是差模；线-地注入是共模。" },
  { module: "surge", q: "共模浪涌的注入路径是？", options: ["线-线（L-N）", "线-地（L/N-PE）", "两线之间", "信号对地"], answer: 1, explain: "共模电流在 L/N 上同方向流动，经地（PE）回流。" },
  { module: "surge", q: "浪涌和 EFT 相比，能量上有什么差异？", options: ["浪涌能量大得多", "EFT 能量大得多", "两者相同", "都不带电"], answer: 0, explain: "浪涌是焦耳级能量，EFT 是毫焦耳级，防护器件完全不同。" },
  { module: "surge", q: "SPD 泄放路径的设计原则是？", options: ["越长越好", "短而低阻抗", "绕开地线", "越细越好"], answer: 1, explain: "泄放路径短、低阻抗，才能把浪涌电流快速导入地并减小地电位抬升。" },

  { module: "hipot", q: "耐压测试的直接目的是？", options: ["测功耗", "验证绝缘在过压下的强度", "测温升", "校准电源"], answer: 1, explain: "耐压测试验证绝缘是否能在规定过压下不发生击穿/闪络。" },
  { module: "hipot", q: "加强绝缘的耐压约为基本绝缘的？", options: ["1.2 倍", "1.414 倍", "2 倍", "10 倍"], answer: 2, explain: "工程上约 2 倍，如 62368-1 基本 1500V AC、加强 3000V AC。" },
  { module: "hipot", q: "IEC 62368-1 中基本绝缘的常用试验电压是？", options: ["1000V AC", "1500V AC", "3000V AC", "5000V AC"], answer: 1, explain: "62368-1/60950-1 常用：基本 1500V AC（2121V DC）、加强 3000V AC（4242V DC）。" },
  { module: "hipot", q: "直流耐压试验电压通常按交流值的多少倍折算？", options: ["1.2", "1.414", "2", "3"], answer: 1, explain: "DC 按 ≈1.414 × AC 折算，对应交流峰值。" },
  { module: "hipot", q: "直流耐压测试后最重要的步骤是？", options: ["立即记录", "放电确认再拆线", "换极性再测", "加大电流"], answer: 1, explain: "DC 会给绝缘和分布电容充电，必须放电确认后才能拆线。" },
  { module: "hipot", q: "型式试验中耐压保持时间常见为？", options: ["1 秒", "60 秒", "10 分钟", "24 小时"], answer: 1, explain: "型式试验常见 60s；产线例行试验可按规定缩短到 1–2s 并提高电压。" },
  { module: "hipot", q: "附加绝缘的试验电压通常与哪种绝缘相同？", options: ["基本绝缘", "加强绝缘", "功能绝缘", "无要求"], answer: 0, explain: "附加绝缘数值与基本绝缘相同；加强绝缘按约 2× 基本。" },
  { module: "hipot", q: "双重绝缘在结构上等于？", options: ["两层加强绝缘", "基本绝缘 + 附加绝缘", "功能绝缘 ×2", "一层更厚的绝缘"], answer: 1, explain: "双重绝缘 = 基本 + 附加；II 类产品常用双重或加强绝缘且不依赖接地。" },
  { module: "hipot", q: "耐压测试合格的判据是？", options: ["不漏电", "无击穿/闪络且泄漏不超限", "温升低于 50K", "电流不为零"], answer: 1, explain: "判据为无击穿、无闪络，且泄漏电流不超过标准限值。" },
  { module: "hipot", q: "泄漏电流最容易受哪个元件影响？", options: ["保险丝", "Y 电容", "电感", "MOSFET"], answer: 1, explain: "Y 电容跨 L/N 与地，容量越大泄漏电流越大，EMC 与安规在此互相制约。" },
  { module: "hipot", q: "产线例行耐压试验的特点通常是？", options: ["60s 保持", "1–2s 并按标准提压", "不测泄漏", "用更高电压 10s"], answer: 1, explain: "产线为节拍常缩短时间，并按规定提高电压（如 1.2×）以补偿，具体以标准为准。" }
];

var state = { list: [], index: 0, score: 0, answered: false };
var activeModule = "all";
var WRONG_KEY = "angui-wrong-v1";
function getWrong() {
  try { return JSON.parse(localStorage.getItem(WRONG_KEY)) || []; } catch (e) { return []; }
}
function saveWrong(item) {
  var list = getWrong();
  if (!list.some(function (w) { return w.q === item.q; })) {
    list.push(item);
    try { localStorage.setItem(WRONG_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }
  renderWrongBook();
}
function clearWrong() {
  try { localStorage.removeItem(WRONG_KEY); } catch (e) { /* ignore */ }
  renderWrongBook();
}
function renderWrongBook() {
  var box = document.getElementById("wrongBook");
  if (!box) return;
  var list = getWrong();
  var count = document.getElementById("wrongCount");
  if (count) count.textContent = list.length;
  box.innerHTML = list.length
    ? list.map(function (w, i) {
        return '<div class="wrong-item"><p><b>' + (i + 1) + '. ' + w.q + "</b></p>" +
          '<p style="color:var(--muted);font-size:13px">正确答案：' + w.options[w.answer] + "　" + w.explain + "</p></div>";
      }).join("")
    : '<p style="color:var(--muted)">还没有错题，继续加油。</p>';
}

function $(id) { return document.getElementById(id); }

function currentList() {
  return activeModule === "all"
    ? QUIZ_BANK.slice()
    : QUIZ_BANK.filter(function (q) { return q.module === activeModule; });
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function startQuiz(custom) {
  state.list = shuffle(custom || currentList());
  if (state.list.length === 0) return;
  state.index = 0;
  state.score = 0;
  state.answered = false;
  $("quizIntro").hidden = true;
  $("quizScore").hidden = true;
  $("quizBox").hidden = false;
  renderQuestion();
}

function renderQuestion() {
  var item = state.list[state.index];
  state.answered = false;
  $("quizCurrent").textContent = state.index + 1;
  $("quizTotal").textContent = state.list.length;
  $("quizQuestion").textContent = item.q;
  $("quizBar").style.width = ((state.index / state.list.length) * 100) + "%";

  var box = $("quizOptions");
  box.innerHTML = "";
  item.options.forEach(function (text, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = text;
    btn.addEventListener("click", function () { choose(i); });
    box.appendChild(btn);
  });

  $("quizExplain").hidden = true;
  $("quizExplain").textContent = "";
  $("quizNext").style.display = "none";
}

function choose(i) {
  if (state.answered) return;
  state.answered = true;
  var item = state.list[state.index];
  var buttons = $("quizOptions").querySelectorAll(".quiz-option");
  buttons.forEach(function (btn, idx) {
    btn.disabled = true;
    if (idx === item.answer) btn.classList.add("correct");
    if (idx === i && i !== item.answer) btn.classList.add("wrong");
  });
  if (i === item.answer) state.score += 1; else saveWrong(item);
  var explain = $("quizExplain");
  explain.textContent = (i === item.answer ? "回答正确。" : "回答错误。") + item.explain;
  explain.hidden = false;
  var next = $("quizNext");
  next.textContent = state.index === state.list.length - 1 ? "查看成绩" : "下一题";
  next.style.display = "inline-block";
}

function nextQuestion() {
  if (state.index < state.list.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    $("quizBox").hidden = true;
    var scoreBox = $("quizScore");
    scoreBox.hidden = false;
    $("quizScoreNum").textContent = state.score + " / " + state.list.length;
    $("quizScoreText").textContent =
      state.score === state.list.length
        ? "全部答对，基本功很扎实！"
        : state.score >= state.list.length * 0.75
          ? "掌握得不错，再复习一下错题对应的章节。"
          : "建议回到对应章节重新学习一遍。";
  }
}

function updateQuizCount() {
  $("quizCount").textContent = "当前题库：" + currentList().length + " 题（每次随机出题）";
}

document.querySelectorAll("[data-qmodule]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    activeModule = btn.getAttribute("data-qmodule");
    document.querySelectorAll("[data-qmodule]").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    updateQuizCount();
renderWrongBook();

function exportWrong() {
  var list = getWrong();
  var text = "错题本（共 " + list.length + " 题）\n\n" + list.map(function (w, i) {
    return (i + 1) + ". " + w.q + "\n正确答案：" + w.options[w.answer] + "\n解析：" + w.explain;
  }).join("\n\n");
  function done() { if (window.AnGuiUX) window.AnGuiUX.toast("错题已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done).catch(done); }
  else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); }
}
var wc = document.getElementById("wrongClearBtn");
if (wc) wc.addEventListener("click", clearWrong);
var wr = document.getElementById("wrongRetryBtn");
if (wr) wr.addEventListener("click", function () { if (getWrong().length) startQuiz(getWrong()); });
var we = document.getElementById("wrongExportBtn");
if (we) we.addEventListener("click", exportWrong);
  });
});

$("quizStart").addEventListener("click", startQuiz);
$("quizNext").addEventListener("click", nextQuestion);
$("quizRestart").addEventListener("click", startQuiz);
updateQuizCount();
renderWrongBook();

function exportWrong() {
  var list = getWrong();
  var text = "错题本（共 " + list.length + " 题）\n\n" + list.map(function (w, i) {
    return (i + 1) + ". " + w.q + "\n正确答案：" + w.options[w.answer] + "\n解析：" + w.explain;
  }).join("\n\n");
  function done() { if (window.AnGuiUX) window.AnGuiUX.toast("错题已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done).catch(done); }
  else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); }
}
var wc = document.getElementById("wrongClearBtn");
if (wc) wc.addEventListener("click", clearWrong);
var wr = document.getElementById("wrongRetryBtn");
if (wr) wr.addEventListener("click", function () { if (getWrong().length) startQuiz(getWrong()); });
var we = document.getElementById("wrongExportBtn");
if (we) we.addEventListener("click", exportWrong);
