"use client"

import { useState, useEffect } from "react"
import { ContactHistory } from "@/components/contact-history"
import { accountExecutives, partnerCompanies } from "@/lib/data"

interface AccountExecutivesProps {
  selectedGroupId: string
}

export function AccountExecutives({ selectedGroupId }: AccountExecutivesProps) {
  const [selectedExec, setSelectedExec] = useState<string | null>(null)
  const [groupExecutives, setGroupExecutives] = useState<any[]>([])

  useEffect(() => {
    // 選択されたグループに属する企業のIDを取得
    const groupCompanyIds = partnerCompanies
      .filter((company) => company.group_id === selectedGroupId)
      .map((company) => company.id)

    // グループ企業に所属するエグゼクティブをフィルタリング
    const filteredExecutives = accountExecutives.filter((exec) => groupCompanyIds.includes(exec.partner_company_id))

    setGroupExecutives(filteredExecutives)
  }, [selectedGroupId])

  const getFrequencyStyle = (frequency: string) => {
    switch (frequency) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (groupExecutives.length === 0) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl shadow bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">アカウントエグゼクティブ</h2>
          <div className="text-center py-8 text-gray-500">このグループのエグゼクティブデータがありません</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役職</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会社</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                コンタクト頻度
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groupExecutives.map((exec) => {
              const company = partnerCompanies.find((c) => c.id === exec.partner_company_id)

              return (
                <tr key={exec.id} className="hover:bg-sky-50 cursor-pointer" onClick={() => setSelectedExec(exec.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: exec.color_hex }}></div>
                      <div className="text-sm font-medium text-gray-900">{exec.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exec.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFrequencyStyle(exec.frequency)}`}>
                      {exec.frequency} • {exec.contacts} contacts
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selectedExec && <ContactHistory execId={selectedExec} onClose={() => setSelectedExec(null)} />}
    </div>
  )
}
