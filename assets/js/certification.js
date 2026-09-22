var CERT_COUNTRIES = [
  { name: "中国", region: "亚洲", system: "CCC / CQC", regulator: "市场监管总局（SAMR）· CNCA", mark: "CCC",
    force: "强制", forceNote: "CCC 目录内产品强制；目录外可做 CQC 自愿认证。",
    scope: "强制目录：家电、音视频/IT、灯具、电线电缆、低压电器等；目录外可做 CQC 自愿认证。",
    standards: "GB 4706.1、GB 4943.1、GB 7000.1 等（多与 IEC 对应）",
    url: "https://www.cnca.gov.cn/", urlLabel: "CNCA 官网",
    note: "型式试验 + 工厂检查 + 获证后监督；CCC 标志由 CNCA 统一管理。" },
  { name: "欧盟", region: "欧盟", system: "CE 标志（多指令）", regulator: "欧盟委员会 / 各国市场监督机构", mark: "CE",
    force: "强制",
    scope: "LVD 低压指令 + EMC 指令覆盖大部分电子电气；RED 覆盖无线；MD 覆盖机械；MDR 覆盖医疗。",
    standards: "EN/IEC 对应标准（EN 60335-1、EN 62368-1 等）",
    url: "https://single-market-economy.ec.europa.eu/", urlLabel: "欧盟单一市场官网",
    note: "多数产品制造商自我声明并准备技术文件；特定指令（如 MDR）需要公告机构介入。" },
  { name: "德国", region: "欧盟", system: "VDE / GS 标志", regulator: "VDE 测试认证机构 · 德国市场准入体系", mark: "VDE / GS",
    force: "渠道", forceNote: "德国属欧盟，CE 为强制要求；VDE / GS 为渠道与自愿标志。",
    scope: "家电、电源、灯具、线缆、插头、元器件等。VDE 不是法律强制，而是德国市场、保险与采购商普遍认可的质量与安全标志。",
    standards: "VDE 对应 IEC/EN（DIN VDE 标准）",
    url: "https://www.vde.com/", urlLabel: "VDE 官网",
    note: "VDE 标志（产品符合 VDE 标准）与 GS 标志（德国政府认可的安全标志）都是自愿但渠道常要求；元器件（保险丝、X/Y 电容、插头）的 VDE 认证尤其常见。" },
  { name: "英国", region: "欧洲其他", system: "UKCA + BEAB/Kitemark", regulator: "OPSS（产品安全与标准办公室）· BSI", mark: "UKCA",
    force: "强制",
    scope: "英国（GB）市场：UKCA 为自主强制体系；过渡期内多数产品仍接受 CE（政策以最新为准）。BEAB Approved 与 Kitemark 为渠道标志。",
    standards: "BS EN 对应 IEC",
    url: "https://www.gov.uk/guidance/using-the-ukca-marking", urlLabel: "GOV.UK UKCA",
    note: "北爱尔兰另有 UKNI 安排；家电渠道常见 BEAB Approved。" },
  { name: "法国", region: "欧盟", system: "NF 标志", regulator: "AFNOR · LCIE", mark: "NF",
    force: "渠道", forceNote: "法国属欧盟，CE 为强制要求；NF 为渠道与自愿标志。",
    scope: "NF Electricité 覆盖电气产品与元器件，自愿但公共采购与渠道常见。",
    standards: "NF EN 对应 IEC",
    url: "https://nf.afnor.org/", urlLabel: "NF 官网",
    note: "NF 是法国历史悠久的质量与安全标志。" },
  { name: "荷兰", region: "欧盟", system: "KEMA-Keur", regulator: "KEMA / DEKRA", mark: "KEMA-Keur",
    force: "渠道", forceNote: "荷兰属欧盟，CE 为强制要求；KEMA-Keur 为渠道与自愿标志。",
    scope: "电气设备、元器件与电缆，自愿但荷兰市场认可度高。",
    standards: "NEN 对应 IEC",
    url: "https://www.dekra.com/", urlLabel: "DEKRA（KEMA）官网",
    note: "KEMA 标志在荷兰家电与电气产品市场很常见。" },
  { name: "比利时", region: "欧盟", system: "CEBEC 标志", regulator: "CEBEC（比利时电工委员会体系）", mark: "CEBEC",
    force: "渠道", forceNote: "比利时属欧盟，CE 为强制要求；CEBEC 为渠道与自愿标志。",
    scope: "电气产品自愿认证，渠道常见。",
    standards: "NBN 对应 IEC",
    url: "https://www.sgs.com/", urlLabel: "SGS（CEBEC 发证方）",
    note: "CEBEC 由比利时发证机构管理。" },
  { name: "意大利", region: "欧盟", system: "IMQ 标志", regulator: "IMQ（意大利质量协会）", mark: "IMQ",
    force: "渠道", forceNote: "意大利属欧盟，CE 为强制要求；IMQ 为渠道与自愿标志。",
    scope: "电气产品、家电与元器件自愿认证，意大利市场渠道常见。",
    standards: "CEI 对应 IEC",
    url: "https://www.imq.it/", urlLabel: "IMQ 官网",
    note: "意大利家电市场对 IMQ 标志认可度高。" },
  { name: "西班牙", region: "欧盟", system: "AENOR / N 标志", regulator: "AENOR", mark: "N",
    force: "渠道", forceNote: "西班牙属欧盟，CE 为强制要求；N 标志为渠道与自愿标志。",
    scope: "电气产品自愿认证，公共采购与渠道常见。",
    standards: "UNE 对应 IEC",
    url: "https://www.aenor.com/", urlLabel: "AENOR 官网",
    note: "N 标志由 AENOR 发证。" },
  { name: "北欧四国（瑞典/挪威/丹麦/芬兰）", region: "北欧", system: "N 标志", regulator: "SEMKO · NEMKO · DEMKO · FIMKO", mark: "N",
    force: "渠道", forceNote: "四国属欧盟 / EEA，CE 为强制要求；N 标志为渠道与自愿标志。",
    scope: "家用电器等电气产品自愿认证，四国互认，北欧市场认可度高。",
    standards: "EN/IEC 对应",
    url: "https://www.nemko.com/", urlLabel: "NEMKO（N 标志成员）",
    note: "N 标志是北欧四国协调的自愿安全认证。" },
  { name: "奥地利", region: "欧盟", system: "ÖVE 标志", regulator: "ÖVE（奥地利电工协会）", mark: "ÖVE",
    force: "渠道", forceNote: "奥地利属欧盟，CE 为强制要求；ÖVE 为渠道与自愿标志。",
    scope: "电气产品自愿认证，奥地利市场渠道常见。",
    standards: "ÖVE/ÖNORM 对应 IEC",
    url: "https://www.ove.at/", urlLabel: "ÖVE 官网",
    note: "奥地利本土电气安全标志。" },
  { name: "瑞士", region: "欧洲其他", system: "S+ 标志", regulator: "Electrosuisse / ESTI", mark: "S+",
    force: "渠道", forceNote: "瑞士非欧盟，产品须符合瑞士技术法规（多与 EU 对齐）；S+ 为渠道与自愿标志。",
    scope: "瑞士电气产品自愿安全标志（瑞士非欧盟，但有双边互认）。",
    standards: "SN 对应 IEC",
    url: "https://www.electrosuisse.ch/", urlLabel: "Electrosuisse",
    note: "瑞士市场除 CE/符合性外，S+ 是常见渠道标志。" },
  { name: "波兰", region: "欧盟", system: "B 标志", regulator: "PCBC（波兰测试认证中心）", mark: "B",
    force: "渠道", forceNote: "波兰属欧盟，CE 为强制要求；B 标志为渠道与自愿标志。",
    scope: "电气产品自愿认证，波兰市场渠道常见。",
    standards: "PN 对应 IEC",
    url: "https://www.pcbc.gov.pl/", urlLabel: "PCBC 官网",
    note: "波兰本土自愿标志。" },
  { name: "捷克", region: "欧盟", system: "EZÚ 标志", regulator: "EZÚ（捷克电工测试所）", mark: "EZÚ",
    force: "渠道", forceNote: "捷克属欧盟，CE 为强制要求；EZÚ 为渠道与自愿标志。",
    scope: "电气产品自愿认证。",
    standards: "ČSN 对应 IEC",
    url: "https://www.ezu.cz/", urlLabel: "EZÚ 官网",
    note: "捷克本土电气测试机构标志。" },
  { name: "匈牙利", region: "欧盟", system: "MEEI 标志", regulator: "MEEI（匈牙利电工检验）", mark: "MEEI",
    force: "渠道", forceNote: "匈牙利属欧盟，CE 为强制要求；MEEI 为渠道与自愿标志。",
    scope: "电气产品自愿认证。",
    standards: "MSZ 对应 IEC",
    url: "https://www.meei.hu/", urlLabel: "MEEI 官网",
    note: "匈牙利本土电气标志。" },
  { name: "葡萄牙", region: "欧盟", system: "CERTIF 标志", regulator: "CERTIF", mark: "CERTIF",
    force: "渠道", forceNote: "葡萄牙属欧盟，CE 为强制要求；CERTIF 为渠道与自愿标志。",
    scope: "电气产品自愿认证。",
    standards: "NP 对应 IEC",
    url: "https://www.certif.pt/", urlLabel: "CERTIF 官网",
    note: "葡萄牙本土认证机构。" },
  { name: "爱尔兰", region: "欧盟", system: "NSAI 标志", regulator: "NSAI（爱尔兰标准局）", mark: "NSAI",
    force: "渠道", forceNote: "爱尔兰属欧盟，CE 为强制要求；NSAI 为渠道与自愿标志。",
    scope: "电气产品自愿认证与标准服务。",
    standards: "I.S. EN 对应 IEC",
    url: "https://www.nsai.ie/", urlLabel: "NSAI 官网",
    note: "爱尔兰本土标准与认证机构。" },
  { name: "美国", region: "北美洲", system: "FCC + UL/ETL", regulator: "FCC（联邦通信委员会）· OSHA NRTL", mark: "FCC / UL",
    force: "强制+渠道", forceNote: "FCC 为强制（无线 / EMC）；UL / ETL 为渠道与保险要求。",
    scope: "FCC 强制（电子设备辐射、无线）；UL/ETL 为自愿，但家电/IT/电源渠道普遍要求。",
    standards: "FCC Part 15/18、UL 62368-1 等",
    url: "https://www.fcc.gov/", urlLabel: "FCC 官网",
    note: "医疗设备在美国走 FDA 注册，UL 不是法律路径。" },
  { name: "加拿大", region: "北美洲", system: "ISED + CSA/cUL", regulator: "ISED（创新科学与经济发展部）", mark: "ISED / cUL",
    force: "强制+渠道", forceNote: "ISED 为强制（无线 / EMC）；CSA / cUL 为渠道要求。",
    scope: "射频与 EMC 强制（ICES）；电气安全 cUL/CSA 渠道普遍要求。",
    standards: "ICES-001/003、CSA C22.2",
    url: "https://ised-isde.canada.ca/", urlLabel: "ISED 官网",
    note: "与美国的 FCC/UL 体系相近但不通用，需分别申请。" },
  { name: "日本", region: "亚洲", system: "PSE（电气用品安全法）", regulator: "METI（经济产业省）· MIC", mark: "PSE",
    force: "强制", forceNote: "特定电气用品用菱形 PSE（强制）；其他为圆形 PSE 自我声明。",
    scope: "特定电气用品强制 PSE（家电、电源等）；无线电设备走 TELEC。",
    standards: "JIS C 系列（与 IEC 对应）",
    url: "https://www.meti.go.jp/english/policy/economy/consumer/pse/index.html", urlLabel: "METI PSE",
    note: "菱形 PSE 强制、圆形 PSE 自愿（特定用途）。" },
  { name: "韩国", region: "亚洲", system: "KC 认证", regulator: "RRA（国家无线电研究机构）等", mark: "KC",
    force: "强制",
    scope: "电气安全 + EMC 强制；无线设备另走 RRA。",
    standards: "KC 60335-1、KC 62368-1 等",
    url: "https://rra.go.kr/en/", urlLabel: "RRA 官网",
    note: "KC 标志覆盖安全与 EMC，测试机构需韩国认可。" },
  { name: "印度", region: "亚洲", system: "BIS（ISI / CRS）", regulator: "BIS（印度标准局）· WPC", mark: "ISI / CRS",
    force: "强制", forceNote: "强制目录内走 ISI / CRS；目录外可自愿认证。",
    scope: "电子强制注册 CRS（电源、IT 等）；部分家电走 ISI；无线走 WPC。",
    standards: "IS 13252（对应 60950/62368）等",
    url: "https://www.bis.gov.in/", urlLabel: "BIS 官网",
    note: "CRS 是注册制，工厂需印度当地代表；市场抽查频繁。" },
  { name: "澳大利亚 / 新西兰", region: "大洋洲", system: "RCM / EESS", regulator: "ACMA · EESS 州监管", mark: "RCM",
    force: "强制",
    scope: "电气安全（EESS 登记）+ EMC 强制。",
    standards: "AS/NZS 对应 IEC 标准",
    url: "https://www.acma.gov.au/", urlLabel: "ACMA 官网",
    note: "RCM 同时覆盖安全和 EMC，需在 EESS 数据库登记责任人。" },
  { name: "欧亚经济联盟（俄/白俄/哈）", region: "欧洲其他", system: "EAC 认证", regulator: "欧亚经济委员会（EEC）", mark: "EAC",
    force: "强制",
    scope: "TR CU 技术法规覆盖低压电器、机械、防爆等。",
    standards: "ГОСТ / TR CU 标准",
    url: "https://eec.eaeunion.org/", urlLabel: "EEC 官网",
    note: "俄罗斯市场常见要求，证书有单批次与批量两种。" },
  { name: "巴西", region: "南美洲", system: "ANATEL + INMETRO", regulator: "ANATEL（电信）· INMETRO（计量质量）", mark: "ANATEL / INMETRO",
    force: "强制", forceNote: "ANATEL（无线 / 通信）与 INMETRO（产品安全）均为强制。",
    scope: "电信设备 ANATEL 强制；电气安全 INMETRO 覆盖部分产品。",
    standards: "ABNT NBR / IEC 对应",
    url: "https://www.gov.br/anatel/", urlLabel: "ANATEL 官网",
    note: "ANATEL 需要巴西本地测试与代表。" },
  { name: "墨西哥", region: "北美洲", system: "NOM 认证", regulator: "Secretaría de Economía", mark: "NOM",
    force: "强制",
    scope: "部分电子电气产品强制 NOM（安全 + EMC）。",
    standards: "NOM-001、NOM-003 等",
    url: "https://www.gob.mx/se", urlLabel: "经济部官网",
    note: "需当地认可实验室测试并指定当地代表。" },
  { name: "沙特阿拉伯", region: "中东", system: "SASO / SABER", regulator: "SASO（沙特标准局）", mark: "SASO",
    force: "强制",
    scope: "大部分电气产品强制，需在 SABER 平台注册；接受 IECEE 证书 + CB。",
    standards: "IEC 标准对应",
    url: "https://www.saso.gov.sa/", urlLabel: "SASO 官网",
    note: "灯具、家电、电源等常见要求 IECEE CB 转证。" },
  { name: "阿联酋", region: "中东", system: "ECAS", regulator: "MoIAT（工业与先进技术部）", mark: "ECAS",
    force: "强制", forceNote: "ECAS 对清单内产品强制；清单外为自愿。",
    scope: "电气产品强制注册，接受 IECEE/CB 转证。",
    standards: "IEC 标准对应",
    url: "https://www.moiat.gov.ae/", urlLabel: "MoIAT 官网",
    note: "迪拜等酋长国另有地方性准入。" },
  { name: "新加坡", region: "亚洲", system: "Safety Mark", regulator: "Enterprise Singapore / CPS", mark: "Safety Mark",
    force: "强制", forceNote: "受控商品（CPS）强制。",
    scope: "受控商品（家电、电源等）强制安全认证。",
    standards: "SS / EN / IEC 对应",
    url: "https://www.enterprisesg.gov.sg/", urlLabel: "EnterpriseSG 官网",
    note: "需新加坡当地注册的负责人。" },
  { name: "马来西亚", region: "亚洲", system: "SIRIM 认证", regulator: "ST（能源委员会）· SIRIM QAS", mark: "SIRIM",
    force: "强制",
    scope: "部分电气产品强制（插头、线缆、部分家电）。",
    standards: "MS 对应 IEC 标准",
    url: "https://www.sirim.my/", urlLabel: "SIRIM 官网",
    note: "插头和线缆是马来西亚强制重点。" },
  { name: "泰国", region: "亚洲", system: "TISI 认证", regulator: "TISI（泰国工业标准协会）", mark: "TISI",
    force: "强制", forceNote: "TISI 强制目录内产品；目录外可自愿。",
    scope: "部分家电、灯具等强制 TISI。",
    standards: "TIS 对应 IEC",
    url: "https://www.tisi.go.th/", urlLabel: "TISI 官网",
    note: "强制清单外产品可自愿认证。" },
  { name: "印度尼西亚", region: "亚洲", system: "SNI 认证", regulator: "BSN · ESDM 等", mark: "SNI",
    force: "强制", forceNote: "SNI 强制目录内产品；目录外可自愿。",
    scope: "部分电气产品（灯具、线缆、部分家电）强制 SNI。",
    standards: "SNI 对应 IEC",
    url: "https://bsn.go.id/", urlLabel: "BSN 官网",
    note: "需本地测试并符合清真/标签等配套要求（视品类）。" },
  { name: "越南", region: "亚洲", system: "CR 认证", regulator: "科技部 / 工商部", mark: "CR",
    force: "强制",
    scope: "强制产品清单：部分家电、灯具、电源等。",
    standards: "TCVN 对应 IEC",
    url: "https://www.moc.gov.vn/", urlLabel: "工商部官网",
    note: "符合性声明 + 登记流程。" },
  { name: "台湾", region: "亚洲", system: "BSMI 认证", regulator: "BSMI（经济部标准检验局）", mark: "BSMI",
    force: "强制",
    scope: "强制检验 RPC：家电、IT、电源、灯具等。",
    standards: "CNS 对应 IEC",
    url: "https://www.bsmi.gov.tw/", urlLabel: "BSMI 官网",
    note: "部分产品还需 NCC（无线）或 ROHS 要求。" },
  { name: "菲律宾", region: "亚洲", system: "PS / ICC", regulator: "DTI-BPS", mark: "PS / ICC",
    force: "强制",
    scope: "部分电气产品强制（PS 本地工厂、ICC 进口）。",
    standards: "PNS 对应 IEC",
    url: "https://www.dti.gov.ph/bps/", urlLabel: "DTI-BPS 官网",
    note: "进口产品通常走 ICC 标志。" },
  { name: "南非", region: "非洲", system: "NRCS（LOA）", regulator: "NRCS（国家监管符合性机构）", mark: "LOA",
    force: "强制",
    scope: "强制注册：家电、电线电缆、插头等。",
    standards: "SANS 对应 IEC",
    url: "https://www.nrcs.org.za/", urlLabel: "NRCS 官网",
    note: "需要进口商/制造商申请注册，测试机构需南非认可。" },
  { name: "尼日利亚", region: "非洲", system: "SONCAP", regulator: "SON（标准组织）", mark: "SONCAP",
    force: "强制", forceNote: "进口需 SONCAP 符合性证书。",
    scope: "出口前符合性验证（PC + SC 证书）。",
    standards: "国际/区域标准",
    url: "https://son.gov.ng/", urlLabel: "SON 官网",
    note: "中国出口商很常见，属于装运前认证。" },
  { name: "肯尼亚", region: "非洲", system: "PVOC", regulator: "KEBS（标准局）", mark: "PVOC",
    force: "强制", forceNote: "进口需 PVOC 符合性证书。",
    scope: "装运前符合性验证。",
    standards: "国际/区域标准",
    url: "https://www.kebs.org/", urlLabel: "KEBS 官网",
    note: "通常由授权检验机构出具证书。" },
  { name: "埃及", region: "非洲", system: "EOS 符合性", regulator: "EOS（标准组织）", mark: "EOS",
    force: "强制",
    scope: "部分电气产品强制。",
    standards: "ES 对应 IEC",
    url: "https://www.eos.org.eg/", urlLabel: "EOS 官网",
    note: "进口产品常需第三方符合性证书。" },
  { name: "以色列", region: "中东", system: "SII 认证", regulator: "SII（标准协会）", mark: "SII",
    force: "强制", forceNote: "部分产品强制（SII 型式认可）。",
    scope: "部分电气产品强制。",
    standards: "SI 对应 IEC",
    url: "https://www.sii.org.il/", urlLabel: "SII 官网",
    note: "插头为以色列特殊规格。" },
  { name: "阿根廷", region: "南美洲", system: "S-Mark", regulator: "Secretaría de Industria · IRAM", mark: "S-Mark",
    force: "强制",
    scope: "电气安全强制。",
    standards: "IRAM 对应 IEC",
    url: "https://www.iram.org.ar/", urlLabel: "IRAM 官网",
    note: "需当地测试与工厂检查。" },
  { name: "土耳其", region: "欧洲其他", system: "CE（欧盟协调法规）", regulator: "TSE 等", mark: "CE",
    force: "强制", forceNote: "与欧盟关税同盟，CE 为强制要求。",
    scope: "与欧盟协调法规一致，多数电子电气走 CE。",
    standards: "EN 对应标准",
    url: "https://www.tse.org.tr/", urlLabel: "TSE 官网",
    note: "海关联盟市场另有 EAC 体系。" },
  { name: "希腊", region: "欧盟", system: "CE（欧盟体系）", regulator: "ELOT · 市场监督机构", mark: "CE",
    force: "强制",
    scope: "欧盟 LVD/EMC/RED 覆盖，产品需 CE 技术文件与符合性声明。",
    standards: "EN/IEC 对应标准",
    url: "https://www.elot.gr/", urlLabel: "ELOT 官网",
    note: "希腊标准机构；无额外强制电气标志，但插头与标签可能有本地要求。" },
  { name: "罗马尼亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "ANPC · ISCIR", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.asro.ro/", urlLabel: "ASRO 官网",
    note: "罗马尼亚标准协会；市场抽查常见，需保存完整技术文件。" },
  { name: "保加利亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "SAS · DSM", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.bds-bg.org/", urlLabel: "BDS 官网",
    note: "保加利亚标准机构；进口商需保留 CE 声明与测试报告。" },
  { name: "克罗地亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "State Inspectorate · HZN", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.hzn.hr/", urlLabel: "HZN 官网",
    note: "克罗地亚标准机构；电气产品按欧盟体系自我声明。" },
  { name: "斯洛文尼亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "SIST · 市场监督", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.sist.si/", urlLabel: "SIST 官网",
    note: "斯洛文尼亚标准化协会；CE 技术文件是基本要求。" },
  { name: "斯洛伐克", region: "欧盟", system: "CE（欧盟体系）", regulator: "UNMS · SOI", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.unms.sk/", urlLabel: "UNMS 官网",
    note: "斯洛伐克计量与标准局；部分产品需本地语言标签。" },
  { name: "拉脱维亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "LVS · PTAC", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.lvs.lv/", urlLabel: "LVS 官网",
    note: "拉脱维亚标准机构；CE 符合性声明需与产品一同可追溯。" },
  { name: "立陶宛", region: "欧盟", system: "CE（欧盟体系）", regulator: "LST · SMVT", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.lsd.lt/", urlLabel: "LST 官网",
    note: "立陶宛标准局；电气产品按欧盟体系上市。" },
  { name: "爱沙尼亚", region: "欧盟", system: "CE（欧盟体系）", regulator: "EVS · TJA", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.evs.ee/", urlLabel: "EVS 官网",
    note: "爱沙尼亚标准中心；电商与零售渠道要求 CE 资料齐全。" },
  { name: "卢森堡", region: "欧盟", system: "CE（欧盟体系）", regulator: "ILNAS · 市场监督", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://portail-qualite.lu/", urlLabel: "ILNAS 官网",
    note: "卢森堡质量基础设施门户；CE 是基础，本地无额外强制标志。" },
  { name: "塞浦路斯", region: "欧盟", system: "CE（欧盟体系）", regulator: "CYS · 市场监督", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://www.cys.org.cy/", urlLabel: "CYS 官网",
    note: "塞浦路斯标准组织；插头规格与欧盟通用型存在本地差异。" },
  { name: "马耳他", region: "欧盟", system: "CE（欧盟体系）", regulator: "MSA · 市场监督", mark: "CE",
    force: "强制",
    scope: "欧盟协调法规覆盖；本地市场监管执行。",
    standards: "EN/IEC 对应标准",
    url: "https://msa.org.mt/", urlLabel: "MSA 官网",
    note: "马耳他标准局；小型市场但欧盟合规要求完整。" },
  { name: "冰岛", region: "欧洲其他", system: "CE / EEA", regulator: "Icelandic Standards", mark: "CE",
    force: "强制", forceNote: "属 EEA，CE 为强制要求。",
    scope: "EEA 协议下多数电子电气产品沿用 CE 框架。",
    standards: "ÍST / EN 对应",
    url: "https://www.stadlar.is/", urlLabel: "Icelandic Standards",
    note: "冰岛非欧盟但属欧洲经济区，多数产品接受 CE 符合性。" },
  { name: "乌克兰", region: "欧洲其他", system: "UA TR 技术法规", regulator: "乌克兰经济部", mark: "UA TR",
    force: "强制",
    scope: "部分电气产品强制符合性声明或认证。",
    standards: "ДСТУ / EN 对应",
    url: "https://www.me.gov.ua/", urlLabel: "乌克兰经济部",
    note: "战事期间监管流程可能调整，正式出口前请向当地机构确认。" },
  { name: "卡塔尔", region: "中东", system: "QS 符合性", regulator: "QGOSM · MOCI", mark: "QS",
    force: "强制",
    scope: "部分电子电气产品强制符合性。",
    standards: "QS / IEC",
    url: "https://www.moci.gov.qa/", urlLabel: "MOCI 官网",
    note: "海湾市场常接受 IECEE CB 报告转证。" },
  { name: "科威特", region: "中东", system: "KUCAS 认证", regulator: "PAI（公共工业局）", mark: "KUCAS",
    force: "强制",
    scope: "部分电子电气产品强制 KUCAS 符合性。",
    standards: "KWS / IEC",
    url: "https://www.pai.gov.kw/", urlLabel: "PAI 官网",
    note: "通常需装运前符合性证书，灯具与家电常见。" },
  { name: "阿曼", region: "中东", system: "DGSM 符合性", regulator: "DGSM（标准与计量总司）", mark: "DGSM",
    force: "强制",
    scope: "部分电气产品强制符合性验证。",
    standards: "OS / IEC",
    url: "https://www.dgsm.gov.om/", urlLabel: "DGSM 官网",
    note: "可参考海湾 GCC 与 IECEE 体系安排。" },
  { name: "约旦", region: "中东", system: "JSMO 符合性", regulator: "JSMO", mark: "JSMO",
    force: "强制",
    scope: "部分电气产品强制标准符合性。",
    standards: "JS / IEC",
    url: "https://www.jsmo.gov.jo/", urlLabel: "JSMO 官网",
    note: "进口产品可能需要符合性证书或装运前检验。" },
  { name: "黎巴嫩", region: "中东", system: "LIBNOR 标准", regulator: "LIBNOR", mark: "LIBNOR",
    force: "强制", forceNote: "进口需符合性文件。",
    scope: "部分电气产品标准符合性。",
    standards: "LIBNOR / IEC",
    url: "https://www.libnor.gov.lb/", urlLabel: "LIBNOR 官网",
    note: "市场情况波动较大，出口前向当地代理确认。" },
  { name: "伊拉克", region: "中东", system: "COSQC 符合性", regulator: "COSQC", mark: "COSQC",
    force: "强制", forceNote: "ICIGI 进口符合性。",
    scope: "部分进口产品需符合性验证。",
    standards: "IQS / IEC",
    url: "https://www.cosqc.gov.iq/", urlLabel: "COSQC 官网",
    note: "装运前认证与清关要求可能由指定机构执行。" },
  { name: "伊朗", region: "中东", system: "ISIRI 符合性", regulator: "ISIRI", mark: "ISIRI",
    force: "强制",
    scope: "部分电气产品强制标准。",
    standards: "ISIRI / IEC",
    url: "https://www.isiri.gov.ir/", urlLabel: "ISIRI 官网",
    note: "受制裁影响，出口前需确认支付、物流与合规路径。" },
  { name: "巴林", region: "中东", system: "BTMD 符合性", regulator: "MOIC · BTMD", mark: "BTMD",
    force: "强制",
    scope: "部分电子电气产品强制。",
    standards: "GSO / IEC",
    url: "https://www.moic.gov.bh/", urlLabel: "MOIC 官网",
    note: "海湾合作委员会（GCC）体系下常接受 IECEE CB 转证。" },
  { name: "巴基斯坦", region: "亚洲", system: "PSQCA 认证", regulator: "PSQCA", mark: "PSQCA",
    force: "强制",
    scope: "部分电气产品强制标准认证。",
    standards: "PS / IEC",
    url: "https://www.psqca.com.pk/", urlLabel: "PSQCA 官网",
    note: "插头、线缆与部分家电为重点管控品类。" },
  { name: "孟加拉", region: "亚洲", system: "BSTI 认证", regulator: "BSTI", mark: "BSTI",
    force: "强制",
    scope: "部分电气产品强制标准认证。",
    standards: "BDS / IEC",
    url: "https://www.bsti.gov.bd/", urlLabel: "BSTI 官网",
    note: "进口电气产品清关时常要求 BSTI 证书或测试报告。" },
  { name: "斯里兰卡", region: "亚洲", system: "SLSI 认证", regulator: "SLSI", mark: "SLSI",
    force: "强制",
    scope: "部分电气产品强制标准认证。",
    standards: "SLS / IEC",
    url: "https://www.slsi.lk/", urlLabel: "SLSI 官网",
    note: "插头与家电属于常见强制目录。" },
  { name: "摩洛哥", region: "非洲", system: "IMANOR 标准", regulator: "IMANOR", mark: "IMANOR",
    force: "强制", forceNote: "进口符合性。",
    scope: "部分电气产品标准符合性。",
    standards: "NM / IEC",
    url: "https://www.imanor.gov.ma/", urlLabel: "IMANOR 官网",
    note: "部分产品可能需要符合性证书或进口检验。" },
  { name: "阿尔及利亚", region: "非洲", system: "IANOR 标准", regulator: "IANOR", mark: "IANOR",
    force: "强制", forceNote: "进口符合性。",
    scope: "部分进口产品符合性验证。",
    standards: "NA / IEC",
    url: "https://www.ianor.dz/", urlLabel: "IANOR 官网",
    note: "进口清关常要求第三方符合性证书。" },
  { name: "突尼斯", region: "非洲", system: "INNORPI 标准", regulator: "INNORPI", mark: "INNORPI",
    force: "强制",
    scope: "部分产品强制标准。",
    standards: "NT / IEC",
    url: "https://www.innorpi.tn/", urlLabel: "INNORPI 官网",
    note: "电气产品需符合突尼斯标准或国际对应标准。" },
  { name: "埃塞俄比亚", region: "非洲", system: "ESA 符合性", regulator: "ESA", mark: "ESA",
    force: "强制", forceNote: "进口符合性。",
    scope: "部分进口电气产品符合性验证。",
    standards: "ES / IEC",
    url: "https://www.esae.gov.et/", urlLabel: "ESA 官网",
    note: "进口商需向埃塞标准局申请符合性路径。" },
  { name: "坦桑尼亚", region: "非洲", system: "TBS 认证", regulator: "TBS", mark: "TBS",
    force: "强制",
    scope: "部分电气产品强制 PVoC 符合性。",
    standards: "TZS / IEC",
    url: "https://www.tbs.go.tz/", urlLabel: "TBS 官网",
    note: "出口前需取得装运前符合性证书（PVoC）。" },
  { name: "乌干达", region: "非洲", system: "UNBS 认证", regulator: "UNBS", mark: "UNBS",
    force: "强制",
    scope: "部分产品强制 PVoC 符合性。",
    standards: "US / IEC",
    url: "https://unbs.go.ug/", urlLabel: "UNBS 官网",
    note: "多数电子电气产品走装运前验证与登记。" },
  { name: "加纳", region: "非洲", system: "GSA 认证", regulator: "GSA", mark: "GSA",
    force: "强制",
    scope: "部分电气产品强制标准符合性。",
    standards: "GS / IEC",
    url: "https://www.gsa.gov.gh/", urlLabel: "GSA 官网",
    note: "进口家电与电气产品常需 GSA 许可或符合性证书。" },
  { name: "科特迪瓦", region: "非洲", system: "CODINORM 标准", regulator: "CODINORM", mark: "CODINORM",
    force: "强制", forceNote: "进口符合性。",
    scope: "部分产品标准符合性。",
    standards: "NCI / IEC",
    url: "https://www.codinorm.ci/", urlLabel: "CODINORM 官网",
    note: "西非市场清关时可能要求符合性文件。" },
  { name: "喀麦隆", region: "非洲", system: "ANOR 标准", regulator: "ANOR", mark: "ANOR",
    force: "强制", forceNote: "进口符合性。",
    scope: "部分进口产品符合性。",
    standards: "NC / IEC",
    url: "https://www.anorcameroun.cm/", urlLabel: "ANOR 官网",
    note: "部分品类需装运前符合性认证（PECAE）。" },
  { name: "哥伦比亚", region: "南美洲", system: "RETIE 电气合规", regulator: "SIC · MinEnergía", mark: "RETIE",
    force: "强制",
    scope: "电气装置与部分产品强制技术法规。",
    standards: "NTC / IEC",
    url: "https://www.sic.gov.co/", urlLabel: "SIC 官网",
    note: "RETIE 覆盖电气安全，部分产品需第三方认证。" },
  { name: "秘鲁", region: "南美洲", system: "INACAL 标准", regulator: "INACAL", mark: "INACAL",
    force: "强制",
    scope: "部分电气产品强制标准。",
    standards: "NTP / IEC",
    url: "https://www.inacal.gob.pe/", urlLabel: "INACAL 官网",
    note: "部分产品需符合秘鲁技术标准或国际对应标准。" },
  { name: "智利", region: "南美洲", system: "SEC 认证", regulator: "SEC（电气与燃料监管局）", mark: "SEC",
    force: "强制",
    scope: "电气产品强制安全认证。",
    standards: "NCh / IEC",
    url: "https://www.sec.cl/", urlLabel: "SEC 官网",
    note: "家电、线缆、插头等常需 SEC 认证。" },
  { name: "厄瓜多尔", region: "南美洲", system: "INEN 认证", regulator: "INEN", mark: "INEN",
    force: "强制",
    scope: "部分电气产品强制。",
    standards: "NTE INEN / IEC",
    url: "https://www.normalizacion.gob.ec/", urlLabel: "INEN 官网",
    note: "进口产品可能要求符合性证书。" },
  { name: "乌拉圭", region: "南美洲", system: "UNIT 标准", regulator: "UNIT", mark: "UNIT",
    force: "强制", forceNote: "部分产品需符合性评定；UNIT 标志为自愿。",
    scope: "部分电气产品标准符合性。",
    standards: "UNIT / IEC",
    url: "https://www.unit.org.uy/", urlLabel: "UNIT 官网",
    note: "乌拉圭市场较小，但渠道常要求 IEC 对应测试报告。" },
  { name: "巴拉圭", region: "南美洲", system: "INTN 认证", regulator: "INTN", mark: "INTN",
    force: "强制",
    scope: "部分产品强制标准。",
    standards: "NP / IEC",
    url: "https://www.intn.gov.py/", urlLabel: "INTN 官网",
    note: "进口电气产品清关可能要求 INTN 文件。" },
  { name: "玻利维亚", region: "南美洲", system: "IBNORCA 标准", regulator: "IBNORCA", mark: "IBNORCA",
    force: "强制",
    scope: "部分电气产品标准符合性。",
    standards: "NB / IEC",
    url: "https://www.ibnorca.org/", urlLabel: "IBNORCA 官网",
    note: "多为标准符合性，正式出口前确认强制目录。" },
  { name: "多米尼加", region: "南美洲", system: "INDOCAL 标准", regulator: "INDOCAL", mark: "INDOCAL",
    force: "强制",
    scope: "部分产品标准符合性。",
    standards: "NOR / IEC",
    url: "https://www.indocal.gob.do/", urlLabel: "INDOCAL 官网",
    note: "进口商常需提供 IEC 对应测试报告。" },
  { name: "巴拿马", region: "北美洲", system: "DGNTI 标准", regulator: "DGNTI · MICI", mark: "DGNTI",
    force: "强制",
    scope: "部分电气产品强制标准。",
    standards: "DGNTI / IEC",
    url: "https://www.mici.gob.pa/", urlLabel: "MICI 官网",
    note: "巴拿马对部分家电与电气产品有标准要求。" },
  { name: "哥斯达黎加", region: "北美洲", system: "INTECO 标准", regulator: "INTECO", mark: "INTECO",
    force: "强制",
    scope: "部分电气产品标准符合性。",
    standards: "INTE / IEC",
    url: "https://www.inteco.org/", urlLabel: "INTECO 官网",
    note: "渠道常要求 IEC 测试报告与西班牙语标签。" },
  { name: "危地马拉", region: "北美洲", system: "COGUANOR 标准", regulator: "COGUANOR", mark: "COGUANOR",
    force: "强制",
    scope: "部分产品标准符合性。",
    standards: "COGUANOR / IEC",
    url: "https://www.mineco.gob.gt/", urlLabel: "MINECO 官网",
    note: "进口电气产品需确认强制标准目录。" },
  { name: "洪都拉斯", region: "北美洲", system: "OHN 标准", regulator: "OHN · SIC", mark: "OHN",
    force: "强制",
    scope: "部分电气产品标准符合性。",
    standards: "OHN / IEC",
    url: "https://www.sic.gob.hn/", urlLabel: "SIC 官网",
    note: "中美洲市场清关常要求符合性文件。" },
  { name: "萨尔瓦多", region: "北美洲", system: "CONACYT 标准", regulator: "CONACYT", mark: "CONACYT",
    force: "强制",
    scope: "部分产品标准符合性。",
    standards: "NSO / IEC",
    url: "https://www.conacyt.gob.sv/", urlLabel: "CONACYT 官网",
    note: "进口电气产品需符合萨尔瓦多强制标准。" },
  { name: "香港", region: "亚洲", system: "《电气产品（安全）规例》符合安全规格证明书", regulator: "机电工程署（EMSD）", mark: "EMSD 符合性",
    force: "强制",
    scope: "家用电气产品（交流 ≥50V 或直流 ≥120V）供应香港前须符合规例要求并取得符合安全规格证明书；订明产品（插头、适配接头、灯座、软电线、拖板、无排气管储水式电热水器）另有专项安全规格。",
    standards: "IEC 对应标准（如 IEC 60335 / 60598 / 62368 系列）",
    url: "https://www.emsd.gov.hk/", urlLabel: "香港机电工程署",
    note: "无 CCC/CE 式统一标志，但“符合安全规格证明书”是法定要求；无线产品另需 OFCA 型式认可，部分家电另受强制能源效益标签（MEELS）约束。" },
  { name: "蒙古", region: "亚洲", system: "MNS 认证（符合性证书 CoC / 声明 DoC）", regulator: "蒙古标准计量局（MASM）", mark: "MNS",
    force: "强制", forceNote: "高风险产品强制 CoC；低风险可自我声明。",
    scope: "高风险产品（电器、儿童用品、压力容器等）须走强制认证 CoC：MASM 认可实验室测试，部分产品需工厂审查；低风险产品可自我声明。",
    standards: "MNS IEC 60335 系列（家电安全）等 MNS/ISO/IEC 标准",
    url: "https://masm.gov.mn/", urlLabel: "MASM 官网",
    note: "证书有效期通常 1–3 年；进口还需海关与许可（许可证）手续。" },
  { name: "缅甸", region: "亚洲", system: "PTD 型式认可（通信 / 无线设备）+ 进口许可", regulator: "邮电部（PTD）· 商务部", mark: "PTD",
    force: "强制", forceNote: "通信 / 无线设备强制 PTD；一般家电以进口许可为主。",
    scope: "电信设备、无线电设备及部分 IT / 物联网设备必须取得 PTD 型号批准才能进口与销售；一般家用电器目前没有统一强制安全认证标志，以进口许可与标准符合性为主。",
    standards: "缅甸国家技术标准 / 频谱规划；家电参考 IEC 标准",
    url: "https://www.ptd.gov.mm/", urlLabel: "缅甸 PTD",
    note: "申请须由缅甸本地注册公司作为授权代表；PTD 证书与进口许可联动，清关需提交证书。" },
  { name: "柬埔寨", region: "亚洲", system: "ISC 认证（部分产品强制）", regulator: "柬埔寨标准院（ISC）· 邮电部（MPTC，通信设备）", mark: "ISC",
    force: "强制", forceNote: "ISC 强制清单内产品。",
    scope: "ISC 对列入强制清单的产品实施认证与符合性评定；通信 / 无线设备另需 MPTC 的型号批准与许可。",
    standards: "柬埔寨标准（CS）/ IEC 对应标准",
    url: "https://www.isc.gov.kh/", urlLabel: "ISC 官网",
    note: "强制清单以 ISC 最新公告为准；出口前建议与本地代理确认清单与文件要求。" },
  { name: "尼泊尔", region: "亚洲", system: "NS 标志认证（NBSM）", regulator: "尼泊尔标准与计量局（NBSM）", mark: "NS",
    force: "强制", forceNote: "强制目录内产品。",
    scope: "列入强制认证目录的产品须取得 NS 标志；通信 / 无线设备另需 NTA 型式认可。",
    standards: "NS / IEC 对应标准（NBSM 采用）",
    url: "https://nbsm.gov.np/en/", urlLabel: "NBSM 官网",
    note: "目录以 NBSM 公告为准；进口清关通常需符合性文件。" },
  { name: "委内瑞拉", region: "南美洲", system: "COVENIN 标准符合性 · SENCAMER 符合性证书", regulator: "SENCAMER（国家标准化、质量、计量与技术法规服务局）", mark: "COVENIN / SENCAMER",
    force: "强制",
    scope: "进口产品按 COVENIN 标准做符合性评定：样品送 SENCAMER 认可实验室测试 → 提交符合性声明与技术文件 → 取得符合性证书（清关必要文件）。",
    standards: "COVENIN 标准（多基于 ISO / IEC）",
    url: "https://www.sencamer.gob.ve/", urlLabel: "SENCAMER 官网",
    note: "电子电气产品还需关注电信主管机构（CONATEL）对无线 / 通信设备的型式认可；市场监管会抽查，证书需随货。" },
  { name: "ENEC（欧洲电工认证协议）", region: "欧盟", system: "ENEC 认证（自愿 · 第三方 · ISO/IEC 17067 第 5 类）", regulator: "ENEC 协议 / ETICS 运营 · CCA 签约认证机构（VDE、IMQ、DEMKO、KEMA、SGS Fimko、CEBEC、AENOR 等）", mark: "ENEC",
    force: "渠道", forceNote: "自愿第三方认证；CE 才是欧盟法规强制要求。",
    scope: "照明设备及其配件（ENEC 最大品类）、灯控制装置、信息技术 / 办公设备电源、变压器与电源适配器、家电元器件（开关、温控器、连接器）、电容器与滤波器等；流程为型式试验 + 首次工厂检查 + 定期工厂监督 + 产线 / 市场抽样复测（第 5 类认证方案）。",
    standards: "EN 60598 系列（灯具）、EN 61347 系列（灯控装置）、EN 62368-1（IT/AV）、EN 61558 系列（变压器 / 电源）等 EN 协调标准",
    url: "https://enec.com/", urlLabel: "ENEC 官网",
    note: "ENEC 不是 CE 的替代：CE 是欧盟法规强制的制造商符合性声明（部分指令需公告机构介入），ENEC 是自愿的第三方认证，依据同一批 EN 协调标准，可作为低电压指令（LVD）符合性推定、技术文件与渠道准入的有力证据；可与德国 GS 并存。另有针对 LED 产品（模块与灯具）的 ENEC+ 性能标志，须先取得 ENEC。" }
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
  d.textContent = s == null ? "" : s;
  return d.innerHTML;
}

