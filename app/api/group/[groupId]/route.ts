import { NextResponse } from "next/server"
import { partnerGroups, partnerCompanies } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { groupId: string } }) {
  const groupId = params.groupId

  const group = partnerGroups.find((g) => g.id === groupId)

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 })
  }

  const companies = partnerCompanies.filter((company) => company.group_id === groupId)

  return NextResponse.json({
    ...group,
    companies,
  })
}
