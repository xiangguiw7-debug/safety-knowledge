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
  { module: "hipot", q: "产线例行耐压试验的特点通常是？", options: ["60s 保持", "1–2s 并按标准提压", "不测泄漏", "用更高电压 10s"], answer: 1, explain: "产线为节拍常缩短时间，并按规定提高电压（如 1.2×）以补偿，具体以标准为准。" },
  { module: "electric", q: "II 类设备的防触电不依赖下列哪一项？", options: ["双重绝缘", "保护接地", "加强绝缘", "基本绝缘 + 附加绝缘"], answer: 1, explain: "II 类设备不依赖保护接地，靠双重/加强绝缘保证安全；I 类才依赖接地。" },
  { module: "electric", q: "需要工具才能打开的盖板，通常如何判定？", options: ["属于可触及部件", "不作为可触及部件判定", "一定绝对安全", "必须再加绝缘"], answer: 1, explain: "需要工具拆卸的部件一般不作为可触及部件，但“工具”的定义与可拆卸部件判定以产品标准为准。" },
  { module: "electric", q: "防触电五道防线中，最优先采用的是？", options: ["外壳隔离", "保持距离", "限制电压（SELV）", "保护元件"], answer: 2, explain: "能限压就先限压，SELV 从源头消除危险；其他手段是距离/绝缘/元件/外壳兜底。" },
  { module: "energy", q: "大电容断电后仍有危险，主要原因是？", options: ["残余能量可造成电击/灼伤", "电压永远不变", "会自然短路", "没有危险"], answer: 0, explain: "断电后电容储存的能量需要泄放电阻/放电电路快速泄放，否则可触及端子仍有电击与灼伤风险。" },
  { module: "energy", q: "IEC 62368-1 中 ES3 表示？", options: ["可触及低能量", "需要防护或警示", "高危险能量，必须可靠隔离", "无需任何防护"], answer: 2, explain: "ES1 低能量、ES2 需防护或警示、ES3 高危险能量必须可靠隔离，具体阈值以标准表格为准。" },
  { module: "energy", q: "电池保护板（BMS/PCM）至少要覆盖哪四项？", options: ["过充/过放/过流/过温", "过压/欠压/短路/开路", "充电/放电/均衡/通讯", "电压/电流/容量/内阻"], answer: 0, explain: "过充、过放、过流、过温是电池保护的基本四道防线。" },
  { module: "fire", q: "灼热丝试验主要模拟什么？", options: ["外部小火焰", "故障接触热源引起的局部高温", "高温长期变形", "电弧放电"], answer: 1, explain: "灼热丝模拟接线端子、过载等故障热源接触材料时的起燃与自熄行为。" },
  { module: "fire", q: "关于 UL 94 V-0 与灼热丝试验，正确的是？", options: ["V-0 通过就等于灼热丝通过", "两者机理不同，不能互相替代", "V-0 更严，可替代所有防火试验", "灼热丝比 V-0 简单"], answer: 1, explain: "V-0 是材料燃烧等级，灼热丝验证故障热源下的起燃/自熄，两个试验机理不同。" },
  { module: "fire", q: "球压试验的常见判据是？", options: ["压痕直径 ≤ 2mm", "余焰 ≤ 30s", "烧蚀长度 ≤ 50mm", "滴落物不引燃"], answer: 0, explain: "球压验证高温不变形，常见为 5mm 钢球、约 20N、保持 1h 后压痕直径 ≤ 2mm。" },
  { module: "thermal", q: "IEC 61010-1（测量/控制/实验室设备）的温升基准环境温度通常是？", options: ["25°C", "35°C", "40°C", "55°C"], answer: 2, explain: "61010-1 以 40°C 或最高额定环境温度为基准，部件最高温度 = 基准试验温升 + 40°C。" },
  { module: "thermal", q: "IEC 60335-1（家用电器）的温升基准环境温度通常是？", options: ["25°C", "40°C", "60°C", "20°C"], answer: 0, explain: "家电体系以 25°C 为基准，热带型条件再减 7K；不要和电机/测量设备的 40°C 混用。" },
  { module: "thermal", q: "“40°C 高温工作试验”与“40°C 基准温升”的关系是？", options: ["完全相同", "高温试验是可靠性验证，不替代温升限值判定", "高温试验更严，可替代温升", "温升只适用于电机"], answer: 1, explain: "40°C 高温试验（IEC 60068-2-2 等）验证环境耐受；温升限值判定以产品标准发热条款为准。" },
  { module: "mechanical", q: "ISO 13857 的安全距离取决于？", options: ["开口尺寸和可伸入的身体部位", "产品功率", "材料强度", "电压等级"], answer: 0, explain: "开口越大、能伸入的部位越深，要求的安全距离越大，具体查 ISO 13857 表。" },
  { module: "mechanical", q: "安全联锁装置失效时应该？", options: ["继续运行", "回到安全状态", "自动重启", "由操作员决定"], answer: 1, explain: "联锁要失效安全：断电、断线、传感器失效时回到安全状态，复位后不能自动重新启动。" },
  { module: "radiation", q: "IEC 62471 中 RG2（中危）通常需要？", options: ["无条件使用", "无需任何措施", "警示标签或防护结构", "禁止销售"], answer: 2, explain: "RG2 强光/长时间直视有危害，通常需要警示标签；儿童灯具等场景要求更严。" },
  { module: "radiation", q: "IEC 60825-1 中 Class 4 激光需要？", options: ["无需防护", "仅贴标签", "封闭光路、联锁与严格管理", "普通护目镜即可"], answer: 2, explain: "Class 4 高功率，漫反射也可能伤眼或引燃，必须封闭光路、联锁并严格管理。" },
  { module: "chemical", q: "RoHS 对镉（Cd）的均质材料限值是？", options: ["100 mg/kg", "1000 mg/kg", "10 mg/kg", "无限制"], answer: 0, explain: "RoHS 十项中镉限值 0.01%（100 mg/kg），其余多为 0.1%（1000 mg/kg）。" },
  { module: "chemical", q: "REACH 的 SVHC 候选清单特点是？", options: ["固定不变", "持续更新，超阈值需通报/声明", "只针对包装材料", "只针对电池"], answer: 1, explain: "SVHC 清单不断扩充，含量超阈值且有相应义务时需要通报或向客户声明。" },
  { module: "reliability", q: "环境试验（湿热/振动/盐雾）后为什么必须复测安规项目？", options: ["例行公事", "这些应力可能使绝缘/接地/间距劣化", "为了延长试验时间", "没有必须"], answer: 1, explain: "出厂合格不等于环境后合格，湿热、振动、盐雾可能让绝缘、接地端子和间距变差，必须复测耐压/泄漏/接地。" },
  { module: "reliability", q: "湿热试验结束后，正确的做法是？", options: ["立即打耐压", "按标准恢复后再复测，避免凝露未干", "在湿态下打更高电压", "直接判定合格"], answer: 1, explain: "凝露未干时直接打耐压容易误击穿；应按标准规定恢复时间，再做外观/功能与安规复测。" },
  { module: "reliability", q: "温升测试与环境温度试验的本质区别是？", options: ["温升是安规发热试验，环境温度是可靠性验证", "两者完全相同", "温升只测外壳", "环境试验可替代温升"], answer: 0, explain: "温升测试按产品标准发热条款验证部件限值；低温/高温等环境试验验证耐受能力，两者目的和判据不同。" },
  { module: "reliability", q: "可靠性试验合理的顺序通常是？", options: ["环境预处理 → 外观/功能 → 安全复测", "先打耐压再做环境", "任意顺序", "只做功能检查"], answer: 0, explain: "先环境/机械应力，再外观功能检查，最后复测耐压、泄漏、接地，避免掩盖问题。" },
  { module: "ip", q: "IP68 中两个数字分别表示？", options: ["防尘 6 级 + 持续浸水 8 级", "防水 6 级 + 防尘 8 级", "防固体 8 级 + 防尘 6 级", "防冲击 6 级 + 防水 8 级"], answer: 0, explain: "第一位是防固体（防尘），第二位是防水；6 = 完全防尘，8 = 持续浸水。" },
  { module: "ip", q: "IPX4 表示？", options: ["防溅水", "防喷水", "防浸水", "防滴水"], answer: 0, explain: "X 表示该位不考核；4 为防溅水（各方向溅水无有害影响），IPX5 才是防喷水。" },
  { module: "ip", q: "IP 防护试验后还需要做什么？", options: ["外观 + 功能 + 耐压/泄漏/接地复测", "只拍照记录", "只测外壳尺寸", "不需要复测"], answer: 0, explain: "水尘侵入可能影响绝缘与间距，试验后必须先外观/功能检查，再复测安规项目。" },
  { module: "ik", q: "IK 代码表示什么？", options: ["抗机械冲击能量等级", "防尘防水等级", "防腐蚀等级", "防爆等级"], answer: 0, explain: "IK 是 IEC 62262 的机械冲击防护代码，IP 管防尘防水，两者独立。" },
  { module: "ik", q: "IK07 对应的冲击能量是？", options: ["0.5 J", "1 J", "2 J", "5 J"], answer: 2, explain: "IK01 = 0.14 J、IK07 = 2 J、IK10 = 20 J，具体以 IEC 62262 为准。" },
  { module: "ik", q: "弹簧冲击锤通常用于哪些 IK 等级？", options: ["IK01–IK06", "IK07–IK10", "所有等级", "仅 IK10"], answer: 0, explain: "低能量（IK01–IK06）常用弹簧冲击锤，高能量（IK07–IK10）用摆锤冲击试验机。" },
  { module: "leakage", q: "交流输入产品的泄漏电流主要由什么决定？", options: ["输入侧 Y 电容和绝缘阻抗", "保险丝额定值", "输出功率大小", "外壳颜色"], answer: 0, explain: "泄漏电流 = 电压 / 绝缘阻抗，并随 Y 电容容量增大而增大，所以 EMC 与安规互相制约。" },
  { module: "leakage", q: "Y 电容容量增大，泄漏电流会？", options: ["增大", "减小", "不变", "先大后小"], answer: 0, explain: "Y 电容跨 L/N 与地，容量越大容性电流越大，泄漏电流越容易超标。" },
  { module: "leakage", q: "工频下人体能感知的电流量级约为？", options: ["0.5–1 mA", "100 mA 以下无感", "1 A", "10 A"], answer: 0, explain: "工频感知阈值约 0.5–1 mA 量级；心室纤维性颤动阈值更高（通常数十 mA 以上），但产品限值远低于感知阈值。" },
  { module: "grounding", q: "接地连续性试验的常见电流量级是？", options: ["10–25 A", "1 A", "100 A", "0.1 A"], answer: 0, explain: "常见用 10–25 A 量级大电流测接触电阻，限值通常 0.1 Ω 量级，具体以产品标准为准。" },
  { module: "grounding", q: "I 类设备保护接地的主要作用？", options: ["给故障电流低阻抗回路，让保护装置动作", "提高信号质量", "减小正常发热", "替代所有绝缘"], answer: 0, explain: "接地让故障变成“跳闸/断保险”而不是“带电外壳”；Ⅱ类产品才不依赖接地。" },
  { module: "selv", q: "SELV 电路必须同时满足？", options: ["限压 + 可靠隔离 + 可触及安全", "只要电压低于 50 V", "只要用电阻分压", "只要不接地"], answer: 0, explain: "“低压”不等于“安全”；SELV 必须来自隔离变压器或等效隔离，并与危险电路保持足够距离。" },
  { module: "selv", q: "下列哪个不能构成 SELV 电源？", options: ["隔离变压器", "电阻分压", "满足隔离与距离要求的开关电源绕组", "独立安全隔离绕组"], answer: 1, explain: "电阻分压只降压不隔离，故障时危险电压可能直接串入，不能作为 SELV 源。" },
  { module: "emc", q: "传导发射测试主要测量什么？", options: ["电源/信号端口的传导骚扰", "空间辐射电场", "静电放电", "雷击浪涌"], answer: 0, explain: "传导发射通过 LISN 测端口骚扰；辐射发射才测空间电场，ESD/浪涌属于抗扰。" },
  { module: "emc", q: "ESD 与浪涌防护器件的选择依据是？", options: ["上升沿与能量不同：TVS 快但能量小，MOV/GDT 能量大但较慢", "两者可以完全互换", "只看峰值电压", "只看额定电流"], answer: 0, explain: "ESD 亚纳秒、能量小；浪涌微秒、焦耳级。器件混用会烧毁或失效。" },
  { module: "emc", q: "EMC 由哪两大部分组成？", options: ["EMI 与 EMS", "CE 与 RE", "传导与辐射", "安规与环保"], answer: 0, explain: "EMI 是电磁干扰（发射），EMS 是电磁敏感度（抗扰）；CE/RE 只是 EMI 里的两个项目。" },
  { module: "emc", q: "ESD 静电放电属于 EMC 的哪一部分？", options: ["EMI（电磁干扰）", "EMS（电磁敏感度）", "两者都不是", "只属于安规"], answer: 1, explain: "ESD 是外界骚扰作用在设备上，考核设备抗扰能力，属于 EMS。" },
  { module: "emc", q: "辐射抗扰（RS）对应的基础试验标准是？", options: ["IEC 61000-4-2", "IEC 61000-4-3", "IEC 61000-4-5", "CISPR 32"], answer: 1, explain: "RS 用 IEC 61000-4-3（暗室天线扫频）；ESD 是 4-2，浪涌是 4-5，CISPR 32 是发射限值标准。" },
  { module: "emc", q: "传导抗扰（CS）的典型注入频段是？", options: ["150kHz–80MHz", "30MHz–1GHz", "9kHz–150kHz", "1–6GHz"], answer: 0, explain: "CS 常见 150kHz–80MHz（部分扩展到 230MHz），通过 CDN 注入；辐射抗扰才用 80MHz 以上。" },
  { module: "battery", q: "UN 38.3 运输试验共几项？", options: ["8 项", "6 项", "10 项", "4 项"], answer: 0, explain: "高度模拟、热测试、振动、冲击、外部短路、撞击/挤压、过充、强制放电共 8 项。" },
  { module: "battery", q: "便携式锂电池安全标准按市场怎么选？", options: ["中国 GB 31241、国际 IEC 62133，按目标市场", "只用 UL 9540A", "只用 UN 38.3", "不需要标准"], answer: 0, explain: "中国强制 GB 31241，出口常用 IEC 62133，运输用 UN 38.3；储能另有 GB/T 36276、UL 9540A。" },
  { module: "materials", q: "CTI ≥ 600 属于材料组？", options: ["Ⅰ", "Ⅱ", "Ⅲa", "Ⅲb"], answer: 0, explain: "材料组 Ⅰ：CTI ≥ 600，抗漏电起痕最强，允许爬电距离最短。" },
  { module: "materials", q: "UL 黄卡的 PLC 等级与 CTI 的关系是？", options: ["PLC0 约对应 CTI ≥ 600", "PLC5 约对应 CTI ≥ 600", "两者无关", "PLC 只表示阻燃等级"], answer: 0, explain: "PLC0 ≥ 600、PLC1 400–599、PLC2 250–399、PLC3 175–249、PLC4 100–174、PLC5 < 100。" },
  { module: "materials", q: "选阻燃材料时 V-0 与 CTI 的关系？", options: ["阻燃剂常拉低 CTI，两个指标要一起看", "V-0 高 CTI 一定高", "两者完全无关", "V-0 可以替代 CTI"], answer: 0, explain: "很多阻燃剂会降低 CTI，选外壳/骨架材料时 V-0 与 CTI 经常互相打架，必须一起核对。" },
  { module: "certification", q: "CB 测试证书的主要价值是？", options: ["一份测试报告向多个国家转证，减少重复测试", "直接替代 CCC", "免工厂检查", "只适用于美国"], answer: 0, explain: "IECEE CB 体系由 NCB 转证，可减少重复测试，但仍需按各国 National Differences 核对。" },
  { module: "certification", q: "CCC 认证流程通常包括？", options: ["型式试验 + 工厂检查 + 获证后监督", "仅自我声明", "只测一次不用监督", "不需要技术文件"], answer: 0, explain: "CCC 是型式试验 + 工厂检查 + 获证后监督，关键元器件与变更管理是重点。" },
  { module: "certification", q: "CE 标志的性质是？", options: ["制造商声明为主，特定指令需公告机构介入", "所有产品必须第三方检测", "只适用于无线设备", "只适用于玩具"], answer: 0, explain: "CE 是市场准入标志，多数指令允许自我声明（DoC），高风险产品才需公告机构。" },
  { module: "framework", q: "GB 标准前言中 IDT 表示？", options: ["等同采用 IEC 标准", "修改采用", "非等效", "不采用"], answer: 0, explain: "IDT 等同、MOD 修改、NEQ 非等效；判定条款差异时要先看采标程度。" },
  { module: "framework", q: "查安全标准的推荐顺序是？", options: ["产品 → 标准 → 条款 → 表格", "表格 → 条款 → 标准", "只看附录", "随便翻"], answer: 0, explain: "先确认产品适用标准，再定位通用要求、试验条件和数值表格，避免断章取义。" }
];

