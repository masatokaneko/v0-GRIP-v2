"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart } from "@/components/charts"
import { transactions, opportunities, partnerCompanies } from "@/lib/data"

interface ExecutiveSummaryProps {
  selectedGroupId: string
}

export function ExecutiveSummary({ selectedGroupId }: ExecutiveSummaryProps) {
  const [summaryData, setSummaryData] = useState<any>({
    totalSales: 0,
    yoyChange: 0,
    activeOpportunities: 0,
    totalOpportunityValue: 0,
    opportunitiesByStage: {
      early: 0,
      mid: 0,
      late: 0,
    },
    salesByYear: {},
  })

  useEffect(() => {
    // 選択されたグループに属する企業のIDを取得
    const groupCompanyIds = partnerCompanies
      .filter((company) => company.group_id === selectedGroupId)
      .map((company) => company.id)

    // グループ企業に関連する取引をフィルタリング
    const groupTransactions = transactions.filter((tx) => groupCompanyIds.includes(tx.partner_company_id))

    // グループ企業に関連する商談をフィルタリング
    const groupOpportunities = opportunities.filter((opp) => groupCompanyIds.includes(opp.partner_company_id))

    // サマリーデータを計算
    const currentYearTransactions = groupTransactions.filter((tx) => tx.fy === "2024")
    const previousYearTransactions = groupTransactions.filter((tx) => tx.fy === "2023")

    const totalSalesCurrent = currentYearTransactions.reduce((sum, tx) => sum + tx.sales_oku, 0)
    const totalSalesPrevious = previousYearTransactions.reduce((sum, tx) => sum + tx.sales_oku, 0)

    const yoyChange =
      previousYearTransactions.length > 0 ? ((totalSalesCurrent - totalSalesPrevious) / totalSalesPrevious) * 100 : 0

    const activeOpportunities = groupOpportunities.length
    const totalOpportunityValue = groupOpportunities.reduce((sum, opp) => sum + opp.amount_oku, 0)

    // Group opportunities by stage
    const opportunitiesByStage = {
      early: groupOpportunities.filter((opp) => opp.stage_pct <= 30).length,
      mid: groupOpportunities.filter((opp) => opp.stage_pct > 30 && opp.stage_pct <= 60).length,
      late: groupOpportunities.filter((opp) => opp.stage_pct > 60).length,
    }

    // Calculate opportunity values by stage
    const opportunityValueByStage = {
      early: groupOpportunities.filter((opp) => opp.stage_pct <= 30).reduce((sum, opp) => sum + opp.amount_oku, 0),
      mid: groupOpportunities
        .filter((opp) => opp.stage_pct > 30 && opp.stage_pct <= 60)
        .reduce((sum, opp) => sum + opp.amount_oku, 0),
      late: groupOpportunities.filter((opp) => opp.stage_pct > 60).reduce((sum, opp) => sum + opp.amount_oku, 0),
    }

    // Group transactions by fiscal year and our company
    const salesByYear: Record<string, Record<string, number>> = {}

    groupTransactions.forEach((tx) => {
      if (!salesByYear[tx.fy]) {
        salesByYear[tx.fy] = {}
      }

      if (!salesByYear[tx.fy][tx.our_company_id]) {
        salesByYear[tx.fy][tx.our_company_id] = 0
      }

      salesByYear[tx.fy][tx.our_company_id] += tx.sales_oku
    })

    setSummaryData({
      totalSales: totalSalesCurrent,
      yoyChange,
      activeOpportunities,
      totalOpportunityValue,
      opportunitiesByStage,
      opportunityValueByStage,
      salesByYear,
    })
  }, [selectedGroupId])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sales History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>過去の売上 (億円)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <BarChart data={summaryData.salesByYear} />
        </CardContent>
      </Card>

      {/* Pipeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>商談パイプライン</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <PieChart data={summaryData.opportunityValueByStage} />
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>主要関係指標</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">総売上 (FY2024)</div>
              <div className="text-2xl font-bold mt-1">{summaryData.totalSales.toFixed(1)}億円</div>
              <div className={`text-xs ${summaryData.yoyChange >= 0 ? "text-green-600" : "text-red-600"} mt-1`}>
                {summaryData.yoyChange >= 0 ? "+" : ""}
                {summaryData.yoyChange.toFixed(1)}% vs FY2023
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">アクティブな商談</div>
              <div className="text-2xl font-bold mt-1">{summaryData.activeOpportunities}</div>
              <div className="text-xs text-blue-600 mt-1">
                {summaryData.totalOpportunityValue.toFixed(1)}億円の商談価値
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">商談ステージ分布</div>
              <div className="text-2xl font-bold mt-1">
                {summaryData.opportunitiesByStage.early}/{summaryData.opportunitiesByStage.mid}/
                {summaryData.opportunitiesByStage.late}
              </div>
              <div className="text-xs text-gray-500 mt-1">初期/中間/最終段階</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
