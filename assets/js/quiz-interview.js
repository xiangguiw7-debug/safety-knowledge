/* 安规面试题库（并入答题测验，按模块分类）
 * 题型：single 单选 / judge 判断 / fill 填空 / write 写答（含参考答案与考察点）
 * 数值口径与站内知识卡一致（250V PD2 Ⅲa 爬电 2.5mm、OVC Ⅱ 2500V、62368 加强 3000V AC 等）。
 */
var QUIZ_INTERVIEW = [
  /* ---------- framework 标准结构 ---------- */
  { module: "framework", type: "single", difficulty: 1, q: "GB 标准前言中的 MOD 表示？", options: ["等同采用", "修改采用", "非等效采用", "不采用"], answer: 1, explain: "IDT 等同、MOD 修改、NEQ 非等效；判定条款差异时先看采标程度。" },
  { module: "framework", type: "single", difficulty: 1, q: "查安全标准的推荐顺序是？", options: ["产品 → 标准 → 条款 → 表格", "条款 → 产品 → 表格", "只看附录表格", "随便翻"], answer: 0, explain: "先确认产品适用标准，再定位通用要求、试验条件与数值表格。" },
  { module: "framework", type: "judge", difficulty: 1, q: "拿到新标准应先读“范围”和“定义”，判断是否适用、名词是否对得上。正确吗？", answer: 0, explain: "范围决定适用性，定义统一术语，是标准阅读的第一步。" },
  { module: "framework", type: "fill", difficulty: 2, q: "IEC 60335-1 中“-1”是通用要求，“-2-x”是____要求。", accepted: ["特殊", "产品特殊", "专项"], explain: "通用要求 + 特殊要求两层结构，如 60335-2-21（储水式热水器）。" },
  { module: "framework", type: "write", difficulty: 2, q: "面试官问：你怎么快速判断一个新标准适不适用于你的产品？", ref: "① 看范围：适用/不适用清单与产品定义；② 看术语定义是否覆盖产品形态；③ 看引用链：产品标准 → 组标准 → 基础标准；④ 确认版本与国家差异（IDT/MOD/NEQ）。", points: ["范围判断", "引用链", "版本差异"], explain: "参考答案：① 看范围（适用/不适用清单与产品定义）；② 看术语定义；③ 看引用链（产品→组→基础）；④ 确认版本与国家差异。" },
  /* ---------- clearance 电气间隙 ---------- */
  { module: "clearance", type: "single", difficulty: 1, q: "电气间隙主要按什么电压查表？", options: ["工作电压有效值", "系统电压推出的冲击耐受电压", "设备额定功率", "泄漏电流"], answer: 1, explain: "空气击穿由瞬时电压峰值决定，按冲击耐受电压（1.2/50μs）查表。" },
  { module: "clearance", type: "single", difficulty: 1, q: "230V 系统、插头连接（OVC Ⅱ）的冲击耐受电压通常是？", options: ["1500V", "2500V", "4000V", "6000V"], answer: 1, explain: "230V 系统 OVC Ⅱ 典型 2500V；120V 系统才是 1500V。" },
  { module: "clearance", type: "judge", difficulty: 1, q: "加强绝缘的电气间隙按基本绝缘的 2 倍取值（如 2500V 基本 1.5mm → 加强 3.0mm）。正确吗？", answer: 0, explain: "60335-1 表16：加强绝缘用下一档冲击电压取值（2500V→按 4000V 档 3.0mm），爬电距离才是 2×；两者规则不同。" },
  { module: "clearance", type: "fill", difficulty: 2, q: "海拔越高空气越稀薄，电气间隙需要乘____系数。", accepted: ["海拔修正", "修正", "海拔"], explain: "海拔超过 2000m 按标准乘修正系数（如 IEC 60664-1 附录）。" },
  { module: "clearance", type: "write", difficulty: 2, q: "为什么爬电距离看工作电压、电气间隙看系统电压？", ref: "爬电距离防绝缘表面长期漏电起痕，由持续承受的工作电压（RMS）决定；电气间隙防瞬时击穿，由系统电压推得的冲击耐受电压（峰值）决定。物理机制不同，查表参数也不同。", points: ["物理机制", "参数区分"], explain: "参考答案：爬电防表面起痕看工作电压；间隙防瞬时击穿看系统电压推的冲击耐受。" },
  /* ---------- creepage 爬电距离 ---------- */
  { module: "creepage", type: "single", difficulty: 1, q: "爬电距离沿什么路径测量？", options: ["空气最短直线", "绝缘体表面", "金属表面", "外壳内壁"], answer: 1, explain: "爬电距离是沿绝缘表面测得的最短路径，用于防表面漏电起痕。" },
  { module: "creepage", type: "single", difficulty: 1, q: "CTI ≥ 600 属于哪个材料组？", options: ["Ⅰ", "Ⅱ", "Ⅲa", "Ⅲb"], answer: 0, explain: "Ⅰ CTI ≥ 600；Ⅱ 400–600；Ⅲa 175–400；Ⅲb 100–175。" },
  { module: "creepage", type: "single", difficulty: 2, q: "250V、污染等级 2、材料组 Ⅲa 的基本绝缘爬电简化值是？", options: ["2.0mm", "2.5mm", "3.2mm", "5.0mm"], answer: 1, explain: "教学简化表：250V · 污染 2 · Ⅲa/Ⅲb → 基本 2.5mm、加强 5.0mm（按标准表17）。" },
  { module: "creepage", type: "fill", difficulty: 2, q: "污染等级 2 指一般室内环境：非导电污染，但偶尔因____而导电。", accepted: ["凝露", "凝结", "结露"], explain: "偶尔凝结是污染等级 2 的关键特征，与污染等级 3 的持续导电污染不同。" },
  { module: "creepage", type: "write", difficulty: 3, q: "PCB 上开槽为什么能增加爬电距离却不能增加电气间隙？", ref: "爬电距离沿绝缘表面走，开槽让表面路径绕过沟槽变长；电气间隙量的是两点间空气最短直线距离，开槽不改变直线路径。", points: ["路径定义", "开槽机理"], explain: "参考答案：开槽加长的是表面路径（爬电），直线空气距离（间隙）不变。" },
  /* ---------- hipot 耐压测试 ---------- */
  { module: "hipot", type: "single", difficulty: 1, q: "IEC 62368-1 中加强绝缘的常见试验电压是？", options: ["1500V AC", "3000V AC", "4242V AC", "500V AC"], answer: 1, explain: "62368-1 常用：基本 1500V AC、加强 3000V AC（4242V DC）。" },
  { module: "hipot", type: "single", difficulty: 1, q: "直流耐压试验电压通常按交流值的多少倍折算？", options: ["1.2", "1.414", "2", "3"], answer: 1, explain: "DC ≈ 1.414 × AC，对应交流峰值。" },
  { module: "hipot", type: "single", difficulty: 1, q: "型式试验中耐压保持时间常见为？", options: ["1 秒", "60 秒", "10 分钟", "24 小时"], answer: 1, explain: "型式试验常见 60s；产线例行试验可按规定缩短到 1–2s 并提高电压。" },
  { module: "hipot", type: "judge", difficulty: 1, q: "直流耐压测试后必须先放电确认，再拆线。正确吗？", answer: 0, explain: "DC 会给绝缘与分布电容充电，必须放电确认后才能拆线。" },
  { module: "hipot", type: "write", difficulty: 2, q: "产线例行耐压测试和型式试验有什么不同？", ref: "型式试验按标准全条件执行（60s 保持、规定温湿度与样品条件）；产线例行测试为节拍常缩短时间（1–2s），并按标准规定提高电压补偿，同时要有人身安全防护与快速断电。", points: ["时间差异", "电压补偿", "产线安全"], explain: "参考答案：型式 60s 全条件；产线 1–2s 提压补偿 + 安全防护。" },
  /* ---------- shock 防电击 ---------- */
  { module: "shock", type: "single", difficulty: 1, q: "II 类设备的防触电不依赖下列哪一项？", options: ["双重绝缘", "保护接地", "加强绝缘", "基本绝缘 + 附加绝缘"], answer: 1, explain: "II 类靠双重/加强绝缘，不依赖保护接地；I 类才依赖接地。" },
  { module: "shock", type: "single", difficulty: 1, q: "防触电五道防线中优先顺序第一的是？", options: ["外壳隔离", "保持距离", "限制电压（SELV）", "警告标签"], answer: 2, explain: "能限压就先限压，SELV 从源头消除危险；警告标签是最后手段。" },
  { module: "shock", type: "judge", difficulty: 1, q: "需要工具才能打开的盖板，通常不作为可触及部件判定。正确吗？", answer: 0, explain: "需要工具拆卸的部件一般不作为可触及部件，但“工具”定义以产品标准为准。" },
  { module: "shock", type: "fill", difficulty: 1, q: "____绝缘 = 基本绝缘 + 附加绝缘。", accepted: ["双重"], explain: "双重绝缘是基本+附加的组合；加强绝缘是单层达到同等水平。" },
  { module: "shock", type: "write", difficulty: 2, q: "请讲出 II 类电源产品的“绝缘地图”：防触电结构上有哪几处绝缘？", ref: "① 初次级隔离（变压器）→ 加强或双重绝缘；② 带电件对外壳 → 加强绝缘（II 类不接地）；③ 内部低压电路之间 → 功能绝缘。每处分别查爬电/间隙/耐压。", points: ["绝缘地图", "类别策略"], explain: "参考答案：初次级隔离、带电件对外壳、内部低压电路间，三处分别定绝缘类型并各自查距离与耐压。" },
  /* ---------- leakage 泄漏电流 ---------- */
  { module: "leakage", type: "single", difficulty: 1, q: "交流输入产品的泄漏电流主要由什么决定？", options: ["输入侧 Y 电容与绝缘阻抗", "保险丝额定值", "输出功率大小", "外壳颜色"], answer: 0, explain: "泄漏电流 = 电压/绝缘阻抗，并随 Y 电容容量增大而增大，EMC 与安规互相制约。" },
  { module: "leakage", type: "single", difficulty: 2, q: "IEC 60990 的作用是？", options: ["定义人体阻抗测量网络", "规定耐压电压", "定义雷击波形", "规定温升限值"], answer: 0, explain: "60990 定义测量网络模拟人体阻抗，不是直接夹电流表。" },
  { module: "leakage", type: "fill", difficulty: 2, q: "Y 电容泄漏电流公式：I = 2πfC____。", accepted: ["U", "V"], explain: "I = 2πfCU，容量与电压越大泄漏越大。" },
  { module: "leakage", type: "write", difficulty: 3, q: "医疗设备（IEC 60601-1）的漏电流限值为什么远严于家电？", ref: "患者可能有侵入性通路（CF 型直接接触心脏）、体阻抗更低、无法自主摆脱，且单一故障条件下也不得超标；如 CF 正常 10µA、单一故障 50µA。", points: ["患者风险", "CF/BF 类型", "故障条件"], explain: "参考答案：侵入性通路 + 低体阻抗 + 无法摆脱 + 单一故障仍须安全。" },
  /* ---------- grounding 接地 ---------- */
  { module: "grounding", type: "single", difficulty: 1, q: "接地连续性试验的常见电流量级是？", options: ["10–25 A", "1 A", "100 A", "0.1 A"], answer: 0, explain: "常用 10–25 A 大电流测接触电阻，限值常见 0.1 Ω 量级，以产品标准为准。" },
  { module: "grounding", type: "single", difficulty: 1, q: "I 类设备保护接地的主要作用是？", options: ["给故障电流低阻抗回路，触发保护装置动作", "提高信号质量", "减小正常发热", "替代所有绝缘"], answer: 0, explain: "接地让故障变成“跳闸/断保险”而不是“带电外壳”。" },
  { module: "grounding", type: "judge", difficulty: 1, q: "接地端子松动、生锈、接触电阻大，等于没有保护。正确吗？", answer: 0, explain: "I 类产品的安全依赖接地连续性与低阻抗。" },
  /* ---------- selv ---------- */
  { module: "selv", type: "single", difficulty: 2, q: "下列哪个不能构成 SELV 电源？", options: ["隔离变压器", "电阻分压", "满足隔离与距离要求的开关电源绕组", "独立安全隔离绕组"], answer: 1, explain: "电阻分压只降压不隔离，故障时危险电压可能直接串入。" },
  { module: "selv", type: "judge", difficulty: 1, q: "电压低于 50V 的电路就一定是安全电路（SELV）。正确吗？", answer: 1, explain: "“低压”不等于“安全”：SELV 必须限压 + 与危险电路可靠隔离。" },
  { module: "selv", type: "fill", difficulty: 1, q: "SELV 成立的关键：限压 + 与危险电路可靠____。", accepted: ["隔离"], explain: "隔离是 SELV 的灵魂，电压低只是必要条件。" },
  /* ---------- energy 能量危险 ---------- */
  { module: "energy", type: "single", difficulty: 1, q: "大电容断电后仍有危险，主要原因是？", options: ["残余能量可造成电击/灼伤", "电压永远不变", "会自然短路", "没有危险"], answer: 0, explain: "断电后电容储存的能量需泄放电阻/放电电路快速泄放。" },
  { module: "energy", type: "single", difficulty: 2, q: "IEC 62368-1 中 ES3 表示？", options: ["可触及低能量", "需要防护或警示", "高危险能量，必须可靠隔离", "无需任何防护"], answer: 2, explain: "ES1 低能量、ES2 需防护或警示、ES3 高危险能量必须可靠隔离。" },
  { module: "energy", type: "write", difficulty: 2, q: "能量危险（如低压大电流）为什么也能伤人？设计上怎么防？", ref: "能量危险看电压×电流×时间：低压大电流可造成灼伤，高压小电流可造成电击。防护：限能电路、泄放电阻、可触及端子防护、故障断流。", points: ["能量与电流", "防护手段"], explain: "参考答案：灼伤由能量密度决定，防靠限能、泄放与可触及端子防护。" },
  /* ---------- fire 防火 ---------- */
  { module: "fire", type: "single", difficulty: 1, q: "灼热丝试验主要模拟什么？", options: ["外部小火焰", "故障接触热源引起的局部高温", "长期高温变形", "电弧放电"], answer: 1, explain: "灼热丝模拟接线端子、过载等故障热源接触材料时的起燃与自熄。" },
  { module: "fire", type: "single", difficulty: 1, q: "球压试验的常见判据是？", options: ["压痕直径 ≤ 2mm", "余焰 ≤ 30s", "烧蚀长度 ≤ 50mm", "滴落物不引燃"], answer: 0, explain: "球压验证高温不变形：5mm 钢球、约 20N、保持 1h 后压痕 ≤ 2mm。" },
  { module: "fire", type: "judge", difficulty: 1, q: "V-0 通过就等于灼热丝试验通过。正确吗？", answer: 1, explain: "V-0 是 UL 94 材料燃烧等级，灼热丝验证故障热源起燃/自熄，机理不同不能替代。" },
  { module: "fire", type: "fill", difficulty: 2, q: "防火设计的第一步是识别起火源并____起火链。", accepted: ["断开", "切断", "阻断"], explain: "先沿起火链断链，材料只是其中一环。" },
  { module: "fire", type: "write", difficulty: 3, q: "外壳防火选材：V-0、灼热丝、球压、CTI 各考核什么？能否互相替代？", ref: "V-0 是 UL 94 自身阻燃；灼热丝模拟故障热源起燃/自熄；球压考核高温不变形；CTI 考核抗漏电起痕。机理不同不能互相替代，且阻燃剂常拉低 CTI。", points: ["试验机理", "不可替代", "选材联动"], explain: "参考答案：四个试验各管一段风险，选材要一起核。" },
  /* ---------- thermal 温升 ---------- */
  { module: "thermal", type: "single", difficulty: 1, q: "IEC 60335-1（家电）温升基准环境温度常见是？", options: ["25°C", "40°C", "60°C", "20°C"], answer: 0, explain: "家电体系以 25°C 为基准；热带型条件再减 7K。" },
  { module: "thermal", type: "single", difficulty: 1, q: "IEC 61010-1 的温升基准环境温度通常是？", options: ["25°C", "35°C", "40°C", "55°C"], answer: 2, explain: "61010-1 以 40°C 为基准：部件温度 = 试验温升 + 40°C。" },
  { module: "thermal", type: "judge", difficulty: 2, q: "40°C 高温工作试验可以替代温升限值判定。正确吗？", answer: 1, explain: "高温试验是可靠性验证，不替代安规发热条款的温升限值判定。" },
  { module: "thermal", type: "write", difficulty: 2, q: "同一个 40°C，为什么有时是基准、有时是试验条件？", ref: "40°C 基准温升（如 61010-1）用于安规发热限值判定；40°C 高温试验（如 IEC 60068-2-2）是可靠性环境验证。目的、判据、标准都不同，不能混用。", points: ["两种目的", "判据区分"], explain: "参考答案：安规基准 vs 可靠性试验，两者不互相替代。" },
  /* ---------- battery 电池 ---------- */
  { module: "battery", type: "single", difficulty: 1, q: "UN 38.3 运输试验共几项？", options: ["8 项", "6 项", "10 项", "4 项"], answer: 0, explain: "高度、热、振动、冲击、外部短路、撞击/挤压、过充、强制放电共 8 项。" },
  { module: "battery", type: "single", difficulty: 1, q: "便携式锂电池中国强制标准是？", options: ["GB 31241", "IEC 62133", "UL 9540A", "UN 38.3"], answer: 0, explain: "中国强制 GB 31241，出口常用 IEC 62133，运输用 UN 38.3。" },
  { module: "battery", type: "single", difficulty: 1, q: "电池保护板（BMS/PCM）至少要覆盖哪四项？", options: ["过充/过放/过流/过温", "过压/欠压/短路/开路", "充电/放电/均衡/通讯", "电压/电流/容量/内阻"], answer: 0, explain: "过充、过放、过流、过温是电池保护的基本四道防线。" },
  { module: "battery", type: "fill", difficulty: 2, q: "锂电池一颗起火向整包蔓延的现象叫____扩散，整包设计要重点防。", accepted: ["热"], explain: "热扩散是整包设计重点，需要隔离与泄压。" },
  /* ---------- mechanical 机械 ---------- */
  { module: "mechanical", type: "single", difficulty: 1, q: "安全联锁装置失效时应该？", options: ["继续运行", "回到安全状态", "自动重启", "由操作员决定"], answer: 1, explain: "联锁要失效安全：断电、断线、传感器失效时回到安全状态。" },
  { module: "mechanical", type: "single", difficulty: 2, q: "ISO 13857 安全距离取决于？", options: ["开口尺寸和可伸入的身体部位", "产品功率", "材料强度", "电压等级"], answer: 0, explain: "开口越大、能伸入的部位越深，要求的安全距离越大。" },
  { module: "mechanical", type: "judge", difficulty: 2, q: "联锁复位后设备应能自动重启。正确吗？", answer: 1, explain: "复位后不能自动重新启动，必须人工确认再启动。" },
  /* ---------- emc ---------- */
  { module: "emc", type: "single", difficulty: 1, q: "ESD 静电放电属于 EMC 的哪一部分？", options: ["EMI（电磁干扰）", "EMS（电磁敏感度）", "两者都不是", "只属于安规"], answer: 1, explain: "ESD 是外界骚扰作用在设备上，考核抗扰能力，属于 EMS。" },
  { module: "emc", type: "single", difficulty: 2, q: "辐射抗扰（RS）对应的基础试验标准是？", options: ["IEC 61000-4-2", "IEC 61000-4-3", "IEC 61000-4-5", "CISPR 32"], answer: 1, explain: "RS 用 4-3（暗室天线扫频）；ESD 是 4-2、浪涌 4-5、CISPR 32 是发射限值。" },
  { module: "emc", type: "fill", difficulty: 1, q: "EMC = EMI（电磁干扰）+ ____（电磁敏感度）。", accepted: ["EMS"], explain: "EMI 管发射，EMS 管抗扰。" },
  { module: "emc", type: "write", difficulty: 3, q: "ESD 防护器件和浪涌防护器件为什么不能随便混用？", ref: "ESD 亚纳秒上升沿、能量小，TVS 响应快；浪涌微秒级、焦耳级能量，MOV/GDT 泄放能力强但慢。混用会让末级器件在浪涌下先烧毁；应分级防护并加退耦。", points: ["波形差异", "能量差异", "分级退耦"], explain: "参考答案：上升沿与能量不同，器件要按波形匹配，多级防护要退耦。" },
  /* ---------- ip / ik ---------- */
  { module: "ip", type: "single", difficulty: 1, q: "IP68 中两个数字分别表示？", options: ["防尘 6 级 + 持续浸水 8 级", "防水 6 级 + 防尘 8 级", "防固体 8 级 + 防尘 6 级", "防冲击 6 级 + 防水 8 级"], answer: 0, explain: "第一位防固体（防尘），第二位防水；6 = 完全防尘，8 = 持续浸水。" },
  { module: "ip", type: "judge", difficulty: 2, q: "IPX7 通过就代表 IPX6 也通过。正确吗？", answer: 1, explain: "IPX7（浸水）与 IPX6（强喷水）试验条件不同，不能互推。" },
  { module: "ik", type: "single", difficulty: 1, q: "IK08 对应的冲击能量是？", options: ["5 J", "1 J", "20 J", "2 J"], answer: 0, explain: "IK08 = 5J；IK06 = 1J；IK10 = 20J。" },
  /* ---------- materials 材料/CTI ---------- */
  { module: "materials", type: "single", difficulty: 2, q: "UL 黄卡 PLC1 约对应 CTI 多少？", options: ["≥ 600", "400–599", "250–399", "175–249"], answer: 1, explain: "PLC0 ≥ 600、PLC1 400–599、PLC2 250–399、PLC3 175–249。" },
  { module: "materials", type: "single", difficulty: 1, q: "选阻燃材料时 V-0 与 CTI 的关系是？", options: ["阻燃剂常拉低 CTI，两个指标要一起看", "V-0 高 CTI 一定高", "两者完全无关", "V-0 可以替代 CTI"], answer: 0, explain: "很多阻燃剂会降低 CTI，选外壳/骨架材料时要一起核对。" },
  { module: "materials", type: "fill", difficulty: 1, q: "材料组 I 的 CTI 要求是____。", accepted: ["600", "≥600", "大于等于600"], explain: "Ⅰ CTI ≥ 600，抗漏电起痕最强，允许爬电距离最短。" },
  /* ---------- certification 认证 ---------- */
  { module: "certification", type: "single", difficulty: 1, q: "CB 测试证书的主要价值是？", options: ["一份测试报告向多个国家转证，减少重复测试", "直接替代 CCC", "免工厂检查", "只适用于美国"], answer: 0, explain: "IECEE CB 体系由 NCB 转证，仍要核对各国国家差异。" },
  { module: "certification", type: "single", difficulty: 1, q: "CCC 认证流程通常包括？", options: ["型式试验 + 工厂检查 + 获证后监督", "仅自我声明", "只测一次不用监督", "不需要技术文件"], answer: 0, explain: "CCC 是型式试验 + 工厂检查 + 获证后监督，变更管理是重点。" },
  { module: "certification", type: "single", difficulty: 2, q: "CE 标志的性质是？", options: ["制造商声明为主，特定指令需公告机构介入", "所有产品必须第三方检测", "只适用于无线设备", "只适用于玩具"], answer: 0, explain: "CE 多数指令允许自我声明（DoC），高风险产品才需公告机构。" },
  { module: "certification", type: "write", difficulty: 3, q: "出口认证怎么选？请按目标市场列出至少三个市场的准入要点。", ref: "示例：欧盟 CE（LVD/EMC/RED，多数自我声明 + DoC，高风险需公告机构）；中国 CCC（型式试验 + 工厂检查 + 监督）；北美 UL/ETL（NRTL 认证）；CB 可做基础转证；再叠加环保 RoHS/REACH、能效 ErP、电池 UN 38.3 等。", points: ["市场准入", "自我声明 vs 第三方", "法规叠加"], explain: "参考答案：按目标市场选认证 + 叠加环保/能效/运输法规。" },
  /* ---------- reliability 可靠性 ---------- */
  { module: "reliability", type: "single", difficulty: 1, q: "湿热试验后一般要复测哪类项目？", options: ["耐压/泄漏/绝缘等安规项目", "只测外观", "只测功能", "什么都不用"], answer: 0, explain: "湿热、振动、盐雾可能劣化绝缘/接地/间距，必须复测安规项目。" },
  { module: "reliability", type: "single", difficulty: 2, q: "可靠性试验合理的顺序通常是？", options: ["环境预处理 → 外观/功能 → 安全复测", "先打耐压再做环境", "任意顺序", "只做功能检查"], answer: 0, explain: "先环境/机械应力，再外观功能，最后复测耐压、泄漏、接地。" },
  { module: "reliability", type: "fill", difficulty: 1, q: "手持类家电（60335）的自由跌落高度常见为____m。", accepted: ["1", "1.0"], explain: "手持类常见 1.0m，高度按标准与重量分档。" },
  /* ---------- chemical 化学环保 ---------- */
  { module: "chemical", type: "single", difficulty: 2, q: "RoHS 对镉（Cd）的均质材料限值是？", options: ["100 mg/kg", "1000 mg/kg", "10 mg/kg", "无限制"], answer: 0, explain: "RoHS 十项中镉 0.01%（100 mg/kg），其余多为 0.1%。" },
  { module: "chemical", type: "single", difficulty: 2, q: "REACH 的 SVHC 候选清单特点是？", options: ["持续更新，超阈值需通报/声明", "固定不变", "只针对包装材料", "只针对电池"], answer: 0, explain: "SVHC 清单不断扩充，超阈值且有义务时需通报或向客户声明。" },
  /* ---------- radiation 辐射 ---------- */
  { module: "radiation", type: "single", difficulty: 2, q: "IEC 62471 中 RG2（中危）通常需要？", options: ["警示标签或防护结构", "无条件使用", "无需任何措施", "禁止销售"], answer: 0, explain: "RG2 强光长时间直视有危害，通常需警示标签；儿童灯具要求更严。" },
  { module: "radiation", type: "single", difficulty: 1, q: "SAR 评估针对的是？", options: ["人体吸收射频能量的速率", "电离辐射剂量", "激光功率", "紫外线强度"], answer: 0, explain: "SAR 是无线设备射频暴露指标。" },
  /* ---------- surge 浪涌 ---------- */
  { module: "surge", type: "single", difficulty: 2, q: "组合波包含哪两种波形？", options: ["1.2/50 电压波 + 8/20 电流波", "10/700 电压 + 5/50 电流", "8/20 电压 + 1.2/50 电流", "EFT + ESD"], answer: 0, explain: "IEC 61000-4-5 综合测试仪输出 1.2/50μs 开路电压波和 8/20μs 短路电流波。" },
  { module: "surge", type: "single", difficulty: 2, q: "MOV（压敏电阻）最常见的失效模式是？", options: ["短路，可能过热着火", "开路，不影响电路", "电容漂移", "无失效模式"], answer: 0, explain: "MOV 反复受浪涌老化后漏电流增大，最终短路并可能过热，需配过流保护。" },
  { module: "surge", type: "fill", difficulty: 2, q: "浪涌是____级能量，EFT 是毫焦耳级。", accepted: ["焦", "焦耳"], explain: "浪涌焦耳级、EFT 毫焦耳级，防护器件完全不同。" },
  /* ---------- 补充填空题（让填空题型更常见） ---------- */
  { module: "creepage", type: "fill", difficulty: 2, q: "250V、污染等级 2、材料组 Ⅲa 的加强绝缘爬电简化值为____mm。", accepted: ["5", "5.0", "5mm", "5.0mm"], explain: "基本 2.5mm，加强按 2× 取 5.0mm（按标准表17）。" },
  { module: "clearance", type: "fill", difficulty: 2, q: "OVC Ⅱ 设备 230V 系统（冲击耐受 2500V）的加强绝缘简化间隙为____mm。", accepted: ["3", "3.0", "3mm"], explain: "表16：基本 2500V→1.5mm，加强绝缘按下一档 4000V→3.0mm（不是简单 2×）。" },
  { module: "hipot", type: "fill", difficulty: 1, q: "IEC 62368-1 中加强绝缘常见试验电压为____V AC。", accepted: ["3000", "3000v"], explain: "基本 1500V AC，加强 3000V AC（4242V DC）。" },
  { module: "hipot", type: "fill", difficulty: 2, q: "球压试验判据：5mm 钢球、约 20N、保持 1h，压痕直径不超过____mm。", accepted: ["2", "2mm"], explain: "压痕 ≤ 2mm 为常见判据。" },
  { module: "battery", type: "fill", difficulty: 1, q: "电池保护四道防线：过充、过放、过流、____。", accepted: ["过温", "温度"], explain: "过充/过放/过流/过温是基本四防。" },
  { module: "ip", type: "fill", difficulty: 1, q: "IPX7 的第二位数字 7 表示____（短时浸水 / 防喷水）。", accepted: ["浸水", "短时浸水"], explain: "7 = 短时浸水（1m、30min 量级）；6 才是防强喷水，二者不能互推。" },
  { module: "reliability", type: "fill", difficulty: 2, q: "GB/T 4857.5 公路运输、重量 <10kg 产品的跌落高度常见为____m。", accepted: ["0.8", "0.8m"], explain: "按重量分档：<10kg 约 0.8m；具体以标准表格为准。" },
  { module: "leakage", type: "fill", difficulty: 3, q: "IEC 60601-1 中 CF 型（心脏接触）患者漏电流正常条件限值为____µA。", accepted: ["10", "10ua"], explain: "B/BF 正常 100µA、CF 10µA；单一故障 B/BF 500µA、CF 50µA。" },
  { module: "chemical", type: "fill", difficulty: 2, q: "RoHS 中镉限值 100 mg/kg，其余十项多为____mg/kg。", accepted: ["1000", "1000mg/kg"], explain: "镉 0.01%，其余 0.1%（1000 mg/kg）。" },
  { module: "energy", type: "fill", difficulty: 1, q: "IEC 62368-1 中 ES1 表示____能量等级（低）。", accepted: ["低", "低能量"], explain: "ES1 低能量、ES2 需防护或警示、ES3 必须可靠隔离。" },
  { module: "shock", type: "fill", difficulty: 1, q: "防触电五道防线中优先采用的手段是____（限压）。", accepted: ["限制电压", "限压", "selv"], explain: "从源头限压最优先，SELV 是典型实现。" },
  { module: "battery", type: "fill", difficulty: 2, q: "UN 38.3 第 1 项试验是____模拟（高空低气压）。", accepted: ["高度", "海拔", "高空"], explain: "8 项试验依次：高度、热测试、振动、冲击、外部短路、撞击/挤压、过充、强制放电。" }
];
