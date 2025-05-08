"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ZoomIn, ZoomOut, Grid, Network } from "lucide-react"
import dynamic from "next/dynamic"

// クライアントサイドでのみ ForceGraph をロード
const ForceGraph2D = dynamic(() => import("react-force-graph").then((mod) => mod.ForceGraph2D), { ssr: false })

interface TransactionHeatmapProps {
  selectedGroupId: string
}

// 日立グループのヒートマップデータ
const hitachiHeatmapData = [
  ["", "日立製作所", "日立システムズ", "日立Astemo", "日立ハイテク", "日立建機"],
  ["三菱商事", 14.2, 8.5, 3.2, 5.2, 9.8],
  ["メタルワン", 6.7, 2.1, 10.3, 1.8, 18.5],
  ["三菱電機", 7.9, 5.4, 2.8, 7.2, 3.1],
  ["三菱重工", 11.2, 3.5, 8.1, 4.9, 7.6],
  ["三菱ケミカル", 5.8, 1.9, 6.3, 9.3, 2.7],
]

// 富士通グループのヒートマップデータ
const fujitsuHeatmapData = [
  ["", "富士通", "富士通Japan", "富士通ネットワーク", "富士通クライアント", "富士通研究所"],
  ["三菱商事", 32.7, 12.5, 8.7, 6.3, 4.2],
  ["三菱電機", 15.3, 18.4, 7.2, 5.8, 3.6],
  ["三菱重工", 9.8, 7.5, 5.3, 25.6, 2.1],
  ["三菱UFJ", 22.4, 8.9, 15.7, 4.5, 1.8],
  ["三菱ケミカル", 6.7, 4.3, 2.8, 3.5, 8.9],
]

// ネットワークグラフデータ
const networkData = {
  HTG001: {
    nodes: [
      { id: "MC001", name: "三菱商事", group: 1, value: 30 },
      { id: "MC002", name: "メタルワン", group: 1, value: 25 },
      { id: "MC003", name: "三菱電機", group: 1, value: 20 },
      { id: "MC004", name: "三菱重工", group: 1, value: 22 },
      { id: "MC005", name: "三菱ケミカル", group: 1, value: 18 },
      { id: "HT001", name: "日立製作所", group: 2, value: 35 },
      { id: "HT002", name: "日立建機", group: 2, value: 28 },
      { id: "HT003", name: "日立金属", group: 2, value: 20 },
      { id: "HT004", name: "日立化成", group: 2, value: 22 },
      { id: "HT005", name: "日立ハイテク", group: 2, value: 25 },
    ],
    links: [
      { source: "MC001", target: "HT001", value: 14.2 },
      { source: "MC001", target: "HT004", value: 7.8 },
      { source: "MC002", target: "HT002", value: 18.5 },
      { source: "MC002", target: "HT003", value: 9.3 },
      { source: "MC003", target: "HT001", value: 5.6 },
      { source: "MC003", target: "HT005", value: 7.2 },
      { source: "MC004", target: "HT001", value: 11.2 },
      { source: "MC004", target: "HT003", value: 8.1 },
      { source: "MC005", target: "HT004", value: 6.3 },
      { source: "MC005", target: "HT005", value: 9.3 },
    ],
  },
  FJG001: {
    nodes: [
      { id: "MC001", name: "三菱商事", group: 1, value: 35 },
      { id: "MC003", name: "三菱電機", group: 1, value: 25 },
      { id: "MC004", name: "三菱重工", group: 1, value: 28 },
      { id: "MC005", name: "三菱ケミカル", group: 1, value: 20 },
      { id: "MC006", name: "三菱UFJ", group: 1, value: 22 },
      { id: "FJ001", name: "富士通", group: 2, value: 40 },
      { id: "FJ002", name: "富士通Japan", group: 2, value: 30 },
      { id: "FJ003", name: "富士通ネットワーク", group: 2, value: 25 },
      { id: "FJ004", name: "富士通クライアント", group: 2, value: 28 },
      { id: "FJ006", name: "富士通研究所", group: 2, value: 22 },
    ],
    links: [
      { source: "MC001", target: "FJ001", value: 32.7 },
      { source: "MC001", target: "FJ006", value: 4.2 },
      { source: "MC003", target: "FJ002", value: 18.4 },
      { source: "MC003", target: "FJ001", value: 15.3 },
      { source: "MC004", target: "FJ004", value: 25.6 },
      { source: "MC004", target: "FJ001", value: 9.8 },
      { source: "MC005", target: "FJ006", value: 8.9 },
      { source: "MC006", target: "FJ001", value: 22.4 },
      { source: "MC006", target: "FJ003", value: 15.7 },
    ],
  },
}

