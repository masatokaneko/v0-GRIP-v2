"use client"

import { useState } from "react"
import { ContactHistory } from "@/components/contact-history"

export function AccountExecutives() {
  const [selectedExec, setSelectedExec] = useState<string | null>(null)

  const executives = [
    {
      id: "AE001",
      name: "日立 太郎",
      title: "執行役員",
      company: "日立製作所",
      companyColor: "#1E40AF",
      frequency: "High",
      contacts: 12,
    },
    {
      id: "AE002",
      name: "日立 花子",
      title: "営業部長",
      company: "日立製作所",
      companyColor: "#1E40AF",
      frequency: "Medium",
      contacts: 8,
    },
    {
      id: "AE003",
      name: "日立 三郎",
      title: "技術部長",
      company: "日立建機",
      companyColor: "#3B82F6",
      frequency: "Low",
      contacts: 4,
    },
    {
      id: "AE004",
      name: "日立 四郎",
      title: "事業開発部長",
      company: "日立金属",
      companyColor: "#8B5CF6",
      frequency: "Medium",
      contacts: 7,
    },
    {
      id: "AE005",
      name: "日立 五郎",
      title: "マーケティング部長",
      company: "日立化成",
      companyColor: "#EC4899",
      frequency: "High",
      contacts: 10,
    },
  ]

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
            {executives.map((exec) => (
              <tr key={exec.id} className="hover:bg-sky-50 cursor-pointer" onClick={() => setSelectedExec(exec.id)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: exec.companyColor }}></div>
                    <div className="text-sm font-medium text-gray-900">{exec.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exec.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exec.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFrequencyStyle(exec.frequency)}`}>
                    {exec.frequency} • {exec.contacts} contacts
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedExec && <ContactHistory execId={selectedExec} onClose={() => setSelectedExec(null)} />}
    </div>
  )
}
