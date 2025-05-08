"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, BarChart2, TrendingUp, PieChart, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { partnerGroups } from "@/lib/data"

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
    setSearchTerm("")
    setShowGroups(false)
  }

  return (
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
            placeholder="パートナーグループを検索..."
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

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "flex items-center justify-start w-full p-2 text-sm font-medium rounded-lg",
                activeTab === tab.id ? "bg-blue-50 text-[#002B5B]" : "text-gray-600 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{tab.label}</span>
            </Button>
          )
        })}
      </nav>

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
  )
}
