"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { partnerGroups } from "@/lib/data"

export default function Home() {
  // 初期値を設定
  const [activeTab, setActiveTab] = useState("owners")
  const [activeSubTab, setActiveSubTab] = useState("ex_summary")
  const [selectedGroup, setSelectedGroup] = useState(partnerGroups[0]?.name || "日立グループ")
  const [selectedGroupId, setSelectedGroupId] = useState(partnerGroups[0]?.id || "HTG001")

  return (
    <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
      selectedGroupId={selectedGroupId}
      setSelectedGroupId={setSelectedGroupId}
      activeSubTab={activeSubTab}
      setActiveSubTab={setActiveSubTab}
    />
  )
}
