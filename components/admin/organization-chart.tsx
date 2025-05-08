"use client"

import { useState, useCallback, useEffect } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  type NodeTypes,
  type EdgeTypes,
  ConnectionLineType,
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ZoomIn, ZoomOut, Maximize, Download, RefreshCw } from "lucide-react"
import { companies, capitalRelations, getCompanyById } from "@/lib/company-data"

// カスタムノードコンポーネント
const CompanyNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border border-gray-200">
      <div className="font-bold text-sm">{data.label}</div>
      {data.industry && <div className="text-xs text-gray-500">{data.industry}</div>}
    </div>
  )
}

// カスタムエッジコンポーネント
const OwnershipEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: any) => {
  const edgePath = `M ${sourceX},${sourceY} C ${sourceX} ${targetY},${sourceX} ${targetY},${targetX} ${targetY}`
  const labelX = (sourceX + targetX) / 2
  const labelY = (sourceY + targetY) / 2

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath} strokeWidth={2} stroke="#b1b1b7" />
      <foreignObject
        width={40}
        height={20}
        x={labelX - 20}
        y={labelY - 10}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="flex justify-center items-center h-full">
          <div className="px-1 py-0.5 text-xs bg-white border border-gray-200 rounded-sm">{data?.percentage}%</div>
        </div>
      </foreignObject>
    </>
  )
}

// ノードとエッジの型定義
const nodeTypes: NodeTypes = {
  company: CompanyNode,
}

const edgeTypes: EdgeTypes = {
  ownership: OwnershipEdge,
}

// フロー内部コンポーネント
function OrganizationFlowChart({ rootCompanyId }: { rootCompanyId: string }) {
  const reactFlowInstance = useReactFlow()
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  // 組織図データの生成
  const generateOrgChartData = useCallback(
    (rootId: string) => {
      const processedCompanies = new Set<string>()
      const newNodes: Node[] = []
      const newEdges: Edge[] = []

      // 再帰的に企業とその子会社を処理
      const processCompany = (companyId: string, level: number, position: { x: number; y: number }) => {
        if (processedCompanies.has(companyId)) return

        const company = getCompanyById(companyId)
        if (!company) return

        processedCompanies.add(companyId)

        // ノードを追加
        newNodes.push({
          id: companyId,
          type: "company",
          position,
          data: {
            label: company.name,
            industry: company.industry,
            foundedYear: company.foundedYear,
          },
        })

        // 子会社を取得
        const childRelations = capitalRelations.filter((relation) => relation.parentId === companyId)

        // 子会社ごとの位置を計算
        const childCount = childRelations.length
        const startX = position.x - ((childCount - 1) * 200) / 2

        // 子会社を処理
        childRelations.forEach((relation, index) => {
          const childPosition = {
            x: startX + index * 200,
            y: position.y + 150,
          }

          // エッジを追加
          newEdges.push({
            id: `e-${companyId}-${relation.childId}`,
            source: companyId,
            target: relation.childId,
            type: "ownership",
            data: {
              percentage: relation.ownershipPercentage,
            },
            style: { strokeWidth: 2 },
            animated: false,
            connectionLineType: ConnectionLineType.Bezier,
          })

          // 子会社を再帰的に処理
          processCompany(relation.childId, level + 1, childPosition)
        })
      }

      // ルート企業から処理開始
      processCompany(rootId, 0, { x: 0, y: 0 })

      setNodes(newNodes)
      setEdges(newEdges)

      // レイアウトを中央に配置
      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.2 })
      }, 100)
    },
    [reactFlowInstance],
  )

  // ルート企業が変更されたら組織図を再生成
  useEffect(() => {
    if (rootCompanyId) {
      generateOrgChartData(rootCompanyId)
    }
  }, [rootCompanyId, generateOrgChartData])

  // ズーム操作
  const zoomIn = () => {
    reactFlowInstance.zoomIn()
  }

  const zoomOut = () => {
    reactFlowInstance.zoomOut()
  }

  const fitView = () => {
    reactFlowInstance.fitView({ padding: 0.2 })
  }

  // 画像としてエクスポート
  const exportAsImage = () => {
    const dataUrl = reactFlowInstance.toObject()
    console.log("Export data:", dataUrl)
    // 実際の画像エクスポート処理はここに実装
    alert("画像エクスポート機能は開発中です")
  }

  return (
    <div className="h-[600px] border rounded-md bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Controls />
        <MiniMap />
        <Background />
        <Panel position="top-right">
          <div className="flex space-x-2 bg-white p-2 rounded-md shadow-sm">
            <Button variant="outline" size="icon" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={fitView}>
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={exportAsImage}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => generateOrgChartData(rootCompanyId)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}

// メインコンポーネント
export function OrganizationChart() {
  const [rootCompanyId, setRootCompanyId] = useState(companies[0]?.id || "")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">組織図表示</h2>
        <div className="flex space-x-2">
          <div className="w-64">
            <Select value={rootCompanyId} onValueChange={setRootCompanyId}>
              <SelectTrigger>
                <SelectValue placeholder="ルート企業を選択" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ReactFlowProvider>
        <OrganizationFlowChart rootCompanyId={rootCompanyId} />
      </ReactFlowProvider>

      <div className="text-sm text-gray-500">
        <p>※ 組織図は選択した企業を起点として、資本関係に基づいて表示されます。</p>
        <p>※ 企業ボックスをドラッグして位置を調整できます。</p>
      </div>
    </div>
  )
}