// 地图：区域配色与坐标（教学用近似值）
var REGION_COLOR = { "欧盟": "#0a84ff", "欧洲其他": "#0a84ff", "北欧": "#0a84ff", "亚洲": "#ff9f0a", "北美洲": "#34c759", "南美洲": "#bf5af2", "大洋洲": "#5ac8fa", "非洲": "#ff3b30" };
var COORDS = {
  "中国": [35.86, 104.19], "香港": [22.32, 114.17], "蒙古": [46.86, 103.85], "欧盟": [50.85, 4.35],
  "德国": [51.16, 10.45], "英国": [55.38, -3.44], "法国": [46.6, 2.2], "荷兰": [52.13, 5.29],
  "比利时": [50.5, 4.47], "意大利": [42.8, 12.8], "西班牙": [40.4, -3.7],
  "北欧四国（瑞典/挪威/丹麦/芬兰）": [63.0, 16.0], "奥地利": [47.5, 14.5], "瑞士": [46.8, 8.2], "波兰": [52.0, 19.0],
  "捷克": [49.8, 15.5], "匈牙利": [47.2, 19.5], "葡萄牙": [39.5, -8.0], "爱尔兰": [53.4, -8.0],
  "美国": [39.8, -98.5], "加拿大": [56.0, -106.0], "日本": [36.2, 138.2], "韩国": [36.5, 127.8], "印度": [22.0, 79.0],
  "澳大利亚 / 新西兰": [-26.0, 134.0], "欧亚经济联盟（俄/白俄/哈）": [60.0, 80.0], "巴西": [-10.0, -53.0],
  "墨西哥": [23.6, -102.5], "沙特阿拉伯": [24.0, 45.0], "阿联酋": [24.0, 54.0], "新加坡": [1.35, 103.8],
  "马来西亚": [3.8, 109.7], "泰国": [15.0, 101.0], "印度尼西亚": [-2.0, 118.0], "越南": [16.0, 108.0],
  "台湾": [23.7, 121.0], "菲律宾": [12.0, 122.0], "缅甸": [21.91, 95.96], "柬埔寨": [12.57, 104.99],
  "尼泊尔": [28.39, 84.12], "南非": [-29.0, 25.0], "尼日利亚": [9.0, 8.0], "肯尼亚": [0.0, 38.0],
  "埃及": [26.8, 30.8], "以色列": [31.0, 34.8], "阿根廷": [-34.0, -64.0], "土耳其": [39.0, 35.0],
  "希腊": [39.0, 22.0], "罗马尼亚": [46.0, 25.0], "保加利亚": [42.7, 25.5], "克罗地亚": [45.1, 15.5],
  "斯洛文尼亚": [46.1, 14.8], "斯洛伐克": [48.7, 19.5], "拉脱维亚": [56.9, 24.6], "立陶宛": [55.2, 24.0],
  "爱沙尼亚": [58.6, 25.0], "卢森堡": [49.8, 6.1], "塞浦路斯": [35.1, 33.2], "马耳他": [35.9, 14.4],
  "冰岛": [64.9, -19.0], "乌克兰": [49.0, 31.0], "卡塔尔": [25.3, 51.2], "科威特": [29.3, 47.5],
  "阿曼": [21.5, 55.9], "约旦": [31.2, 36.5], "黎巴嫩": [33.9, 35.9], "伊拉克": [33.0, 43.0],
  "伊朗": [32.0, 53.0], "巴林": [26.0, 50.5], "巴基斯坦": [30.0, 69.0], "孟加拉": [23.7, 90.4],
  "斯里兰卡": [7.9, 80.8], "摩洛哥": [31.8, -7.1], "阿尔及利亚": [28.0, 1.6], "突尼斯": [34.0, 9.0],
  "埃塞俄比亚": [9.0, 40.0], "坦桑尼亚": [-6.0, 35.0], "乌干达": [1.0, 32.0], "加纳": [7.9, -1.0],
  "科特迪瓦": [7.5, -5.5], "喀麦隆": [5.0, 12.0], "哥伦比亚": [4.0, -73.0], "秘鲁": [-9.0, -75.0],
  "智利": [-30.0, -71.0], "厄瓜多尔": [-1.5, -78.0], "乌拉圭": [-32.8, -56.0], "巴拉圭": [-23.4, -58.0],
  "玻利维亚": [-16.7, -64.7], "多米尼加": [18.7, -70.3], "巴拿马": [8.5, -80.0], "哥斯达黎加": [10.0, -84.0],
  "危地马拉": [15.5, -90.3], "洪都拉斯": [14.8, -86.5], "萨尔瓦多": [13.8, -88.9],
  "委内瑞拉": [6.42, -66.59]
};

