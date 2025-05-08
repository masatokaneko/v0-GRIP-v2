export function AdminSettings() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">管理者設定</h1>
      <p className="text-gray-600">管理者設定のメインページです。左側のメニューから詳細設定を選択してください。</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">アカウント管理</h3>
          <p className="text-sm text-gray-500">ユーザーアカウントと権限の管理</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">システム連携</h3>
          <p className="text-sm text-gray-500">外部システムとの連携設定</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">組織管理</h3>
          <p className="text-sm text-gray-500">組織構造と部門の管理</p>
        </div>
      </div>
    </div>
  )
}
