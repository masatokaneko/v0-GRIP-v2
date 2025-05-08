"use client"

import { useState } from "react"
import { OpportunityDetail } from "@/components/opportunity-detail"

export function OpportunityTable() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(null)

  const opportunities = [
    {
      id: "OPP001",
      name: "グローバルサプライチェーン構築",
      partner: "日立製作所",
      partnerColor: "#1E40AF",
      closeDate: "2025-06-30",
      stagePct: 75,
      stageColor: "bg-green-600",
      amount: 12.5,
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
    },
    {
      id: "OPP002",
      name: "AI駆動型予測保守システム",
      partner: "日立製作所",
      partnerColor: "#1E40AF",
      closeDate: "2025-08-15",
      stagePct: 50,
      stageColor: "bg-yellow-500",
      amount: 8.3,
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
    },
    {
      id: "OPP003",
      name: "建設機械リース拡大",
      partner: "日立建機",
      partnerColor: "#3B82F6",
      closeDate: "2025-07-22",
      stagePct: 25,
      stageColor: "bg-blue-500",
      amount: 15.7,
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
    },
    {
      id: "OPP004",
      name: "特殊合金共同開発",
      partner: "日立金属",
      partnerColor: "#8B5CF6",
      closeDate: "2025-09-10",
      stagePct: 10,
      stageColor: "bg-indigo-500",
      amount: 6.2,
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
    },
    {
      id: "OPP005",
      name: "環境配慮型素材研究",
      partner: "日立化成",
      partnerColor: "#EC4899",
      closeDate: "2025-10-05",
      stagePct: 30,
      stageColor: "bg-blue-500",
      amount: 9.8,
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
    },
  ]

  return (
    <div>
      <div className="rounded-2xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                パートナー
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
            {opportunities.map((opp) => (
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