// 取引集中度分析データ
const concentrationData = {
  HTG001: {
    topPairs: [
      { pair: "メタルワン - 日立建機", amount: 18.5, percentage: 22 },
      { pair: "三菱商事 - 日立製作所", amount: 14.2, percentage: 17 },
      { pair: "三菱重工 - 日立製作所", amount: 11.2, percentage: 13 },
    ],
    growthPairs: [
      { pair: "三菱重工 - 日立製作所", growth: 25 },
      { pair: "三菱電機 - 日立ハイテク", growth: 18 },
      { pair: "メタルワン - 日立Astemo", growth: 15 },
    ],
    decliningPairs: [
      { pair: "三菱ケミカル - 日立システムズ", growth: -10 },
      { pair: "メタルワン - 日立ハイテク", growth: -8 },
      { pair: "三菱電機 - 日立建機", growth: -5 },
    ],
  },
  FJG001: {
    topPairs: [
      { pair: "三菱商事 - 富士通", amount: 32.7, percentage: 24 },
      { pair: "三菱重工 - 富士通クライアント", amount: 25.6, percentage: 19 },
      { pair: "三菱UFJ - 富士通", amount: 22.4, percentage: 16 },
    ],
    growthPairs: [
      { pair: "三菱商事 - 富士通", growth: 28 },
      { pair: "三菱重工 - 富士通クライアント", growth: 22 },
      { pair: "三菱電機 - 富士通Japan", growth: 17 },
    ],
    decliningPairs: [
      { pair: "三菱ケミカル - 富士通ネットワーク", growth: -12 },
      { pair: "三菱UFJ - 富士通クライアント", growth: -7 },
      { pair: "三菱電機 - 富士通研究所", growth: -4 },
    ],
  },
}

