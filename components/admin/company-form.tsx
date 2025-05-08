"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"
import { type Company, generateCompanyId } from "@/lib/company-data"

interface CompanyFormProps {
  company?: Company
  onSubmit: (company: Company) => void
}

export function CompanyForm({ company, onSubmit }: CompanyFormProps) {
  const [formData, setFormData] = useState<Company>(
    company || {
      id: generateCompanyId(),
      name: "",
      code: "",
      industry: "",
      foundedYear: undefined,
      notes: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "foundedYear") {
      const yearValue = value === "" ? undefined : Number.parseInt(value, 10)
      setFormData({ ...formData, [name]: yearValue })
    } else {
      setFormData({ ...formData, [name]: value })
    }

    // エラーをクリア
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "企業名は必須です"
    }

    if (formData.foundedYear !== undefined) {
      const currentYear = new Date().getFullYear()
      if (formData.foundedYear < 1800 || formData.foundedYear > currentYear) {
        newErrors.foundedYear = `設立年は1800年から${currentYear}年の間で入力してください`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            企業名 <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          {errors.name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            企業コード
          </Label>
          <Input id="code" name="code" value={formData.code || ""} onChange={handleChange} className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="industry" className="text-right">
            業種
          </Label>
          <Input
            id="industry"
            name="industry"
            value={formData.industry || ""}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="foundedYear" className="text-right">
            設立年
          </Label>
          <Input
            id="foundedYear"
            name="foundedYear"
            type="number"
            value={formData.foundedYear || ""}
            onChange={handleChange}
            className="col-span-3"
            min="1800"
            max={new Date().getFullYear()}
          />
          {errors.foundedYear && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.foundedYear}</p>}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            備考
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            className="col-span-3"
            rows={3}
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            キャンセル
          </Button>
        </DialogClose>
        <Button type="submit">保存</Button>
      </DialogFooter>
    </form>
  )
}
