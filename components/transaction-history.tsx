"use client"

import { useEffect, useState } from "react"
import { transactions, getCompanyById, partnerCompanies } from "@/lib/data"

interface TransactionHistoryProps {
  selectedGroupId: string
}

export function TransactionHistory({ selectedGroupId }: TransactionHistoryProps) {
  const [groupTransactions, setGroupTransactions] = useState<any[]>([])

  useEffect(() => {
    // 選択されたグループに属する企業のIDを取得
    const groupCompanyIds = partnerCompanies
      .filter((company) => company.group_id === selectedGroupId)
      .map((company) => company.id)

    // グループ企業に関連する取引をフィルタリング
    const filteredTransactions = transactions.filter((tx) => groupCompanyIds.includes(tx.partner_company_id))

    // データを整形
    const formattedTransactions = filteredTransactions.map((tx) => {
      const partnerCompany = getCompanyById(tx.partner_company_id)
      const ourCompany = getCompanyById(tx.our_company_id)

      return {
        id: tx.id,
        ourCompany: ourCompany?.name || "",
        ourCompanyColor: ourCompany?.color_hex || "#000000",
        partnerCompany: partnerCompany?.name || "",
        partnerCompanyColor: partnerCompany?.color_hex || "#000000",
        fiscalYear: tx.fy,
        sales: tx.sales_oku,
        cost: tx.cost_oku,
        summary: tx.summary,
      }
    })

    setGroupTransactions(formattedTransactions)
  }, [selectedGroupId])

  if (groupTransactions.length === 0) {
    return (
      <div className="rounded-2xl shadow bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">取引履歴</h2>
        <div className="text-center py-8 text-gray-500">このグループの取引履歴データがありません</div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">自社</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              クライアント企業
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会計年度</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              売上 (億円)
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              コスト (億円)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">概要</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {groupTransactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-sky-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tx.ourCompanyColor }}></div>
                  <div className="text-sm font-medium text-gray-900">{tx.ourCompany}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tx.partnerCompanyColor }}></div>
                  <div className="text-sm text-gray-500">{tx.partnerCompany}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.fiscalYear}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">{tx.sales}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-500">{tx.cost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
