// 企業情報の型定義
export interface Company {
  id: string
  name: string
  code?: string
  industry?: string
  foundedYear?: number
  notes?: string
}

// 資本関係の型定義
export interface CapitalRelation {
  id: string
  parentId: string // 親企業（出資する企業）のID
  childId: string // 子企業（出資される企業）のID
  ownershipPercentage: number // 持株比率（%）
  startDate?: string // 資本関係開始日
}

// ダミーデータ - 企業情報
export const companies: Company[] = [
  // 日立グループ
  {
    id: "1",
    name: "株式会社日立製作所",
    code: "6501",
    industry: "総合電機",
    foundedYear: 1910,
    notes: "日立グループの親会社",
  },
  {
    id: "2",
    name: "株式会社日立システムズ",
    code: "HS001",
    industry: "ITサービス",
    foundedYear: 1962,
    notes: "日立の完全子会社",
  },
  {
    id: "3",
    name: "日立Astemo株式会社",
    code: "HA001",
    industry: "自動車部品",
    foundedYear: 2021,
    notes: "日立とホンダの合弁会社",
  },
  {
    id: "4",
    name: "日立ハイテク株式会社",
    code: "8036",
    industry: "電子機器",
    foundedYear: 1947,
    notes: "2020年に完全子会社化",
  },
  {
    id: "5",
    name: "日立建機株式会社",
    code: "6305",
    industry: "建設機械",
    foundedYear: 1970,
    notes: "2022年に過半数を売却",
  },
  {
    id: "6",
    name: "株式会社日立製作所 鉄道ビジネスユニット",
    code: "HR001",
    industry: "鉄道システム",
    foundedYear: 1920,
    notes: "内部事業ユニット",
  },

  // 富士通グループ
  {
    id: "7",
    name: "富士通株式会社",
    code: "6702",
    industry: "情報通信",
    foundedYear: 1935,
    notes: "富士通グループの親会社",
  },
  {
    id: "8",
    name: "富士通Japan株式会社",
    code: "FJ001",
    industry: "ITサービス",
    foundedYear: 2020,
    notes: "富士通の完全子会社",
  },
  {
    id: "9",
    name: "富士通ネットワークソリューションズ株式会社",
    code: "FN001",
    industry: "ネットワーク",
    foundedYear: 1991,
    notes: "富士通の完全子会社",
  },
  {
    id: "10",
    name: "富士通クライアントコンピューティング株式会社",
    code: "FC001",
    industry: "PC製造",
    foundedYear: 2016,
    notes: "レノボが49%を保有",
  },
  {
    id: "11",
    name: "富士通フロンテック株式会社",
    code: "6945",
    industry: "電子機器",
    foundedYear: 1940,
    notes: "上場子会社",
  },
  {
    id: "12",
    name: "株式会社富士通研究所",
    code: "FR001",
    industry: "研究開発",
    foundedYear: 1968,
    notes: "富士通の完全子会社",
  },
]

// ダミーデータ - 資本関係
export const capitalRelations: CapitalRelation[] = [
  // 日立グループの資本関係
  { id: "1", parentId: "1", childId: "2", ownershipPercentage: 100, startDate: "1962-04-01" },
  { id: "2", parentId: "1", childId: "3", ownershipPercentage: 66.6, startDate: "2021-01-01" },
  { id: "3", parentId: "1", childId: "4", ownershipPercentage: 100, startDate: "2020-05-20" },
  { id: "4", parentId: "1", childId: "5", ownershipPercentage: 26, startDate: "1970-10-01" },
  { id: "5", parentId: "1", childId: "6", ownershipPercentage: 100, startDate: "1920-04-01" },

  // 富士通グループの資本関係
  { id: "6", parentId: "7", childId: "8", ownershipPercentage: 100, startDate: "2020-10-01" },
  { id: "7", parentId: "7", childId: "9", ownershipPercentage: 100, startDate: "1991-06-24" },
  { id: "8", parentId: "7", childId: "10", ownershipPercentage: 51, startDate: "2016-02-01" },
  { id: "9", parentId: "7", childId: "11", ownershipPercentage: 53.9, startDate: "1940-11-09" },
  { id: "10", parentId: "7", childId: "12", ownershipPercentage: 100, startDate: "1968-12-09" },
]

// 企業IDから企業情報を取得する関数
export function getCompanyById(id: string): Company | undefined {
  return companies.find((company) => company.id === id)
}

// 親企業IDから子企業の資本関係を取得する関数
export function getChildRelations(parentId: string): CapitalRelation[] {
  return capitalRelations.filter((relation) => relation.parentId === parentId)
}

// 子企業IDから親企業の資本関係を取得する関数
export function getParentRelations(childId: string): CapitalRelation[] {
  return capitalRelations.filter((relation) => relation.childId === childId)
}

// 新しい企業IDを生成する関数
export function generateCompanyId(): string {
  return (companies.length + 1).toString()
}

// 新しい資本関係IDを生成する関数
export function generateRelationId(): string {
  return (capitalRelations.length + 1).toString()
}