// ===== 查询状态（结构参考“全球市电合规数据库”）=====
var CSTATE = { country: "", mark: "", region: "", product: "", force: "", keyword: "", active: false, detail: "", view: "list" };

// 认证性质：强制（监管）/ 渠道（自愿）/ 两者并存
var FORCE_CLASS = { "强制": "mandatory", "渠道": "channel", "强制+渠道": "mixed" };
var FORCE_LABEL = { "强制": "强制（监管）", "渠道": "渠道 / 自愿", "强制+渠道": "强制 + 渠道" };

function forceChip(c) {
  var f = c.force || "";
  if (!f) return "—";
  return '<span class="force-chip ' + (FORCE_CLASS[f] || "") + '" title="' +
    esc(c.forceNote || FORCE_LABEL[f] + "；以该国法规目录为准") + '">' + esc(f) + "</span>";
}

// 电压数据库（voltage.html / voltage.js）收录的市场，用于双向互链
var VOLT_MARKETS = ["中国", "香港", "台湾", "日本", "韩国", "蒙古", "新加坡", "马来西亚", "泰国", "越南",
  "印度尼西亚", "菲律宾", "缅甸", "柬埔寨", "印度", "巴基斯坦", "孟加拉国", "斯里兰卡", "尼泊尔",
  "沙特阿拉伯", "阿联酋", "以色列", "土耳其", "伊朗", "伊拉克", "科威特", "卡塔尔", "约旦",
  "欧盟（德/法/西/意等）", "英国", "爱尔兰", "瑞士", "挪威", "瑞典", "丹麦", "芬兰", "俄罗斯", "乌克兰",
  "波兰", "捷克", "荷兰", "比利时", "法国", "德国", "意大利", "西班牙", "葡萄牙", "希腊", "匈牙利", "奥地利",
  "美国", "加拿大", "墨西哥", "巴西", "阿根廷", "智利", "哥伦比亚", "秘鲁", "委内瑞拉",
  "澳大利亚", "新西兰", "南非", "埃及", "尼日利亚", "肯尼亚", "摩洛哥", "阿尔及利亚"];
