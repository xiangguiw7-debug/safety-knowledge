var CERT_COUNTRIES = [
  { name: "中国", region: "亚洲", system: "CCC / CQC", regulator: "市场监管总局（SAMR）· CNCA", mark: "CCC",
    scope: "强制目录：家电、音视频/IT、灯具、电线电缆、低压电器等；目录外可做 CQC 自愿认证。",
    standards: "GB 4706.1、GB 4943.1、GB 7000.1 等（多与 IEC 对应）",
    url: "https://www.cnca.gov.cn/", urlLabel: "CNCA 官网",
    note: "型式试验 + 工厂检查 + 获证后监督；CCC 标志由 CNCA 统一管理。" },
  { name: "欧盟", region: "欧盟", system: "CE 标志（多指令）", regulator: "欧盟委员会 / 各国市场监督机构", mark: "CE",
    scope: "LVD 低压指令 + EMC 指令覆盖大部分电子电气；RED 覆盖无线；MD 覆盖机械；MDR 覆盖医疗。",
    standards: "EN/IEC 对应标准（EN 60335-1、EN 62368-1 等）",
    url: "https://single-market-economy.ec.europa.eu/", urlLabel: "欧盟单一市场官网",
    note: "多数产品制造商自我声明并准备技术文件；特定指令（如 MDR）需要公告机构介入。" },
  { name: "德国", region: "欧盟", system: "VDE / GS 标志", regulator: "VDE 测试认证机构 · 德国市场准入体系", mark: "VDE / GS",
    scope: "家电、电源、灯具、线缆、插头、元器件等。VDE 不是法律强制，而是德国市场、保险与采购商普遍认可的质量与安全标志。",
    standards: "VDE 对应 IEC/EN（DIN VDE 标准）",
    url: "https://www.vde.com/", urlLabel: "VDE 官网",
    note: "VDE 标志（产品符合 VDE 标准）与 GS 标志（德国政府认可的安全标志）都是自愿但渠道常要求；元器件（保险丝、X/Y 电容、插头）的 VDE 认证尤其常见。" },
  { name: "英国", region: "欧洲其他", system: "UKCA + BEAB/Kitemark", regulator: "OPSS（产品安全与标准办公室）· BSI", mark: "UKCA",
    scope: "英国（GB）市场：UKCA 为自主强制体系；过渡期内多数产品仍接受 CE（政策以最新为准）。BEAB Approved 与 Kitemark 为渠道标志。",
    standards: "BS EN 对应 IEC",
    url: "https://www.gov.uk/guidance/using-the-ukca-marking", urlLabel: "GOV.UK UKCA",
    note: "北爱尔兰另有 UKNI 安排；家电渠道常见 BEAB Approved。" },
  { name: "法国", region: "欧盟", system: "NF 标志", regulator: "AFNOR · LCIE", mark: "NF",
    scope: "NF Electricité 覆盖电气产品与元器件，自愿但公共采购与渠道常见。",
    standards: "NF EN 对应 IEC",
    url: "https://nf.afnor.org/", urlLabel: "NF 官网",
    note: "NF 是法国历史悠久的质量与安全标志。" },
  { name: "荷兰", region: "欧盟", system: "KEMA-Keur", regulator: "KEMA / DEKRA", mark: "KEMA-Keur",
    scope: "电气设备、元器件与电缆，自愿但荷兰市场认可度高。",
    standards: "NEN 对应 IEC",
    url: "https://www.dekra.com/", urlLabel: "DEKRA（KEMA）官网",
    note: "KEMA 标志在荷兰家电与电气产品市场很常见。" },
  { name: "比利时", region: "欧盟", system: "CEBEC 标志", regulator: "CEBEC（比利时电工委员会体系）", mark: "CEBEC",
    scope: "电气产品自愿认证，渠道常见。",
    standards: "NBN 对应 IEC",
    url: "https://www.sgs.com/", urlLabel: "SGS（CEBEC 发证方）",
    note: "CEBEC 由比利时发证机构管理。" },
  { name: "意大利", region: "欧盟", system: "IMQ 标志", regulator: "IMQ（意大利质量协会）", mark: "IMQ",
    scope: "电气产品、家电与元器件自愿认证，意大利市场渠道常见。",
    standards: "CEI 对应 IEC",
    url: "https://www.imq.it/", urlLabel: "IMQ 官网",
    note: "意大利家电市场对 IMQ 标志认可度高。" },
  { name: "西班牙", region: "欧盟", system: "AENOR / N 标志", regulator: "AENOR", mark: "N",
    scope: "电气产品自愿认证，公共采购与渠道常见。",
    standards: "UNE 对应 IEC",
    url: "https://www.aenor.com/", urlLabel: "AENOR 官网",
    note: "N 标志由 AENOR 发证。" },
  { name: "北欧四国（瑞典/挪威/丹麦/芬兰）", region: "北欧", system: "N 标志", regulator: "SEMKO · NEMKO · DEMKO · FIMKO", mark: "N",
    scope: "家用电器等电气产品自愿认证，四国互认，北欧市场认可度高。",
    standards: "EN/IEC 对应",
    url: "https://www.nemko.com/", urlLabel: "NEMKO（N 标志成员）",
    note: "N 标志是北欧四国协调的自愿安全认证。" },
  { name: "奥地利", region: "欧盟", system: "ÖVE 标志", regulator: "ÖVE（奥地利电工协会）", mark: "ÖVE",
    scope: "电气产品自愿认证，奥地利市场渠道常见。",
    standards: "ÖVE/ÖNORM 对应 IEC",
    url: "https://www.ove.at/", urlLabel: "ÖVE 官网",
    note: "奥地利本土电气安全标志。" },
  { name: "瑞士", region: "欧洲其他", system: "S+ 标志", regulator: "Electrosuisse / ESTI", mark: "S+",
    scope: "瑞士电气产品自愿安全标志（瑞士非欧盟，但有双边互认）。",
    standards: "SN 对应 IEC",
    url: "https://www.electrosuisse.ch/", urlLabel: "Electrosuisse",
    note: "瑞士市场除 CE/符合性外，S+ 是常见渠道标志。" },
  { name: "波兰", region: "欧盟", system: "B 标志", regulator: "PCBC（波兰测试认证中心）", mark: "B",
    scope: "电气产品自愿认证，波兰市场渠道常见。",
    standards: "PN 对应 IEC",
    url: "https://www.pcbc.gov.pl/", urlLabel: "PCBC 官网",
    note: "波兰本土自愿标志。" },
  { name: "捷克", region: "欧盟", system: "EZÚ 标志", regulator: "EZÚ（捷克电工测试所）", mark: "EZÚ",
    scope: "电气产品自愿认证。",
    standards: "ČSN 对应 IEC",
    url: "https://www.ezu.cz/", urlLabel: "EZÚ 官网",
    note: "捷克本土电气测试机构标志。" },
  { name: "匈牙利", region: "欧盟", system: "MEEI 标志", regulator: "MEEI（匈牙利电工检验）", mark: "MEEI",
    scope: "电气产品自愿认证。",
    standards: "MSZ 对应 IEC",
    url: "https://www.meei.hu/", urlLabel: "MEEI 官网",
    note: "匈牙利本土电气标志。" },
  { name: "葡萄牙", region: "欧盟", system: "CERTIF 标志", regulator: "CERTIF", mark: "CERTIF",
    scope: "电气产品自愿认证。",
    standards: "NP 对应 IEC",
    url: "https://www.certif.pt/", urlLabel: "CERTIF 官网",
    note: "葡萄牙本土认证机构。" },
  { name: "爱尔兰", region: "欧盟", system: "NSAI 标志", regulator: "NSAI（爱尔兰标准局）", mark: "NSAI",
    scope: "电气产品自愿认证与标准服务。",
    standards: "I.S. EN 对应 IEC",
    url: "https://www.nsai.ie/", urlLabel: "NSAI 官网",
    note: "爱尔兰本土标准与认证机构。" },
  { name: "美国", region: "北美洲", system: "FCC + UL/ETL", regulator: "FCC（联邦通信委员会）· OSHA NRTL", mark: "FCC / UL",
    scope: "FCC 强制（电子设备辐射、无线）；UL/ETL 为自愿，但家电/IT/电源渠道普遍要求。",
    standards: "FCC Part 15/18、UL 62368-1 等",
    url: "https://www.fcc.gov/", urlLabel: "FCC 官网",
    note: "医疗设备在美国走 FDA 注册，UL 不是法律路径。" },
  { name: "加拿大", region: "北美洲", system: "ISED + CSA/cUL", regulator: "ISED（创新科学与经济发展部）", mark: "ISED / cUL",
    scope: "射频与 EMC 强制（ICES）；电气安全 cUL/CSA 渠道普遍要求。",
    standards: "ICES-001/003、CSA C22.2",
    url: "https://ised-isde.canada.ca/", urlLabel: "ISED 官网",
    note: "与美国的 FCC/UL 体系相近但不通用，需分别申请。" },
  { name: "日本", region: "亚洲", system: "PSE（电气用品安全法）", regulator: "METI（经济产业省）· MIC", mark: "PSE",
    scope: "特定电气用品强制 PSE（家电、电源等）；无线电设备走 TELEC。",
    standards: "JIS C 系列（与 IEC 对应）",
    url: "https://www.meti.go.jp/english/policy/economy/consumer/pse/index.html", urlLabel: "METI PSE",
    note: "菱形 PSE 强制、圆形 PSE 自愿（特定用途）。" },
  { name: "韩国", region: "亚洲", system: "KC 认证", regulator: "RRA（国家无线电研究机构）等", mark: "KC",
    scope: "电气安全 + EMC 强制；无线设备另走 RRA。",
    standards: "KC 60335-1、KC 62368-1 等",
    url: "https://rra.go.kr/en/", urlLabel: "RRA 官网",
    note: "KC 标志覆盖安全与 EMC，测试机构需韩国认可。" },
  { name: "印度", region: "亚洲", system: "BIS（ISI / CRS）", regulator: "BIS（印度标准局）· WPC", mark: "ISI / CRS",
    scope: "电子强制注册 CRS（电源、IT 等）；部分家电走 ISI；无线走 WPC。",
    standards: "IS 13252（对应 60950/62368）等",
    url: "https://www.bis.gov.in/", urlLabel: "BIS 官网",
    note: "CRS 是注册制，工厂需印度当地代表；市场抽查频繁。" },
  { name: "澳大利亚 / 新西兰", region: "大洋洲", system: "RCM / EESS", regulator: "ACMA · EESS 州监管", mark: "RCM",
    scope: "电气安全（EESS 登记）+ EMC 强制。",
    standards: "AS/NZS 对应 IEC 标准",
    url: "https://www.acma.gov.au/", urlLabel: "ACMA 官网",
    note: "RCM 同时覆盖安全和 EMC，需在 EESS 数据库登记责任人。" },
  { name: "欧亚经济联盟（俄/白俄/哈）", region: "欧洲其他", system: "EAC 认证", regulator: "欧亚经济委员会（EEC）", mark: "EAC",
    scope: "TR CU 技术法规覆盖低压电器、机械、防爆等。",
    standards: "ГОСТ / TR CU 标准",
    url: "http://www.eurasiancommission.org/", urlLabel: "EEC 官网",
    note: "俄罗斯市场常见要求，证书有单批次与批量两种。" },
  { name: "巴西", region: "南美洲", system: "ANATEL + INMETRO", regulator: "ANATEL（电信）· INMETRO（计量质量）", mark: "ANATEL / INMETRO",
    scope: "电信设备 ANATEL 强制；电气安全 INMETRO 覆盖部分产品。",
    standards: "ABNT NBR / IEC 对应",
    url: "https://www.gov.br/anatel/", urlLabel: "ANATEL 官网",
    note: "ANATEL 需要巴西本地测试与代表。" },
  { name: "墨西哥", region: "北美洲", system: "NOM 认证", regulator: "Secretaría de Economía", mark: "NOM",
    scope: "部分电子电气产品强制 NOM（安全 + EMC）。",
    standards: "NOM-001、NOM-003 等",
    url: "https://www.gob.mx/se", urlLabel: "经济部官网",
    note: "需当地认可实验室测试并指定当地代表。" },
  { name: "沙特阿拉伯", region: "中东", system: "SASO / SABER", regulator: "SASO（沙特标准局）", mark: "SASO",
    scope: "大部分电气产品强制，需在 SABER 平台注册；接受 IECEE 证书 + CB。",
    standards: "IEC 标准对应",
    url: "https://www.saso.gov.sa/", urlLabel: "SASO 官网",
    note: "灯具、家电、电源等常见要求 IECEE CB 转证。" },
  { name: "阿联酋", region: "中东", system: "ECAS", regulator: "MoIAT（工业与先进技术部）", mark: "ECAS",
    scope: "电气产品强制注册，接受 IECEE/CB 转证。",
    standards: "IEC 标准对应",
    url: "https://www.moiat.gov.ae/", urlLabel: "MoIAT 官网",
    note: "迪拜等酋长国另有地方性准入。" },
  { name: "新加坡", region: "亚洲", system: "Safety Mark", regulator: "Enterprise Singapore / CPS", mark: "Safety Mark",
    scope: "受控商品（家电、电源等）强制安全认证。",
    standards: "SS / EN / IEC 对应",
    url: "https://www.enterprisesg.gov.sg/", urlLabel: "EnterpriseSG 官网",
    note: "需新加坡当地注册的负责人。" },
  { name: "马来西亚", region: "亚洲", system: "SIRIM 认证", regulator: "ST（能源委员会）· SIRIM QAS", mark: "SIRIM",
    scope: "部分电气产品强制（插头、线缆、部分家电）。",
    standards: "MS 对应 IEC 标准",
    url: "https://www.sirim.my/", urlLabel: "SIRIM 官网",
    note: "插头和线缆是马来西亚强制重点。" },
  { name: "泰国", region: "亚洲", system: "TISI 认证", regulator: "TISI（泰国工业标准协会）", mark: "TISI",
    scope: "部分家电、灯具等强制 TISI。",
    standards: "TIS 对应 IEC",
    url: "https://www.tisi.go.th/", urlLabel: "TISI 官网",
    note: "强制清单外产品可自愿认证。" },
  { name: "印度尼西亚", region: "亚洲", system: "SNI 认证", regulator: "BSN · ESDM 等", mark: "SNI",
    scope: "部分电气产品（灯具、线缆、部分家电）强制 SNI。",
    standards: "SNI 对应 IEC",
    url: "https://bsn.go.id/", urlLabel: "BSN 官网",
    note: "需本地测试并符合清真/标签等配套要求（视品类）。" },
  { name: "越南", region: "亚洲", system: "CR 认证", regulator: "科技部 / 工商部", mark: "CR",
    scope: "强制产品清单：部分家电、灯具、电源等。",
    standards: "TCVN 对应 IEC",
    url: "https://www.moc.gov.vn/", urlLabel: "工商部官网",
    note: "符合性声明 + 登记流程。" },
  { name: "台湾", region: "亚洲", system: "BSMI 认证", regulator: "BSMI（经济部标准检验局）", mark: "BSMI",
    scope: "强制检验 RPC：家电、IT、电源、灯具等。",
    standards: "CNS 对应 IEC",
    url: "https://www.bsmi.gov.tw/", urlLabel: "BSMI 官网",
    note: "部分产品还需 NCC（无线）或 ROHS 要求。" },
  { name: "菲律宾", region: "亚洲", system: "PS / ICC", regulator: "DTI-BPS", mark: "PS / ICC",
    scope: "部分电气产品强制（PS 本地工厂、ICC 进口）。",
    standards: "PNS 对应 IEC",
    url: "https://www.dti.gov.ph/bps/", urlLabel: "DTI-BPS 官网",
    note: "进口产品通常走 ICC 标志。" },
  { name: "南非", region: "非洲", system: "NRCS（LOA）", regulator: "NRCS（国家监管符合性机构）", mark: "LOA",
    scope: "强制注册：家电、电线电缆、插头等。",
    standards: "SANS 对应 IEC",
    url: "https://www.nrcs.org.za/", urlLabel: "NRCS 官网",
    note: "需要进口商/制造商申请注册，测试机构需南非认可。" },
  { name: "尼日利亚", region: "非洲", system: "SONCAP", regulator: "SON（标准组织）", mark: "SONCAP",
    scope: "出口前符合性验证（PC + SC 证书）。",
    standards: "国际/区域标准",
    url: "https://son.gov.ng/", urlLabel: "SON 官网",
    note: "中国出口商很常见，属于装运前认证。" },
  { name: "肯尼亚", region: "非洲", system: "PVOC", regulator: "KEBS（标准局）", mark: "PVOC",
    scope: "装运前符合性验证。",
    standards: "国际/区域标准",
    url: "https://www.kebs.org/", urlLabel: "KEBS 官网",
    note: "通常由授权检验机构出具证书。" },
  { name: "埃及", region: "非洲", system: "EOS 符合性", regulator: "EOS（标准组织）", mark: "EOS",
    scope: "部分电气产品强制。",
    standards: "ES 对应 IEC",
    url: "https://www.eos.org.eg/", urlLabel: "EOS 官网",
    note: "进口产品常需第三方符合性证书。" },
  { name: "以色列", region: "中东", system: "SII 认证", regulator: "SII（标准协会）", mark: "SII",
    scope: "部分电气产品强制。",
    standards: "SI 对应 IEC",
    url: "https://www.sii.org.il/", urlLabel: "SII 官网",
    note: "插头为以色列特殊规格。" },
  { name: "阿根廷", region: "南美洲", system: "S-Mark", regulator: "Secretaría de Industria · IRAM", mark: "S-Mark",
    scope: "电气安全强制。",
    standards: "IRAM 对应 IEC",
    url: "https://www.iram.org.ar/", urlLabel: "IRAM 官网",
    note: "需当地测试与工厂检查。" },
  { name: "土耳其", region: "欧洲其他", system: "CE（欧盟协调法规）", regulator: "TSE 等", mark: "CE",
    scope: "与欧盟协调法规一致，多数电子电气走 CE。",
    standards: "EN 对应标准",
    url: "https://www.tse.org.tr/", urlLabel: "TSE 官网",
    note: "海关联盟市场另有 EAC 体系。" },
  { name: "希腊", region: "欧盟", system: "CE（欧盟体系）", regulator: "ELOT · 市场监督机构", mark: "CE",
    scope: "欧盟 LVD/EMC/RED 覆盖，产品需 CE 技术文件与符合性声明。",
    standards: "EN/IEC 对应标准",
    url: "https://www.elot.gr/", urlLabel: "ELOT 官网",
    note: "希腊标准机构；无额外强制电气标志，但插头与标签可能有本地要求。" },
  { name: "罗马尼亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "ANPC · ISCIR", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.asro.ro/", urlLabel: "ASRO 官网",
    note: "罗马尼亚标准协会；市场抽查常见，需保存完整技术文件。" },
  { name: "保加利亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "SAS · DSM", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.bds-bg.org/", urlLabel: "BDS 官网",
    note: "保加利亚标准机构；进口商需保留 CE 声明与测试报告。" },
  { name: "克罗地亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "State Inspectorate · HZN", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.hzn.hr/", urlLabel: "HZN 官网",
    note: "克罗地亚标准机构；电气产品按欧盟体系自我声明。" },
  { name: "斯洛文尼亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "SIST · 市场监督", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.sist.si/", urlLabel: "SIST 官网",
    note: "斯洛文尼亚标准化协会；CE 技术文件是基本要求。" },
  { name: "斯洛伐克", region: "欧盟", system: "CE（欧盟体系）", regulator: "UNMS · SOI", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.unms.sk/", urlLabel: "UNMS 官网",
    note: "斯洛伐克计量与标准局；部分产品需本地语言标签。" },
  { name: "拉脱维亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "LVS · PTAC", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.lvs.lv/", urlLabel: "LVS 官网",
    note: "拉脱维亚标准机构；CE 符合性声明需与产品一同可追溯。" },
  { name: "立陶宛", region: "欧盟", system: "CE（欧盟体系）", regulator: "LST · SMVT", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.lsd.lt/", urlLabel: "LST 官网",
    note: "立陶宛标准局；电气产品按欧盟体系上市。" },
  { name: "爱沙尼亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "EVS · TJA", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.evs.ee/", urlLabel: "EVS 官网",
    note: "爱沙尼亚标准中心；电商与零售渠道要求 CE 资料齐全。" },
  { name: "卢森堡", region: "欧盟", system: "CE（欧盟体系）", regulator: "ILNAS · 市场监督", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://portail-qualite.lu/", urlLabel: "ILNAS 官网",
    note: "卢森堡质量基础设施门户；CE 是基础，本地无额外强制标志。" },
  { name: "塞浦路斯", region: "欧盟", system: "CE（欧盟体系）", regulator: "CYS · 市场监督", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.cys.org.cy/", urlLabel: "CYS 官网",
    note: "塞浦路斯标准组织；插头规格与欧盟通用型存在本地差异。" },
  { name: "马耳他", region: "欧盟", system: "CE（欧盟体系）", regulator: "MSA · 市场监督", mark: "CE",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://msa.org.mt/", urlLabel: "MSA 官网",
    note: "马耳他标准局；小型市场但欧盟合规要求完整。" },
  { name: "冰岛", region: "欧洲其他", system: "CE / EEA", regulator: "Icelandic Standards", mark: "CE",
    scope: "EEA 协议下多数电子电气产品沿用 CE 框架。",
    standards: "ÍST / EN 对应",
    url: "https://www.stadlar.is/", urlLabel: "Icelandic Standards",
    note: "冰岛非欧盟但属欧洲经济区，多数产品接受 CE 符合性。" },
  { name: "乌克兰", region: "欧洲其他", system: "UA TR 技术法规", regulator: "乌克兰经济部", mark: "UA TR",
    scope: "部分电气产品强制符合性声明或认证。",
    standards: "ДСТУ / EN 对应",
    url: "https://www.me.gov.ua/", urlLabel: "乌克兰经济部",
    note: "战事期间监管流程可能调整，正式出口前请向当地机构确认。" },
  { name: "卡塔尔", region: "中东", system: "QS 符合性", regulator: "QGOSM · MOCI", mark: "QS",
    scope: "部分电子电气产品强制符合性。",
    standards: "QS / IEC",
    url: "https://www.moci.gov.qa/", urlLabel: "MOCI 官网",
    note: "海湾市场常接受 IECEE CB 报告转证。" },
  { name: "科威特", region: "中东", system: "KUCAS 认证", regulator: "PAI（公共工业局）", mark: "KUCAS",
    scope: "部分电子电气产品强制 KUCAS 符合性。",
    standards: "KWS / IEC",
    url: "https://www.pai.gov.kw/", urlLabel: "PAI 官网",
    note: "通常需装运前符合性证书，灯具与家电常见。" },
  { name: "阿曼", region: "中东", system: "DGSM 符合性", regulator: "DGSM（标准与计量总司）", mark: "DGSM",
    scope: "部分电气产品强制符合性验证。",
    standards: "OS / IEC",
    url: "https://www.dgsm.gov.om/", urlLabel: "DGSM 官网",
    note: "可参考海湾 GCC 与 IECEE 体系安排。" },
  { name: "约旦", region: "中东", system: "JSMO 符合性", regulator: "JSMO", mark: "JSMO",
    scope: "部分电气产品强制标准符合性。",
    standards: "JS / IEC",
    url: "https://www.jsmo.gov.jo/", urlLabel: "JSMO 官网",
    note: "进口产品可能需要符合性证书或装运前检验。" },
  { name: "黎巴嫩", region: "中东", system: "LIBNOR 标准", regulator: "LIBNOR", mark: "LIBNOR",
    scope: "部分电气产品标准符合性。",
    standards: "LIBNOR / IEC",
    url: "https://www.libnor.gov.lb/", urlLabel: "LIBNOR 官网",
    note: "市场情况波动较大，出口前向当地代理确认。" },
  { name: "伊拉克", region: "中东", system: "COSQC 符合性", regulator: "COSQC", mark: "COSQC",
    scope: "部分进口产品需符合性验证。",
    standards: "IQS / IEC",
    url: "https://www.cosqc.gov.iq/", urlLabel: "COSQC 官网",
    note: "装运前认证与清关要求可能由指定机构执行。" },
  { name: "伊朗", region: "中东", system: "ISIRI 符合性", regulator: "ISIRI", mark: "ISIRI",
    scope: "部分电气产品强制标准。",
    standards: "ISIRI / IEC",
    url: "https://www.isiri.gov.ir/", urlLabel: "ISIRI 官网",
    note: "受制裁影响，出口前需确认支付、物流与合规路径。" },
  { name: "巴林", region: "中东", system: "BTMD 符合性", regulator: "MOIC · BTMD", mark: "BTMD",
    scope: "部分电子电气产品强制。",
    standards: "GSO / IEC",
    url: "https://www.moic.gov.bh/", urlLabel: "MOIC 官网",
    note: "海湾合作委员会（GCC）体系下常接受 IECEE CB 转证。" },
  { name: "巴基斯坦", region: "亚洲", system: "PSQCA 认证", regulator: "PSQCA", mark: "PSQCA",
    scope: "部分电气产品强制标准认证。",
    standards: "PS / IEC",
    url: "https://www.psqca.com.pk/", urlLabel: "PSQCA 官网",
    note: "插头、线缆与部分家电为重点管控品类。" },
  { name: "孟加拉", region: "亚洲", system: "BSTI 认证", regulator: "BSTI", mark: "BSTI",
    scope: "部分电气产品强制标准认证。",
    standards: "BDS / IEC",
    url: "https://www.bsti.gov.bd/", urlLabel: "BSTI 官网",
    note: "进口电气产品清关时常要求 BSTI 证书或测试报告。" },
  { name: "斯里兰卡", region: "亚洲", system: "SLSI 认证", regulator: "SLSI", mark: "SLSI",
    scope: "部分电气产品强制标准认证。",
    standards: "SLS / IEC",
    url: "https://www.slsi.lk/", urlLabel: "SLSI 官网",
    note: "插头与家电属于常见强制目录。" },
  { name: "摩洛哥", region: "非洲", system: "IMANOR 标准", regulator: "IMANOR", mark: "IMANOR",
    scope: "部分电气产品标准符合性。",
    standards: "NM / IEC",
    url: "https://www.imanor.gov.ma/", urlLabel: "IMANOR 官网",
    note: "部分产品可能需要符合性证书或进口检验。" },
  { name: "阿尔及利亚", region: "非洲", system: "IANOR 标准", regulator: "IANOR", mark: "IANOR",
    scope: "部分进口产品符合性验证。",
    standards: "NA / IEC",
    url: "https://www.ianor.dz/", urlLabel: "IANOR 官网",
    note: "进口清关常要求第三方符合性证书。" },
  { name: "突尼斯", region: "非洲", system: "INNORPI 标准", regulator: "INNORPI", mark: "INNORPI",
    scope: "部分产品强制标准。",
    standards: "NT / IEC",
    url: "https://www.innorpi.tn/", urlLabel: "INNORPI 官网",
    note: "电气产品需符合突尼斯标准或国际对应标准。" },
  { name: "埃塞俄比亚", region: "非洲", system: "ESA 符合性", regulator: "ESA", mark: "ESA",
    scope: "部分进口电气产品符合性验证。",
    standards: "ES / IEC",
    url: "https://www.esae.gov.et/", urlLabel: "ESA 官网",
    note: "进口商需向埃塞标准局申请符合性路径。" },
  { name: "坦桑尼亚", region: "非洲", system: "TBS 认证", regulator: "TBS", mark: "TBS",
    scope: "部分电气产品强制 PVoC 符合性。",
    standards: "TZS / IEC",
    url: "https://www.tbs.go.tz/", urlLabel: "TBS 官网",
    note: "出口前需取得装运前符合性证书（PVoC）。" },
  { name: "乌干达", region: "非洲", system: "UNBS 认证", regulator: "UNBS", mark: "UNBS",
    scope: "部分产品强制 PVoC 符合性。",
    standards: "US / IEC",
    url: "https://unbs.go.ug/", urlLabel: "UNBS 官网",
    note: "多数电子电气产品走装运前验证与登记。" },
  { name: "加纳", region: "非洲", system: "GSA 认证", regulator: "GSA", mark: "GSA",
    scope: "部分电气产品强制标准符合性。",
    standards: "GS / IEC",
    url: "https://www.gsa.gov.gh/", urlLabel: "GSA 官网",
    note: "进口家电与电气产品常需 GSA 许可或符合性证书。" },
  { name: "科特迪瓦", region: "非洲", system: "CODINORM 标准", regulator: "CODINORM", mark: "CODINORM",
    scope: "部分产品标准符合性。",
    standards: "NCI / IEC",
    url: "https://www.codinorm.ci/", urlLabel: "CODINORM 官网",
    note: "西非市场清关时可能要求符合性文件。" },
  { name: "喀麦隆", region: "非洲", system: "ANOR 标准", regulator: "ANOR", mark: "ANOR",
    scope: "部分进口产品符合性。",
    standards: "NC / IEC",
    url: "https://www.anorcameroun.cm/", urlLabel: "ANOR 官网",
    note: "部分品类需装运前符合性认证（PECAE）。" },
  { name: "哥伦比亚", region: "南美洲", system: "RETIE 电气合规", regulator: "SIC · MinEnergía", mark: "RETIE",
    scope: "电气装置与部分产品强制技术法规。",
    standards: "NTC / IEC",
    url: "https://www.sic.gov.co/", urlLabel: "SIC 官网",
    note: "RETIE 覆盖电气安全，部分产品需第三方认证。" },
  { name: "秘鲁", region: "南美洲", system: "INACAL 标准", regulator: "INACAL", mark: "INACAL",
    scope: "部分电气产品强制标准。",
    standards: "NTP / IEC",
    url: "https://www.inacal.gob.pe/", urlLabel: "INACAL 官网",
    note: "部分产品需符合秘鲁技术标准或国际对应标准。" },
  { name: "智利", region: "南美洲", system: "SEC 认证", regulator: "SEC（电气与燃料监管局）", mark: "SEC",
    scope: "电气产品强制安全认证。",
    standards: "NCh / IEC",
    url: "https://www.sec.cl/", urlLabel: "SEC 官网",
    note: "家电、线缆、插头等常需 SEC 认证。" },
  { name: "厄瓜多尔", region: "南美洲", system: "INEN 认证", regulator: "INEN", mark: "INEN",
    scope: "部分电气产品强制。",
    standards: "NTE INEN / IEC",
    url: "https://www.normalizacion.gob.ec/", urlLabel: "INEN 官网",
    note: "进口产品可能要求符合性证书。" },
  { name: "乌拉圭", region: "南美洲", system: "UNIT 标准", regulator: "UNIT", mark: "UNIT",
    scope: "部分电气产品标准符合性。",
    standards: "UNIT / IEC",
    url: "https://www.unit.org.uy/", urlLabel: "UNIT 官网",
    note: "乌拉圭市场较小，但渠道常要求 IEC 对应测试报告。" },
  { name: "巴拉圭", region: "南美洲", system: "INTN 认证", regulator: "INTN", mark: "INTN",
    scope: "部分产品强制标准。",
    standards: "NP / IEC",
    url: "https://www.intn.gov.py/", urlLabel: "INTN 官网",
    note: "进口电气产品清关可能要求 INTN 文件。" },
  { name: "玻利维亚", region: "南美洲", system: "IBNORCA 标准", regulator: "IBNORCA", mark: "IBNORCA",
    scope: "部分电气产品标准符合性。",
    standards: "NB / IEC",
    url: "https://www.ibnorca.org/", urlLabel: "IBNORCA 官网",
    note: "多为标准符合性，正式出口前确认强制目录。" },
  { name: "多米尼加", region: "南美洲", system: "INDOCAL 标准", regulator: "INDOCAL", mark: "INDOCAL",
    scope: "部分产品标准符合性。",
    standards: "NOR / IEC",
    url: "https://www.indocal.gob.do/", urlLabel: "INDOCAL 官网",
    note: "进口商常需提供 IEC 对应测试报告。" },
  { name: "巴拿马", region: "北美洲", system: "DGNTI 标准", regulator: "DGNTI · MICI", mark: "DGNTI",
    scope: "部分电气产品强制标准。",
    standards: "DGNTI / IEC",
    url: "https://www.mici.gob.pa/", urlLabel: "MICI 官网",
    note: "巴拿马对部分家电与电气产品有标准要求。" },
  { name: "哥斯达黎加", region: "北美洲", system: "INTECO 标准", regulator: "INTECO", mark: "INTECO",
    scope: "部分电气产品标准符合性。",
    standards: "INTE / IEC",
    url: "https://www.inteco.org/", urlLabel: "INTECO 官网",
    note: "渠道常要求 IEC 测试报告与西班牙语标签。" },
  { name: "危地马拉", region: "北美洲", system: "COGUANOR 标准", regulator: "COGUANOR", mark: "COGUANOR",
    scope: "部分产品标准符合性。",
    standards: "COGUANOR / IEC",
    url: "https://www.mineco.gob.gt/", urlLabel: "MINECO 官网",
    note: "进口电气产品需确认强制标准目录。" },
  { name: "洪都拉斯", region: "北美洲", system: "OHN 标准", regulator: "OHN · SIC", mark: "OHN",
    scope: "部分电气产品标准符合性。",
    standards: "OHN / IEC",
    url: "https://www.sic.gob.hn/", urlLabel: "SIC 官网",
    note: "中美洲市场清关常要求符合性文件。" },
  { name: "萨尔瓦多", region: "北美洲", system: "CONACYT 标准", regulator: "CONACYT", mark: "CONACYT",
    scope: "部分产品标准符合性。",
    standards: "NSO / IEC",
    url: "https://www.conacyt.gob.sv/", urlLabel: "CONACYT 官网",
    note: "进口电气产品需符合萨尔瓦多强制标准。" }
];

