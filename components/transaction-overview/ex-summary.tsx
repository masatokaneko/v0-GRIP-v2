"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, TrendingUp, DollarSign, ShoppingCart } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface ExSummaryProps {
  selectedGroupId: string
}

// グループ別のサマリーデータ
const groupSummaryData = {
  HTG001: {
    totalAmount: 82.5,
    totalCount: 248,
    avgAmount: 0.33,
    growthRate: 18.2,
    quarterlyGrowth: 2.4,
  },
  FJG001: {
    totalAmount: 156.8,
    totalCount: 312,
    avgAmount: 0.5,
    growthRate: 24.5,
    quarterlyGrowth: 3.8,
  },
}

// 四半期データ
const quarterlyData = {
  HTG001: [
    { quarter: "2023 Q1", amount: 15.2, count: 45 },
    { quarter: "2023 Q2", amount: 18.7, count: 52 },
    { quarter: "2023 Q3", amount: 21.3, count: 61 },
    { quarter: "2023 Q4", amount: 27.3, count: 90 },
    { quarter: "2024 Q1", amount: 18.5, count: 48 },
  ],
  FJG001: [
    { quarter: "2023 Q1", amount: 28.4, count: 62 },
    { quarter: "2023 Q2", amount: 32.1, count: 71 },
    { quarter: "2023 Q3", amount: 38.7, count: 83 },
    { quarter: "2023 Q4", amount: 57.6, count: 96 },
    { quarter: "2024 Q1", amount: 35.2, count: 68 },
  ],
}

// カテゴリデータ
const categoryData = {
  HTG001: [
    { name: "ITサービス", value: 32.5 },
    { name: "ハードウェア", value: 24.8 },
    { name: "コンサルティング", value: 12.3 },
    { name: "保守サポート", value: 8.7 },
    { name: "その他", value: 4.2 },
  ],
  FJG001: [
    { name: "クラウドサービス", value: 58.2 },
    { name: "システム開発", value: 42.5 },
    { name: "ネットワーク", value: 28.7 },
    { name: "セキュリティ", value: 18.3 },
    { name: "その他", value: 9.1 },
  ],
}

// 主要取引先データ
const topCustomersData = {
  HTG001: [
    { name: "日立製作所", value: 35.2 },
    { name: "日立システムズ", value: 18.7 },
    { name: "日立ハイテク", value: 12.3 },
    { name: "日立建機", value: 9.8 },
    { name: "日立物流", value: 6.5 },
  ],
  FJG001: [
    { name: "富士通", value: 62.4 },
    { name: "富士通Japan", value: 38.2 },
    { name: "富士通ネットワークソリューションズ", value: 25.7 },
    { name: "富士通クライアントコンピューティング", value: 18.3 },
    { name: "富士通研究所", value: 12.2 },
  ],
}

// 成長トレンドデータ
const growthTrendData = {
  HTG001: [
    { year: 2020, growth: 5.2 },
    { year: 2021, growth: 8.7 },
    { year: 2022, growth: 12.3 },
    { year: 2023, growth: 18.2 },
    { year: 2024, growth: 22.5, projected: true },
  ],
  FJG001: [
    { year: 2020, growth: 8.5 },
    { year: 2021, growth: 12.8 },
    { year: 2022, growth: 18.6 },
    { year: 2023, growth: 24.5 },
    { year: 2024, growth: 28.7, projected: true },
  ],
}

// 円グラフの色
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function ExSummary({ selectedGroupId }: ExSummaryProps) {
  const [summaryData, setSummaryData] = useState({
    totalAmount: 0,
    totalCount: 0,
    avgAmount: 0,
    growthRate: 0,
    quarterlyGrowth: 0,
  })

  useEffect(() => {
    // 選択されたグループのサマリーデータを設定
    const data = groupSummaryData[selectedGroupId as keyof typeof groupSummaryData] || {
      totalAmount: 0,
      totalCount: 0,
      avgAmount: 0,
      growthRate: 0,
      quarterlyGrowth: 0,
    }
    setSummaryData(data)
  }, [selectedGroupId])

  // 選択されたグループの四半期データ
  const quarterlyDataForGroup = quarterlyData[selectedGroupId as keyof typeof quarterlyData] || []

  // 選択されたグループのカテゴリデータ
  const categoryDataForGroup = categoryData[selectedGroupId as keyof typeof categoryData] || []

  // 選択されたグループの主要取引先データ
  const topCustomersForGroup = topCustomersData[selectedGroupId as keyof typeof topCustomersData] || []

  // 選択されたグループの成長トレンドデータ
  const growthTrendForGroup = growthTrendData[selectedGroupId as keyof typeof growthTrendData] || []

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総取引額</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{summaryData.totalAmount}億</div>
            <p className="text-xs text-muted-foreground">
              前年比 <span className="text-green-500">+{summaryData.growthRate}%</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">取引件数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalCount}件</div>
            <p className="text-xs text-muted-foreground">
              前年比 <span className="text-green-500">+{Math.round(summaryData.growthRate * 0.7)}%</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均取引額</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{summaryData.avgAmount}億</div>
            <p className="text-xs text-muted-foreground">
              前年比 <span className="text-green-500">+{Math.round(summaryData.growthRate * 0.3)}%</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成長率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.growthRate}%</div>
            <p className="text-xs text-muted-foreground">
              前四半期比 <span className="text-green-500">+{summaryData.quarterlyGrowth}%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>四半期別取引推移</CardTitle>
            <CardDescription>過去12ヶ月間の四半期別取引額と取引件数の推移</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={quarterlyDataForGroup}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="amount" name="取引額（億円）" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="count" name="取引件数" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>取引カテゴリ分布</CardTitle>
            <CardDescription>製品・サービスカテゴリ別の取引分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDataForGroup}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDataForGroup.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}億円`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top_customers">
        <TabsList>
          <TabsTrigger value="top_customers">主要取引先</TabsTrigger>
          <TabsTrigger value="product_categories">製品カテゴリ</TabsTrigger>
          <TabsTrigger value="growth_trends">成長トレンド</TabsTrigger>
        </TabsList>
        <TabsContent value="top_customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>主要取引先</CardTitle>
              <CardDescription>取引額上位5社</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={topCustomersForGroup}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => `${value}億円`} />
                    <Legend />
                    <Bar dataKey="value" name="取引額（億円）" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="product_categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>製品カテゴリ</CardTitle>
              <CardDescription>製品カテゴリ別の取引額と成長率</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={categoryDataForGroup}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => `${value}億円`} />
                    <Legend />
                    <Bar dataKey="value" name="取引額（億円）" fill="#00C49F" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="growth_trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>成長トレンド</CardTitle>
              <CardDescription>過去5年間の成長トレンド分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={growthTrendForGroup}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="growth"
                      name="成長率（%）"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