// 认证库里的区域合并条目 → 电压库中的代表市场
var VOLT_ALIAS = {
  "欧盟": "欧盟（德/法/西/意等）",
  "北欧四国（瑞典/挪威/丹麦/芬兰）": "瑞典",
  "欧亚经济联盟（俄/白俄/哈）": "俄罗斯",
  "澳大利亚 / 新西兰": "澳大利亚",
  "德国": "德国", "法国": "法国", "荷兰": "荷兰", "比利时": "比利时", "意大利": "意大利",
  "西班牙": "西班牙", "葡萄牙": "葡萄牙", "希腊": "希腊", "匈牙利": "匈牙利", "奥地利": "奥地利",
  "波兰": "波兰", "捷克": "捷克", "爱尔兰": "爱尔兰", "瑞士": "瑞士", "乌克兰": "乌克兰"
};

function voltNameFor(name) {
  if (VOLT_MARKETS.indexOf(name) !== -1) return name;
  var a = VOLT_ALIAS[name];
  return a && VOLT_MARKETS.indexOf(a) !== -1 ? a : "";
}

var PRODUCT_NAME = {};
CERT_PRODUCTS.forEach(function (p) { PRODUCT_NAME[p.id] = p.name; });

// 欧盟 / 欧洲经济区市场（“欧洲各国”这类合并条目要能匹配到它们）
var EU_NAMES = ["欧盟", "欧盟（德/法/西/意等）", "德国", "法国", "荷兰", "比利时", "意大利", "西班牙",
  "葡萄牙", "希腊", "匈牙利", "奥地利", "波兰", "捷克", "爱尔兰", "挪威", "瑞典", "丹麦", "芬兰", "瑞士"];

