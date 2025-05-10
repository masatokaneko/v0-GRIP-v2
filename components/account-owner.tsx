"use client"

import { useEffect, useState } from "react"
import { owners, getCompanyById } from "@/lib/data"
import { ChevronDown, ChevronRight, User, Users } from "lucide-react"

interface AccountOwnerProps {
  selectedGroupId: string
}

export function AccountOwner({ selectedGroupId }: AccountOwnerProps) {
  const [groupedOwners, setGroupedOwners] = useState<Record<string, Record<string, any[]>>>({})
  const [partnerCompanyIds, setPartnerCompanyIds] = useState<string[]>([])
  const [expandedCompanies, setExpandedCompanies] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // 選択されたグループIDに基づいてオーナーをフィルタリング
    const filteredOwners = owners.filter((owner) => owner.group_id === selectedGroupId)

    // パートナー企業ごと、当社グループの会社ごとにオーナーをグループ化
    const ownersByPartnerAndOurCompany: Record<string, Record<string, any[]>> = {}

    // このグループに関連するパートナー企業のIDを収集
    const partnerIds: string[] = []

    filteredOwners.forEach((owner) => {
      if (owner.partner_company_id) {
        if (!ownersByPartnerAndOurCompany[owner.partner_company_id]) {
          ownersByPartnerAndOurCompany[owner.partner_company_id] = {}
          partnerIds.push(owner.partner_company_id)
        }

        if (!ownersByPartnerAndOurCompany[owner.partner_company_id][owner.our_company_id]) {
          ownersByPartnerAndOurCompany[owner.partner_company_id][owner.our_company_id] = []
        }

        ownersByPartnerAndOurCompany[owner.partner_company_id][owner.our_company_id].push(owner)
      }
    })

    // 各会社のオーナーを役割タイプでソート（メイン担当者が先）
    Object.keys(ownersByPartnerAndOurCompany).forEach((partnerId) => {
      Object.keys(ownersByPartnerAndOurCompany[partnerId]).forEach((ourCompanyId) => {
        ownersByPartnerAndOurCompany[partnerId][ourCompanyId].sort((a, b) => {
          if (a.is_primary && !b.is_primary) return -1
          if (!a.is_primary && b.is_primary) return 1
          return 0
        })
      })
    })

    setGroupedOwners(ownersByPartnerAndOurCompany)
    setPartnerCompanyIds([...new Set(partnerIds)])

    // 初期状態ですべての会社を展開
    const initialExpandedState: Record<string, boolean> = {}
    partnerIds.forEach((id) => {
      initialExpandedState[id] = true
    })
    setExpandedCompanies(initialExpandedState)
  }, [selectedGroupId])

  const toggleCompanyExpanded = (companyId: string) => {
    setExpandedCompanies((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }))
  }

  if (Object.keys(groupedOwners).length === 0) {
    return (
      <div className="rounded-2xl shadow bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">アカウントオーナー</h2>
        <div className="text-center py-8 text-gray-500">このグループのアカウントオーナーデータがありません</div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl shadow bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">アカウントオーナー</h2>
      <div className="space-y-6">
        {partnerCompanyIds.map((partnerId) => {
          const partnerCompany = getCompanyById(partnerId)
          if (!partnerCompany) return null

          return (
            <div key={partnerId} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* クライアント会社名のヘッダー */}
              <div
                className="p-3 font-medium text-white flex items-center justify-between cursor-pointer"
                style={{ backgroundColor: partnerCompany.color_hex || "#1E40AF" }}
                onClick={() => toggleCompanyExpanded(partnerId)}
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  {partnerCompany.name}
                </div>
                {expandedCompanies[partnerId] ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </div>

              {/* 当社グループの会社と担当者のリスト */}
              {expandedCompanies[partnerId] && (
                <div className="divide-y divide-gray-200">
                  {Object.keys(groupedOwners[partnerId]).map((ourCompanyId) => {
                    const ourCompany = getCompanyById(ourCompanyId)
                    if (!ourCompany) return null

                    const companyOwners = groupedOwners[partnerId][ourCompanyId]

                    return (
                      <div key={ourCompanyId} className="p-3">
                        <div className="flex items-center mb-2">
                          <div
                            className="w-2 h-6 rounded mr-3"
                            style={{ backgroundColor: ourCompany.color_hex || "#F97316" }}
                          ></div>
                          <div className="font-medium">{ourCompany.name}</div>
                        </div>

                        <div className="space-y-3">
                          {companyOwners.map((owner) => (
                            <div
                              key={owner.id}
                              className={`flex items-start ${owner.is_primary ? "" : "ml-6 pl-3 border-l-2 border-gray-200"}`}
                            >
                              <div className="flex-shrink-0 mt-1">
                                <User className={`h-4 w-4 ${owner.is_primary ? "text-blue-600" : "text-gray-400"}`} />
                              </div>
                              <div className="ml-2">
                                <div className={`font-medium ${owner.is_primary ? "" : "text-sm"}`}>
                                  {owner.user}
                                  {owner.is_primary && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                      メイン
                                    </span>
                                  )}
                                  {!owner.is_primary && (
                                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                      サブ
                                    </span>
                                  )}
                                </div>
                                <div className={`${owner.is_primary ? "text-sm" : "text-xs"} text-gray-600`}>
                                  {owner.title}
                                </div>
                                <div className={`${owner.is_primary ? "text-xs" : "text-xs"} text-gray-500`}>
                                  {owner.email} • {owner.phone}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
