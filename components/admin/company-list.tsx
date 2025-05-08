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
import { companies, type Company } from "@/lib/company-data"
import { CompanyForm } from "./company-form"

export function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [companyList, setCompanyList] = useState<Company[]>(companies)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 検索フィルター
  const filteredCompanies = companyList.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.code && company.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.industry && company.industry.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 企業追加処理
  const handleAddCompany = (newCompany: Company) => {
    setCompanyList([...companyList, newCompany])
    setIsAddDialogOpen(false)
  }

  // 企業編集処理
  const handleEditCompany = (updatedCompany: Company) => {
    setCompanyList(companyList.map((company) => (company.id === updatedCompany.id ? updatedCompany : company)))
    setIsEditDialogOpen(false)
    setSelectedCompany(null)
  }

  // 企業削除処理
  const handleDeleteCompany = () => {
    if (selectedCompany) {
      setCompanyList(companyList.filter((company) => company.id !== selectedCompany.id))
      setIsDeleteDialogOpen(false)
      setSelectedCompany(null)
    }
  }

  // 編集ダイアログを開く
  const openEditDialog = (company: Company) => {
    setSelectedCompany(company)
    setIsEditDialogOpen(true)
  }

  // 削除ダイアログを開く
  const openDeleteDialog = (company: Company) => {
    setSelectedCompany(company)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">企業一覧</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 w-64"
              placeholder="企業名、コード、業種で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                企業追加
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>企業情報の追加</DialogTitle>
              </DialogHeader>
              <CompanyForm onSubmit={handleAddCompany} />
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
              <TableHead>企業名</TableHead>
              <TableHead>企業コード</TableHead>
              <TableHead>業種</TableHead>
              <TableHead>設立年</TableHead>
              <TableHead>備考</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.code || "-"}</TableCell>
                  <TableCell>{company.industry || "-"}</TableCell>
                  <TableCell>{company.foundedYear || "-"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{company.notes || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(company)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(company)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  企業情報が見つかりません
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
            <DialogTitle>企業情報の編集</DialogTitle>
          </DialogHeader>
          {selectedCompany && <CompanyForm company={selectedCompany} onSubmit={handleEditCompany} />}
        </DialogContent>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>企業情報の削除</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedCompany && <p>「{selectedCompany.name}」を削除してもよろしいですか？この操作は元に戻せません。</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteCompany}>
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