var AUTO_QUESTIONS = (typeof window.buildAutoQuestions === "function") ? window.buildAutoQuestions() : [];
var AUTO_SAMPLE = AUTO_QUESTIONS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 20);
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
  if (activeModule === "all") return QUIZ_BANK.slice().concat(AUTO_SAMPLE);
  if (activeModule === "auto") return AUTO_QUESTIONS.slice();
  var bank = QUIZ_BANK.concat(AUTO_QUESTIONS);
  return bank.filter(function (q) { return q.module === activeModule; });
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function startQuiz(custom) {
  state.list = shuffle((custom && Array.isArray(custom)) ? custom : currentList());
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
  var tag = document.getElementById("quizAutoTag");
  if (tag) tag.hidden = !item.auto;
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
  if (activeModule === "all") {
    $("quizCount").textContent = "精选 " + QUIZ_BANK.length + " 题 + 自动生成 " + AUTO_SAMPLE.length + " 题（随机抽样）";
  } else if (activeModule === "auto") {
    $("quizCount").textContent = "自动生成题库：" + AUTO_QUESTIONS.length + " 题（由知识卡 / 标准 / 可靠性数据自动生成）";
  } else {
    $("quizCount").textContent = "当前题库：" + currentList().length + " 题（每次随机出题）";
  }
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
    startQuiz();
  });
});

