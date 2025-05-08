"use client"

import { useEffect, useState } from "react"
import { owners, getCompanyById } from "@/lib/data"

interface OwnerHierarchyProps {
  selectedGroupId: string
}

export function OwnerHierarchy({ selectedGroupId }: OwnerHierarchyProps) {
  const [groupOwners, setGroupOwners] = useState<any[]>([])

  useEffect(() => {
    // 選択されたグループIDに基づいてオーナーをフィルタリング
    const filteredOwners = owners.filter((owner) => owner.group_id === selectedGroupId)

    // オーナーレベルでソート (lead -> group -> company)
    const sortedOwners = [...filteredOwners].sort((a, b) => {
      const levelOrder = { lead: 0, group: 1, company: 2 }
      return levelOrder[a.owner_level as keyof typeof levelOrder] - levelOrder[b.owner_level as keyof typeof levelOrder]
    })

    setGroupOwners(sortedOwners)
  }, [selectedGroupId])

  if (groupOwners.length === 0) {
    return (
      <div className="rounded-2xl shadow bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">オーナーシップ構造</h2>
        <div className="text-center py-8 text-gray-500">このグループのオーナーシップデータがありません</div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl shadow bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">オーナーシップ構造</h2>
      <div className="space-y-3">
        {groupOwners.map((owner) => {
          const ourCompany = getCompanyById(owner.our_company_id)
          const partnerCompany = owner.partner_company_id ? getCompanyById(owner.partner_company_id) : null

          // オーナーレベルに基づいてマージンを設定
          const marginClass = owner.owner_level === "lead" ? "" : owner.owner_level === "group" ? "ml-4" : "ml-8"

          // オーナーレベルに基づいて色を設定
          let colorStyle = {}
          if (owner.owner_level === "lead") {
            colorStyle = { backgroundColor: "#002B5B" }
          } else if (owner.owner_level === "group") {
            colorStyle = { backgroundColor: ourCompany?.color_hex || "#F97316" }
          } else if (owner.owner_level === "company") {
            colorStyle = {
              background: `linear-gradient(135deg, ${ourCompany?.color_hex || "#F97316"}, ${partnerCompany?.color_hex || "#1E40AF"})`,
            }
          }

          return (
            <div key={owner.id} className={`p-3 rounded-lg border border-gray-200 flex items-center ${marginClass}`}>
              <div className="w-2 h-10 rounded mr-3" style={colorStyle}></div>
              <div>
                <div className="font-medium">{owner.user}</div>
                <div className="text-sm text-gray-500">
                  {owner.owner_level === "lead" && "リードオーナー"}
                  {owner.owner_level === "group" && "グループオーナー"}
                  {owner.owner_level === "company" && "カンパニーオーナー"}
                  {" • "}
                  {ourCompany?.name}
                  {owner.partner_company_id && ` ↔ ${partnerCompany?.name}`}
                  {" • "}
                  {owner.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
