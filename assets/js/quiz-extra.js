// 扩充题库（v1.2+）：在 quiz-v2.js 的 QUIZ_BANK 基础上新增题型与难度
// 题型 type：single（单选，默认）/ judge（判断）/ multi（多选）/ scenario（情景）/ calc（计算）/ lookup（查表）
// 难度 difficulty：1 基础 / 2 进阶 / 3 拔高；未标默认 1
// 数值沿用本站“教学简化表”，正式设计以标准原文为准
var QUIZ_BANK_EXTRA = [

  /* ============ 电气间隙 clearance ============ */
  { module: "clearance", type: "calc", difficulty: 2, q: "230V 系统、插头连接（类别Ⅱ）设备，冲击耐受 2500V，基本绝缘的简化最小间隙是？", scenario: "<b>教学简化表（基本绝缘）：</b>1500V→1.0mm、2500V→2.0mm、4000V→3.0mm、6000V→5.5mm；加强绝缘=2×基本。", options: ["1.0mm", "2.0mm", "4.0mm", "5.5mm"], answer: 1, explain: "230V+类别Ⅱ→冲击耐受 2500V；查表 2500V→基本绝缘 2.0mm。注意 4.0mm 是加强绝缘（2×基本），别选错。" },
  { module: "clearance", type: "lookup", difficulty: 2, q: "按查表流程：230V 系统、固定安装（类别Ⅲ）设备，基本绝缘最小间隙应取？", scenario: "<b>查表三步：</b>① 230V+类别Ⅲ→冲击耐受 4000V；② 绝缘类型=基本绝缘；③ 查简化表。<br><b>教学简化表（基本绝缘）：</b>1500V→1.0、2500V→2.0、4000V→3.0、6000V→5.5。", options: ["2.0mm", "3.0mm", "5.5mm", "6.0mm"], answer: 1, explain: "230V+类别Ⅲ→4000V→基本绝缘 3.0mm；6.0mm 是加强绝缘（2×）。" },
  { module: "clearance", type: "calc", difficulty: 3, q: "冲击耐受电压 4000V 时，加强绝缘的简化最小间隙是？", options: ["3.0mm", "5.5mm", "6.0mm", "8.0mm"], answer: 2, explain: "4000V 基本绝缘 3.0mm，加强绝缘=2×=6.0mm。" },
  { module: "clearance", type: "judge", difficulty: 1, q: "PCB 走线之间开槽能有效增大电气间隙。", options: ["正确", "错误"], answer: 1, explain: "错误。间隙量的是空气直线距离，开槽不改变直线路径；开槽只增加爬电路径（沿表面绕过沟槽）。" },
  { module: "clearance", type: "scenario", difficulty: 2, q: "某 PCB 电源板一次侧与二次侧走线电气间隙不足，工程师打算在两走线之间开一道槽。这个措施主要改善哪个参数？", options: ["电气间隙", "爬电距离", "耐压能力", "泄漏电流"], answer: 1, explain: "开槽使表面路径绕过沟槽变长，是增大爬电距离的经典手段；对空气直线距离（间隙）基本无帮助。" },
  { module: "clearance", type: "multi", difficulty: 2, q: "查电气间隙时需要下列哪些参数？（多选）", options: ["冲击耐受电压", "过电压类别/系统电压", "材料组（CTI）", "绝缘类型"], answer: [0, 1, 3], explain: "间隙由冲击耐受电压（由系统电压+过电压类别确定）、海拔和绝缘类型决定；材料组（CTI）只影响爬电距离，不参与间隙查表。" },
  { module: "clearance", type: "single", difficulty: 1, q: "海拔 2000m 以上使用的设备，电气间隙通常需要怎么处理？", options: ["乘小于 1 的系数（可减小）", "乘大于 1 的系数（要增大）", "保持不变", "改按爬电距离查"], answer: 1, explain: "海拔越高空气越稀薄越易击穿，间隙要乘大于 1 的修正系数（增大）；爬电一般不作海拔修正。" },

  /* ============ 爬电距离 creepage ============ */
  { module: "creepage", type: "calc", difficulty: 2, q: "250V 工作电压、污染等级 2、材料组 Ⅲa，基本绝缘的简化爬电距离是？", scenario: "<b>教学简化表（基本绝缘爬电，250V·污染2）：</b>材料组Ⅰ→2.0mm、Ⅱ→2.5mm、Ⅲa/Ⅲb→3.2mm；加强绝缘=2×。", options: ["2.0mm", "2.5mm", "3.2mm", "6.4mm"], answer: 2, explain: "Ⅲa→基本 3.2mm；6.4mm 是加强绝缘（2×）。材料组越差（Ⅲa/Ⅲb）需要的爬电越大。" },
  { module: "creepage", type: "lookup", difficulty: 2, q: "查表：250V 工作电压、污染等级 2、材料组 Ⅱ 的基本绝缘爬电距离应取？", scenario: "<b>教学简化表（250V·污染2，基本绝缘）：</b>材料组Ⅰ→2.0、Ⅱ→2.5、Ⅲa/Ⅲb→3.2。", options: ["2.0mm", "2.5mm", "3.2mm", "5.0mm"], answer: 1, explain: "材料组 Ⅱ→基本 2.5mm；Ⅰ 组抗起痕最强可取更短，Ⅲa/Ⅲb 需更长。" },
  { module: "creepage", type: "calc", difficulty: 3, q: "250V、污染 2、材料组 Ⅲa 的加强绝缘爬电距离是？", options: ["3.2mm", "4.5mm", "6.4mm", "6.0mm"], answer: 2, explain: "基本 3.2mm，加强=2×=6.4mm。" },
  { module: "creepage", type: "judge", difficulty: 1, q: "普通 PCB 阻焊层（绿油）可以计入爬电距离。", options: ["正确", "错误"], answer: 1, explain: "错误。普通阻焊层不能计入；只有通过 IEC 60664-3 涂层（conformal coating）试验的涂覆才能计入。" },
  { module: "creepage", type: "multi", difficulty: 2, q: "下列哪些参数参与爬电距离查表？（多选）", options: ["工作电压（有效值）", "污染等级", "材料组（CTI）", "冲击耐受电压"], answer: [0, 1, 2], explain: "爬电看持续工作电压、污染等级和材料组；冲击耐受电压影响电气间隙而非爬电。" },
  { module: "creepage", type: "scenario", difficulty: 2, q: "某户外工业设备（污染等级 3、可能有导电粉尘凝结），与同电压的室内设备相比，爬电距离应？", options: ["更小", "相同", "更大", "无需爬电"], answer: 2, explain: "污染等级 3 存在导电污染或潮湿凝结，表面更易起痕，需要的爬电距离更大。" },
  { module: "creepage", type: "single", difficulty: 1, q: "CTI=450 的材料属于哪个材料组？", options: ["Ⅰ", "Ⅱ", "Ⅲa", "Ⅲb"], answer: 1, explain: "Ⅱ 组：400≤CTI<600；450 落在 400–600 区间。" },

  /* ============ 雷击浪涌 surge ============ */
  { module: "surge", type: "scenario", difficulty: 2, q: "输入端口采用 GDT（气体放电管）+ 退耦电感 + TVS 三级防护，退耦电感的作用是？", options: ["限制电流", "防止两级同时导通烧坏末级 TVS", "提高响应速度", "替代保险丝"], answer: 1, explain: "退耦元件让前级 GDT 先导通泄放大部分能量、末级 TVS 稍后导通，避免两级同时导通导致末级承受全部能量而烧毁。" },
  { module: "surge", type: "judge", difficulty: 1, q: "浪涌（surge）的单次能量远大于 EFT（电快速瞬变脉冲群）。", options: ["正确", "错误"], answer: 0, explain: "正确。浪涌是焦耳级能量，EFT 是毫焦耳级，两者防护器件完全不同。" },
  { module: "surge", type: "multi", difficulty: 2, q: "下列哪些器件常用于浪涌防护？（多选）", options: ["MOV 压敏电阻", "GDT 气体放电管", "TVS 瞬态抑制二极管", "普通保险丝"], answer: [0, 1, 2], explain: "MOV、GDT、TVS 是三大浪涌防护器件；保险丝用于过流保护，不直接泄放浪涌。" },
  { module: "surge", type: "single", difficulty: 1, q: "差模浪涌的注入路径是？", options: ["线-线（L-N）", "线-地（L/N-PE）", "外壳-地", "天线端口"], answer: 0, explain: "线-线注入是差模；线-地注入是共模。" },
  { module: "surge", type: "single", difficulty: 1, q: "组合波（1.2/50 + 8/20）中，1.2/50μs 表示？", options: ["开路电压波", "短路电流波", "EFT 脉冲", "ESD 波形"], answer: 0, explain: "1.2/50μs 是开路电压波，8/20μs 是短路电流波。" },
  { module: "surge", type: "single", difficulty: 3, q: "从电源进线到负载，多级浪涌防护的合理顺序是？", options: ["GDT → 退耦 → TVS", "TVS → 退耦 → GDT", "只用一个大 TVS", "GDT 与 TVS 并联、无退耦"], answer: 0, explain: "进线侧用大能量 GDT，经退耦后末级用快速 TVS 精保护。" },

  /* ============ 耐压测试 hipot ============ */
  { module: "hipot", type: "calc", difficulty: 2, q: "IEC 62368-1 中基本绝缘耐压 1500V AC，加强绝缘耐压应约为？", options: ["1500V AC", "2121V AC", "3000V AC", "4242V AC"], answer: 2, explain: "加强绝缘约 2×基本：1500→3000V AC（对应 DC 4242V）。" },
  { module: "hipot", type: "calc", difficulty: 2, q: "交流耐压 1500V AC 折算成直流耐压约是多少？", options: ["1500V DC", "2121V DC", "3000V DC", "4242V DC"], answer: 1, explain: "DC≈1.414×AC：1500×1.414≈2121V DC。" },
  { module: "hipot", type: "judge", difficulty: 1, q: "直流耐压测试结束后，可以直接拆线。", options: ["正确", "错误"], answer: 1, explain: "错误。DC 会给绝缘和分布电容充电，必须先放电并确认电压释放后才能拆线，否则有电击风险。" },
  { module: "hipot", type: "multi", difficulty: 2, q: "耐压测试合格的判据通常包括？（多选）", options: ["无击穿", "无闪络", "泄漏电流不超过限值", "温升低于 50K"], answer: [0, 1, 2], explain: "判据是无击穿、无闪络、泄漏电流不超限；温升不是耐压测试的判据。" },
  { module: "hipot", type: "scenario", difficulty: 2, q: "产线例行耐压测试为了节拍，通常怎么处理？", options: ["保持 60s 不变", "缩短到 1–2s 并按标准提高电压", "不测泄漏只测击穿", "改用直流、不加压"], answer: 1, explain: "产线为节拍常缩短时间，并按规定提高电压（如 1.2×）补偿；具体以产品标准为准。" },

  /* ============ 防电击 electric ============ */
  { module: "electric", type: "scenario", difficulty: 2, q: "某 II 类手机充电器外壳用卡扣固定，用户徒手即可拆开后盖并触及一次侧焊点。这主要违反了什么？", options: ["功能绝缘要求", "可触及部件判定（带电部件不可徒手触及）", "EMC 限值", "环保要求"], answer: 1, explain: "带电部件不得被徒手触及；徒手可拆的卡扣后盖会让人触及一次侧危险部件，不符合可触及性要求。" },
  { module: "electric", type: "multi", difficulty: 1, q: "II 类设备的防触电防护可以依赖？（多选）", options: ["双重绝缘", "加强绝缘", "保护接地", "基本绝缘+附加绝缘"], answer: [0, 1, 3], explain: "II 类不依赖保护接地，靠双重绝缘（基本+附加）或加强绝缘。" },
  { module: "electric", type: "judge", difficulty: 1, q: "塑料外壳的产品一定属于 II 类。", options: ["正确", "错误"], answer: 1, explain: "错误。塑料外壳≠II 类，还要满足附加绝缘的爬电/间隙与耐压；II 类看绝缘体系、不看外壳材质。" },
  { module: "electric", type: "single", difficulty: 3, q: "需要螺丝刀才能打开的设备盖板，其内部带电部件通常如何判定？", options: ["仍属可触及部件", "不作为可触及部件判定", "一定绝对安全", "必须再加一层绝缘"], answer: 1, explain: "需要工具拆卸的部件一般不作可触及部件；但“工具”定义与可拆卸部件判定以产品标准为准。" },

  /* ============ 能量危险 energy ============ */
  { module: "energy", type: "judge", difficulty: 1, q: "大电容断电后，只要断开电源就绝对安全。", options: ["正确", "错误"], answer: 1, explain: "错误。断电后电容仍储有能量，需泄放电阻/放电电路快速泄放，否则可触及端子仍有电击与灼伤风险。" },
  { module: "energy", type: "multi", difficulty: 2, q: "电池保护板（BMS/PCM）至少应覆盖哪些保护？（多选）", options: ["过充", "过放", "过流", "过温"], answer: [0, 1, 2, 3], explain: "过充、过放、过流、过温是电池保护的基本四道防线。" },

  /* ============ 防火 fire ============ */
  { module: "fire", type: "judge", difficulty: 1, q: "UL 94 V-0 通过就等同于灼热丝试验通过。", options: ["正确", "错误"], answer: 1, explain: "错误。V-0 是材料燃烧等级，灼热丝验证故障热源下的起燃/自熄，机理不同不能互相替代。" },
  { module: "fire", type: "multi", difficulty: 2, q: "防火设计要沿“起火链”断链，下列哪些是断链手段？（多选）", options: ["保险丝/限能（断起火源）", "阻燃材料（断可燃物）", "开孔位置与挡板（断传播）", "加大散热孔（断时间）"], answer: [0, 1, 2], explain: "起火源、可燃材料、传播路径都要断；“加大散热孔”反而可能给火焰留通道。" },

  /* ============ 热量/温升 thermal ============ */
  { module: "thermal", type: "calc", difficulty: 2, q: "IEC 61010-1（测量设备）基准环境温度 40°C，某部件允许温升 65K，其允许的最高温度是？", scenario: "<b>换算公式：</b>部件允许温度 = 基准环境温度 + 允许温升。", options: ["65°C", "105°C", "40°C", "90°C"], answer: 1, explain: "40 + 65 = 105°C。注意先确认标准给的是“允许温升(K)”还是“允许温度(°C)”。" },
  { module: "thermal", type: "judge", difficulty: 1, q: "所有安规标准的温升基准环境温度都是 25°C。", options: ["正确", "错误"], answer: 1, explain: "错误。家电 60335 是 25°C，但测量设备 61010、电机 60034、充电桩多用 40°C 基准。" },
  { module: "thermal", type: "scenario", difficulty: 2, q: "产品做了 40°C 高温工作试验（IEC 60068-2-2）且通过，能否替代温升限值判定？", options: ["可以，更严", "不可以，两者目的不同", "可以，只要温度更高", "视情况"], answer: 1, explain: "不可以。高温试验是可靠性环境耐受验证；温升限值判定以产品标准发热条款为准，两者目的与判据不同。" },

  /* ============ 机械 mechanical ============ */
  { module: "mechanical", type: "judge", difficulty: 1, q: "安全联锁失效（断线/断电）时，设备应回到安全状态且不能自动重启。", options: ["正确", "错误"], answer: 0, explain: "正确。联锁要失效安全，复位后不能自动重新启动。" },
  { module: "mechanical", type: "multi", difficulty: 2, q: "ISO 13857 的安全距离与下列哪些因素有关？（多选）", options: ["开口尺寸", "可伸入的身体部位", "产品功率", "电压等级"], answer: [0, 1], explain: "安全距离取决于开口尺寸和可伸入部位（手指/手/手臂），与功率、电压无关。" },

  /* ============ 辐射 radiation ============ */
  { module: "radiation", type: "judge", difficulty: 1, q: "激光等级越高，光一定越亮。", options: ["正确", "错误"], answer: 1, explain: "错误。等级按危险度（波长、功率、可达性）分，不是按亮度；红外高功率激光看不见却很危险。" },
  { module: "radiation", type: "multi", difficulty: 2, q: "Class 4 激光需要哪些措施？（多选）", options: ["封闭光路", "安全联锁", "严格管理与警示", "普通护目镜即可"], answer: [0, 1, 2], explain: "Class 4 高功率，漫反射也可能伤眼/引燃，必须封闭光路、联锁并严格管理。" },

  /* ============ 化学 chemical ============ */
  { module: "chemical", type: "judge", difficulty: 1, q: "RoHS 按整机测一个样就能判定合规。", options: ["正确", "错误"], answer: 1, explain: "错误。RoHS 按均质材料判定，需拆分到均质材料测试才有意义。" },
  { module: "chemical", type: "multi", difficulty: 2, q: "下列哪些属于 RoHS 限制物质？（多选）", options: ["铅 Pb", "镉 Cd", "六价铬 Cr(VI)", "邻苯二甲酸酯 DEHP"], answer: [0, 1, 2, 3], explain: "RoHS 十项包括铅、镉、汞、六价铬、PBB/PBDE 及 4 种邻苯二甲酸酯。" },

  /* ============ 可靠性 reliability ============ */
  { module: "reliability", type: "judge", difficulty: 1, q: "湿热/振动/盐雾试验后，必须复测耐压、泄漏、接地等安规项目。", options: ["正确", "错误"], answer: 0, explain: "正确。环境应力可能使绝缘、接地端子、间距劣化，环境试验后必须复测。" },
  { module: "reliability", type: "multi", difficulty: 2, q: "可靠性试验合理的顺序通常包括？（多选）", options: ["环境/机械应力预处理", "外观与功能检查", "安规复测（耐压/泄漏/接地）", "先打耐压再做环境"], answer: [0, 1, 2], explain: "先环境/机械应力，再外观功能检查，最后复测安规项目；顺序颠倒会掩盖问题。" },

  /* ============ IP 防护 ip ============ */
  { module: "ip", type: "judge", difficulty: 1, q: "IPX4 表示防喷水（任意方向喷水）。", options: ["正确", "错误"], answer: 1, explain: "错误。IPX4 是防溅水；IPX5 才是防喷水。" },
  { module: "ip", type: "multi", difficulty: 2, q: "IP 防护试验后还需要做哪些？（多选）", options: ["外观检查", "功能检查", "耐压/泄漏/接地复测", "只拍照即可"], answer: [0, 1, 2], explain: "水尘侵入可能影响绝缘与间距，试验后须外观/功能检查并复测安规项目。" },

  /* ============ IK 冲击 ik ============ */
  { module: "ik", type: "judge", difficulty: 1, q: "IK07 对应的冲击能量是 2J。", options: ["正确", "错误"], answer: 0, explain: "正确。IK01=0.14J、IK07=2J、IK10=20J。" },

  /* ============ 泄漏电流 leakage ============ */
  { module: "leakage", type: "calc", difficulty: 2, q: "Y 电容容量增大时，泄漏电流会？", options: ["增大", "减小", "不变", "先大后小"], answer: 0, explain: "Y 电容跨 L/N 与地，容量越大容性电流越大，泄漏电流越易超标。" },
  { module: "leakage", type: "judge", difficulty: 1, q: "工频下人体感知电流阈值约为 0.5–1 mA 量级。", options: ["正确", "错误"], answer: 0, explain: "正确。工频感知阈值约 0.5–1mA；心室纤颤阈值更高（数十 mA 以上）。" },

  /* ============ 接地 grounding ============ */
  { module: "grounding", type: "judge", difficulty: 1, q: "保护接地回路中可以串接开关或保险丝。", options: ["正确", "错误"], answer: 1, explain: "错误。保护接地回路不得串接开关/保险丝/可拆卸连接件（标准允许除外），否则故障时接地可能断开。" },
  { module: "grounding", type: "multi", difficulty: 2, q: "下列哪些环境/机械试验后必须复测接地连续性？（多选）", options: ["振动", "湿热", "盐雾", "跌落"], answer: [0, 1, 2, 3], explain: "这些应力都可能使端子氧化、螺丝松动、焊缝开裂，必须复测接地电阻。" },

  /* ============ SELV selv ============ */
  { module: "selv", type: "judge", difficulty: 1, q: "电压低于 50V 的电路就是 SELV 电路。", options: ["正确", "错误"], answer: 1, explain: "错误。“低压”≠“安全”，SELV 必须来自隔离变压器或等效隔离，并与危险电路保持足够距离。" },
  { module: "selv", type: "multi", difficulty: 2, q: "SELV 电路必须同时满足？（多选）", options: ["限压（低于安全限值）", "与危险电路可靠隔离", "可触及安全", "只要电阻分压即可"], answer: [0, 1, 2], explain: "SELV 需限压+可靠隔离+可触及安全；电阻分压不隔离，不能构成 SELV。" },

  /* ============ EMC emc ============ */
  { module: "emc", type: "judge", difficulty: 1, q: "ESD 静电放电属于 EMI（电磁干扰发射），不属于 EMS。", options: ["正确", "错误"], answer: 1, explain: "错误。ESD 是外界骚扰作用在设备上，考核抗扰能力，属于 EMS（电磁敏感度）。" },
  { module: "emc", type: "multi", difficulty: 2, q: "EMC 包含哪两大部分？（多选）", options: ["EMI 电磁干扰（发射）", "EMS 电磁敏感度（抗扰）", "CE 传导发射", "RS 辐射抗扰"], answer: [0, 1], explain: "EMC = EMI + EMS；CE 是 EMI 的一个项目，RS 是 EMS 的一个项目。" },

  /* ============ 电池 battery ============ */
  { module: "battery", type: "judge", difficulty: 1, q: "UN 38.3 运输试验共 8 项。", options: ["正确", "错误"], answer: 0, explain: "正确。高度模拟、热测试、振动、冲击、外部短路、撞击/挤压、过充、强制放电共 8 项。" },
  { module: "battery", type: "multi", difficulty: 2, q: "锂电池产品按市场选标准，正确的组合是？（多选）", options: ["中国：GB 31241", "国际/出口：IEC 62133", "运输：UN 38.3", "储能：GB/T 36276 或 UL 9540A"], answer: [0, 1, 2, 3], explain: "四条都对：中国强制 GB 31241、出口常用 IEC 62133、运输 UN 38.3、储能另按 GB/T 36276/UL 9540A。" },

  /* ============ 材料/CTI materials ============ */
  { module: "materials", type: "judge", difficulty: 1, q: "V-0 高的材料，CTI 一定也高。", options: ["正确", "错误"], answer: 1, explain: "错误。很多阻燃剂会降低 CTI，V-0 与 CTI 常互相打架，必须一起核对。" },
  { module: "materials", type: "multi", difficulty: 2, q: "UL 黄卡通常提供哪些等级信息？（多选）", options: ["阻燃等级 UL 94", "CTI 的 PLC 等级", "RTI 相对热指数", "IP 防护等级"], answer: [0, 1, 2], explain: "黄卡提供 UL 94、HWI/HAI、CTI(PLC)、RTI 等材料性能；IP 是外壳防护，不在黄卡上。" },

  /* ============ 认证 certification ============ */
  { module: "certification", type: "judge", difficulty: 1, q: "CE 标志所有产品都必须由第三方检测机构发证。", options: ["正确", "错误"], answer: 1, explain: "错误。CE 多数指令允许制造商自我声明（DoC），高风险产品才需公告机构介入。" },
  { module: "certification", type: "multi", difficulty: 2, q: "CCC 认证流程通常包括？（多选）", options: ["型式试验", "工厂检查", "获证后监督", "仅自我声明"], answer: [0, 1, 2], explain: "CCC 是型式试验+工厂检查+获证后监督；“仅自我声明”是部分 CE 指令的模式。" },

  /* ============ 标准结构 framework ============ */
  { module: "framework", type: "judge", difficulty: 1, q: "GB 标准前言中 IDT 表示等同采用 IEC 标准。", options: ["正确", "错误"], answer: 0, explain: "正确。IDT 等同、MOD 修改、NEQ 非等效。" },
  { module: "framework", type: "multi", difficulty: 2, q: "查安全标准推荐的顺序是？（多选）", options: ["先确认产品适用标准", "定位通用要求与试验条件", "再查具体数值表格", "从附录表格倒推产品"], answer: [0, 1, 2], explain: "按“产品→标准→条款→表格”；从表格倒推易断章取义。" }
];
