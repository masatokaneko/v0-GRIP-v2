"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyList } from "./company-list"
import { CapitalRelations } from "./capital-relations"
import { OrganizationChart } from "./organization-chart"

export function CompanyManagement() {
  const [activeTab, setActiveTab] = useState("companies")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">企業管理</h1>
        <p className="text-gray-500 mt-1">企業情報と資本関係の管理、組織図の表示を行います。</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="companies">企業一覧</TabsTrigger>
          <TabsTrigger value="relations">資本関係管理</TabsTrigger>
          <TabsTrigger value="chart">組織図表示</TabsTrigger>
        </TabsList>
        <TabsContent value="companies">
          <CompanyList />
        </TabsContent>
        <TabsContent value="relations">
          <CapitalRelations />
        </TabsContent>
        <TabsContent value="chart">
          <OrganizationChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
