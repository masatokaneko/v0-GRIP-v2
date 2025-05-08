// 自社企業データ
export const ourCompanies = [
  { id: "MC001", name: "三菱商事", color_hex: "#EF4444", is_parent: true },
  { id: "MC002", name: "メタルワン", color_hex: "#F97316", is_parent: false },
]

// パートナーグループデータ
export const partnerGroups = [
  {
    id: "HTG001",
    name: "日立グループ",
    industry: "製造業・電子機器",
    companies: ["HT001", "HT002", "HT003", "HT004", "HT005", "HT006"],
  },
]

// パートナー企業データ
export const partnerCompanies = [
  { id: "HT001", name: "日立製作所", color_hex: "#1E40AF", group_id: "HTG001", is_parent: true },
  { id: "HT002", name: "日立建機", color_hex: "#3B82F6", group_id: "HTG001", is_parent: false },
  { id: "HT003", name: "日立金属", color_hex: "#8B5CF6", group_id: "HTG001", is_parent: false },
  { id: "HT004", name: "日立化成", color_hex: "#EC4899", group_id: "HTG001", is_parent: false },
  { id: "HT005", name: "日立ハイテク", color_hex: "#06B6D4", group_id: "HTG001", is_parent: false },
  { id: "HT006", name: "日立物流", color_hex: "#14B8A6", group_id: "HTG001", is_parent: false },
]

// オーナーシップデータ
export const owners = [
  {
    id: "OW001",
    owner_level: "lead",
    group_id: "HTG001",
    our_company_id: "MC001",
    partner_company_id: null,
    user: "佐藤 一郎",
    title: "取締役副社長",
    phone: "03-1234-5678",
    email: "ichiro.sato@example.com",
  },
  {
    id: "OW002",
    owner_level: "group",
    group_id: "HTG001",
    our_company_id: "MC002",
    partner_company_id: null,
    user: "田中 次郎",
    title: "営業本部長",
    phone: "03-2345-6789",
    email: "jiro.tanaka@example.com",
  },
  {
    id: "OW003",
    owner_level: "company",
    group_id: "HTG001",
    our_company_id: "MC002",
    partner_company_id: "HT001",
    user: "渡辺 六郎",
    title: "アカウントマネージャー",
    phone: "03-3456-7890",
    email: "rokuro.watanabe@example.com",
  },
]

// 商談データ
export const opportunities = [
  {
    id: "OPP001",
    partner_company_id: "HT001",
    our_company_id: "MC001",
    name: "グローバルサプライチェーン構築",
    stage_pct: 75,
    amount_oku: 12.5,
    close_date: "2025-06-30",
  },
  {
    id: "OPP002",
    partner_company_id: "HT001",
    our_company_id: "MC001",
    name: "AI駆動型予測保守システム",
    stage_pct: 50,
    amount_oku: 8.3,
    close_date: "2025-08-15",
  },
]

// アカウントエグゼクティブデータ
export const accountExecutives = [
  {
    id: "AE001",
    partner_company_id: "HT001",
    name: "日立 太郎",
    title: "執行役員",
    phone: "03-1111-1111",
    email: "taro.hitachi@example.com",
    color_hex: "#1E40AF",
  },
  {
    id: "AE002",
    partner_company_id: "HT001",
    name: "日立 花子",
    title: "営業部長",
    phone: "03-2222-2222",
    email: "hanako.hitachi@example.com",
    color_hex: "#1E40AF",
  },
]

// コンタクト履歴データ
export const contactHistory = [
  {
    id: "CH001",
    exec_id: "AE001",
    our_company_id: "MC001",
    our_user: "佐藤 一郎",
    date: "2025-04-15",
    purpose: "年間契約更新の打ち合わせ",
  },
  {
    id: "CH002",
    exec_id: "AE001",
    our_company_id: "MC002",
    our_user: "田中 次郎",
    date: "2025-03-22",
    purpose: "新規プロジェクト提案",
  },
]

// 取引データ
export const transactions = [
  {
    id: "TX001",
    partner_company_id: "HT001",
    our_company_id: "MC001",
    fy: "2024",
    sales_oku: 14.2,
    cost_oku: 11.8,
    summary: "システム連携プロジェクト",
  },
  {
    id: "TX002",
    partner_company_id: "HT001",
    our_company_id: "MC001",
    fy: "2023",
    sales_oku: 12.8,
    cost_oku: 10.5,
    summary: "デジタルトランスフォーメーション支援",
  },
]