var CERT_PRODUCTS = [
  { id: "appliance", name: "家用电器", icon: "🏠",
    summary: "多数国家强制的核心品类，安全测试以 IEC 60335-1 体系为主。",
    entries: [
      { c: "中国", mark: "CCC", note: "目录内强制（GB 4706.1 系列）" },
      { c: "欧盟", mark: "CE", note: "LVD + EMC 自我声明" },
      { c: "美国", mark: "UL/ETL", note: "自愿但渠道普遍要求" },
      { c: "日本", mark: "PSE", note: "特定电气用品强制" },
      { c: "韩国", mark: "KC", note: "安全 + EMC 强制" },
      { c: "印度", mark: "BIS", note: "部分品类 ISI/CRS" },
      { c: "沙特", mark: "SASO", note: "IECEE CB 转证" },
      { c: "澳大利亚", mark: "RCM", note: "EESS + EMC" },
      { c: "新加坡", mark: "Safety Mark", note: "受控商品强制" },
      { c: "德国", mark: "VDE/GS", note: "渠道普遍要求" },
      { c: "欧洲各国", mark: "NF/KEMA/IMQ/N 等", note: "本土标志，渠道认可" }
    ] },
  { id: "itav", name: "音视频 / IT 设备", icon: "💻",
    summary: "安全以 IEC 62368-1 为主，EMC/无线要求并行。",
    entries: [
      { c: "中国", mark: "CCC", note: "目录内强制" },
      { c: "欧盟", mark: "CE", note: "LVD + EMC（无线加 RED）" },
      { c: "美国", mark: "FCC + UL", note: "FCC 强制、UL 渠道要求" },
      { c: "加拿大", mark: "ISED/cUL", note: "ICES + cUL" },
      { c: "日本", mark: "PSE/TELEC", note: "部分强制" },
      { c: "韩国", mark: "KC", note: "安全 + EMC" },
      { c: "印度", mark: "BIS CRS", note: "电子强制注册" },
      { c: "台湾", mark: "BSMI", note: "强制检验" },
      { c: "德国", mark: "VDE/GS", note: "渠道要求" },
      { c: "欧洲各国", mark: "NF/KEMA/IMQ/N 等", note: "本土标志，渠道认可" }
    ] },
  { id: "lighting", name: "灯具照明", icon: "💡",
    summary: "安全以 IEC 60598-1/61347 为主，LED 驱动与光生物安全并行。",
    entries: [
      { c: "中国", mark: "CCC/CQC", note: "部分灯具强制" },
      { c: "欧盟", mark: "CE", note: "LVD + EMC + ErP 能效" },
      { c: "美国", mark: "UL/DLC", note: "UL 渠道要求，能效可申请 DLC" },
      { c: "韩国", mark: "KC", note: "安全 + EMC" },
      { c: "沙特", mark: "SASO", note: "IECEE CB 转证" },
      { c: "越南", mark: "CR", note: "强制清单" },
      { c: "菲律宾", mark: "PS/ICC", note: "强制" },
      { c: "德国", mark: "VDE/GS", note: "渠道要求" },
      { c: "欧洲各国", mark: "NF/KEMA/IMQ/N 等", note: "本土标志，渠道认可" }
    ] },
  { id: "power", name: "电源与充电器", icon: "🔌",
    summary: "安全以 IEC 62368-1 为主，能效与插头规格常并行要求。",
    entries: [
      { c: "中国", mark: "CCC/CQC", note: "部分强制" },
      { c: "欧盟", mark: "CE", note: "LVD + EMC + 能效" },
      { c: "美国", mark: "UL/FCC", note: "UL 1310/62368 渠道要求" },
      { c: "日本", mark: "PSE", note: "特定电气用品强制" },
      { c: "韩国", mark: "KC", note: "强制" },
      { c: "印度", mark: "BIS CRS", note: "强制注册" },
      { c: "沙特", mark: "SASO", note: "IECEE CB" },
      { c: "德国", mark: "VDE/GS", note: "渠道要求" },
      { c: "欧洲各国", mark: "NF/KEMA/IMQ/N 等", note: "本土标志，渠道认可" },
      { c: "新加坡", mark: "Safety Mark", note: "受控商品" },
      { c: "台湾", mark: "BSMI", note: "强制检验" },
      { c: "德国", mark: "VDE/GS", note: "渠道要求" },
      { c: "欧洲各国", mark: "NF/KEMA/IMQ/N 等", note: "本土标志，渠道认可" }
    ] },
  { id: "battery", name: "电池", icon: "🔋",
    summary: "运输安全（UN 38.3）全球通用；产品安全认证各国各异，欧盟新电池法规正在生效。",
    entries: [
      { c: "全球运输", mark: "UN 38.3", note: "空运/海运前提" },
      { c: "欧盟", mark: "CE/电池法规", note: "EU 2023/1542 逐步实施" },
      { c: "美国", mark: "UL 2054/62133", note: "渠道要求" },
      { c: "日本", mark: "PSE", note: "部分电池强制" },
      { c: "韩国", mark: "KC", note: "强制" },
      { c: "印度", mark: "BIS", note: "部分强制" }
    ] },
  { id: "wireless", name: "无线设备", icon: "📡",
    summary: "射频合规与 EMC 强制，各国频段和限值不同。",
    entries: [
      { c: "欧盟", mark: "CE (RED)", note: "2014/53/EU" },
      { c: "美国", mark: "FCC ID", note: "Part 15 认证" },
      { c: "加拿大", mark: "ISED", note: "IC 认证" },
      { c: "日本", mark: "TELEC", note: "电波法" },
      { c: "韩国", mark: "RRA", note: "KC 无线" },
      { c: "印度", mark: "WPC", note: "ETA + 许可" },
      { c: "澳大利亚", mark: "ACMA", note: "RCM 无线" },
      { c: "巴西", mark: "ANATEL", note: "强制" },
      { c: "台湾", mark: "NCC", note: "强制" }
    ] },
  { id: "medical", name: "医疗设备", icon: "🏥",
    summary: "监管路径优先于认证标志：各国注册体系 + 电气安全标准 60601-1。",
    entries: [
      { c: "欧盟", mark: "CE (MDR)", note: "2017/745，公告机构" },
      { c: "美国", mark: "FDA", note: "510(k)/PMA 注册" },
      { c: "中国", mark: "NMPA", note: "医疗器械注册证" },
      { c: "日本", mark: "PMDA", note: "药机法注册" },
      { c: "韩国", mark: "MFDS", note: "注册" },
      { c: "加拿大", mark: "Health Canada", note: "MDEL/许可" },
      { c: "巴西", mark: "ANVISA", note: "注册" }
    ] },
  { id: "machinery", name: "工业机械", icon: "🏭",
    summary: "机械指令/法规 + 功能安全，电气部分按 IEC 60204-1。",
    entries: [
      { c: "欧盟", mark: "CE (MD)", note: "2006/42/EC + 功能安全" },
      { c: "美国", mark: "NRTL/UL", note: "OSHA 认可机构" },
      { c: "中国", mark: "GB 5226", note: "设计符合 + 部分监管" },
      { c: "欧亚联盟", mark: "EAC", note: "TR CU 机械法规" }
    ] },
  { id: "tools", name: "电动工具", icon: "🔧",
    summary: "安全以 IEC 62841 为主，电池工具叠加电池与无线要求。",
    entries: [
      { c: "欧盟", mark: "CE", note: "LVD + EMC + 噪声" },
      { c: "美国", mark: "UL/ETL", note: "渠道要求" },
      { c: "日本", mark: "PSE", note: "部分强制" },
      { c: "韩国", mark: "KC", note: "强制" },
      { c: "中国", mark: "CCC", note: "部分品类" },
      { c: "澳大利亚", mark: "RCM", note: "EESS" },
      { c: "沙特", mark: "SASO", note: "IECEE CB" },
      { c: "德国", mark: "VDE/GS", note: "渠道要求" },
      { c: "欧洲各国", mark: "NF/KEMA/IMQ/N 等", note: "本土标志，渠道认可" }
    ] }
];

