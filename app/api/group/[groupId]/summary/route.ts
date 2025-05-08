import { NextResponse } from "next/server"
import { transactions, opportunities, partnerCompanies } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  const groupId = params.groupId

  // Get all companies in this group
  const groupCompanyIds = partnerCompanies
    .filter((company) => company.group_id === groupId)
    .map((company) => company.id)

  // Filter transactions by these company IDs
  const groupTransactions = transactions.filter((tx) => groupCompanyIds.includes(tx.partner_company_id))

  // Filter opportunities by these company IDs
  const groupOpportunities = opportunities.filter((opp) => groupCompanyIds.includes(opp.partner_company_id))

  // Calculate summary metrics
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
    early: groupOpportunities.filter((opp) => opp.stage_pct <= 30),
    mid: groupOpportunities.filter((opp) => opp.stage_pct > 30 && opp.stage_pct <= 60),
    late: groupOpportunities.filter((opp) => opp.stage_pct > 60),
  }

  // Calculate opportunity values by stage
  const opportunityValueByStage = {
    early: opportunitiesByStage.early.reduce((sum, opp) => sum + opp.amount_oku, 0),
    mid: opportunitiesByStage.mid.reduce((sum, opp) => sum + opp.amount_oku, 0),
    late: opportunitiesByStage.late.reduce((sum, opp) => sum + opp.amount_oku, 0),
  }

  // Group transactions by fiscal year and our company
  const salesByYear = {}

  groupTransactions.forEach((tx) => {
    if (!salesByYear[tx.fy]) {
      salesByYear[tx.fy] = {}
    }

    if (!salesByYear[tx.fy][tx.our_company_id]) {
      salesByYear[tx.fy][tx.our_company_id] = 0
    }

    salesByYear[tx.fy][tx.our_company_id] += tx.sales_oku
  })

  return NextResponse.json({
    totalSales: totalSalesCurrent,
    yoyChange,
    activeOpportunities,
    totalOpportunityValue,
    opportunitiesByStage: {
      count: opportunitiesByStage,
      value: opportunityValueByStage,
    },
    salesByYear,
  })
}
