"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Users,
  BarChart2,
  TrendingUp,
  PieChart,
  ChevronDown,
  Filter,
  Download,
  ChevronRight,
  BarChart,
  Network,
  MapIcon as HeatMap,
  LineChart,
  List,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { partnerGroups } from "@/lib/data"
import { AdminMenu, type AdminMenuItemId } from "@/components/admin-menu"
import { AdminContent } from "@/components/admin/admin-content"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlobalSearch } from "@/components/global-search"
import { AccountExecutives } from "@/components/account-executives"
import { OpportunityTable } from "@/components/opportunity-table"
import { TransactionHistory } from "@/components/transaction-history"
import { ExecutiveSummary } from "@/components/executive-summary"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// 取引概観のコンポーネントをインポート
import { ExSummary } from "@/components/transaction-overview/ex-summary"
import { TransactionFlow } from "@/components/transaction-overview/transaction-flow"
import { TransactionHeatmap } from "@/components/transaction-overview/transaction-heatmap"
import { TransactionTimeline } from "@/components/transaction-overview/transaction-timeline"
import { TransactionList } from "@/components/transaction-overview/transaction-list"
import { AccountOwner } from "@/components/account-owner"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedGroup: string
  setSelectedGroup: (group: string) => void
  selectedGroupId: string
  setSelectedGroupId: (groupId: string) => void
  activeSubTab?: string
  setActiveSubTab?: (tab: string) => void
}

