"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, LineChart, BarChart2, AreaChart } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

interface TransactionTimelineProps {
  selectedGroupId: string
}

// 時系列データ
const timeSeriesData = {
  HTG001: {
    yearly: [
      { year: "2020", amount: 45.2, count: 152, average: 0.3 },
      { year: "2021", amount: 52.8, count: 168, average: 0.31 },
      { year: "2022", amount: 63.5, count: 195, average: 0.33 },
      { year: "2023", amount: 75.2, count: 230, average: 0.33 },
      { year: "2024", amount: 82.5, count: 248, average: 0.33 },
    ],
    quarterly: [
      { quarter: "2023 Q1", amount: 15.2, count: 45, average: 0.34 },
      { quarter: "2023 Q2", amount: 18.7, count: 52, average: 0.36 },
      { quarter: "2023 Q3", amount: 21.3, count: 61, average: 0.35 },
      { quarter: "2023 Q4", amount: 27.3, count: 90, average: 0.3 },
      { quarter: "2024 Q1", amount: 18.5, count: 48, average: 0.39 },
    ],
    monthly: [
      { month: "2023-10", amount: 6.8, count: 18, average: 0.38 },
      { month: "2023-11", amount: 7.2, count: 21, average: 0.34 },
      { month: "2023-12", amount: 8.3, count: 22, average: 0.38 },
      { month: "2024-01", amount: 9.5, count: 25, average: 0.38 },
      { month: "2024-02", amount: 8.7, count: 22, average: 0.4 },
      { month: "2024-03", amount: 7.8, count: 20, average: 0.39 },
    ],
  },
  FJG001: {
    yearly: [
      { year: "2020", amount: 78.5, count: 185, average: 0.42 },
      { year: "2021", amount: 95.3, count: 210, average: 0.45 },
      { year: "2022", amount: 118.7, count: 245, average: 0.48 },
      { year: "2023", amount: 142.5, count: 280, average: 0.51 },
      { year: "2024", amount: 156.8, count: 312, average: 0.5 },
    ],
    quarterly: [
      { quarter: "2023 Q1", amount: 28.4, count: 62, average: 0.46 },
      { quarter: "2023 Q2", amount: 32.1, count: 71, average: 0.45 },
      { quarter: "2023 Q3", amount: 38.7, count: 83, average: 0.47 },
      { quarter: "2023 Q4", amount: 57.6, count: 96, average: 0.6 },
      { quarter: "2024 Q1", amount: 35.2, count: 68, average: 0.52 },
    ],
    monthly: [
      { month: "2023-10", amount: 12.5, count: 25, average: 0.5 },
      { month: "2023-11", amount: 15.8, count: 32, average: 0.49 },
      { month: "2023-12", amount: 18.3, count: 35, average: 0.52 },
      { month: "2024-01", amount: 16.7, count: 30, average: 0.56 },
      { month: "2024-02", amount: 14.2, count: 28, average: 0.51 },
      { month: "2024-03", amount: 12.8, count: 25, average: 0.51 },
    ],
  },
}

// トレンド分析データ
const trendAnalysisData = {
  HTG001: {
    cagr: 12.5,
    cagrChange: 2.3,
    seasonalityIndex: 1.4,
    seasonalityChange: -0.2,
    variationCoefficient: 0.28,
    variationChange: 0.05,
    longTermTrend: "過去3年間で取引額は年平均12.5%の成長を示しており、特に日立グループとの取引が堅調に推移しています。",
    seasonality: "第4四半期（1-3月）に取引が集中する傾向があり、年度末の予算消化に関連していると考えられます。",
    variationFactors: "2023年第2四半期の取引額増加は、大型プロジェクトの受注が主な要因と考えられます。",
  },
  FJG001: {
    cagr: 18.9,
    cagrChange: 3.5,
    seasonalityIndex: 1.8,
    seasonalityChange: -0.3,
    variationCoefficient: 0.32,
    variationChange: 0.07,
    longTermTrend:
      "過去3年間で取引額は年平均18.9%の成長を示しており、特にクラウドサービスとDX関連の取引が急速に拡大しています。",
    seasonality: "第4四半期（1-3月）に取引が集中する傾向が強く、年度末の大型案件締結が特徴的です。",
    variationFactors: "2023年第4四半期の大幅な取引額増加は、複数の大型システム刷新プロジェクトの同時進行が要因です。",
  },
}

