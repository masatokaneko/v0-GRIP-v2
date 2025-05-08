import { NextResponse } from "next/server"
import { opportunities, partnerCompanies, ourCompanies } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  const groupId = params.groupId

  // Get all companies in this group
  const groupCompanyIds = partnerCompanies
    .filter((company) => company.group_id === groupId)
    .map((company) => company.id)

  // Filter opportunities by these company IDs
  const groupOpportunities = opportunities.filter((opp) => groupCompanyIds.includes(opp.partner_company_id))

  if (groupOpportunities.length === 0) {
    return NextResponse.json({ error: "No opportunities found for this group" }, { status: 404 })
  }

  // Enrich opportunity data with company information
  const enrichedOpportunities = groupOpportunities.map((opp) => {
    const partnerCompany = partnerCompanies.find((company) => company.id === opp.partner_company_id)
    const ourCompany = ourCompanies.find((company) => company.id === opp.our_company_id)

    return {
      ...opp,
      partnerCompany,
      ourCompany,
    }
  })

  return NextResponse.json(enrichedOpportunities)
}
