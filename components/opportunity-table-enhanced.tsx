"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye } from "lucide-react"
import { OpportunityDetail } from "@/components/opportunity-detail"
import { opportunities, getCompanyById, getStageColor, getStageLabel } from "@/lib/data"

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
  description?: string
  createdAt?: string
  updatedAt?: string
  assignedTo?: string
  nextAction?: string
  nextActionDate?: string
}

export function OpportunityTableEnhanced() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)

  // データを整形
  const formattedOpportunities: Opportunity[] = opportunities.map((opp) => {
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

  // テーブルヘッダーを修正
  const columns: ColumnDef<Opportunity>[] = [
    {
      accessorKey: "name",
      header: "名前",
      cell: ({ row }) => <div className="text-sm font-medium text-gray-900">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "partner",
      header: "クライアント",
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
        data={formattedOpportunities}
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