export function TransactionTimeline({ selectedGroupId }: TransactionTimelineProps) {
  const [viewType, setViewType] = useState("line_chart")
  const [timeRange, setTimeRange] = useState("quarterly")
  const [displayMetric, setDisplayMetric] = useState("amount")
  const [chartData, setChartData] = useState<any[]>([])

  // 選択されたグループのトレンド分析データ
  const trendAnalysis = trendAnalysisData[selectedGroupId as keyof typeof trendAnalysisData] || {
    cagr: 0,
    cagrChange: 0,
    seasonalityIndex: 0,
    seasonalityChange: 0,
    variationCoefficient: 0,
    variationChange: 0,
    longTermTrend: "",
    seasonality: "",
    variationFactors: "",
  }

  useEffect(() => {
    // グループIDと時間範囲に基づいてチャートデータを設定
    const groupData = timeSeriesData[selectedGroupId as keyof typeof timeSeriesData]
    if (groupData) {
      setChartData(groupData[timeRange as keyof typeof groupData] || [])
    }
  }, [selectedGroupId, timeRange])

  // Y軸のラベルを取得
  const getYAxisLabel = () => {
    switch (displayMetric) {
      case "amount":
        return "取引額（億円）"
      case "count":
        return "取引件数"
      case "average":
        return "平均取引額（億円）"
      default:
        return ""
    }
  }

  // X軸のキーを取得
  const getXAxisKey = () => {
    switch (timeRange) {
      case "yearly":
        return "year"
      case "quarterly":
        return "quarter"
      case "monthly":
        return "month"
      default:
        return "year"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">時系列取引推移グラフ</h2>
          <p className="text-muted-foreground">時間経過による取引の推移を分析します</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="時間範囲" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">年次</SelectItem>
              <SelectItem value="quarterly">四半期</SelectItem>
              <SelectItem value="monthly">月次</SelectItem>
            </SelectContent>
          </Select>
          <Select value={displayMetric} onValueChange={setDisplayMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="表示項目" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">取引額</SelectItem>
              <SelectItem value="count">取引件数</SelectItem>
              <SelectItem value="average">平均取引額</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={viewType} onValueChange={setViewType}>
        <TabsList>
          <TabsTrigger value="line_chart">
            <LineChart className="h-4 w-4 mr-2" />
            折れ線グラフ
          </TabsTrigger>
          <TabsTrigger value="bar_chart">
            <BarChart2 className="h-4 w-4 mr-2" />
            棒グラフ
          </TabsTrigger>
          <TabsTrigger value="area_chart">
            <AreaChart className="h-4 w-4 mr-2" />
            エリアチャート
          </TabsTrigger>
        </TabsList>
        <TabsContent value="line_chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>取引推移（折れ線グラフ）</CardTitle>
              <CardDescription>
                時系列での取引推移を折れ線グラフで表示（
                {displayMetric === "amount" ? "取引額" : displayMetric === "count" ? "取引件数" : "平均取引額"}）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisKey()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={displayMetric}
                      name={getYAxisLabel()}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bar_chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>取引推移（棒グラフ）</CardTitle>
              <CardDescription>
                時系列での取引推移を棒グラフで表示（
                {displayMetric === "amount" ? "取引額" : displayMetric === "count" ? "取引件数" : "平均取引額"}）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisKey()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={displayMetric} name={getYAxisLabel()} fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="area_chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>取引推移（エリアチャート）</CardTitle>
              <CardDescription>
                時系列での取引推移をエリアチャートで表示（
                {displayMetric === "amount" ? "取引額" : displayMetric === "count" ? "取引件数" : "平均取引額"}）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsAreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisKey()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey={displayMetric}
                      name={getYAxisLabel()}
                      fill="#8884d8"
                      stroke="#8884d8"
                      fillOpacity={0.3}
                    />
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>トレンド分析</CardTitle>
            <CardDescription>取引トレンドの分析と予測</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">年間平均成長率（CAGR）</div>
                  <div className="text-xl font-bold">{trendAnalysis.cagr}%</div>
                </div>
                <div className={trendAnalysis.cagrChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {trendAnalysis.cagrChange >= 0 ? "↑" : "↓"} {Math.abs(trendAnalysis.cagrChange)}%
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">季節性指数</div>
                  <div className="text-xl font-bold">{trendAnalysis.seasonalityIndex}</div>
                </div>
                <div className={trendAnalysis.seasonalityChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {trendAnalysis.seasonalityChange >= 0 ? "↑" : "↓"} {Math.abs(trendAnalysis.seasonalityChange)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">変動係数</div>
                  <div className="text-xl font-bold">{trendAnalysis.variationCoefficient}</div>
                </div>
                <div className={trendAnalysis.variationChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {trendAnalysis.variationChange >= 0 ? "↑" : "↓"} {Math.abs(trendAnalysis.variationChange)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">長期トレンド</h3>
                <p className="text-sm">{trendAnalysis.longTermTrend}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>季節変動分析</CardTitle>
            <CardDescription>取引の季節変動パターン</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">季節性</h3>
                <p className="text-sm">{trendAnalysis.seasonality}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">変動要因</h3>
                <p className="text-sm">{trendAnalysis.variationFactors}</p>
              </div>
              <div className="h-[150px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">季節変動グラフが表示されます</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
