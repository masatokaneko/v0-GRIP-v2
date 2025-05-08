"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, BarChart2, TrendingUp, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "owners", label: "オーナー", icon: Users },
    { id: "executives", label: "エグゼクティブ", icon: Users },
    { id: "opportunities", label: "商談", icon: TrendingUp },
    { id: "transactions", label: "取引履歴", icon: BarChart2 },
    { id: "summary", label: "サマリー", icon: PieChart },
  ]

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
          />
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
