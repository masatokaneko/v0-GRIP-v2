"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import ReactFlow, { Background, Controls, MiniMap, type Node, type Edge, MarkerType } from "reactflow"
import "reactflow/dist/style.css"

interface TransactionFlowProps {
  selectedGroupId: string
}

// 日立グループのノードとエッジ
const hitachiNodes: Node[] = [
  {
    id: "mc001",
    data: { label: "三菱商事" },
    position: { x: 250, y: 100 },
    style: { backgroundColor: "#EF4444", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "mc002",
    data: { label: "メタルワン" },
    position: { x: 250, y: 200 },
    style: { backgroundColor: "#F97316", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "mc003",
    data: { label: "三菱電機" },
    position: { x: 250, y: 300 },
    style: { backgroundColor: "#10B981", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "ht001",
    data: { label: "日立製作所" },
    position: { x: 500, y: 50 },
    style: { backgroundColor: "#1E40AF", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "ht002",
    data: { label: "日立建機" },
    position: { x: 500, y: 150 },
    style: { backgroundColor: "#3B82F6", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "ht003",
    data: { label: "日立金属" },
    position: { x: 500, y: 250 },
    style: { backgroundColor: "#8B5CF6", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "ht004",
    data: { label: "日立化成" },
    position: { x: 500, y: 350 },
    style: { backgroundColor: "#EC4899", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
]

const hitachiEdges: Edge[] = [
  {
    id: "e1-2",
    source: "mc001",
    target: "ht001",
    label: "14.2億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#1E40AF", strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#1E40AF",
    },
  },
  {
    id: "e1-3",
    source: "mc001",
    target: "ht004",
    label: "7.8億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#EC4899", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#EC4899",
    },
  },
  {
    id: "e2-4",
    source: "mc002",
    target: "ht002",
    label: "18.5億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#3B82F6", strokeWidth: 4 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#3B82F6",
    },
  },
  {
    id: "e2-5",
    source: "mc002",
    target: "ht003",
    label: "9.3億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#8B5CF6", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#8B5CF6",
    },
  },
  {
    id: "e3-2",
    source: "mc003",
    target: "ht001",
    label: "5.6億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#1E40AF", strokeWidth: 1 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#1E40AF",
    },
  },
]

// 富士通グループのノードとエッジ
const fujitsuNodes: Node[] = [
  {
    id: "mc001",
    data: { label: "三菱商事" },
    position: { x: 250, y: 100 },
    style: { backgroundColor: "#EF4444", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "mc003",
    data: { label: "三菱電機" },
    position: { x: 250, y: 200 },
    style: { backgroundColor: "#10B981", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "mc006",
    data: { label: "三菱UFJ" },
    position: { x: 250, y: 300 },
    style: { backgroundColor: "#0EA5E9", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "fj001",
    data: { label: "富士通" },
    position: { x: 500, y: 50 },
    style: { backgroundColor: "#FF0000", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "fj002",
    data: { label: "富士通Japan" },
    position: { x: 500, y: 150 },
    style: { backgroundColor: "#FF5733", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "fj003",
    data: { label: "富士通ネットワーク" },
    position: { x: 500, y: 250 },
    style: { backgroundColor: "#C70039", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
  {
    id: "fj006",
    data: { label: "富士通研究所" },
    position: { x: 500, y: 350 },
    style: { backgroundColor: "#7D3C98", color: "white", borderRadius: "8px", padding: "10px", width: 150 },
  },
]

const fujitsuEdges: Edge[] = [
  {
    id: "e1-2",
    source: "mc001",
    target: "fj001",
    label: "32.7億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#FF0000", strokeWidth: 5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0000",
    },
  },
  {
    id: "e2-3",
    source: "mc003",
    target: "fj002",
    label: "18.4億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#FF5733", strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF5733",
    },
  },
  {
    id: "e3-4",
    source: "mc006",
    target: "fj003",
    label: "15.7億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#C70039", strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#C70039",
    },
  },
  {
    id: "e1-5",
    source: "mc001",
    target: "fj006",
    label: "4.2億円",
    labelStyle: { fill: "#333", fontWeight: 700 },
    style: { stroke: "#7D3C98", strokeWidth: 1 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#7D3C98",
    },
  },
]

// 主要取引フローデータ
const topFlowsData = {
  HTG001: [
    { from: "三菱商事", to: "日立製作所", amount: 14.2, description: "システム連携プロジェクト" },
    { from: "メタルワン", to: "日立建機", amount: 18.5, description: "建設機械部品供給" },
    { from: "メタルワン", to: "日立金属", amount: 9.3, description: "特殊合金取引" },
    { from: "三菱商事", to: "日立化成", amount: 7.8, description: "化学製品取引" },
    { from: "三菱電機", to: "日立製作所", amount: 5.6, description: "共同研究開発" },
  ],
  FJG001: [
    { from: "三菱商事", to: "富士通", amount: 32.7, description: "基幹システム刷新プロジェクト" },
    { from: "三菱電機", to: "富士通Japan", amount: 18.4, description: "物流管理システム導入" },
    { from: "三菱UFJ", to: "富士通ネットワーク", amount: 15.7, description: "SDN導入プロジェクト" },
    { from: "三菱重工", to: "富士通クライアント", amount: 25.6, description: "店舗システム運用保守" },
    { from: "三菱商事", to: "富士通研究所", amount: 4.2, description: "食品安全AIプロジェクト" },
  ],
}

// 取引フロー統計データ
const flowStatsData = {
  HTG001: {
    inboundRatio: 65,
    outboundRatio: 35,
    topFiveRatio: 80,
    otherRatio: 20,
    totalFlows: 28,
    avgAmount: 8.7,
  },
  FJG001: {
    inboundRatio: 72,
    outboundRatio: 28,
    topFiveRatio: 85,
    otherRatio: 15,
    totalFlows: 35,
    avgAmount: 12.3,
  },
}

export function TransactionFlow({ selectedGroupId }: TransactionFlowProps) {
  const [viewType, setViewType] = useState("all")
  const [fiscalYear, setFiscalYear] = useState("2024")
  const [zoomLevel, setZoomLevel] = useState(1)

  // 選択されたグループに基づいてノードとエッジを設定
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  // 選択されたグループの主要取引フロー
  const topFlows = topFlowsData[selectedGroupId as keyof typeof topFlowsData] || []

  // 選択されたグループの取引フロー統計
  const flowStats = flowStatsData[selectedGroupId as keyof typeof flowStatsData] || {
    inboundRatio: 0,
    outboundRatio: 0,
    topFiveRatio: 0,
    otherRatio: 0,
    totalFlows: 0,
    avgAmount: 0,
  }

  useEffect(() => {
    // グループIDに基づいてノードとエッジを設定
    if (selectedGroupId === "HTG001") {
      setNodes(hitachiNodes)
      setEdges(hitachiEdges)
    } else if (selectedGroupId === "FJG001") {
      setNodes(fujitsuNodes)
      setEdges(fujitsuEdges)
    }
  }, [selectedGroupId])

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25)
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">取引フロー可視化</h2>
          <p className="text-muted-foreground">グループ内外の取引フローを可視化します</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="取引タイプ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全取引</SelectItem>
              <SelectItem value="inbound">受注取引</SelectItem>
              <SelectItem value="outbound">発注取引</SelectItem>
            </SelectContent>
          </Select>
          <Select value={fiscalYear} onValueChange={setFiscalYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="会計年度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024年度</SelectItem>
              <SelectItem value="2023">2023年度</SelectItem>
              <SelectItem value="2022">2022年度</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="flow_diagram">
        <TabsList>
          <TabsTrigger value="flow_diagram">フロー図</TabsTrigger>
          <TabsTrigger value="flow_list">フローリスト</TabsTrigger>
          <TabsTrigger value="flow_stats">統計情報</TabsTrigger>
        </TabsList>
        <TabsContent value="flow_diagram" className="space-y-4">
          <Card className="relative">
            <CardHeader>
              <CardTitle>取引フロー図</CardTitle>
              <CardDescription>企業間の取引フローを視覚化したダイアグラム</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div
                className="h-[500px] w-full"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
              >
                <ReactFlow nodes={nodes} edges={edges} fitView>
                  <Controls />
                  <MiniMap />
                  <Background />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flow_list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>主要取引フローリスト</CardTitle>
              <CardDescription>取引額上位のフロー一覧</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFlows.map((flow, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {flow.from} → {flow.to}
                      </div>
                      <div className="text-sm text-gray-500">{flow.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{flow.amount}億円</div>
                      <div className="text-xs text-gray-500">{fiscalYear}年度</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flow_stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>取引フロー統計</CardTitle>
              <CardDescription>取引フローに関する統計情報</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">取引方向別割合</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-l-full"
                        style={{ width: `${flowStats.inboundRatio}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>受注: {flowStats.inboundRatio}%</span>
                    <span>発注: {flowStats.outboundRatio}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">取引集中度</h3>
                  <div className="grid grid-cols-5 gap-1">
                    <div className="bg-blue-900 h-16 rounded-md"></div>
                    <div className="bg-blue-700 h-12 rounded-md"></div>
                    <div className="bg-blue-500 h-8 rounded-md"></div>
                    <div className="bg-blue-300 h-6 rounded-md"></div>
                    <div className="bg-blue-100 h-4 rounded-md"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>上位20%の取引先: {flowStats.topFiveRatio}%の取引額</span>
                    <span>その他: {flowStats.otherRatio}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">総取引フロー数</h3>
                    <div className="text-2xl font-bold">{flowStats.totalFlows}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">平均取引額</h3>
                    <div className="text-2xl font-bold">{flowStats.avgAmount}億円</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
