import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart } from "@/components/charts"

export function ExecutiveSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sales History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>過去の売上 (億円)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <BarChart />
        </CardContent>
      </Card>

      {/* Pipeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>商談パイプライン</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <PieChart />
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>主要関係指標</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">総売上 (FY2024)</div>
              <div className="text-2xl font-bold mt-1">45.8億円</div>
              <div className="text-xs text-green-600 mt-1">+8.3% vs FY2023</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">アクティブな商談</div>
              <div className="text-2xl font-bold mt-1">10</div>
              <div className="text-xs text-blue-600 mt-1">+2 vs 前四半期</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">コンタクト頻度</div>
              <div className="text-2xl font-bold mt-1">月次</div>
              <div className="text-xs text-gray-500 mt-1">直近30日: 8回</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