function $(id) {
  return document.getElementById(id);
}

function esc(s) {
  var d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderCountries() {
  var region = $("cRegion").value;
  var q = $("cSearch").value.trim().toLowerCase();
  var list = CERT_COUNTRIES.filter(function (c) {
    if (region !== "all" && c.region !== region) return false;
    if (q && c.name.toLowerCase().indexOf(q) === -1 && c.system.toLowerCase().indexOf(q) === -1) return false;
    return true;
  });
  $("cList").innerHTML = list.map(function (c) {
    return '<article class="cert-card">' +
      '<h3>' + esc(c.name) + ' <span class="mark">' + esc(c.mark) + '</span></h3>' +
      '<p class="meta">体系：' + esc(c.system) + ' · 监管：' + esc(c.regulator) + '</p>' +
      '<p><b>强制范围：</b>' + esc(c.scope) + '</p>' +
      '<p><b>标准依据：</b>' + esc(c.standards) + '</p>' +
      '<p class="note">' + esc(c.note) + '</p>' +
      '<p><a class="btn" href="' + c.url + '" target="_blank" rel="noopener">' + esc(c.urlLabel) + '</a></p>' +
    '</article>';
  }).join("");
  $("cCount").textContent = "显示 " + list.length + " / " + CERT_COUNTRIES.length + " 个国家/地区";
}

function renderProducts() {
  var cat = $("pCat").value;
  var list = CERT_PRODUCTS.filter(function (p) {
    return cat === "all" || p.id === cat;
  });
  $("pList").innerHTML = list.map(function (p) {
    var rows = p.entries.map(function (e) {
      return "<tr><td>" + esc(e.c) + "</td><td><b>" + esc(e.mark) + "</b></td><td>" + esc(e.note) + "</td></tr>";
    }).join("");
    return '<section class="cert-card product">' +
      '<h3>' + p.icon + " " + esc(p.name) + "</h3>" +
      '<p class="meta">' + esc(p.summary) + '</p>' +
      '<div class="table-wrap"><table><thead><tr><th>国家 / 地区</th><th>认证 / 标志</th><th>说明</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
    "</section>";
  }).join("");
  $("pCount").textContent = "显示 " + list.length + " / " + CERT_PRODUCTS.length + " 个产品分类";
}

function switchView(view) {
  var m = document.getElementById("viewMap");
  $("viewCountry").hidden = view !== "country";
  $("viewProduct").hidden = view !== "product";
  if (m) m.hidden = view !== "map";
  if (view === "map" && window.certMap) {
    setTimeout(function () { (typeof window.certMap.resize === "function" ? window.certMap.resize : window.certMap.invalidateSize)(); }, 60);
  }
  document.querySelectorAll("[data-view]").forEach(function (b) {
    var on = b.getAttribute("data-view") === view;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

document.querySelectorAll("[data-view]").forEach(function (b) {
  b.addEventListener("click", function () {
    switchView(b.getAttribute("data-view"));
  });
});

document.querySelectorAll("[data-region]").forEach(function (b) {
  b.addEventListener("click", function () {
    $("cRegion").value = b.getAttribute("data-region");
    document.querySelectorAll("[data-region]").forEach(function (x) {
      var on = x === b;
      x.classList.toggle("active", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderCountries();
  });
});

document.querySelectorAll("[data-pcat]").forEach(function (b) {
  b.addEventListener("click", function () {
    $("pCat").value = b.getAttribute("data-pcat");
    document.querySelectorAll("[data-pcat]").forEach(function (x) {
      var on = x === b;
      x.classList.toggle("active", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderProducts();
  });
});

if ($("cSearch")) $("cSearch").addEventListener("input", renderCountries);
if (document.getElementById("cSearch")) {
  switchView("map");
  renderCountries();
  renderProducts();
  var qc = (location.search.match(/[?&]c=([^&]+)/) || [])[1];
  if (qc) {
    var cs = document.getElementById("cSearch");
    if (cs) { cs.value = decodeURIComponent(qc); switchView("country"); renderCountries(); }
  }
  var hsh = location.hash || "";
  if (hsh === "#country") switchView("country");
  else if (hsh === "#product") switchView("product");
  window.addEventListener("hashchange", function () {
    var h = location.hash;
    if (h === "#map") switchView("map");
    else if (h === "#country") switchView("country");
    else if (h === "#product") switchView("product");
  });
}
