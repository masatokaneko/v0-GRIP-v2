"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import { OpportunityDetail } from "@/components/opportunity-detail"

interface Opportunity {
  id: string
  name: string
  partner: string
  partnerColor: string
  ourCompany: string
  ourCompanyColor: string
  closeDate: string
  stagePct: number
  stageColor: string
  amount: number
}

export function OpportunityTableEnhanced() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)

  const opportunities: Opportunity[] = [
    {
      id: "OPP001",
      name: "グローバルサプライチェーン構築",
      partner: "日立製作所",
      partnerColor: "#1E40AF",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      closeDate: "2025-06-30",
      stagePct: 75,
      stageColor: "bg-green-600",
      amount: 12.5,
    },
    {
      id: "OPP002",
      name: "AI駆動型予測保守システム",
      partner: "日立製作所",
      partnerColor: "#1E40AF",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      closeDate: "2025-08-15",
      stagePct: 50,
      stageColor: "bg-yellow-500",
      amount: 8.3,
    },
    {
      id: "OPP003",
      name: "建設機械リース拡大",
      partner: "日立建機",
      partnerColor: "#3B82F6",
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
      closeDate: "2025-07-22",
      stagePct: 25,
      stageColor: "bg-blue-500",
      amount: 15.7,
    },
    {
      id: "OPP004",
      name: "特殊合金共同開発",
      partner: "日立金属",
      partnerColor: "#8B5CF6",
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
      closeDate: "2025-09-10",
      stagePct: 10,
      stageColor: "bg-indigo-500",
      amount: 6.2,
    },
    {
      id: "OPP005",
      name: "環境配慮型素材研究",
      partner: "日立化成",
      partnerColor: "#EC4899",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      closeDate: "2025-10-05",
      stagePct: 30,
      stageColor: "bg-blue-500",
      amount: 9.8,
    },
    {
      id: "OPP006",
      name: "スマートファクトリー導入",
      partner: "日立製作所",
      partnerColor: "#1E40AF",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      closeDate: "2025-11-20",
      stagePct: 15,
      stageColor: "bg-indigo-500",
      amount: 20.3,
    },
    {
      id: "OPP007",
      name: "物流最適化プロジェクト",
      partner: "日立物流",
      partnerColor: "#14B8A6",
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
      closeDate: "2025-08-30",
      stagePct: 60,
      stageColor: "bg-yellow-500",
      amount: 7.5,
    },
  ]

  const getStageLabel = (stagePct: number) => {
    if (stagePct < 30) return "初期段階"
    if (stagePct < 60) return "中間段階"
    return "最終段階"
  }

  const columns: ColumnDef<Opportunity>[] = [
    {
      accessorKey: "name",
      header: "名前",
      cell: ({ row }) => <div className="text-sm font-medium text-gray-900">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "partner",
      header: "パートナー",
      cell: ({ row }) => {
        const partnerColor = row.original.partnerColor
        return (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: partnerColor }}></div>
            <div className="text-sm text-gray-500">{row.getValue("partner")}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "ourCompany",
      header: "提案企業",
      cell: ({ row }) => {
        const ourCompanyColor = row.original.ourCompanyColor
        return (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ourCompanyColor }}></div>
            <div className="text-sm text-gray-500">{row.getValue("ourCompany")}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "closeDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            締切日
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-sm text-gray-500">{row.getValue("closeDate")}</div>,
    },
    {
      accessorKey: "stagePct",
      header: "ステージ",
      cell: ({ row }) => {
        const stagePct = row.original.stagePct
        const stageColor = row.original.stageColor
        const stageLabel = getStageLabel(stagePct)

        return (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className={`${stageColor} h-2.5 rounded-full`} style={{ width: `${stagePct}%` }}></div>
            </div>
            <div className="flex justify-between items-center mt-1">
              <Badge variant="outline" className="text-xs font-medium">
                {stageLabel}
              </Badge>
              <div className="text-xs font-medium">{stagePct}%</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              金額 (億円)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right text-sm font-medium">{row.getValue("amount")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedOpportunity(row.original)
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">詳細を表示</span>
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={opportunities}
        searchColumn="name"
        searchPlaceholder="商談名で検索..."
        onRowClick={(row) => setSelectedOpportunity(row.original)}
      />

      {selectedOpportunity && (
        <OpportunityDetail opportunity={selectedOpportunity} onClose={() => setSelectedOpportunity(null)} />
      )}
    </div>
  )
}
