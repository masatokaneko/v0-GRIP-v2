"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Search, Download, Upload } from "lucide-react"
import { companies, capitalRelations, type CapitalRelation, getCompanyById } from "@/lib/company-data"
import { CapitalRelationForm } from "./capital-relation-form"

export function CapitalRelations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [relationsList, setRelationsList] = useState<CapitalRelation[]>(capitalRelations)
  const [selectedRelation, setSelectedRelation] = useState<CapitalRelation | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 検索フィルター
  const filteredRelations = relationsList.filter((relation) => {
    const parentCompany = getCompanyById(relation.parentId)
    const childCompany = getCompanyById(relation.childId)

    if (!parentCompany || !childCompany) return false

    return (
      parentCompany.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      childCompany.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // 資本関係追加処理
  const handleAddRelation = (newRelation: CapitalRelation) => {
    setRelationsList([...relationsList, newRelation])
    setIsAddDialogOpen(false)
  }

  // 資本関係編集処理
  const handleEditRelation = (updatedRelation: CapitalRelation) => {
    setRelationsList(relationsList.map((relation) => (relation.id === updatedRelation.id ? updatedRelation : relation)))
    setIsEditDialogOpen(false)
    setSelectedRelation(null)
  }

  // 資本関係削除処理
  const handleDeleteRelation = () => {
    if (selectedRelation) {
      setRelationsList(relationsList.filter((relation) => relation.id !== selectedRelation.id))
      setIsDeleteDialogOpen(false)
      setSelectedRelation(null)
    }
  }

  // 編集ダイアログを開く
  const openEditDialog = (relation: CapitalRelation) => {
    setSelectedRelation(relation)
    setIsEditDialogOpen(true)
  }

  // 削除ダイアログを開く
  const openDeleteDialog = (relation: CapitalRelation) => {
    setSelectedRelation(relation)
    setIsDeleteDialogOpen(true)
  }

  // 企業名を取得
  const getCompanyName = (id: string) => {
    const company = getCompanyById(id)
    return company ? company.name : "不明な企業"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">資本関係管理</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 w-64"
              placeholder="企業名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                資本関係追加
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>資本関係の追加</DialogTitle>
              </DialogHeader>
              <CapitalRelationForm companies={companies} onSubmit={handleAddRelation} />
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            エクスポート
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            インポート
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>親企業</TableHead>
              <TableHead>子企業</TableHead>
              <TableHead>持株比率 (%)</TableHead>
              <TableHead>開始日</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRelations.length > 0 ? (
              filteredRelations.map((relation) => (
                <TableRow key={relation.id}>
                  <TableCell className="font-medium">{getCompanyName(relation.parentId)}</TableCell>
                  <TableCell>{getCompanyName(relation.childId)}</TableCell>
                  <TableCell>{relation.ownershipPercentage}%</TableCell>
                  <TableCell>{relation.startDate || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(relation)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(relation)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  資本関係情報が見つかりません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>資本関係の編集</DialogTitle>
          </DialogHeader>
          {selectedRelation && (
            <CapitalRelationForm relation={selectedRelation} companies={companies} onSubmit={handleEditRelation} />
          )}
        </DialogContent>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>資本関係の削除</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedRelation && (
              <p>
                「{getCompanyName(selectedRelation.parentId)}」から「{getCompanyName(selectedRelation.childId)}」への
                資本関係を削除してもよろしいですか？この操作は元に戻せません。
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteRelation}>
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
