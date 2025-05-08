import { NextResponse } from "next/server"
import { transactions, partnerCompanies, ourCompanies } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  const groupId = params.groupId

  // Get all companies in this group
  const groupCompanyIds = partnerCompanies
    .filter((company) => company.group_id === groupId)
    .map((company) => company.id)

  // Filter transactions by these company IDs
  const groupTransactions = transactions.filter((tx) => groupCompanyIds.includes(tx.partner_company_id))

  if (groupTransactions.length === 0) {
    return NextResponse.json({ error: "No transactions found for this group" }, { status: 404 })
  }

  // Enrich transaction data with company information
  const enrichedTransactions = groupTransactions.map((tx) => {
    const partnerCompany = partnerCompanies.find((company) => company.id === tx.partner_company_id)
    const ourCompany = ourCompanies.find((company) => company.id === tx.our_company_id)

    return {
      ...tx,
      partnerCompany,
      ourCompany,
    }
  })

  return NextResponse.json(enrichedTransactions)
}
