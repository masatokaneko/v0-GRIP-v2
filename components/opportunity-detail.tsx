"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Users, FileText, ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMeetingsByOpportunityId, getDocumentsByOpportunityId, getStageLabel } from "@/lib/data"

interface OpportunityDetailProps {
  opportunity: {
    id: string
    name: string
    partner: string
    partnerColor: string
    closeDate: string
    stagePct: number
    stageColor: string
    amount: number
    description?: string
    ourCompany?: string
    ourCompanyColor?: string
    createdAt?: string
    updatedAt?: string
    assignedTo?: string
    nextAction?: string
    nextActionDate?: string
  }
  onClose: () => void
}

export function OpportunityDetail({ opportunity, onClose }: OpportunityDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [relatedMeetings, setRelatedMeetings] = useState<any[]>([])
  const [relatedDocuments, setRelatedDocuments] = useState<any[]>([])

  useEffect(() => {
    // 実際のアプリケーションではAPIから取得するが、ここではモックデータを使用
    setRelatedMeetings(getMeetingsByOpportunityId(opportunity.id))
    setRelatedDocuments(getDocumentsByOpportunityId(opportunity.id))
  }, [opportunity.id])

  // Default values for optional fields
  const {
    id,
    name,
    partner,
    partnerColor,
    closeDate,
    stagePct,
    stageColor,
    amount,
    description = "商談の詳細情報がありません。",
    ourCompany = "三菱商事",
    ourCompanyColor = "#EF4444",
    createdAt = "2025年3月15日",
    updatedAt = "2025年5月10日",
    assignedTo = "佐藤 一郎",
    nextAction = "次のアクションが設定されていません",
    nextActionDate = "未設定",
  } = opportunity

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full overflow-auto animate-in slide-in-from-right">
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold">商談詳細</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">閉じる</span>
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: partnerColor }}></div>
                <span className="text-gray-600">{partner}</span>
              </div>
              <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ourCompanyColor }}></div>
                <span className="text-gray-600">{ourCompany}</span>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">概要</TabsTrigger>
              <TabsTrigger value="meetings">関連面談</TabsTrigger>
              <TabsTrigger value="documents">関連文書</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">金額</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{amount}億円</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">締切日</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <p className="text-lg">{closeDate}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">ステージ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className={`${stageColor} h-2.5 rounded-full`} style={{ width: `${stagePct}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="font-medium">
                        {getStageLabel(stagePct)}
                      </Badge>
                      <span className="text-sm font-medium">{stagePct}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">担当者</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    <p className="text-lg">{assignedTo}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>商談概要</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{description}</p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>次のアクション</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{nextAction}</h3>
                      <p className="text-sm text-gray-500">期限: {nextActionDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-sm text-gray-500">
                <div className="flex justify-between mb-2">
                  <span>作成日:</span>
                  <span>{createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>最終更新日:</span>
                  <span>{updatedAt}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="meetings">
              <div className="space-y-4">
                {relatedMeetings.length > 0 ? (
                  relatedMeetings.map((meeting) => (
                    <Card key={meeting.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="mr-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <MessageSquare className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{meeting.title}</h3>
                              <span className="text-sm text-gray-500">{meeting.date}</span>
                            </div>
                            <div className="mb-2">
                              <span className="text-sm text-gray-500">参加者: </span>
                              <span className="text-sm">{meeting.participants.join(", ")}</span>
                            </div>
                            <div className="mb-2">
                              <span className="text-sm text-gray-500">場所: </span>
                              <span className="text-sm">{meeting.location}</span>
                            </div>
                            <Separator className="my-2" />
                            <p className="text-sm text-gray-700">{meeting.summary}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">関連する面談記録がありません</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-4">
                {relatedDocuments.length > 0 ? (
                  relatedDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:bg-gray-50 cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-amber-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">{doc.name}</h3>
                              <Badge variant="outline">{doc.type}</Badge>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {doc.uploadedBy} • {doc.uploadedAt}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">関連する文書がありません</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
