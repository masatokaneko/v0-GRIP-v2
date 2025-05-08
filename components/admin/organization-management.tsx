export function OrganizationManagement() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">組織管理</h1>
      <p className="text-gray-600 mb-6">
        組織構造と部門の管理を行います。左側のメニューから詳細設定を選択してください。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">グループ企業設定</h3>
          <p className="text-sm text-gray-500">グループ企業の管理と設定</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">部門間関連付け</h3>
          <p className="text-sm text-gray-500">部門間の関連性の設定</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">組織図表示</h3>
          <p className="text-sm text-gray-500">組織構造の視覚的な表示</p>
        </div>
      </div>
    </div>
  )
}
