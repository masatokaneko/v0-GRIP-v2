"use client"

import { useState, useEffect } from "react"
import { OpportunityDetail } from "@/components/opportunity-detail"
import { opportunities, getCompanyById, getStageColor, partnerCompanies } from "@/lib/data"

interface OpportunityTableProps {
  selectedGroupId: string
}

export function OpportunityTable({ selectedGroupId }: OpportunityTableProps) {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(null)
  const [groupOpportunities, setGroupOpportunities] = useState<any[]>([])

  useEffect(() => {
    // 選択されたグループに属する企業のIDを取得
    const groupCompanyIds = partnerCompanies
      .filter((company) => company.group_id === selectedGroupId)
      .map((company) => company.id)

    // グループ企業に関連する商談をフィルタリング
    const filteredOpportunities = opportunities.filter((opp) => groupCompanyIds.includes(opp.partner_company_id))

    // データを整形
    const formattedOpportunities = filteredOpportunities.map((opp) => {
      const partnerCompany = getCompanyById(opp.partner_company_id)
      const ourCompany = getCompanyById(opp.our_company_id)

      return {
        id: opp.id,
        name: opp.name,
        partner: partnerCompany?.name || "",
        partnerColor: partnerCompany?.color_hex || "#000000",
        ourCompany: ourCompany?.name || "",
        ourCompanyColor: ourCompany?.color_hex || "#000000",
        closeDate: opp.close_date,
        stagePct: opp.stage_pct,
        stageColor: getStageColor(opp.stage_pct),
        amount: opp.amount_oku,
        description: opp.description,
        createdAt: opp.created_at,
        updatedAt: opp.updated_at,
        assignedTo: opp.assigned_to,
        nextAction: opp.next_action,
        nextActionDate: opp.next_action_date,
      }
    })

    setGroupOpportunities(formattedOpportunities)
  }, [selectedGroupId])

  if (groupOpportunities.length === 0) {
    return (
      <div className="rounded-2xl shadow bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">商談</h2>
        <div className="text-center py-8 text-gray-500">このグループの商談データがありません</div>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-2xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                クライアント
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                提案企業
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">締切日</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステージ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                金額 (億円)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groupOpportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-sky-50 cursor-pointer" onClick={() => setSelectedOpportunity(opp)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{opp.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: opp.partnerColor }}></div>
                    <div className="text-sm text-gray-500">{opp.partner}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: opp.ourCompanyColor }}></div>
                    <div className="text-sm text-gray-500">{opp.ourCompany}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{opp.closeDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${opp.stageColor} h-2.5 rounded-full`} style={{ width: `${opp.stagePct}%` }}></div>
                  </div>
                  <div className="text-xs font-medium text-right mt-1">{opp.stagePct}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">{opp.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOpportunity && (
        <OpportunityDetail opportunity={selectedOpportunity} onClose={() => setSelectedOpportunity(null)} />
      )}
    </div>
  )
}
