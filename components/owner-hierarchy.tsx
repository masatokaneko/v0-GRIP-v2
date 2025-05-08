export function OwnerHierarchy() {
  return (
    <div className="rounded-2xl shadow bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">オーナーシップ構造</h2>
      <div className="space-y-3">
        {/* Lead Owner */}
        <div className="p-3 rounded-lg border border-gray-200 flex items-center">
          <div className="w-2 h-10 bg-[#002B5B] rounded mr-3"></div>
          <div>
            <div className="font-medium">佐藤 一郎</div>
            <div className="text-sm text-gray-500">リードオーナー • 三菱商事 • 取締役副社長</div>
          </div>
        </div>

        {/* Group Owner */}
        <div className="p-3 rounded-lg border border-gray-200 flex items-center ml-4">
          <div className="w-2 h-10 bg-[#F97316] rounded mr-3"></div>
          <div>
            <div className="font-medium">田中 次郎</div>
            <div className="text-sm text-gray-500">グループオーナー • メタルワン • 営業本部長</div>
          </div>
        </div>

        {/* Company Owner with gradient */}
        <div className="p-3 rounded-lg border border-gray-200 flex items-center ml-8">
          <div
            className="w-2 h-10 rounded mr-3"
            style={{ background: "linear-gradient(135deg, #F97316, #1E40AF)" }}
          ></div>
          <div>
            <div className="font-medium">渡辺 六郎</div>
            <div className="text-sm text-gray-500">
              カンパニーオーナー • メタルワン ↔ 日立製作所 • アカウントマネージャー
            </div>
          </div>
        </div>

        {/* Additional Group Owner */}
        <div className="p-3 rounded-lg border border-gray-200 flex items-center ml-4">
          <div className="w-2 h-10 bg-[#EF4444] rounded mr-3"></div>
          <div>
            <div className="font-medium">山田 三郎</div>
            <div className="text-sm text-gray-500">グループオーナー • 三菱商事 • 事業開発部長</div>
          </div>
        </div>

        {/* Additional Company Owners */}
        <div className="p-3 rounded-lg border border-gray-200 flex items-center ml-8">
          <div
            className="w-2 h-10 rounded mr-3"
            style={{ background: "linear-gradient(135deg, #EF4444, #3B82F6)" }}
          ></div>
          <div>
            <div className="font-medium">鈴木 四郎</div>
            <div className="text-sm text-gray-500">カンパニーオーナー • 三菱商事 ↔ 日立建機 • シニアマネージャー</div>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-gray-200 flex items-center ml-8">
          <div
            className="w-2 h-10 rounded mr-3"
            style={{ background: "linear-gradient(135deg, #EF4444, #8B5CF6)" }}
          ></div>
          <div>
            <div className="font-medium">高橋 五郎</div>
            <div className="text-sm text-gray-500">カンパニーオーナー • 三菱商事 ↔ 日立金属 • マネージャー</div>
          </div>
        </div>
      </div>
    </div>
  )
}
