import { AdminSettings } from "./admin-settings"
import { AccountManagement } from "./account-management"
import { UserList } from "./user-list"
import { PermissionSettings } from "./permission-settings"
import { AccessHistory } from "./access-history"
import { SystemIntegration } from "./system-integration"
import { OrganizationManagement } from "./organization-management"
import { CompanyList } from "./company-list"
import { CapitalRelations } from "./capital-relations"
import { OrganizationChart } from "./organization-chart"
import type { AdminMenuItemId } from "../admin-menu"

interface AdminContentProps {
  activeItem: AdminMenuItemId | null
}

export function AdminContent({ activeItem }: AdminContentProps) {
  // アクティブなメニュー項目に基づいて表示するコンテンツを決定
  switch (activeItem) {
    case "admin_settings":
      return <AdminSettings />
    case "account_management":
      return <AccountManagement />
    case "user_list":
      return <UserList />
    case "permission_settings":
      return <PermissionSettings />
    case "access_history":
      return <AccessHistory />
    case "system_integration":
      return <SystemIntegration />
    case "organization_management":
      return <OrganizationManagement />

    // 企業管理関連のメニュー項目
    case "enterprise_management":
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">企業管理</h1>
          <p className="text-gray-600 mb-6">
            企業情報と組織構造の管理を行います。左側のメニューから詳細設定を選択してください。
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
    case "group_company_settings":
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">グループ企業設定</h1>
          <p className="text-gray-600">グループ企業の管理と設定を行います。</p>
        </div>
      )
    case "department_association":
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">部門間関連付け</h1>
          <p className="text-gray-600">部門間の関連性の設定を行います。</p>
        </div>
      )
    case "organization_chart":
      return (
        <div className="p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">組織図表示</h1>
          <p className="text-gray-600">組織構造の視覚的な表示を行います。</p>
        </div>
      )

    // 新しい企業管理のサブメニュー
    case "company_list":
      return <CompanyList />
    case "capital_relations":
      return <CapitalRelations />
    case "organization_view":
      return <OrganizationChart />
    default:
      return null
  }
}
