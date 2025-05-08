export function AccountManagement() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">アカウント管理</h1>
      <p className="text-gray-600 mb-6">
        ユーザーアカウントと権限を管理します。左側のメニューから詳細設定を選択してください。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">ユーザー一覧</h3>
          <p className="text-sm text-gray-500">システムユーザーの一覧と管理</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">権限設定</h3>
          <p className="text-sm text-gray-500">ユーザー権限の設定と管理</p>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <h3 className="font-medium mb-2">アクセス履歴</h3>
          <p className="text-sm text-gray-500">ユーザーのアクセス履歴の確認</p>
        </div>
      </div>
    </div>
  )
}