function regions() {
  var out = [];
  CERT_COUNTRIES.forEach(function (c) { if (out.indexOf(c.region) === -1) out.push(c.region); });
  return out;
}

// 某市场在“产品分类”里出现过的品类 id
function productCatsOf(name) {
  var out = [];
  CERT_PRODUCTS.forEach(function (p) {
    var hit = p.entries.some(function (e) {
      var en = e.c;
      if (en === name || en.indexOf(name) !== -1 || name.indexOf(en) !== -1) return true;
      if ((en === "欧洲各国" || en.indexOf("欧洲") !== -1) && EU_NAMES.indexOf(name) !== -1) return true;
      return false;
    });
    if (hit) out.push(p.id);
  });
  return out;
}

// 某市场在某品类下的条目（标志 + 说明）
function productEntryOf(productId, name) {
  var p = CERT_PRODUCTS.filter(function (x) { return x.id === productId; })[0];
  if (!p) return null;
  return p.entries.filter(function (e) {
    var en = e.c;
    return en === name || en.indexOf(name) !== -1 || name.indexOf(en) !== -1 ||
      ((en === "欧洲各国" || en.indexOf("欧洲") !== -1) && EU_NAMES.indexOf(name) !== -1);
  })[0] || null;
}

// ===== 下拉选项 =====
function buildFilters() {
  var sel = $("cCountry");
  if (sel) {
    sel.innerHTML = '<option value="">全部国家 / 地区</option>' + regions().map(function (r) {
      return '<optgroup label="' + esc(r) + '">' + CERT_COUNTRIES.filter(function (c) { return c.region === r; }).map(function (c) {
        return '<option value="' + esc(c.name) + '">' + esc(c.name) + "</option>";
      }).join("") + "</optgroup>";
    }).join("");
  }
  var counts = {};
  CERT_COUNTRIES.forEach(function (c) { if (c.mark) counts[c.mark] = (counts[c.mark] || 0) + 1; });
  var marks = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
  var mSel = $("cMark");
  if (mSel) {
    mSel.innerHTML = '<option value="">全部认证标志</option>' + marks.map(function (m) {
      return '<option value="' + esc(m) + '">' + esc(m) + "（" + counts[m] + "）</option>";
    }).join("");
  }
  var rSel = $("cRegionSel");
  if (rSel) {
    rSel.innerHTML = '<option value="">全部地区</option>' + regions().map(function (r) {
      var n = CERT_COUNTRIES.filter(function (c) { return c.region === r; }).length;
      return '<option value="' + esc(r) + '">' + esc(r) + "（" + n + "）</option>";
    }).join("");
  }
  var pSel = $("cProduct");
  if (pSel) {
    pSel.innerHTML = '<option value="">全部产品分类</option>' + CERT_PRODUCTS.map(function (p) {
      return '<option value="' + esc(p.id) + '">' + p.icon + " " + esc(p.name) + "（" + p.entries.length + "）</option>";
    }).join("");
  }
  var mc = $("cMarketCount");
  if (mc) mc.textContent = CERT_COUNTRIES.length;
  var sa = $("cShowAll");
  if (sa) sa.textContent = "显示全部 " + CERT_COUNTRIES.length + " 个市场";
  // 认证性质选项带数量
  var fSel = $("cForce");
  if (fSel) {
    var fCount = { "强制": 0, "渠道": 0, "强制+渠道": 0 };
    CERT_COUNTRIES.forEach(function (c) { if (fCount[c.force] !== undefined) fCount[c.force]++; });
    fSel.innerHTML = '<option value="">全部性质</option>' + Object.keys(fCount).map(function (f) {
      return '<option value="' + esc(f) + '">' + esc(FORCE_LABEL[f] || f) + "（" + fCount[f] + "）</option>";
    }).join("");
    fSel.value = CSTATE.force || "";
  }
}

