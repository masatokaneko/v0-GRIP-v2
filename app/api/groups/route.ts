import { NextResponse } from "next/server"
import { partnerGroups } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (q) {
    const filteredGroups = partnerGroups.filter((group) => group.name.toLowerCase().includes(q.toLowerCase()))
    return NextResponse.json(filteredGroups)
  }

  return NextResponse.json(partnerGroups)
}
