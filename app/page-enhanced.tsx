"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { OwnerHierarchy } from "@/components/owner-hierarchy"
import { AccountExecutives } from "@/components/account-executives"
import { OpportunityTableEnhanced } from "@/components/opportunity-table-enhanced"
import { TransactionHistoryEnhanced } from "@/components/transaction-history-enhanced"
import { ExecutiveSummary } from "@/components/executive-summary"
import { GlobalSearch } from "@/components/global-search"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("owners")
  const [selectedGroup, setSelectedGroup] = useState("日立グループ")
  const [selectedIndustry, setSelectedIndustry] = useState("製造業・電子機器")

  // Function to render the active content based on the selected tab
  const renderActiveContent = () => {
    switch (activeTab) {
      case "owners":
        return <OwnerHierarchy />
      case "executives":
        return <AccountExecutives />
      case "opportunities":
        return <OpportunityTableEnhanced />
      case "transactions":
        return <TransactionHistoryEnhanced />
      case "summary":
        return <ExecutiveSummary />
      default:
        return <OwnerHierarchy />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedGroup}</h1>
            <p className="text-gray-500">{selectedIndustry}</p>
          </div>

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
        </div>

        {/* Render the active content based on the selected tab */}
        {renderActiveContent()}
      </main>
    </div>
  )
}