export function TransactionHeatmap({ selectedGroupId }: TransactionHeatmapProps) {
  const [viewType, setViewType] = useState("matrix")
  const [displayMetric, setDisplayMetric] = useState("amount")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] })
  const [isBrowser, setIsBrowser] = useState(false)

  // 選択されたグループのヒートマップデータ
  const heatmapData = selectedGroupId === "HTG001" ? hitachiHeatmapData : fujitsuHeatmapData

  // 選択されたグループの取引集中度分析データ
  const concentration = concentrationData[selectedGroupId as keyof typeof concentrationData] || {
    topPairs: [],
    growthPairs: [],
    decliningPairs: [],
  }

  useEffect(() => {
    // クライアントサイドでのみ実行されるようにする
    setIsBrowser(true)

    // グループIDに基づいてネットワークグラフデータを設定
    const data = networkData[selectedGroupId as keyof typeof networkData]
    if (data) {
      setGraphData({
        nodes: data.nodes,
        links: data.links,
      })
    }
  }, [selectedGroupId])

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25)
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25)
  }

  // ヒートマップの色を取得する関数
  const getHeatmapColor = (value: number) => {
    const max = 30 // 最大値の目安
    const intensity = Math.min(value / max, 1)
    const r = Math.round(255 * intensity)
    const g = Math.round(50 * (1 - intensity))
    const b = Math.round(50 * (1 - intensity))
    return `rgb(${r}, ${g}, ${b})`
  }

  // ヒートマップのテキスト色を取得する関数
  const getTextColor = (value: number) => {
    return value > 10 ? "white" : "black"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">会社間取引ヒートマップ</h2>
          <p className="text-muted-foreground">会社間の取引関係を視覚化します</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="表示形式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matrix">マトリックス表示</SelectItem>
              <SelectItem value="network">ネットワーク表示</SelectItem>
            </SelectContent>
          </Select>
          <Select value={displayMetric} onValueChange={setDisplayMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="表示項目" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">取引額</SelectItem>
              <SelectItem value="count">取引件数</SelectItem>
              <SelectItem value="growth">成長率</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="matrix_view">
        <TabsList>
          <TabsTrigger value="matrix_view">
            <Grid className="h-4 w-4 mr-2" />
            マトリックス表示
          </TabsTrigger>
          <TabsTrigger value="network_view">
            <Network className="h-4 w-4 mr-2" />
            ネットワーク表示
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matrix_view" className="space-y-4">
          <Card className="relative">
            <CardHeader>
              <CardTitle>取引ヒートマップ（マトリックス）</CardTitle>
              <CardDescription>
                会社間の取引関係をマトリックス形式で表示（
                {displayMetric === "amount" ? "取引額" : displayMetric === "count" ? "取引件数" : "成長率"}）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <div
                className="h-[600px] overflow-auto"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
              >
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      {heatmapData[0].map((header, index) => (
                        <th key={index} className="border p-2 bg-gray-100">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapData.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                          if (cellIndex === 0) {
                            return (
                              <th key={cellIndex} className="border p-2 bg-gray-100">
                                {cell}
                              </th>
                            )
                          }
                          const value = cell as number
                          return (
                            <td
                              key={cellIndex}
                              className="border p-2 text-center"
                              style={{
                                backgroundColor: getHeatmapColor(value),
                                color: getTextColor(value),
                              }}
                            >
                              {value}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="network_view" className="space-y-4">
          <Card className="relative">
            <CardHeader>
              <CardTitle>取引ネットワーク</CardTitle>
              <CardDescription>
                会社間の取引関係をネットワーク図で表示（
                {displayMetric === "amount" ? "取引額" : displayMetric === "count" ? "取引件数" : "成長率"}）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <div className="h-[600px] w-full">
                {isBrowser && (
                  <ForceGraph2D
                    graphData={graphData}
                    nodeLabel={(node: any) => `${node.name}: ${node.value}億円`}
                    linkLabel={(link: any) => `${link.value}億円`}
                    nodeAutoColorBy="group"
                    linkWidth={(link: any) => Math.sqrt(link.value) * 0.5}
                    linkDirectionalParticles={2}
                    linkDirectionalParticleWidth={(link: any) => Math.sqrt(link.value) * 0.5}
                    nodeCanvasObject={(node: any, ctx, globalScale) => {
                      const label = node.name
                      const fontSize = 12 / globalScale
                      ctx.font = `${fontSize}px Sans-Serif`
                      const textWidth = ctx.measureText(label).width
                      const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2)

                      ctx.fillStyle = node.group === 1 ? "rgba(255, 0, 0, 0.8)" : "rgba(0, 0, 255, 0.8)"
                      ctx.beginPath()
                      ctx.arc(node.x, node.y, Math.sqrt(node.value) * 1.5, 0, 2 * Math.PI, false)
                      ctx.fill()

                      ctx.textAlign = "center"
                      ctx.textBaseline = "middle"
                      ctx.fillStyle = "white"
                      ctx.fillText(label, node.x, node.y)
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>取引集中度分析</CardTitle>
          <CardDescription>取引の集中度と主要取引関係の分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">取引額上位ペア</h3>
              <div className="space-y-2">
                {concentration.topPairs.map((pair, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{pair.pair}</span>
                    <div className="text-right">
                      <div className="font-medium">{pair.amount}億円</div>
                      <div className="text-xs text-gray-500">{pair.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">成長率上位ペア</h3>
              <div className="space-y-2">
                {concentration.growthPairs.map((pair, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{pair.pair}</span>
                    <span className="font-medium text-green-600">+{pair.growth}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">減少率上位ペア</h3>
              <div className="space-y-2">
                {concentration.decliningPairs.map((pair, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{pair.pair}</span>
                    <span className="font-medium text-red-600">{pair.growth}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