// ===== 过滤 =====
function matches(c) {
  if (CSTATE.country && c.name !== CSTATE.country) return false;
  if (CSTATE.mark && c.mark !== CSTATE.mark) return false;
  if (CSTATE.region && c.region !== CSTATE.region) return false;
  if (CSTATE.force && c.force !== CSTATE.force) return false;
  if (CSTATE.product && productCatsOf(c.name).indexOf(CSTATE.product) === -1) return false;
  var q = CSTATE.keyword.trim().toLowerCase();
  if (!q) return true;
  return [c.name, c.region, c.mark, c.system, c.regulator, c.scope, c.standards, c.note, c.force, c.forceNote]
    .join(" ").toLowerCase().indexOf(q) !== -1;
}

function filtered() { return CERT_COUNTRIES.filter(matches); }

function activeFilters() {
  var bits = [];
  if (CSTATE.country) bits.push("国家 / 地区：" + CSTATE.country);
  if (CSTATE.mark) bits.push("认证标志：" + CSTATE.mark);
  if (CSTATE.region) bits.push("地区：" + CSTATE.region);
  if (CSTATE.force) bits.push("认证性质：" + (FORCE_LABEL[CSTATE.force] || CSTATE.force));
  if (CSTATE.product) bits.push("产品分类：" + (PRODUCT_NAME[CSTATE.product] || CSTATE.product));
  if (CSTATE.keyword.trim()) bits.push("关键词：" + CSTATE.keyword.trim());
  return bits;
}

