"use client"

import React from "react"
import { useState, useEffect } from "react"
import {
  ChevronDown,
  ChevronRight,
  Settings,
  Users,
  Key,
  Clock,
  Cloud,
  Database,
  Building2,
  Network,
  FileText,
  HardDrive,
  RefreshCw,
  Briefcase,
  GitBranch,
  GitMerge,
  Building,
  BarChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { usePermissions, type Permission } from "@/hooks/use-permissions"

// メニュー項目の識別子の型定義
export type AdminMenuItemId =
  | "admin_settings"
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
  | "enterprise_management"
  | "group_company_settings"
  | "department_association"
  | "organization_chart"
  | "company_list"
  | "capital_relations"
  | "organization_view"

interface MenuItemProps {
  id: AdminMenuItemId
  title: string
  icon?: React.ReactNode
  permission?: Permission
  children?: React.ReactNode
  level?: number
  activeItem: AdminMenuItemId | null
  onSelectItem: (id: AdminMenuItemId) => void
  defaultOpen?: boolean
}

const MenuItem = ({
  id,
  title,
  icon,
  permission,
  children,
  level = 0,
  activeItem,
  onSelectItem,
  defaultOpen = false,
}: MenuItemProps) => {
  // アクティブな項目の親メニューを自動的に開くための状態
  const [open, setOpen] = useState(defaultOpen)
  const { hasPermission } = usePermissions()

  // アクティブな項目またはその子孫がアクティブな場合、メニューを開く
  useEffect(() => {
    const isActiveOrHasActiveChild =
      activeItem === id ||
      (children &&
        React.Children.toArray(children).some((child) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as MenuItemProps
            return (
              childProps.id === activeItem ||
              (childProps.children &&
                React.Children.toArray(childProps.children).some((grandChild) => {
                  if (React.isValidElement(grandChild)) {
                    return (grandChild.props as MenuItemProps).id === activeItem
                  }
                  return false
                }))
            )
          }
          return false
        }))

    if (isActiveOrHasActiveChild) {
      setOpen(true)
    }
  }, [activeItem, id, children])

  // 権限チェック
  if (permission && !hasPermission(permission)) {
    return null
  }

  const hasChildren = Boolean(children)
  const isActive = activeItem === id
  const indentClass = level === 0 ? "" : level === 1 ? "ml-4" : "ml-8"

  if (hasChildren) {
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-full">
        <div className={cn("flex items-center", indentClass)}>
          {/* メニュー項目 */}
          <Button
            variant="ghost"
            className={cn(
              "flex flex-1 items-center justify-start gap-2 p-2 text-sm font-medium",
              isActive ? "bg-blue-50 text-[#002B5B]" : "text-gray-600 hover:bg-gray-100",
            )}
            onClick={() => onSelectItem(id)}
          >
            {icon}
            <span className="flex-1 text-left">{title}</span>
          </Button>

          {/* 折りたたみトリガー */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex w-full items-center justify-start gap-2 p-2 text-sm font-medium",
        indentClass,
        isActive ? "bg-blue-50 text-[#002B5B]" : "text-gray-600 hover:bg-gray-100",
      )}
      onClick={() => onSelectItem(id)}
    >
      {icon}
      <span className="flex-1 text-left">{title}</span>
    </Button>
  )
}

interface AdminMenuProps {
  activeItem: AdminMenuItemId | null
  onSelectItem: (id: AdminMenuItemId) => void
}

