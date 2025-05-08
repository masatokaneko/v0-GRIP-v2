"use client"

import { useState, useEffect } from "react"

// 権限タイプの定義
export type Permission =
  | "admin"
  | "account_management"
  | "user_list"
  | "permission_settings"
  | "access_history"
  | "system_integration"
  | "saas_integration"
  | "salesforce_integration"
  | "crm_integration"
  | "box_integration"
  | "onpremise_integration"
  | "internal_system_integration"
  | "legacy_system_connection"
  | "data_sync_settings"
  | "organization_management"
  | "group_company_settings"
  | "department_association"
  | "organization_chart"

// ユーザー権限の型
export interface UserPermissions {
  roles: string[]
  permissions: Permission[]
}

// モックユーザー権限データ
const mockPermissions: UserPermissions = {
  roles: ["admin", "manager"],
  permissions: [
    "admin",
    "account_management",
    "user_list",
    "permission_settings",
    "access_history",
    "system_integration",
    "saas_integration",
    "salesforce_integration",
    "crm_integration",
    "box_integration",
    "onpremise_integration",
    "internal_system_integration",
    "legacy_system_connection",
    "data_sync_settings",
    "organization_management",
    "group_company_settings",
    "department_association",
    "organization_chart",
  ],
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<UserPermissions | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 実際のアプリケーションではAPIからユーザー権限を取得
    // ここではモックデータを使用
    const fetchPermissions = async () => {
      // APIリクエストをシミュレート
      await new Promise((resolve) => setTimeout(resolve, 300))
      setPermissions(mockPermissions)
      setLoading(false)
    }

    fetchPermissions()
  }, [])

  // 特定の権限を持っているかチェックする関数
  const hasPermission = (permission: Permission): boolean => {
    if (!permissions) return false

    // admin権限を持っている場合は全ての権限を持っているとみなす
    if (permissions.permissions.includes("admin")) return true

    return permissions.permissions.includes(permission)
  }

  // 管理者ロールを持っているかチェックする関数
  const isAdmin = (): boolean => {
    if (!permissions) return false
    return permissions.roles.includes("admin")
  }

  return {
    permissions,
    loading,
    hasPermission,
    isAdmin,
  }
}
