"use client"

import { X } from "lucide-react"

interface ContactHistoryProps {
  execId: string
  onClose: () => void
}

export function ContactHistory({ execId, onClose }: ContactHistoryProps) {
  // In a real app, we would fetch this data based on the execId
  const contactHistory = [
    {
      id: "CH001",
      date: "2025年4月15日",
      purpose: "年間契約更新の打ち合わせ",
      user: "佐藤 一郎",
      company: "三菱商事",
    },
    {
      id: "CH002",
      date: "2025年3月22日",
      purpose: "新規プロジェクト提案",
      user: "田中 次郎",
      company: "メタルワン",
    },
    {
      id: "CH003",
      date: "2025年2月10日",
      purpose: "四半期レビュー会議",
      user: "佐藤 一郎",
      company: "三菱商事",
    },
    {
      id: "CH004",
      date: "2025年1月5日",
      purpose: "新年挨拶・年間計画共有",
      user: "山田 三郎",
      company: "三菱商事",
    },
    {
      id: "CH005",
      date: "2024年12月15日",
      purpose: "年末総括ミーティング",
      user: "佐藤 一郎",
      company: "三菱商事",
    },
  ]

  // Get executive name based on ID (in a real app, this would be fetched)
  const getExecName = (id: string) => {
    const execMap: Record<string, string> = {
      AE001: "日立 太郎",
      AE002: "日立 花子",
      AE003: "日立 三郎",
      AE004: "日立 四郎",
      AE005: "日立 五郎",
    }
    return execMap[id] || "Unknown Executive"
  }

  return (
    <div className="fixed inset-y-0 right-0 max-w-lg w-full bg-white shadow-xl p-6 transform transition-transform z-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">コンタクト履歴: {getExecName(execId)}</h3>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <span className="sr-only">閉じる</span>
          <X className="h-6 w-6" />
        </button>
      </div>

      <ul className="space-y-4 border-l-2 border-gray-200 pl-4">
        {contactHistory.map((contact) => (
          <li key={contact.id} className="relative">
            <div className="absolute -left-[21px] mt-1.5 w-4 h-4 rounded-full bg-[#002B5B]"></div>
            <div className="mb-1 text-sm font-medium">{contact.date}</div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">{contact.purpose}</div>
              <div className="text-xs text-gray-500 mt-1">
                担当者: {contact.user} • {contact.company}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