function hasFilter() { return activeFilters().length > 0; }

// ===== 详情卡 =====
function detailHtml(c) {
  var cats = productCatsOf(c.name);
  var extra = "";
  if (CSTATE.product) {
    var e = productEntryOf(CSTATE.product, c.name);
    extra = "<p><b>" + esc(PRODUCT_NAME[CSTATE.product]) + " 在本市场的标志：</b>" +
      (e ? "<b>" + esc(e.mark) + "</b>　" + esc(e.note)
         : '<span class="cert-muted">认证库未单独列出该品类的条目，以该市场体系整体要求为准。</span>') + "</p>";
  } else if (cats.length) {
    extra = "<p><b>覆盖产品分类：</b>" + cats.map(function (id) { return esc(PRODUCT_NAME[id]); }).join(" · ") + "</p>";
  }
  var forceLine = "<p><b>认证性质：</b>" + (c.force ? esc(FORCE_LABEL[c.force] || c.force) : "—") +
    (c.forceNote ? "　" + esc(c.forceNote) : "") + "</p>";
  return '<article class="cert-card">' +
    '<h3>' + esc(c.name) + ' <span class="mark">' + esc(c.mark) + "</span>" +
      '<button type="button" class="cert-clear" data-cdetail-clear="1">清除详情</button></h3>' +
    '<p class="meta">体系：' + esc(c.system) + " · 监管：" + esc(c.regulator) + " · 地区：" + esc(c.region) + "</p>" +
    forceLine +
    "<p><b>强制 / 适用范围：</b>" + esc(c.scope) + "</p>" +
    "<p><b>标准依据：</b>" + esc(c.standards) + "</p>" +
    '<p class="note">' + esc(c.note) + "</p>" + extra +
    '<p><a class="btn" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.urlLabel) + "</a>" +
    (voltNameFor(c.name) ? ' <a class="btn" href="./voltage.html?c=' + encodeURIComponent(voltNameFor(c.name)) + '">🔌 该市场的市电条件（电压 / 频率 / 插脚）</a>' : "") +
    "</p>" +
  "</article>";
}

