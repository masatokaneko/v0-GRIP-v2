import { NextResponse } from "next/server"
import { owners, ourCompanies, partnerCompanies } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  const groupId = params.groupId

  const groupOwners = owners.filter((owner) => owner.group_id === groupId)

  if (groupOwners.length === 0) {
    return NextResponse.json({ error: "No owners found for this group" }, { status: 404 })
  }

  // Enrich owner data with company information
  const enrichedOwners = groupOwners.map((owner) => {
    const ourCompany = ourCompanies.find((company) => company.id === owner.our_company_id)
    const partnerCompany = owner.partner_company_id
      ? partnerCompanies.find((company) => company.id === owner.partner_company_id)
      : null

    return {
      ...owner,
      ourCompany,
      partnerCompany,
    }
  })

  return NextResponse.json(enrichedOwners)
}
