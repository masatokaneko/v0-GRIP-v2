"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TransactionListProps {
  selectedGroupId: string
}

// 取引詳細モーダルコンポーネント
function TransactionDetailModal({
  transaction,
  open,
  onClose,
}: { transaction: any; open: boolean; onClose: () => void }) {
  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
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
      </DialogContent>
    </Dialog>
  )
}

// 日立グループの取引データ
const hitachiTransactions = [
  {
    id: "TX001",
    date: "2023-10-15",
    amount: "¥85,000,000",
    from: "株式会社日立製作所",
    to: "株式会社日立システムズ",
    type: "製品販売",
    category: "ITインフラストラクチャ",
    status: "完了",
  },
  {
    id: "TX002",
    date: "2023-09-22",
    amount: "¥45,000,000",
    from: "株式会社日立製作所",
    to: "日立Astemo株式会社",
    type: "サービス提供",
    category: "コンサルティング",
    status: "完了",
  },
  {
    id: "TX003",
    date: "2023-11-05",
    amount: "¥120,000,000",
    from: "株式会社日立製作所",
    to: "株式会社日立ハイテク",
    type: "製品販売",
    category: "医療機器",
    status: "進行中",
  },
  {
    id: "TX004",
    date: "2023-08-30",
    amount: "¥65,000,000",
    from: "日立建機株式会社",
    to: "株式会社日立製作所",
    type: "製品購入",
    category: "建設機械",
    status: "完了",
  },
  {
    id: "TX005",
    date: "2023-12-01",
    amount: "¥95,000,000",
    from: "株式会社日立製作所",
    to: "日立鉄道ビジネスユニット",
    type: "共同開発",
    category: "鉄道システム",
    status: "進行中",
  },
]

// 富士通グループの取引データ
const fujitsuTransactions = [
  {
    id: "TX101",
    date: "2023-11-10",
    amount: "¥327,000,000",
    from: "三菱商事",
    to: "富士通株式会社",
    type: "システム開発",
    category: "基幹システム",
    status: "進行中",
  },
  {
    id: "TX102",
    date: "2023-10-05",
    amount: "¥184,000,000",
    from: "三菱電機",
    to: "富士通Japan",
    type: "システム導入",
    category: "物流管理",
    status: "完了",
  },
  {
    id: "TX103",
    date: "2023-09-15",
    amount: "¥157,000,000",
    from: "三菱UFJ",
    to: "富士通ネットワークソリューションズ",
    type: "インフラ構築",
    category: "ネットワーク",
    status: "完了",
  },
  {
    id: "TX104",
    date: "2023-12-20",
    amount: "¥256,000,000",
    from: "三菱重工",
    to: "富士通クライアントコンピューティング",
    type: "保守契約",
    category: "店舗システム",
    status: "進行中",
  },
  {
    id: "TX105",
    date: "2023-08-25",
    amount: "¥42,000,000",
    from: "三菱商事",
    to: "富士通研究所",
    type: "共同研究",
    category: "AI開発",
    status: "完了",
  },
]

// 取引統計データ
const transactionStats = {
  HTG001: {
    totalAmount: 410000000,
    avgAmount: 82000000,
    maxAmount: 120000000,
    topCategories: [
      { name: "ITインフラストラクチャ", amount: 85000000 },
      { name: "医療機器", amount: 120000000 },
      { name: "鉄道システム", amount: 95000000 },
    ],
    statusDistribution: {
      completed: 3,
      inProgress: 2,
    },
  },
  FJG001: {
    totalAmount: 966000000,
    avgAmount: 193200000,
    maxAmount: 327000000,
    topCategories: [
      { name: "基幹システム", amount: 327000000 },
      { name: "店舗システム", amount: 256000000 },
      { name: "物流管理", amount: 184000000 },
    ],
    statusDistribution: {
      completed: 3,
      inProgress: 2,
    },
  },
}

export function TransactionList({ selectedGroupId }: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [transactions, setTransactions] = useState<any[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    // グループIDに基づいて取引データを設定
    const data = selectedGroupId === "HTG001" ? hitachiTransactions : fujitsuTransactions
    setTransactions(data)

    // 統計データを設定
    setStats(transactionStats[selectedGroupId as keyof typeof transactionStats])
  }, [selectedGroupId])

  useEffect(() => {
    // 検索語とステータスフィルターに基づいて取引をフィルタリング
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (tx) =>
          (statusFilter === "completed" && tx.status === "完了") ||
          (statusFilter === "in_progress" && tx.status === "進行中"),
      )
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, statusFilter])

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  // 金額を数値に変換する関数
  const parseAmount = (amountStr: string) => {
    return Number.parseInt(amountStr.replace(/[^\d]/g, ""))
  }

  // 合計金額を計算
  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + parseAmount(tx.amount), 0)

  // 平均金額を計算
  const avgAmount = totalAmount / (filteredTransactions.length || 1)

  // 最大金額を取得
  const maxAmount =
    filteredTransactions.length > 0 ? Math.max(...filteredTransactions.map((tx) => parseAmount(tx.amount))) : 0

  // 金額のフォーマット
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">主要取引一覧</h2>
          <p className="text-muted-foreground">グループ内の主要取引を一覧表示します</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="取引を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="completed">完了</SelectItem>
              <SelectItem value="in_progress">進行中</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>取引一覧</CardTitle>
          <CardDescription>グループ内の主要取引データ（{filteredTransactions.length}件）</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>取引ID</TableHead>
                <TableHead>日付</TableHead>
                <TableHead>取引元</TableHead>
                <TableHead>取引先</TableHead>
                <TableHead>種別</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.from}</TableCell>
                    <TableCell>{transaction.to}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className="text-right">{transaction.amount}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleViewTransaction(transaction)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    取引データが見つかりません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>取引統計</CardTitle>
            <CardDescription>取引データの統計情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">総取引数</span>
                <span className="font-medium">{filteredTransactions.length}件</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">総取引額</span>
                <span className="font-medium">{formatAmount(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">平均取引額</span>
                <span className="font-medium">{formatAmount(avgAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">最大取引額</span>
                <span className="font-medium">{formatAmount(maxAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">完了取引</span>
                <span className="font-medium">
                  {filteredTransactions.filter((tx) => tx.status === "完了").length}件
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">進行中取引</span>
                <span className="font-medium">
                  {filteredTransactions.filter((tx) => tx.status === "進行中").length}件
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>取引分析</CardTitle>
            <CardDescription>取引データの分析情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">主要取引カテゴリ</h3>
              {stats &&
                stats.topCategories.map((category: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{category.name}</span>
                    <span className="font-medium">{formatAmount(category.amount)}</span>
                  </div>
                ))}
              <div className="h-[100px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">カテゴリ分布グラフが表示されます</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
