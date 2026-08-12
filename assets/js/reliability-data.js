// 可靠性测试数据（教学参考，正式测试以标准原文为准）
var RELIABILITY_INDUSTRIES = [
  {
    "id": "appliance",
    "name": "家用电器"
  },
  {
    "id": "lighting",
    "name": "灯具照明"
  },
  {
    "id": "power",
    "name": "电源充电器"
  },
  {
    "id": "battery",
    "name": "电池储能"
  },
  {
    "id": "automotive",
    "name": "汽车电子"
  },
  {
    "id": "medical",
    "name": "医疗设备"
  },
  {
    "id": "machinery",
    "name": "工业机械"
  },
  {
    "id": "tools",
    "name": "电动工具"
  },
  {
    "id": "consumer",
    "name": "消费电子 / IoT"
  },
  {
    "id": "outdoor",
    "name": "户外 / 光伏"
  },
  {
    "id": "telecom",
    "name": "通信 / 服务器"
  }
];

var RELIABILITY_TESTS = [
  {
    "id": "low-temp",
    "name": "低温试验",
    "standards": "IEC 60068-2-1 / GB/T 2423.1",
    "purpose": "验证低温储存与工作能力，检查材料脆化和密封收缩。",
    "equipment": "低温试验箱、温度记录仪",
    "conditions": "常见 -20°C / -40°C，保持 2h / 16h 量级",
    "judgment": "无开裂、密封正常，功能与绝缘复测通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：常见 -20°C / -40°C，保持 2h / 16h 量级；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "cold",
    "group": "温度类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "high-temp",
    "name": "高温试验",
    "standards": "IEC 60068-2-2 / GB/T 2423.2",
    "purpose": "验证高温储存与工作能力，检查热变形和保护动作。",
    "equipment": "高温试验箱、温度记录仪",
    "conditions": "常见 +55°C / +70°C / +85°C，保持 2h / 16h 量级",
    "judgment": "无变形、无滴落，温升与耐压复测通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：常见 +55°C / +70°C / +85°C，保持 2h / 16h 量级；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "dry-heat",
    "group": "温度类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "temp-cycling",
    "name": "温度循环",
    "standards": "IEC 60068-2-14 / GB/T 2423.22",
    "purpose": "验证冷热交替下的焊点、密封和结构应力。",
    "equipment": "程序温循箱 / 两箱式温度冲击箱",
    "conditions": "常见 -40°C ↔ +85°C，循环 5–100 次视产品",
    "judgment": "无裂纹、无焊点失效，功能与绝缘复测通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：常见 -40°C ↔ +85°C，循环 5–100 次视产品；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "temp-cycling",
    "group": "温度类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "thermal-shock",
    "name": "温度冲击",
    "standards": "IEC 60068-2-14 / GB/T 2423.22（快速转换）",
    "purpose": "验证材料与焊点承受快速温变的能力。",
    "equipment": "两箱式温度冲击箱",
    "conditions": "两箱转换时间常见 ≤30s，高低温保持按标准",
    "judgment": "无裂纹、无分层、无电气失效",
    "industries": [
      "battery",
      "automotive",
      "medical",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：两箱转换时间常见 ≤30s，高低温保持按标准；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "thermal-shock-battery",
    "group": "温度类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "temperature-rise",
    "name": "温升测试（安规发热试验）",
    "standards": "IEC 60335-1 第 11 章、IEC 62368-1、IEC 60598-1、IEC 61010-1 / GB 4793.1（40°C 基准）、IEC 60034-1（40°C）",
    "purpose": "验证额定与异常负载下各部件温升不超过材料与安全限值。属安规型式试验，但常作为热设计验证和环境试验后的复测项。",
    "equipment": "多通道温度记录仪、热电偶、绕组电阻测量装置（电桥/微欧计）、负载/稳压电源",
    "conditions": "最不利负载 + 0.94–1.06 倍额定电压（按标准）；基准环境温度按产品标准：家电 25°C，测量控制/电机/充电设施 40°C",
    "judgment": "各部件温升不超限值；保护装置不误动作；环境试验后复测通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 粘贴热电偶到标准测量点，绕组用电阻法测冷态；② 确认标准基准环境温度（25°C 或 40°C）；③ 设最不利负载与输入电压；④ 运行至温度稳定（常见 1h 内变化 ≤1K）；⑤ 记录各点与环境温度，计算温升并与限值表比较。",
    "sopId": "temperature-rise",
    "group": "温度类",
    "detailed": "knowledge.html#temperature"
  },
  {
    "id": "damp-heat-steady",
    "name": "稳态湿热",
    "standards": "IEC 60068-2-78 / GB/T 2423.3",
    "purpose": "验证长期高湿对绝缘、腐蚀和爬电的影响。",
    "equipment": "恒温恒湿箱",
    "conditions": "常见 40°C / 93%RH，4 / 10 / 21 / 56 天量级",
    "judgment": "恢复后耐压、泄漏、爬电检查通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "medical",
      "machinery",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：常见 40°C / 93%RH，4 / 10 / 21 / 56 天量级；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "damp-heat-steady",
    "group": "湿热类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "damp-heat-cyclic",
    "name": "交变湿热",
    "standards": "IEC 60068-2-30 / GB/T 2423.4",
    "purpose": "验证凝露和呼吸效应下的绝缘性能。",
    "equipment": "可程序恒温恒湿箱",
    "conditions": "25°C ↔ 55°C / 约 95%RH，6 / 12 / 21 循环量级",
    "judgment": "恢复后耐压、泄漏、接地复测通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "automotive",
      "consumer",
      "outdoor"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：25°C ↔ 55°C / 约 95%RH，6 / 12 / 21 循环量级；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "damp-heat-cyclic",
    "group": "湿热类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "vibration-sine",
    "name": "正弦振动",
    "standards": "IEC 60068-2-6 / GB/T 2423.10",
    "purpose": "验证运输与工作振动下的结构、连接可靠性。",
    "equipment": "电动振动台、正弦控制器、加速度计",
    "conditions": "按标准设频率范围、振幅/加速度、扫频速率，3 轴",
    "judgment": "无松动、无共振损坏，间距与功能正常",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准设频率范围、振幅/加速度、扫频速率，3 轴；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "vibration-sine",
    "group": "机械类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "vibration-random",
    "name": "随机振动",
    "standards": "IEC 60068-2-64 / GB/T 2423.56",
    "purpose": "模拟运输与复杂路面的随机激励。",
    "equipment": "随机振动控制系统、振动台",
    "conditions": "按 ASD 谱型与时长（常见 30min/轴）",
    "judgment": "结构与功能完好，连接器/焊点未失效",
    "industries": [
      "battery",
      "automotive",
      "machinery",
      "consumer",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按 ASD 谱型与时长（常见 30min/轴）；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "vibration-random",
    "group": "机械类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "mechanical-shock",
    "name": "机械冲击",
    "standards": "IEC 60068-2-27 / GB/T 2423.5",
    "purpose": "验证搬运与装卸冲击下的结构安全。",
    "equipment": "冲击试验台（半正弦波）",
    "conditions": "常见 50g/11ms 或 100g/6ms，3 轴 6 向",
    "judgment": "外壳无开裂，带电部件不外露",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：常见 50g/11ms 或 100g/6ms，3 轴 6 向；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "shock",
    "group": "机械类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "drop",
    "name": "自由跌落",
    "standards": "IEC 60068-2-31 / GB/T 2423.8",
    "purpose": "验证搬运跌落后的结构、绝缘与功能。",
    "equipment": "跌落试验台",
    "conditions": "按产品高度（如 1000mm），面/边/角顺序跌落",
    "judgment": "无危险外露，绝缘与功能正常",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按产品高度（如 1000mm），面/边/角顺序跌落；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "drop",
    "group": "机械类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "salt-mist",
    "name": "盐雾试验",
    "standards": "IEC 60068-2-11 / 2-52、GB/T 2423.17 / 2423.18",
    "purpose": "验证沿海环境下的耐腐蚀能力。",
    "equipment": "盐雾试验箱",
    "conditions": "5% NaCl、35°C，24 / 48 / 72h 或循环盐雾",
    "judgment": "腐蚀不超限，接地连续性与外观合格",
    "industries": [
      "lighting",
      "battery",
      "automotive",
      "machinery",
      "consumer",
      "outdoor"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：5% NaCl、35°C，24 / 48 / 72h 或循环盐雾；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "salt-mist",
    "group": "防护/腐蚀类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "ik",
    "name": "IK 冲击试验",
    "standards": "IEC 62262",
    "purpose": "验证外壳抗机械冲击能力。",
    "equipment": "弹簧冲击锤 / 摆锤冲击试验机",
    "conditions": "按 IK 能量，最薄弱点 3 次",
    "judgment": "带电部件不外露，间距/IP 未降低",
    "industries": [
      "lighting",
      "machinery",
      "consumer",
      "outdoor"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按 IK 能量，最薄弱点 3 次；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "ik",
    "group": "机械类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "solar-radiation",
    "name": "太阳辐射试验",
    "standards": "IEC 60068-2-5 / GB/T 2423.24",
    "purpose": "验证户外产品在太阳辐射下的温升与材料老化。",
    "equipment": "太阳辐射试验箱（氙灯/金属卤素灯）",
    "conditions": "按标准辐照度与温度循环",
    "judgment": "无变形、无材料失效，温升不超限",
    "industries": [
      "lighting",
      "automotive",
      "consumer",
      "outdoor"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准辐照度与温度循环；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "环境专项类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "altitude",
    "name": "低气压 / 高空试验",
    "standards": "IEC 60068-2-13 / GB/T 2423.21、UN 38.3 高度模拟",
    "purpose": "验证高海拔或航空运输环境下的性能与密封。",
    "equipment": "低气压试验箱",
    "conditions": "按标准气压与保持时间",
    "judgment": "无密封失效、无泄漏，功能正常",
    "industries": [
      "battery",
      "automotive",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准气压与保持时间；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "环境专项类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "combined-env",
    "name": "温度+湿度+振动综合",
    "standards": "IEC 60068-2-?（综合试验）、ISO 16750-4（车载）",
    "purpose": "模拟真实使用中温度、湿度与振动同时作用。",
    "equipment": "三综合试验箱（温湿度箱+振动台）",
    "conditions": "按产品标准组合谱与循环",
    "judgment": "功能、结构、绝缘均满足要求",
    "industries": [
      "automotive",
      "battery",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按产品标准组合谱与循环；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "环境专项类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "aging-endurance",
    "name": "老化 / 耐久试验",
    "standards": "产品标准规定（如 IEC 60335-1、IEC 62841、IEC 61058）",
    "purpose": "验证长期使用后的功能与安全性能。",
    "equipment": "负载台、耐久试验机",
    "conditions": "按循环次数、负载、时间连续运行",
    "judgment": "功能正常，绝缘与接地复测通过",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "machinery",
      "tools",
      "consumer"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按循环次数、负载、时间连续运行；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "endurance",
    "group": "老化/耐久类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "flexing",
    "name": "线材弯折试验",
    "standards": "IEC 60335-1、IEC 62368-1 相关条款",
    "purpose": "验证电源线/软线在弯折下的耐久性。",
    "equipment": "软线弯折试验机",
    "conditions": "按角度、次数、负载（常见 10000 次量级）",
    "judgment": "无断芯、无外露带电，弯折后电气测试通过",
    "industries": [
      "appliance",
      "power",
      "tools",
      "consumer"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按角度、次数、负载（常见 10000 次量级）；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "老化/耐久类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "plug-cycles",
    "name": "插头插拔寿命",
    "standards": "IEC 60884-1、IEC 60320、产品标准",
    "purpose": "验证插头/连接器的插拔耐久。",
    "equipment": "插拔寿命试验机",
    "conditions": "按标准插拔次数（常见 5000–10000 次）",
    "judgment": "插拔力与接触电阻合格，无破损",
    "industries": [
      "appliance",
      "power",
      "consumer"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准插拔次数（常见 5000–10000 次）；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "老化/耐久类",
    "detailed": "knowledge.html#components"
  },
  {
    "id": "switch-endurance",
    "name": "开关寿命试验",
    "standards": "IEC 61058-1 / GB/T 15092.1",
    "purpose": "验证开关在带载循环下的耐久性。",
    "equipment": "开关寿命试验台、负载",
    "conditions": "按开关类型与标准次数（常见 10000–50000 次）",
    "judgment": "无粘连、无过热，触点接触正常",
    "industries": [
      "appliance",
      "machinery",
      "tools"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按开关类型与标准次数（常见 10000–50000 次）；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "老化/耐久类",
    "detailed": "knowledge.html#components"
  },
  {
    "id": "motor-endurance",
    "name": "电机耐久试验",
    "standards": "产品标准规定（IEC 60335-2 系列、IEC 62841）",
    "purpose": "验证电机在连续/断续负载下的寿命。",
    "equipment": "电机负载台、温升记录",
    "conditions": "按标准电压、负载与运行周期",
    "judgment": "无异常温升、无烧毁，绝缘复测通过",
    "industries": [
      "appliance",
      "tools"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准电压、负载与运行周期；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "老化/耐久类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "battery-cycle",
    "name": "电池循环寿命",
    "standards": "IEC 62133、GB/T 18287、产品标准",
    "purpose": "验证电池充放电循环后的容量与安全。",
    "equipment": "电池充放电测试仪、恒温箱",
    "conditions": "按标准倍率与循环次数（如 300–500 次）",
    "judgment": "容量保持率满足要求，无异常发热",
    "industries": [
      "battery",
      "consumer",
      "tools"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准倍率与循环次数（如 300–500 次）；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "电池专项类",
    "detailed": "knowledge.html#battery"
  },
  {
    "id": "packaging-vibration",
    "name": "运输包装振动",
    "standards": "ISTA 2A / 3E、IEC 60068-2-64",
    "purpose": "验证包装在运输振动下的保护能力。",
    "equipment": "振动台、包装样品",
    "conditions": "按 ISTA 谱型与时长",
    "judgment": "包装无破损，产品功能正常",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "medical",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按 ISTA 谱型与时长；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "包装运输类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "uv-aging",
    "name": "UV 老化试验",
    "standards": "ISO 4892-2 / GB/T 16422.2",
    "purpose": "验证户外塑料、涂层和密封件抗紫外老化。",
    "equipment": "UV 老化试验箱（荧光紫外灯）",
    "conditions": "按标准辐照周期与冷凝周期",
    "judgment": "无开裂、无粉化、颜色与机械性能满足要求",
    "industries": [
      "lighting",
      "automotive",
      "consumer",
      "outdoor"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按标准辐照周期与冷凝周期；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "老化/耐久类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "thermal-aging-rti",
    "name": "热老化 / RTI 验证",
    "standards": "UL 746B、IEC 60216",
    "purpose": "验证材料长期耐温与性能保留。",
    "equipment": "老化烘箱、性能测试设备",
    "conditions": "按 RTI 温度长期老化多个周期",
    "judgment": "性能保留满足要求，得到 RTI 等级",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "automotive",
      "medical",
      "machinery",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：按 RTI 温度长期老化多个周期；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": "rti",
    "group": "老化/耐久类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "packaging-compression",
    "name": "包装堆码 / 压缩试验",
    "standards": "ISTA 1C / 2A、GB/T 4857.4",
    "purpose": "验证包装在堆码与仓储压力下的保护能力。",
    "equipment": "压缩试验机",
    "conditions": "按包装重量和堆码高度计算载荷，保持规定时间",
    "judgment": "包装无明显压溃，产品功能正常",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "medical",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准或企业规范安装样品；② 设置条件：按包装重量和堆码高度计算载荷，保持规定时间；③ 执行试验并记录；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "包装运输类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "packaging-edge-drop",
    "name": "包装边缘 / 角跌落",
    "standards": "ISTA 1A / 2A、GB/T 4857.5",
    "purpose": "验证包装在搬运跌落下的缓冲能力。",
    "equipment": "跌落试验台",
    "conditions": "按包装重量选高度，按面/边/角顺序跌落",
    "judgment": "包装破损不导致产品损坏，产品功能正常",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "medical",
      "consumer",
      "outdoor",
      "telecom"
    ],
    "method": "① 按标准或企业规范安装样品；② 设置条件：按包装重量选高度，按面/边/角顺序跌落；③ 执行试验并记录；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "包装运输类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "connector-endurance",
    "name": "连接器 / 端子耐久",
    "standards": "IEC 61984、IEC 60352、产品标准",
    "purpose": "验证连接器和端子在插拔/振动下的接触可靠性。",
    "equipment": "连接器耐久试验机、接触电阻测试仪",
    "conditions": "按标准插拔次数和负载电流",
    "judgment": "接触电阻或电压降不超限，无松动、无过热",
    "industries": [
      "appliance",
      "power",
      "automotive",
      "consumer"
    ],
    "method": "① 按标准或企业规范安装样品；② 设置条件：按标准插拔次数和负载电流；③ 执行试验并记录；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "老化/耐久类",
    "detailed": "knowledge.html#components"
  },
  {
    "id": "halt",
    "name": "HALT 高加速寿命试验",
    "standards": "HALT/HASS 方法（参考 IEC 60068 系列）",
    "purpose": "通过步进温度与振动快速暴露设计薄弱点。",
    "equipment": "HALT 综合试验箱（温度 + 振动）",
    "conditions": "步进温度、逐步增加振动，直至发现失效边界",
    "judgment": "记录失效模式与工作/破坏极限，用于设计改进",
    "industries": [
      "automotive",
      "medical",
      "telecom"
    ],
    "method": "① 按标准或企业规范安装样品；② 设置条件：步进温度、逐步增加振动，直至发现失效边界；③ 执行试验并记录；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "sopId": null,
    "group": "加速寿命类",
    "detailed": "knowledge.html#environment"
  },
  {
    "id": "ip-protection",
    "name": "IP 防护（详细规则见知识卡）",
    "group": "防护/腐蚀类",
    "standards": "IEC 60529 / GB/T 4208",
    "purpose": "验证外壳防尘防水能力；详细代码含义、试验条件与判定见 IP 知识卡。",
    "equipment": "防尘箱、滴水/淋水/喷水/浸水装置（详见 IP 知识卡与 SOP）",
    "conditions": "按 IP 代码执行，条件详见知识卡",
    "method": "按 IP 知识卡和 IP SOP 执行",
    "judgment": "以 IEC 60529 和产品标准为准",
    "sopId": "ip",
    "detailed": "knowledge.html#ip",
    "industries": [
      "appliance",
      "lighting",
      "power",
      "battery",
      "automotive",
      "medical",
      "machinery",
      "tools",
      "consumer",
      "outdoor",
      "telecom"
    ]
  },
  {
    "id": "thermal-runaway",
    "name": "热失控扩散试验",
    "group": "电池专项类",
    "standards": "UL 9540A、GB/T 36276",
    "purpose": "验证单颗电芯热失控后不扩散到整包/整柜。",
    "equipment": "加热片/针刺触发、热电偶阵列、气体分析、高速摄像",
    "conditions": "触发单颗电芯，记录温度传播、气体与火焰",
    "judgment": "不扩散到相邻模组/柜体，泄压正常",
    "sopId": "thermal-runaway",
    "industries": [
      "battery"
    ],
    "method": "① 按标准安装样品并确认初始状态；② 设置条件：触发单颗电芯，记录温度传播、气体与火焰；③ 执行试验并记录数据；④ 恢复后检查外观与功能；⑤ 按判定标准复测。",
    "detailed": "knowledge.html#battery"
  }
];

var RELIABILITY_PLANS = [
  {
    "id": "automotive",
    "name": "汽车电子可靠性测试计划",
    "summary": "按 ISO 16750 与环境可靠性逻辑，先温度后振动，再做防护和综合环境。",
    "steps": [
      {
        "testId": "temp-cycling",
        "note": "先做温循/热冲击，暴露焊点、密封和材料应力问题"
      },
      {
        "testId": "thermal-shock",
        "note": "快速温变验证耐温冲击"
      },
      {
        "testId": "temperature-rise",
        "note": "安规发热试验：额定/异常工况部件温升，按 OEM 规范与 IEC 标准"
      },
      {
        "testId": "damp-heat-cyclic",
        "note": "湿热循环验证凝露与绝缘"
      },
      {
        "testId": "vibration-sine",
        "note": "工作/运输振动按 3 轴执行"
      },
      {
        "testId": "vibration-random",
        "note": "随机振动模拟实际路面"
      },
      {
        "testId": "mechanical-shock",
        "note": "冲击按 3 轴 6 向"
      },
      {
        "testId": "salt-mist",
        "note": "沿海腐蚀与接地检查"
      },
      {
        "testId": "solar-radiation",
        "note": "车内/外太阳辐射温升"
      },
      {
        "testId": "combined-env",
        "note": "温度+湿度+振动综合（ISO 16750-4）"
      },
      {
        "testId": "packaging-vibration",
        "note": "包装运输振动收尾"
      },
      {
        "testId": "halt",
        "note": "可选：HALT 找设计余量"
      }
    ],
    "sample": "建议 3–5 台/组，按 ISO 16750 和客户要求分配",
    "notes": "每阶段后做功能检查；振动/温循后复测绝缘、接地和连接可靠性。"
  },
  {
    "id": "battery",
    "name": "电池储能可靠性测试计划",
    "summary": "先安全滥用，再环境耐久，最后运输验证。",
    "steps": [
      {
        "testId": "temp-cycling",
        "note": "电池包温度循环，验证 BMS 和结构"
      },
      {
        "testId": "temperature-rise",
        "note": "充放电与异常工况温升，验证 BMS 保护点与散热设计"
      },
      {
        "testId": "thermal-shock",
        "note": "快速温变验证电芯与连接"
      },
      {
        "testId": "damp-heat-steady",
        "note": "长期湿热验证绝缘与腐蚀"
      },
      {
        "testId": "vibration-random",
        "note": "运输/车载随机振动"
      },
      {
        "testId": "mechanical-shock",
        "note": "冲击试验"
      },
      {
        "testId": "drop",
        "note": "搬运跌落"
      },
      {
        "testId": "altitude",
        "note": "低气压验证密封与气压平衡"
      },
      {
        "testId": "battery-cycle",
        "note": "充放电循环寿命"
      },
      {
        "testId": "thermal-runaway",
        "note": "热失控扩散验证"
      },
      {
        "testId": "packaging-vibration",
        "note": "包装运输振动"
      },
      {
        "testId": "packaging-edge-drop",
        "note": "包装角跌落"
      }
    ],
    "sample": "按 IEC 62133 / UN 38.3 / GB/T 36276，通常 5 个/组",
    "notes": "安全试验（短路、过充、挤压、针刺）与可靠性试验分开安排；热失控试验必须有防爆和灭火条件。"
  },
  {
    "id": "outdoor",
    "name": "户外灯具可靠性测试计划",
    "summary": "先材料老化，再防护，最后运输与安装冲击。",
    "steps": [
      {
        "testId": "solar-radiation",
        "note": "太阳辐射验证温升与材料"
      },
      {
        "testId": "uv-aging",
        "note": "UV 老化验证塑料/密封件"
      },
      {
        "testId": "salt-mist",
        "note": "沿海盐雾腐蚀"
      },
      {
        "testId": "temp-cycling",
        "note": "温度循环验证密封与焊点"
      },
      {
        "testId": "damp-heat-cyclic",
        "note": "交变湿热验证凝露"
      },
      {
        "testId": "ip-protection",
        "note": "防尘 + 防水按 IP 代码分步执行（详见 IP 知识卡/SOP）"
      },
      {
        "testId": "ik",
        "note": "IK 冲击验证外壳"
      },
      {
        "testId": "high-temp",
        "note": "高温工作验证驱动温升"
      },
      {
        "testId": "temperature-rise",
        "note": "安规发热试验：驱动/光源温升限值，按产品标准基准环境温度"
      },
      {
        "testId": "low-temp",
        "note": "低温启动与材料脆化"
      },
      {
        "testId": "packaging-vibration",
        "note": "包装运输振动"
      }
    ],
    "sample": "建议 3–5 台/组，IP/IK 样品为最终成品状态",
    "notes": "IP 与 IK 试验后要复测绝缘和间距；户外驱动建议同步做浪涌。"
  }
];