export function Sidebar({
  activeTab,
  setActiveTab,
  selectedGroup,
  setSelectedGroup,
  selectedGroupId,
  setSelectedGroupId,
  activeSubTab,
  setActiveSubTab = () => {},
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGroups, setFilteredGroups] = useState(partnerGroups)
  const [showGroups, setShowGroups] = useState(false)
  const [activeAdminItem, setActiveAdminItem] = useState<AdminMenuItemId | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({
    transaction_overview: true,
  })

  useEffect(() => {
    if (searchTerm) {
      const filtered = partnerGroups.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredGroups(filtered)
      setShowGroups(true)
    } else {
      setFilteredGroups(partnerGroups)
      setShowGroups(false)
    }
  }, [searchTerm])

  const tabs = [
    { id: "transaction_overview", label: "取引概観", icon: BarChart, hasSubMenu: true },
    { id: "owners", label: "アカウントオーナー", icon: Users },
    { id: "executives", label: "エグゼクティブ", icon: Users },
    { id: "opportunities", label: "商談", icon: TrendingUp },
    { id: "transactions", label: "取引履歴", icon: BarChart2 },
    { id: "summary", label: "サマリー", icon: PieChart },
  ]

  // サブメニュー定義を追加
  const subMenus = {
    transaction_overview: [
      { id: "ex_summary", label: "Exサマリ", icon: PieChart },
      { id: "transaction_flow", label: "取引フロー可視化", icon: Network },
      { id: "transaction_heatmap", label: "会社間取引ヒートマップ", icon: HeatMap },
      { id: "transaction_timeline", label: "時系列取引推移グラフ", icon: LineChart },
      { id: "transaction_list", label: "主要取引一覧", icon: List },
    ],
  }

  const handleGroupSelect = (group: (typeof partnerGroups)[0]) => {
    setSelectedGroup(group.name)
    setSelectedGroupId(group.id)
    setSelectedIndustry(group.industry)
    setSearchTerm("")
    setShowGroups(false)
  }

  // 管理者メニュー項目が選択されたときの処理
  const handleAdminItemSelect = (itemId: AdminMenuItemId) => {
    setActiveAdminItem(itemId)
    // 管理者メニューが選択されたら、通常のタブを非選択状態にする
    setActiveTab("")
  }

  // 通常のタブが選択されたときの処理
  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId)
    // タブが選択されたときに、そのタブにサブメニューがあれば開く
    if (subMenus[tabId]) {
      setOpenSubMenus((prev) => ({ ...prev, [tabId]: true }))
    }
    // 通常のタブが選択されたら、管理者メニューを非選択状態にする
    setActiveAdminItem(null)
  }

  // メインコンテンツの表示
  const renderMainContent = () => {
    // 管理者メニュー項目が選択されている場合
    if (activeAdminItem) {
      return <AdminContent activeItem={activeAdminItem} />
    }

    // 取引概観タブが選択されている場合
    if (activeTab === "transaction_overview") {
      switch (activeSubTab) {
        case "ex_summary":
          return <ExSummary selectedGroupId={selectedGroupId} />
        case "transaction_flow":
          return <TransactionFlow selectedGroupId={selectedGroupId} />
        case "transaction_heatmap":
          return <TransactionHeatmap selectedGroupId={selectedGroupId} />
        case "transaction_timeline":
          return <TransactionTimeline selectedGroupId={selectedGroupId} />
        case "transaction_list":
          return <TransactionList selectedGroupId={selectedGroupId} />
        default:
          return <ExSummary selectedGroupId={selectedGroupId} />
      }
    }

    // 通常のタブが選択されている場合
    switch (activeTab) {
      case "owners":
        return <AccountOwner selectedGroupId={selectedGroupId} />
      case "executives":
        return <AccountExecutives selectedGroupId={selectedGroupId} />
      case "opportunities":
        return <OpportunityTable selectedGroupId={selectedGroupId} />
      case "transactions":
        return <TransactionHistory selectedGroupId={selectedGroupId} />
      case "summary":
        return <ExecutiveSummary selectedGroupId={selectedGroupId} />
      default:
        return <AccountOwner selectedGroupId={selectedGroupId} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-[280px] h-screen bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 rounded-md bg-[#002B5B] flex items-center justify-center text-white font-bold">
              RI
            </div>
            <span className="font-semibold text-lg">Relationship Intel</span>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              className="w-full pl-9 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002B5B] focus:border-transparent"
              placeholder="クライアントグループを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {showGroups && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleGroupSelect(group)}
                    >
                      <div className="font-medium">{group.name}</div>
                      <div className="text-xs text-gray-500">{group.industry}</div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">結果が見つかりません</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="font-medium">{selectedGroup}</div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id && !activeAdminItem
              const hasSubMenu = tab.hasSubMenu

              if (hasSubMenu) {
                return (
                  <Collapsible
                    key={tab.id}
                    open={openSubMenus[tab.id]}
                    onOpenChange={(open) => {
                      setOpenSubMenus((prev) => ({ ...prev, [tab.id]: open }))
                    }}
                  >
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center justify-start flex-1 p-2 text-sm font-medium rounded-lg",
                          isActive ? "bg-blue-50 text-[#002B5B]" : "text-gray-600 hover:bg-gray-100",
                        )}
                        onClick={() => {
                          handleTabSelect(tab.id)
                          // タブをクリックしたときにサブメニューを開く
                          setOpenSubMenus((prev) => ({ ...prev, [tab.id]: !prev[tab.id] }))
                        }}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{tab.label}</span>
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation() // 親要素へのイベント伝播を防止
                            setOpenSubMenus((prev) => ({ ...prev, [tab.id]: !prev[tab.id] }))
                          }}
                        >
                          <ChevronRight
                            className={cn("h-4 w-4 transition-transform", openSubMenus[tab.id] && "rotate-90")}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <div className="pl-4 mt-1 space-y-1">
                        {subMenus[tab.id]?.map((subItem) => {
                          const SubIcon = subItem.icon
                          const isSubActive = activeSubTab === subItem.id
                          return (
                            <Button
                              key={subItem.id}
                              variant="ghost"
                              className={cn(
                                "flex items-center justify-start w-full p-2 text-sm font-medium rounded-lg",
                                isSubActive ? "bg-blue-50 text-[#002B5B]" : "text-gray-600 hover:bg-gray-100",
                              )}
                              onClick={() => {
                                handleTabSelect(tab.id)
                                setActiveSubTab(subItem.id)
                              }}
                            >
                              <SubIcon className="w-4 h-4 mr-3" />
                              <span>{subItem.label}</span>
                            </Button>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={cn(
                    "flex items-center justify-start w-full p-2 text-sm font-medium rounded-lg",
                    isActive ? "bg-blue-50 text-[#002B5B]" : "text-gray-600 hover:bg-gray-100",
                  )}
                  onClick={() => handleTabSelect(tab.id)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{tab.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* 管理者メニューを追加 */}
          <AdminMenu activeItem={activeAdminItem} onSelectItem={handleAdminItemSelect} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#002B5B] flex items-center justify-center text-white font-bold">
              佐
            </div>
            <div>
              <div className="text-sm font-medium">佐藤 一郎</div>
              <div className="text-xs text-gray-500">取締役副社長</div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{activeAdminItem ? "管理者メニュー" : selectedGroup}</h1>
            <p className="text-gray-500">{activeAdminItem ? "システム管理設定" : selectedIndustry}</p>
          </div>

          {!activeAdminItem && (
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <GlobalSearch />

              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="フィルター" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="active">アクティブのみ</SelectItem>
                    <SelectItem value="inactive">非アクティブのみ</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">フィルター</span>
                </Button>

                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">エクスポート</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* メインコンテンツを表示 */}
        {renderMainContent()}
      </main>
    </div>
  )
}
