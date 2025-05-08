export function SystemIntegration() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">システム連携</h1>
      <p className="text-gray-600 mb-6">
        外部システムとの連携設定を管理します。左側のメニューから詳細設定を選択してください。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">SaaS連携</h3>
          <p className="text-sm text-gray-500">クラウドサービスとの連携設定</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">オンプレ連携</h3>
          <p className="text-sm text-gray-500">社内システムとの連携設定</p>
        </div>
      </div>
    </div>
  )
}
