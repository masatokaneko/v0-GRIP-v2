export function TransactionHistory() {
  const transactions = [
    {
      id: "TX001",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      partnerCompany: "日立製作所",
      partnerCompanyColor: "#1E40AF",
      fiscalYear: "2024",
      sales: 14.2,
      cost: 11.8,
      summary: "システム連携プロジェクト",
    },
    {
      id: "TX002",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      partnerCompany: "日立製作所",
      partnerCompanyColor: "#1E40AF",
      fiscalYear: "2023",
      sales: 12.8,
      cost: 10.5,
      summary: "デジタルトランスフォーメーション支援",
    },
    {
      id: "TX003",
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
      partnerCompany: "日立建機",
      partnerCompanyColor: "#3B82F6",
      fiscalYear: "2024",
      sales: 18.5,
      cost: 15.2,
      summary: "建設機械部品供給",
    },
    {
      id: "TX004",
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
      partnerCompany: "日立金属",
      partnerCompanyColor: "#8B5CF6",
      fiscalYear: "2024",
      sales: 9.3,
      cost: 7.6,
      summary: "特殊合金取引",
    },
    {
      id: "TX005",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      partnerCompany: "日立化成",
      partnerCompanyColor: "#EC4899",
      fiscalYear: "2024",
      sales: 7.8,
      cost: 6.1,
      summary: "化学製品取引",
    },
  ]

  return (
    <div className="rounded-2xl shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">自社</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              パートナー企業
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
          {transactions.map((tx) => (
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
