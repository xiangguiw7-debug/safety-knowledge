(function () {
  "use strict";

  var PURPOSE = {
    "前置": "先补齐前提知识，避免直接学当前概念时卡住",
    "当前": "定位你现在要理解的概念，作为整条链路的中心",
    "标准": "找到判定依据，所有数值和条件以标准原文为准",
    "测试": "把概念落到测试项目，知道要验证什么",
    "SOP": "按步骤执行，保证测试可重复、可记录、可判定",
    "设备": "知道用什么设备和量具，避免设备选错",
    "认证": "知道这个概念对应哪个认证或标准条款",
    "下一步": "知道学完当前概念后应该接哪个知识点"
  };

  var GROUP_WHY = {
    framework: "先建立标准阅读和防触电的整体框架，再进入具体危害，避免一开始就陷入表格和数字。",
    shock: "防电击的关键是先把防护逻辑（限压、绝缘、距离、接地、保护元件）想清楚，再按产品类别查距离、耐压和泄漏。",
    energy: "能量危险要先判断可触及能量是否受限，再考虑保险丝、元件和电池保护，不能只看电压高低。",
    fire: "防火要沿起火源、可燃材料、传播路径整条链设计，不能只凭一个 V-0 等级下结论。",
    thermal: "热量危险要先定温升限值，再看材料耐温和电池热失控，最后用环境试验验证长期安全性。",
    mechanical: "机械防护要先识别危险源和可触及开口，再按安全距离、联锁和功能安全等级设计。",
    radiation: "辐射危险要先确认辐射类型（光、射频、激光、电离），再按对应标准分级和测试。",
    chemical: "化学与环保要先看材料成分和接触场景，再按 RoHS、REACH、生物相容性等法规逐项核对。",
    emc: "EMC 要先建立发射和抗扰的整体概念，再逐项看传导、辐射、ESD、浪涌、EFT 等测试。",
    medical: "医疗设备要先做风险管理，再按患者接触路径确定漏电流、绝缘、生物相容和软件安全要求。",
    cert: "认证流程要先确定产品类别和目标市场，再按测试、技术文件、发证和监督五阶段推进。",
    general: "通用环境要先理解防护等级和试验目的，再按行业筛选测试计划，最后用 SOP 执行。"
  };

  var GROUP_PITFALLS = {
    framework: ["不先看标准结构就直接查表", "把教学简化值当成标准原文", "跳着学，缺少整体框架"],
    shock: ["没确定产品类别就查距离", "污染等级/材料组搞错", "只算正常状态，漏掉单一故障", "阻焊层当爬电"],
    energy: ["只看电压不看能量", "保险丝没认证或位置不对", "电池只做过充保护，缺过温/短路"],
    fire: ["V-0 当成万能", "厚度改了不重测", "开孔位置只图散热", "阻燃剂加多拉低 CTI"],
    thermal: ["只测额定状态，不测最不利负载", "外壳温度限值查错", "材料 RTI 余量不足"],
    mechanical: ["防护罩开口过大", "急停被旁路", "安全距离凭感觉不查表"],
    radiation: ["辐射类型没分清", "SAR 评估遗漏", "激光等级标错"],
    chemical: ["RoHS 只测成品不查材料", "生物相容性最后才做", "SVHC 清单版本过期"],
    emc: ["只测电源口不测通信口", "浪涌和 ESD 器件混用", "Y 电容改大导致泄漏超标"],
    medical: ["漏电流按家电思维设计", "风险文档和测试对不上", "软件更新不走变更控制"],
    cert: ["目标市场没定就做测试", "CB 证书当成各国认证", "技术文件和样品不一致"],
    general: ["高温通过就当低温也通过", "IPX7 通过不等于 IPX6", "环境试验后不测安规"]
  };

  var SPECIFIC = {
    creepage: {
      title: "爬电距离 · 知识链路",
      why: "先确定污染等级和材料组，再查标准表；爬电是沿绝缘表面的路径，必须按最终 PCB 和装配状态测量，不能只看图纸理想值。",
      pitfalls: ["阻焊层不能算爬电距离", "开槽/挡墙规则不能凭感觉", "材料组（CTI）没确认就查表", "只按正常状态算，忘了污染等级 3 的余量"],
      steps: [
        { label: "前置", text: "防触电逻辑", href: "knowledge.html#protection" },
        { label: "当前", text: "爬电距离", href: "creepage.html" },
        { label: "标准", text: "IEC 60664-1 / 60335-1", href: "standards.html#std-60664" },
        { label: "测试", text: "爬电/间隙测量", href: "test-equipment.html" },
        { label: "SOP", text: "SOP-爬电/间隙", href: "sop-spacing.html" },
        { label: "设备", text: "卡尺/塞尺/影像仪", href: "test-equipment.html" },
        { label: "认证", text: "CCC / CE", href: "certification.html" },
        { label: "下一步", text: "CTI 与材料组", href: "knowledge.html#cti" }
      ]
    },
    hipot: {
      title: "耐压测试 · 知识链路",
      why: "耐压验证的是整个绝缘体系的强度，必须先知道产品类别（I/II/III）和绝缘类型（基本/附加/加强），才能定电压；湿热等环境预处理后再测，才更接近真实使用后的状态。",
      pitfalls: ["试验电压按产品标准查，不是越大越好", "试验后必须放电", "湿热后没恢复就测，容易误判", "漏电流限值设错", "只测最有利路径"],
      steps: [
        { label: "前置", text: "产品类别 I/II/III", href: "knowledge.html#productclass" },
        { label: "当前", text: "耐压测试", href: "hipot.html" },
        { label: "标准", text: "60335-1 / 62368-1 / 60601-1", href: "standards.html" },
        { label: "测试", text: "耐压/介电强度", href: "test-equipment.html" },
        { label: "SOP", text: "SOP-耐压", href: "sop-hipot.html" },
        { label: "设备", text: "AC/DC 耐压测试仪", href: "test-equipment.html" },
        { label: "认证", text: "CCC / CE / UL", href: "certification.html" },
        { label: "下一步", text: "泄漏电流与接地", href: "knowledge.html#leakage" }
      ]
    },
    ip: {
      title: "IP 防护 · 知识链路",
      why: "IP 代码决定试验条件，所以必须先定代码、再选试验，不能倒推；IP 只代表外壳防尘防水能力，不代表电气间距和爬电可以放松。",
      pitfalls: ["IPX7 通过不等于 IPX6 通过", "IP68 必须写深度和时间", "高 IP 不代表爬电/间隙可以放松", "透气阀、排水孔、密封圈老化会改变结果", "不能只写“防水”"],
      steps: [
        { label: "前置", text: "可触及性与外壳防护", href: "knowledge.html#access" },
        { label: "当前", text: "IP 防护等级", href: "knowledge.html#ip" },
        { label: "标准", text: "IEC 60529 / GB/T 4208", href: "standards.html#std-60529" },
        { label: "测试", text: "IP 防尘防水", href: "test-equipment.html" },
        { label: "SOP", text: "SOP-IP", href: "sop-ip.html" },
        { label: "设备", text: "防尘箱/喷水装置", href: "test-equipment.html" },
        { label: "认证", text: "户外灯具/充电桩 CE/UL", href: "certification.html" },
        { label: "下一步", text: "IK 冲击与环境可靠性", href: "knowledge.html#environment" }
      ]
    },
    "glow-wire": {
      title: "灼热丝 · 知识链路",
      why: "灼热丝模拟接触不良、过载引起的局部高温，验证材料自熄、不持续燃烧、不滴落引燃；温度档由产品标准和部件起火风险决定。",
      pitfalls: ["V-0 不等于灼热丝通过", "材料厚度变了要重测", "温度没稳定就施加", "铺底层没换", "GWFI 和 GWIT 混用"],
      steps: [
        { label: "前置", text: "防火与阻燃材料", href: "knowledge.html#flame" },
        { label: "当前", text: "灼热丝试验", href: "knowledge.html#firetests" },
        { label: "标准", text: "IEC 60695-2-11 / GB/T 5169.13", href: "standards.html" },
        { label: "测试", text: "灼热丝试验", href: "test-equipment.html" },
        { label: "SOP", text: "SOP-灼热丝", href: "sop-glow-wire.html" },
        { label: "设备", text: "灼热丝试验仪", href: "test-equipment.html" },
        { label: "认证", text: "UL / CE 防火", href: "certification.html" },
        { label: "下一步", text: "针焰 → 球压 → UL94", href: "knowledge.html#firetests" }
      ]
    },
    "temp-cycling": {
      title: "可靠性温循 · 知识链路",
      why: "温度循环暴露焊点、密封、材料应力问题；正确顺序是环境预处理后再复测安规，才能验证长期使用后的安全性。",
      pitfalls: ["高温通过不代表低温通过", "湿热后不测耐压/泄漏等于没做", "条件越严越好是误区", "振动后只查功能不查绝缘", "样品数量和顺序按标准"],
      steps: [
        { label: "前置", text: "温升与材料耐热", href: "knowledge.html#temperature" },
        { label: "当前", text: "环境与可靠性试验", href: "knowledge.html#environment" },
        { label: "标准", text: "IEC 60068-2-14 / GB/T 2423.22", href: "test-equipment.html" },
        { label: "测试", text: "温度循环", href: "reliability.html" },
        { label: "SOP", text: "SOP-温循", href: "sop-temp-cycling.html" },
        { label: "设备", text: "温度冲击箱", href: "test-equipment.html" },
        { label: "认证", text: "行业可靠性计划", href: "reliability.html" },
        { label: "下一步", text: "振动 → 湿热 → 盐雾", href: "reliability.html" }
      ]
    }
  };

  var SOP_LINK = {
    cti: "sop-spacing.html", leakage: "sop-leakage.html", grounding: "sop-grounding.html",
    temperature: "sop-temperature-rise.html", firetests: "sop-glow-wire.html", flame: "sop-ul94.html",
    battery: "sop-battery-short.html", ip: "sop-ip.html", environment: "sop-temp-cycling.html",
    optical: "sop-photobiological.html", emc: "sop-surge.html", components: "sop-protective-impedance.html",
    productclass: "sop-hipot.html", access: "sop-hipot.html", risk: "sop-functional-safety.html",
    software: "sop-cybersecurity.html", mechanical: "sop-mechanical-strength.html", explosion: "sop-functional-safety.html",
    functional: "sop-functional-safety.html", selv: "sop-hipot.html", dmcm: "sop-surge.html",
    harmonic: "sop-harmonic-flicker.html", transient: "sop-surge.html", radhaz: "sop-photobiological.html",
    certprocess: "sop-hipot.html", biocompat: "sop-photobiological.html", energy: "sop-battery-short.html",
    rohs: "sop-cybersecurity.html", stdguide: "sop-hipot.html", protection: "sop-hipot.html",
    "fire-design": "sop-glow-wire.html"
  };

  var LEARN_ANCHOR = { framework: "", mechanical: "mech", general: "general" };
  function detailHref(id) { return "knowledge-detail.html?id=" + encodeURIComponent(id); }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function chainHtmlObj(c) {
    if (!c) return "";
    var steps = c.steps.map(function (s, i) {
      var link = s.href ? '<a href="' + esc(s.href) + '">' + esc(s.text) + "</a>" : "<span>" + esc(s.text) + "</span>";
      var purpose = s.purpose || PURPOSE[s.label] || "";
      var purposeHtml = purpose ? '<span class="chain-purpose">作用：' + esc(purpose) + "</span>" : "";
      var arrow = i < c.steps.length - 1 ? '<span class="chain-arrow">→</span>' : "";
      return '<div class="chain-step"><span class="chain-label">' + esc(s.label) + "</span>" + link + purposeHtml + "</div>" + arrow;
    }).join("");
    var why = c.why ? '<div class="chain-why"><strong>为什么这样做：</strong> ' + esc(c.why) + "</div>" : "";
    var pitfalls = c.pitfalls && c.pitfalls.length
      ? '<div class="chain-pitfalls"><strong>避坑提示：</strong><ul>' + c.pitfalls.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>"
      : "";
    return '<div class="knowledge-chain"><div class="chain-title">🔗 ' + esc(c.title) + "</div>" +
      '<div class="chain-flow">' + steps + "</div>" + why + pitfalls + "</div>";
  }

  function genericChain(id, title, hazard) {
    var sop = SOP_LINK[id] || "sop.html";
    var order = window.KNOWLEDGE_ORDER || [];
    var idx = order.indexOf(id);
    // 前置：主线上一张（跨组前置，避免自引用）；下一步：主线下一张（对齐学习主线）
    var preId = idx > 0 ? order[idx - 1] : null;
    var nextId = (idx >= 0 && idx < order.length - 1) ? order[idx + 1] : null;
    var preText, preHref;
    if (preId) {
      preText = (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[preId] && KNOWLEDGE_DETAILS[preId].title) || preId;
      preHref = detailHref(preId);
    } else {
      preText = "知识卡片库（主线起点）";
      preHref = "knowledge.html";
    }
    var nextText, nextHref;
    if (nextId) {
      nextText = (window.KNOWLEDGE_DETAILS && KNOWLEDGE_DETAILS[nextId] && KNOWLEDGE_DETAILS[nextId].title) || nextId;
      nextHref = detailHref(nextId);
    } else if (hazard === "general") {
      nextText = "通用环境学习入口";
      nextHref = "learn.html#general";
    } else if (hazard === "emc") {
      nextText = "EMC 课程";
      nextHref = "emc.html";
    } else if (hazard === "medical") {
      nextText = "医疗行业";
      nextHref = "industries.html#medical";
    } else if (hazard === "cert") {
      nextText = "认证流程";
      nextHref = "certification.html";
    } else {
      nextText = "回到本危害学习入口";
      nextHref = "learn.html" + (LEARN_ANCHOR[hazard] ? "#" + LEARN_ANCHOR[hazard] : "");
    }
    return {
      title: title + " · 知识链路",
      why: GROUP_WHY[hazard] || GROUP_WHY.framework,
      pitfalls: GROUP_PITFALLS[hazard] || GROUP_PITFALLS.framework,
      steps: [
        { label: "前置", text: preText, href: preHref },
        { label: "当前", text: title, href: detailHref(id) },
        { label: "标准", text: "标准文件入口", href: "standards.html" },
        { label: "测试", text: "对应测试项目", href: "test-equipment.html" },
        { label: "SOP", text: "打开 SOP", href: sop },
        { label: "设备", text: "测试设备与工具", href: "test-equipment.html" },
        { label: "认证", text: "全球认证速查", href: "certification.html" },
        { label: "下一步", text: nextText, href: nextHref }
      ]
    };
  }

  function injectStyle() {
    if (document.getElementById("knowledgeChainStyle")) return;
    var st = document.createElement("style");
    st.id = "knowledgeChainStyle";
    st.textContent = ".knowledge-chain{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;margin:18px 0;box-shadow:var(--shadow)}.chain-title{font-weight:600;margin-bottom:10px}.chain-flow{display:flex;flex-wrap:wrap;gap:6px;align-items:stretch}.chain-step{flex:1;min-width:120px;background:var(--card-2);border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:12.5px}.chain-step .chain-label{display:block;color:var(--muted);font-size:11px;margin-bottom:3px}.chain-step a{color:var(--accent);text-decoration:none;font-weight:600}.chain-arrow{align-self:center;color:var(--muted)}.chain-purpose{display:block;color:var(--muted);font-size:11px;margin-top:4px}.chain-why{margin-top:12px;padding:10px 12px;background:var(--accent-soft);border-radius:10px;font-size:13px}.chain-pitfalls{margin-top:8px;padding:10px 12px;background:rgba(255,149,0,0.08);border:1px solid rgba(255,149,0,0.25);border-radius:10px;font-size:13px}.chain-pitfalls ul{margin:6px 0 0;padding-left:18px}";
    document.head.appendChild(st);
  }

  function run() {
    injectStyle();
    var bodyKey = document.body.getAttribute("data-chain-key");
    if (bodyKey && SPECIFIC[bodyKey]) {
      var head = document.querySelector(".page-head");
      var target = head ? head.parentNode : document.body;
      target.insertAdjacentHTML("afterbegin", chainHtmlObj(SPECIFIC[bodyKey]));
      return;
    }
    var cardMap = { ip: "ip", "glow-wire": "firetests", "temp-cycling": "environment" };
    Object.keys(cardMap).forEach(function (key) {
      var card = document.getElementById(cardMap[key]);
      if (card && SPECIFIC[key] && !card.querySelector(".knowledge-chain")) {
        card.insertAdjacentHTML("beforeend", chainHtmlObj(SPECIFIC[key]));
      }
    });
    document.querySelectorAll("section.card[data-hazard]").forEach(function (card) {
      if (card.querySelector(".knowledge-chain")) return;
      var id = card.id;
      var h2 = card.querySelector("h2");
      var title = h2 ? h2.textContent.trim() : id;
      var hazard = card.getAttribute("data-hazard");
      card.insertAdjacentHTML("beforeend", chainHtmlObj(genericChain(id, title, hazard)));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
