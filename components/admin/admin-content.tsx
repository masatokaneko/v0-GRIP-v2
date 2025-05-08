import { AdminSettings } from "./admin-settings"
import { AccountManagement } from "./account-management"
import { UserList } from "./user-list"
import { PermissionSettings } from "./permission-settings"
import { AccessHistory } from "./access-history"
import { SystemIntegration } from "./system-integration"
import { OrganizationManagement } from "./organization-management"
import type { AdminMenuItemId } from "../admin-menu"

// 他の管理画面コンポーネントもインポート（省略）

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
    // 他のメニュー項目に対応するコンポーネントも追加（省略）
    default:
      return null
  }
}