function exportWrong() {
  var list = getWrong();
  var text = "错题本（共 " + list.length + " 题）\n\n" + list.map(function (w, i) {
    var a;
    if (w.type === "multi") a = (w.answer || []).map(function (x) { return w.options[x]; }).join("、");
    else if (w.type === "judge") a = (w.answer === 0 ? "正确" : "错误");
    else a = w.options[w.answer];
    return (i + 1) + ". " + w.q + "\n正确答案：" + a + "\n解析：" + (w.explain || "");
  }).join("\n\n");
  function done() { if (window.AnGuiUX) window.AnGuiUX.toast("错题已复制"); }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done).catch(done); }
  else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); }
}
var wc = document.getElementById("wrongClearBtn");
if (wc) wc.addEventListener("click", clearWrong);
var wr = document.getElementById("wrongRetryBtn");
if (wr) wr.addEventListener("click", function () {
  if (getWrong().length) { startQuiz(getWrong()); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else if (window.AnGuiUX) window.AnGuiUX.toast("还没有错题");
});
var we = document.getElementById("wrongExportBtn");
if (we) we.addEventListener("click", exportWrong);

$("quizStart").addEventListener("click", function () { startQuiz(); });
$("quizNext").addEventListener("click", function () { nextQuestion(); });
$("quizRestart").addEventListener("click", function () { startQuiz(); });
updateQuizCount();
renderWrongBook();