export function AdminMenu({ activeItem, onSelectItem }: AdminMenuProps) {
  const { isAdmin, loading } = usePermissions()

  if (loading) {
    return (
      <div className="py-2">
        <div className="flex items-center px-3 py-2">
          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
          <div className="ml-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    )
  }

  // 管理者権限がない場合は何も表示しない
  if (!isAdmin()) {
    return null
  }

  return (
    <div className="py-2">
      <Separator className="my-2" />
      <div className="px-3 py-2">
        <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">管理者メニュー</h3>
        <nav className="space-y-1">
          {/* 管理者設定メニュー */}
          <MenuItem
            id="admin_settings"
            title="管理者設定"
            icon={<Settings className="h-5 w-5" />}
            permission="admin"
            activeItem={activeItem}
            onSelectItem={onSelectItem}
          >
            <MenuItem
              id="account_management"
              title="アカウント管理"
              icon={<Users className="h-5 w-5" />}
              permission="account_management"
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            >
              <MenuItem
                id="user_list"
                title="ユーザー一覧"
                icon={<Users className="h-4 w-4" />}
                permission="user_list"
                level={2}
                activeItem={activeItem}
                onSelectItem={onSelectItem}
              />
              <MenuItem
                id="permission_settings"
                title="権限設定"
                icon={<Key className="h-4 w-4" />}
                permission="permission_settings"
                level={2}
                activeItem={activeItem}
                onSelectItem={onSelectItem}
              />
              <MenuItem
                id="access_history"
                title="アクセス履歴"
                icon={<Clock className="h-4 w-4" />}
                permission="access_history"
                level={2}
                activeItem={activeItem}
                onSelectItem={onSelectItem}
              />
            </MenuItem>

            <MenuItem
              id="system_integration"
              title="システム連携"
              icon={<Network className="h-5 w-5" />}
              permission="system_integration"
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            >
              <MenuItem
                id="saas_integration"
                title="SaaS連携"
                icon={<Cloud className="h-4 w-4" />}
                permission="saas_integration"
                level={2}
                activeItem={activeItem}
                onSelectItem={onSelectItem}
              >
                <MenuItem
                  id="salesforce_integration"
                  title="Salesforce連携設定"
                  icon={<Cloud className="h-4 w-4" />}
                  permission="salesforce_integration"
                  level={3}
                  activeItem={activeItem}
                  onSelectItem={onSelectItem}
                />
                <MenuItem
                  id="crm_integration"
                  title="CRM連携設定"
                  icon={<Users className="h-4 w-4" />}
                  permission="crm_integration"
                  level={3}
                  activeItem={activeItem}
                  onSelectItem={onSelectItem}
                />
                <MenuItem
                  id="box_integration"
                  title="ファイルストレージ連携（Box）"
                  icon={<FileText className="h-4 w-4" />}
                  permission="box_integration"
                  level={3}
                  activeItem={activeItem}
                  onSelectItem={onSelectItem}
                />
              </MenuItem>

              <MenuItem
                id="onpremise_integration"
                title="オンプレ連携"
                icon={<Database className="h-4 w-4" />}
                permission="onpremise_integration"
                level={2}
                activeItem={activeItem}
                onSelectItem={onSelectItem}
              >
                <MenuItem
                  id="internal_system_integration"
                  title="社内システム連携設定"
                  icon={<HardDrive className="h-4 w-4" />}
                  permission="internal_system_integration"
                  level={3}
                  activeItem={activeItem}
                  onSelectItem={onSelectItem}
                />
                <MenuItem
                  id="legacy_system_connection"
                  title="レガシーシステム接続"
                  icon={<Database className="h-4 w-4" />}
                  permission="legacy_system_connection"
                  level={3}
                  activeItem={activeItem}
                  onSelectItem={onSelectItem}
                />
                <MenuItem
                  id="data_sync_settings"
                  title="データ同期設定"
                  icon={<RefreshCw className="h-4 w-4" />}
                  permission="data_sync_settings"
                  level={3}
                  activeItem={activeItem}
                  onSelectItem={onSelectItem}
                />
              </MenuItem>
            </MenuItem>

            <MenuItem
              id="organization_management"
              title="組織管理"
              icon={<Building2 className="h-5 w-5" />}
              permission="organization_management"
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
          </MenuItem>

          {/* 企業管理メニュー - 新しいルートレベルメニュー */}
          <MenuItem
            id="enterprise_management"
            title="企業管理"
            icon={<Building className="h-5 w-5" />}
            activeItem={activeItem}
            onSelectItem={onSelectItem}
          >
            <MenuItem
              id="group_company_settings"
              title="グループ企業設定"
              icon={<Briefcase className="h-4 w-4" />}
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
            <MenuItem
              id="department_association"
              title="部門間関連付け"
              icon={<GitBranch className="h-4 w-4" />}
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
            <MenuItem
              id="organization_chart"
              title="組織図表示"
              icon={<GitMerge className="h-4 w-4" />}
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
            <MenuItem
              id="company_list"
              title="企業一覧"
              icon={<Building className="h-4 w-4" />}
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
            <MenuItem
              id="capital_relations"
              title="資本関係管理"
              icon={<GitBranch className="h-4 w-4" />}
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
            <MenuItem
              id="organization_view"
              title="組織図表示"
              icon={<BarChart className="h-4 w-4" />}
              level={1}
              activeItem={activeItem}
              onSelectItem={onSelectItem}
            />
          </MenuItem>
        </nav>
      </div>
    </div>
  )
}
