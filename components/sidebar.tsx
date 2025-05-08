"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, BarChart2, TrendingUp, PieChart, ChevronDown, Filter, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { partnerGroups } from "@/lib/data"
import { AdminMenu, type AdminMenuItemId } from "@/components/admin-menu"
import { AdminContent } from "@/components/admin/admin-content"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlobalSearch } from "@/components/global-search"
import { OwnerHierarchy } from "@/components/owner-hierarchy"
import { AccountExecutives } from "@/components/account-executives"
import { OpportunityTable } from "@/components/opportunity-table"
import { TransactionHistory } from "@/components/transaction-history"
import { ExecutiveSummary } from "@/components/executive-summary"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedGroup: string
  setSelectedGroup: (group: string) => void
  selectedGroupId: string
  setSelectedGroupId: (groupId: string) => void
}

export function Sidebar({
  activeTab,
  setActiveTab,
  selectedGroup,
  setSelectedGroup,
  selectedGroupId,
  setSelectedGroupId,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGroups, setFilteredGroups] = useState(partnerGroups)
  const [showGroups, setShowGroups] = useState(false)
  const [activeAdminItem, setActiveAdminItem] = useState<AdminMenuItemId | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState("")

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
    { id: "owners", label: "オーナー", icon: Users },
    { id: "executives", label: "エグゼクティブ", icon: Users },
    { id: "opportunities", label: "商談", icon: TrendingUp },
    { id: "transactions", label: "取引履歴", icon: BarChart2 },
    { id: "summary", label: "サマリー", icon: PieChart },
  ]

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
    // 通常のタブが選択されたら、管理者メニューを非選択状態にする
    setActiveAdminItem(null)
  }

  // メインコンテンツの表示
  const renderMainContent = () => {
    // 管理者メニュー項目が選択されている場合
    if (activeAdminItem) {
      return <AdminContent activeItem={activeAdminItem} />
    }

    // 通常のタブが選択されている場合
    switch (activeTab) {
      case "owners":
        return <OwnerHierarchy selectedGroupId={selectedGroupId} />
      case "executives":
        return <AccountExecutives selectedGroupId={selectedGroupId} />
      case "opportunities":
        return <OpportunityTable selectedGroupId={selectedGroupId} />
      case "transactions":
        return <TransactionHistory selectedGroupId={selectedGroupId} />
      case "summary":
        return <ExecutiveSummary selectedGroupId={selectedGroupId} />
      default:
        return <OwnerHierarchy selectedGroupId={selectedGroupId} />
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
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={cn(
                    "flex items-center justify-start w-full p-2 text-sm font-medium rounded-lg",
                    activeTab === tab.id && !activeAdminItem
                      ? "bg-blue-50 text-[#002B5B]"
                      : "text-gray-600 hover:bg-gray-100",
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
