"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"
import { type CapitalRelation, type Company, generateRelationId } from "@/lib/company-data"

interface CapitalRelationFormProps {
  relation?: CapitalRelation
  companies: Company[]
  onSubmit: (relation: CapitalRelation) => void
}

export function CapitalRelationForm({ relation, companies, onSubmit }: CapitalRelationFormProps) {
  const [formData, setFormData] = useState<CapitalRelation>(
    relation || {
      id: generateRelationId(),
      parentId: "",
      childId: "",
      ownershipPercentage: 0,
      startDate: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value })

    // エラーをクリア
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.parentId) {
      newErrors.parentId = "親企業は必須です"
    }

    if (!formData.childId) {
      newErrors.childId = "子企業は必須です"
    }

    if (formData.parentId === formData.childId) {
      newErrors.childId = "親企業と子企業は異なる企業を選択してください"
    }

    if (formData.ownershipPercentage <= 0 || formData.ownershipPercentage > 100) {
      newErrors.ownershipPercentage = "持株比率は1%から100%の間で入力してください"
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
          <Label htmlFor="parentId" className="text-right">
            親企業 <span className="text-red-500">*</span>
          </Label>
          <div className="col-span-3">
            <Select value={formData.parentId} onValueChange={(value) => handleChange("parentId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="親企業を選択" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.parentId && <p className="text-sm text-red-500 mt-1">{errors.parentId}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="childId" className="text-right">
            子企業 <span className="text-red-500">*</span>
          </Label>
          <div className="col-span-3">
            <Select value={formData.childId} onValueChange={(value) => handleChange("childId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="子企業を選択" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.childId && <p className="text-sm text-red-500 mt-1">{errors.childId}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="ownershipPercentage" className="text-right">
            持株比率 (%) <span className="text-red-500">*</span>
          </Label>
          <div className="col-span-3">
            <Input
              id="ownershipPercentage"
              type="number"
              value={formData.ownershipPercentage}
              onChange={(e) => handleChange("ownershipPercentage", Number.parseFloat(e.target.value))}
              min="0.1"
              max="100"
              step="0.1"
            />
            {errors.ownershipPercentage && <p className="text-sm text-red-500 mt-1">{errors.ownershipPercentage}</p>}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="startDate" className="text-right">
            開始日
          </Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate || ""}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="col-span-3"
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
