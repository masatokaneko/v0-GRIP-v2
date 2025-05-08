"use client"

import React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TransactionDetailModalProps {
  transactionId?: string
  transaction?: any
  open?: boolean
  onClose?: () => void
  trigger?: React.ReactNode
}

export function TransactionDetailModal({
  transactionId,
  transaction: propTransaction,
  open: propOpen,
  onClose,
  trigger,
}: TransactionDetailModalProps) {
  // トリガーモードとダイレクトモードの両方をサポート
  const [open, setOpen] = React.useState(false)
  const transaction = propTransaction || {
    id: transactionId || "TX001",
    date: "2023-10-15",
    amount: "¥85,000,000",
    from: "株式会社日立製作所",
    to: "株式会社日立システムズ",
    type: "製品販売",
    category: "ITインフラストラクチャ",
    status: "完了",
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen && onClose) {
      onClose()
    }
  }

  // トリガーモードの場合はトリガーをクリックしたときにモーダルを開く
  if (trigger) {
    return (
      <>
        <div onClick={() => setOpen(true)}>{trigger}</div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="max-w-3xl">
            <TransactionDetailContent transaction={transaction} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // ダイレクトモードの場合はpropsのopenに従う
  return (
    <Dialog open={propOpen} onOpenChange={onClose ? onClose : () => {}}>
      <DialogContent className="max-w-3xl">
        <TransactionDetailContent transaction={transaction} />
      </DialogContent>
    </Dialog>
  )
}

function TransactionDetailContent({ transaction }: { transaction: any }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>取引詳細: {transaction.id}</DialogTitle>
        <DialogDescription>
          {transaction.date} - {transaction.amount}
        </DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">基本情報</TabsTrigger>
          <TabsTrigger value="contacts">関連担当者</TabsTrigger>
          <TabsTrigger value="timeline">タイムライン</TabsTrigger>
          <TabsTrigger value="financial">財務情報</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">取引ID</h3>
              <p>{transaction.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">日付</h3>
              <p>{transaction.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">取引元</h3>
              <p>{transaction.from}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">取引先</h3>
              <p>{transaction.to}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">種別</h3>
              <p>{transaction.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">カテゴリ</h3>
              <p>{transaction.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">金額</h3>
              <p>{transaction.amount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
              <Badge
                variant="outline"
                className={
                  transaction.status === "完了"
                    ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                }
              >
                {transaction.status}
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">取引概要</h3>
            <p className="mt-1">
              この取引は{transaction.from}と{transaction.to}の間で行われた{transaction.type}に関するものです。
              取引金額は{transaction.amount}で、現在のステータスは{transaction.status}です。
              {transaction.category}カテゴリに分類されています。
            </p>
          </div>
        </TabsContent>
        <TabsContent value="contacts">
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="font-medium text-blue-700">TK</span>
              </div>
              <div>
                <div className="font-medium">田中 健太</div>
                <div className="text-sm text-gray-500">営業担当 / {transaction.from}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="font-medium text-green-700">YM</span>
              </div>
              <div>
                <div className="font-medium">山田 真理</div>
                <div className="text-sm text-gray-500">購買担当 / {transaction.to}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="font-medium text-purple-700">SK</span>
              </div>
              <div>
                <div className="font-medium">佐藤 健一</div>
                <div className="text-sm text-gray-500">プロジェクトマネージャー / {transaction.from}</div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="timeline">
          <div className="space-y-4">
            <div className="relative pl-6 pb-6 border-l border-gray-200">
              <div className="absolute left-0 top-0 -ml-2.5 h-5 w-5 rounded-full bg-blue-500"></div>
              <div className="font-medium">取引開始</div>
              <div className="text-sm text-gray-500">2023-08-15</div>
              <div className="mt-1 text-sm">初回ミーティングを実施し、取引条件について協議</div>
            </div>
            <div className="relative pl-6 pb-6 border-l border-gray-200">
              <div className="absolute left-0 top-0 -ml-2.5 h-5 w-5 rounded-full bg-blue-300"></div>
              <div className="font-medium">提案書提出</div>
              <div className="text-sm text-gray-500">2023-09-01</div>
              <div className="mt-1 text-sm">正式な提案書を提出し、詳細な取引内容を提示</div>
            </div>
            <div className="relative pl-6 pb-6 border-l border-gray-200">
              <div className="absolute left-0 top-0 -ml-2.5 h-5 w-5 rounded-full bg-blue-300"></div>
              <div className="font-medium">契約締結</div>
              <div className="text-sm text-gray-500">2023-09-20</div>
              <div className="mt-1 text-sm">正式な契約を締結し、取引を開始</div>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 -ml-2.5 h-5 w-5 rounded-full bg-green-500"></div>
              <div className="font-medium">取引完了</div>
              <div className="text-sm text-gray-500">2023-10-15</div>
              <div className="mt-1 text-sm">すべての取引条件を満たし、取引を完了</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="financial">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">取引総額</h3>
                <p className="text-xl font-bold">{transaction.amount}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">支払い条件</h3>
                <p>30日以内</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">支払い方法</h3>
                <p>銀行振込</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">請求書番号</h3>
                <p>INV-2023-{transaction.id.substring(2)}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">内訳</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>項目</TableHead>
                    <TableHead className="text-right">金額</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>基本料金</TableCell>
                    <TableCell className="text-right">¥50,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>オプションサービス</TableCell>
                    <TableCell className="text-right">¥15,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>保守サポート</TableCell>
                    <TableCell className="text-right">¥20,000,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