// ===== 渲染 =====
function render() {
  if (!CSTATE.active && !hasFilter()) CSTATE.active = false;
  var empty = $("cEmpty");
  var box = $("cBox");
  if (empty) empty.hidden = CSTATE.active;
  if (box) box.hidden = !CSTATE.active;
  if (!CSTATE.active) { updateCount(); return; }

  var list = filtered();

  var det = $("cDetail");
  if (det) {
    var dc = CSTATE.detail ? CERT_COUNTRIES.filter(function (c) { return c.name === CSTATE.detail; })[0] : null;
    if (dc) {
      det.hidden = false;
      var mismatch = hasFilter() && !matches(dc);
      det.innerHTML = (mismatch ? '<p class="cert-warn">⚠ 当前筛选条件不包含该市场；下面仍显示你选中的市场详情（点“清除详情”可关闭）。</p>' : "") + detailHtml(dc);
    } else { det.hidden = true; det.innerHTML = ""; }
  }

  var body = $("cBody");
  var colExtra = $("cColExtra");
  if (colExtra) colExtra.textContent = CSTATE.product ? "该品类标志" : "覆盖品类";
  if (body) {
    body.innerHTML = list.length ? list.map(function (c) {
      var cats = productCatsOf(c.name);
      var extraCell;
      if (CSTATE.product) {
        var pe = productEntryOf(CSTATE.product, c.name);
        extraCell = pe
          ? '<span class="mark" title="' + esc(pe.note) + '">' + esc(pe.mark) + "</span>"
          : '<span class="cert-muted" title="认证库未单独列出该品类，以体系整体要求为准">—</span>';
      } else {
        extraCell = cats.length
          ? '<span title="' + esc(cats.map(function (id) { return PRODUCT_NAME[id]; }).join(" · ")) + '">' + cats.length + "</span>"
          : "—";
      }
      return "<tr>" +
        '<td><button type="button" class="cert-name" data-cdetail="' + esc(c.name) + '">' + esc(c.name) + "</button></td>" +
        "<td>" + esc(c.region) + "</td>" +
        '<td><span class="mark">' + esc(c.mark) + "</span></td>" +
        '<td class="c-col-sys">' + esc(c.system) + "</td>" +
        "<td>" + forceChip(c) + "</td>" +
        '<td class="cert-reg c-col-reg">' + esc(c.regulator) + "</td>" +
        '<td class="num">' + extraCell + "</td>" +
        '<td><button type="button" class="cert-detail-btn" aria-label="查看 ' + esc(c.name) + ' 认证详情" data-cdetail="' + esc(c.name) + '">详情</button></td>' +
      "</tr>";
    }).join("") : '<tr><td colspan="8" class="cert-empty-row">没有匹配结果：试试放宽认证标志 / 认证性质 / 地区 / 产品分类，或点“重置”重新选择。</td></tr>';
  }

  var pbox = $("cProductBox");
  if (pbox) {
    var p = CSTATE.product ? CERT_PRODUCTS.filter(function (x) { return x.id === CSTATE.product; })[0] : null;
    if (!p) { pbox.hidden = true; pbox.innerHTML = ""; }
    else {
      pbox.hidden = false;
      pbox.innerHTML = '<h3 class="cert-subhead">' + p.icon + " " + esc(p.name) + "：各国 / 地区要求</h3>" +
        '<p class="cert-count">' + esc(p.summary) + "</p>" +
        '<div class="table-wrap"><table><thead><tr><th>国家 / 地区</th><th>认证 / 标志</th><th>说明</th></tr></thead><tbody>' +
        p.entries.map(function (e) {
          return "<tr><td>" + esc(e.c) + '</td><td><span class="mark">' + esc(e.mark) + "</span></td><td>" + esc(e.note) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }
  }
  updateCount();
  syncMapHighlight();
  syncUrl();
}

function updateCount() {
  var el = $("cCount");
  if (!el) return;
  if (!CSTATE.active) { el.textContent = "未设筛选条件：点“显示全部”或直接选择条件"; return; }
  var bits = activeFilters();
  el.textContent = "匹配 " + filtered().length + " / " + CERT_COUNTRIES.length + " 个市场" +
    (bits.length ? " · " + bits.join(" · ") : "");
}

function resetFilters() {
  CSTATE = { country: "", mark: "", region: "", product: "", force: "", keyword: "", active: false, detail: "", view: CSTATE.view };
  ["cCountry", "cMark", "cRegionSel", "cProduct", "cForce", "cKeyword"].forEach(function (id) {
    var el = $(id); if (el) el.value = "";
  });
  render();
}
// ===== 视图切换（列表 / 地图）=====
function switchCView(view) {
  CSTATE.view = view;
  var list = $("cList");
  var map = $("cMap");
  if (list) list.hidden = view !== "list";
  if (map) map.hidden = view !== "map";
  document.querySelectorAll("[data-cview]").forEach(function (b) {
    var on = b.getAttribute("data-cview") === view;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  if (view === "map") { renderMapIfNeeded(); syncMapHighlight(); }
  syncUrl();
}

// ===== 地址栏状态（可分享 / 刷新可还原）=====
function syncUrl() {
  var q = new URLSearchParams();
  if (CSTATE.country) q.set("c", CSTATE.country);
  if (CSTATE.mark) q.set("mark", CSTATE.mark);
  if (CSTATE.region) q.set("r", CSTATE.region);
  if (CSTATE.force) q.set("f", CSTATE.force);
  if (CSTATE.product) q.set("p", CSTATE.product);
  if (CSTATE.keyword.trim()) q.set("q", CSTATE.keyword.trim());
  if (CSTATE.view === "map") q.set("view", "map");
  var path = location.pathname + (q.toString() ? "?" + q.toString() : "") + (location.hash || "");
  try { history.replaceState(null, "", path); } catch (e) { /* file:// 忽略 */ }
}

// ===== 地图标记随筛选联动：命中的放大，未命中的变淡 =====
function markerStyle(c, on) {
  var col = REGION_COLOR[c.region] || "#98989d";
  return on
    ? { radius: 6, color: "#ffffff", weight: 1.5, fillColor: col, fillOpacity: 0.9 }
    : { radius: 3, color: "#ffffff", weight: 0.8, fillColor: col, fillOpacity: 0.18 };
}

function syncMapHighlight() {
  if (!window.certMarkers) return;
  window.certMarkers.forEach(function (item) {
    var on = !CSTATE.active || matches(item.entry);
    item.marker.setStyle(markerStyle(item.entry, on));
  });
}

// ===== 地图：默认使用站点内置的世界边界矢量底图（离线、无外部请求）=====
function mapPalette() {
  var dark = document.documentElement.dataset.theme === "dark";
  return dark ? { fill: "#2b2823", line: "rgba(232,228,218,.28)" }
              : { fill: "#eae6dc", line: "rgba(28,27,24,.18)" };
}

// 跨 180° 经线的多边形会被 Leaflet 画成横贯地图的色带，这里按经线切开
function splitRingAt180(ring) {
  var out = [], cur = [], prev = null;
  ring.forEach(function (p) {
    if (prev) {
      var d = p[0] - prev[0];
      if (Math.abs(d) > 180) {
        var edge = d > 0 ? -180 : 180;
        var t = (edge - prev[0]) / d;
        var lat = prev[1] + (p[1] - prev[1]) * t;
        cur.push([edge, lat]);
        out.push(cur);
        cur = [[-edge, lat]];
      }
    }
    cur.push(p);
    prev = p;
  });
  if (cur.length) out.push(cur);
  return out;
}

function offlineBaseGeo() {
  if (!window.WORLD_TOPO || typeof topojson === "undefined" ||
      !window.WORLD_TOPO.objects || !window.WORLD_TOPO.objects.countries) return null;
  var fc = topojson.feature(window.WORLD_TOPO, window.WORLD_TOPO.objects.countries);
  var features = [];
  (fc.features || []).forEach(function (f) {
    var g = f.geometry;
    if (!g) return;
    var polys = g.type === "Polygon" ? [g.coordinates] : (g.type === "MultiPolygon" ? g.coordinates : []);
    var outCoords = [];
    polys.forEach(function (poly) {
      var outer = poly && poly[0];
      if (!outer || outer.length < 4) return;
      splitRingAt180(outer).forEach(function (ring) {
        if (ring.length >= 4) outCoords.push([ring]);
      });
    });
    if (outCoords.length) features.push({ type: "Feature", properties: {}, geometry: { type: "MultiPolygon", coordinates: outCoords } });
  });
  return features.length ? { type: "FeatureCollection", features: features } : null;
}

function renderMapIfNeeded() {
  if (CSTATE.view !== "map") return;
  var box = document.getElementById("map");
  if (!box || typeof L === "undefined") return;

  if (!window.certMap) {
    window.certMap = L.map("map").setView([25, 12], 2);
    window.certVector = null;
    window.certTiles = null;

    // ① 离线矢量底图（内置 TopoJSON，无需联网）
    try {
      var base = offlineBaseGeo();
      if (base) {
        var pal = mapPalette();
        window.certVector = L.geoJSON(base, {
          interactive: false,
          style: function () { return { color: pal.line, weight: 0.7, fillColor: pal.fill, fillOpacity: 1 }; }
        }).addTo(window.certMap);
      }
    } catch (e) { window.certVector = null; }
    if (!window.certVector) { addCertTiles(); setMapNote("内置矢量底图不可用，已改用在线底图（OpenStreetMap，需联网）。"); }

    // ② 认证标记
    var count = 0;
    window.certMarkers = [];
    CERT_COUNTRIES.forEach(function (c) {
      var pos = COORDS[c.name];
      if (!pos || !c.mark) return;
      count++;
      var scope = (c.scope || "").slice(0, 80);
      var marker = L.circleMarker(pos, markerStyle(c, true))
        .addTo(window.certMap)
        .bindPopup("<b>" + esc(c.name) + '</b><br>标志：<span class="mark">' + esc(c.mark) + "</span><br>体系：" + esc(c.system) +
          "<br>机构：" + esc(c.regulator) + (scope ? "<br>" + esc(scope) + "…" : "") +
          '<br><button type="button" class="cert-detail-btn" data-cdetail="' + esc(c.name) + '">在列表中看详情 →</button>');
      window.certMarkers.push({ marker: marker, entry: c });
    });
    var mc = $("mapCount");
    if (mc) mc.textContent = "已标注 " + count + " 个市场的认证标志；底图为站点内置世界边界（离线可用）。筛选条件会同步到地图：命中的标记放大，其余变淡。";
  } else if (window.certMap.invalidateSize) {
    setTimeout(function () { window.certMap.invalidateSize(); }, 60);
  }
}

function setMapNote(text) {
  var n = $("mapNote");
  if (n) n.textContent = text;
}

function addCertTiles() {
  if (!window.certMap || window.certTiles) return;
  window.certTiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  window.certTiles.on("tileerror", function () {
    var n = $("mapNote");
    if (n && n.dataset.err !== "1") {
      n.dataset.err = "1";
      n.textContent = "在线底图（OpenStreetMap）部分图块加载失败：常见原因是网络 / 代理拦截了 tile.openstreetmap.org（表现为控制台 404 或超时）。站点内置的矢量底图与全部认证标记不受影响，可关闭在线底图继续使用。";
    }
  });
  window.certTiles.addTo(window.certMap);
}

function watchTheme() {
  if (!window.MutationObserver) return;
  new MutationObserver(function () {
    if (window.certVector) {
      var pal = mapPalette();
      window.certVector.setStyle(function () { return { color: pal.line, weight: 0.7, fillColor: pal.fill, fillOpacity: 1 }; });
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}

// ===== 事件 =====
[["cCountry", "country"], ["cMark", "mark"], ["cRegionSel", "region"], ["cProduct", "product"], ["cForce", "force"]].forEach(function (pair) {
  var el = $(pair[0]);
  if (!el) return;
  el.addEventListener("change", function () {
    CSTATE[pair[1]] = el.value;
    CSTATE.active = true;
    if (pair[1] === "country") CSTATE.detail = el.value || "";
    render();
  });
});

var kwEl = $("cKeyword");
if (kwEl) kwEl.addEventListener("input", function () {
  CSTATE.keyword = kwEl.value;
  if (kwEl.value.trim()) CSTATE.active = true;
  render();
});

var resetEl = $("cReset");
if (resetEl) resetEl.addEventListener("click", resetFilters);

var showAllEl = $("cShowAll");
if (showAllEl) showAllEl.addEventListener("click", function () { CSTATE.active = true; render(); });

document.querySelectorAll("[data-cview]").forEach(function (b) {
  b.addEventListener("click", function () { switchCView(b.getAttribute("data-cview")); });
});

var tilesBtn = $("mapTiles");
if (tilesBtn) tilesBtn.addEventListener("click", function () {
  if (window.certTiles) {
    window.certMap.removeLayer(window.certTiles);
    window.certTiles = null;
    tilesBtn.textContent = "🌐 叠加在线底图（OpenStreetMap）";
  } else {
    addCertTiles();
    tilesBtn.textContent = "🚫 关闭在线底图";
  }
});

document.addEventListener("click", function (e) {
  if (!e.target || !e.target.closest) return;
  var d = e.target.closest("[data-cdetail]");
  if (d) {
    CSTATE.detail = d.getAttribute("data-cdetail");
    CSTATE.active = true;
    if (CSTATE.view !== "list") switchCView("list");
    render();
    var det = $("cDetail");
    if (det && det.scrollIntoView) det.scrollIntoView({ block: "center", behavior: "smooth" });
    return;
  }
  if (e.target.closest("[data-cdetail-clear]")) {
    CSTATE.detail = "";
    render();
  }
});

// ===== 初始化 =====
if (document.getElementById("cCountry")) {
  buildFilters();
  watchTheme();

  // 地址栏状态还原（?c=国家&mark=&r=&p=&q=&view=map）；?c= 也是“全球市电合规数据库”的认证详情链接
  var q = new URLSearchParams(location.search);
  var qc = (q.get("c") || "").trim();
  var qm = (q.get("mark") || "").trim();
  var qr = (q.get("r") || "").trim();
  var qp = (q.get("p") || "").trim();
  var qf = (q.get("f") || "").trim();
  var qk = (q.get("q") || "").trim();

  if (qm) CSTATE.mark = qm;
  if (qr) CSTATE.region = qr;
  if (qp) CSTATE.product = qp;
  if (qf && FORCE_LABEL[qf]) CSTATE.force = qf;
  if (qk) CSTATE.keyword = qk;
  if (qc) {
    var name = decodeURIComponent(qc);
    var hit = CERT_COUNTRIES.filter(function (c) { return c.name === name; })[0] ||
      CERT_COUNTRIES.filter(function (c) { return c.name.indexOf(name) !== -1 || name.indexOf(c.name) !== -1; })[0];
    if (hit) { CSTATE.country = hit.name; CSTATE.detail = hit.name; }
    else if (!CSTATE.keyword) CSTATE.keyword = name;
  }
  var mSel = $("cMark"); if (mSel && CSTATE.mark) mSel.value = CSTATE.mark;
  var rSel = $("cRegionSel"); if (rSel && CSTATE.region) rSel.value = CSTATE.region;
  var pSel = $("cProduct"); if (pSel && CSTATE.product) pSel.value = CSTATE.product;
  var fSelEl = $("cForce"); if (fSelEl && CSTATE.force) fSelEl.value = CSTATE.force;
  var kEl = $("cKeyword"); if (kEl && CSTATE.keyword) kEl.value = CSTATE.keyword;
  var cs = $("cCountry"); if (cs && CSTATE.country) cs.value = CSTATE.country;

  if (CSTATE.country || CSTATE.mark || CSTATE.region || CSTATE.product || CSTATE.force || CSTATE.keyword.trim()) CSTATE.active = true;
  render();

  if (q.get("view") === "map" || location.hash === "#map") switchCView("map");
  window.addEventListener("hashchange", function () {
    if (location.hash === "#map") switchCView("map");
    else if (location.hash === "#country") switchCView("list");
  });
}
