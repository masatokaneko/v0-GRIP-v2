"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

interface Transaction {
  id: string
  ourCompany: string
  ourCompanyColor: string
  partnerCompany: string
  partnerCompanyColor: string
  fiscalYear: string
  sales: number
  cost: number
  summary: string
}

export function TransactionHistoryEnhanced() {
  const transactions: Transaction[] = [
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
    {
      id: "TX006",
      ourCompany: "三菱商事",
      ourCompanyColor: "#EF4444",
      partnerCompany: "日立ハイテク",
      partnerCompanyColor: "#06B6D4",
      fiscalYear: "2024",
      sales: 5.2,
      cost: 4.3,
      summary: "半導体製造装置取引",
    },
    {
      id: "TX007",
      ourCompany: "メタルワン",
      ourCompanyColor: "#F97316",
      partnerCompany: "日立物流",
      partnerCompanyColor: "#14B8A6",
      fiscalYear: "2024",
      sales: 3.7,
      cost: 2.9,
      summary: "物流サービス契約",
    },
  ]

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "ourCompany",
      header: "自社",
      cell: ({ row }) => {
        const ourCompanyColor = row.original.ourCompanyColor
        return (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ourCompanyColor }}></div>
            <div className="text-sm font-medium text-gray-900">{row.getValue("ourCompany")}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "partnerCompany",
      header: "クライアント企業",
      cell: ({ row }) => {
        const partnerCompanyColor = row.original.partnerCompanyColor
        return (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: partnerCompanyColor }}></div>
            <div className="text-sm text-gray-500">{row.getValue("partnerCompany")}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "fiscalYear",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            会計年度
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-sm text-gray-500">{row.getValue("fiscalYear")}</div>,
    },
    {
      accessorKey: "sales",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              売上 (億円)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right text-sm font-medium text-gray-900">{row.getValue("sales")}</div>,
    },
    {
      accessorKey: "cost",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              コスト (億円)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right text-sm font-medium text-gray-500">{row.getValue("cost")}</div>,
    },
    {
      accessorKey: "summary",
      header: "概要",
      cell: ({ row }) => <div className="text-sm text-gray-500">{row.getValue("summary")}</div>,
    },
  ]

  return (
    <DataTable columns={columns} data={transactions} searchColumn="summary" searchPlaceholder="取引概要で検索..." />
  )
}
