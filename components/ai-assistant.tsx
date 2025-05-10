"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AIAssistantProps {
  selectedGroupId: string
  selectedGroup: string
}

export function AIAssistant({ selectedGroupId, selectedGroup }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `${selectedGroup}グループに関する質問にお答えします。取引状況、主要担当者、商談の進捗状況などについてお気軽にお尋ねください。`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // サンプル応答のデータベース
  const sampleResponses: Record<string, string[]> = {
    取引: [
      `${selectedGroup}グループとの取引は過去3年間で15%増加しています。特に金融サービス部門での取引が顕著に成長しています。`,
      `${selectedGroup}グループとの最大の取引は昨年第3四半期に締結された5億円規模のITインフラ刷新プロジェクトです。`,
      `${selectedGroup}グループとの取引で最も成長している分野はクラウドサービスで、年間成長率は約22%です。`,
    ],
    担当者: [
      `${selectedGroup}グループの主要な意思決定者は佐藤CTOと田中CIOです。両者とも新技術導入に積極的です。`,
      `${selectedGroup}グループの購買部門の責任者は山田部長で、コスト効率を重視する傾向があります。`,
      `${selectedGroup}グループとの関係で最も影響力のある担当者は鈴木執行役員です。彼との良好な関係構築が重要です。`,
    ],
    商談: [
      `${selectedGroup}グループとの進行中の主要商談は3件あり、合計で約8億円の規模です。最も大きな案件はデータセンター移行プロジェクトです。`,
      `${selectedGroup}グループとの商談で最も成功確率が高いのはセキュリティソリューション導入案件で、現在最終承認段階にあります。`,
      `${selectedGroup}グループとの新規商談の平均成約率は68%で、業界平均を15ポイント上回っています。`,
    ],
    競合: [
      `${selectedGroup}グループの案件では主にA社とB社が競合として現れます。特にA社はクラウドサービス分野で強みを持っています。`,
      `${selectedGroup}グループとの取引において、競合他社と差別化できるポイントは統合ソリューションの提供と長期的なサポート体制です。`,
      `${selectedGroup}グループの最近の入札では、当社は3件中2件で競合他社に勝利しました。価格よりも技術力と実績が評価されています。`,
    ],
    リスク: [
      `${selectedGroup}グループとの取引における主なリスクは、組織再編による意思決定プロセスの変更です。主要担当者との関係維持が重要です。`,
      `${selectedGroup}グループは予算削減の方針を打ち出しており、今後1年間は大型投資案件が減少する可能性があります。`,
      `${selectedGroup}グループの海外展開に伴い、グローバルサポート体制の強化が求められています。対応が遅れると競合に機会を奪われるリスクがあります。`,
    ],
  }

  // デフォルトの応答
  const defaultResponses = [
    `申し訳ありませんが、${selectedGroup}グループに関するその情報は現在データベースにありません。担当営業または分析チームに確認することをお勧めします。`,
    `${selectedGroup}グループについてのその質問に対する具体的なデータはありませんが、類似業界の傾向から推測すると...`,
    `その点については詳細な分析が必要です。${selectedGroup}グループの担当チームと連携して情報を収集しましょう。`,
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // グループが変更されたら、最初のメッセージを更新
    setMessages([
      {
        id: "1",
        content: `${selectedGroup}グループに関する質問にお答えします。取引状況、主要担当者、商談の進捗状況などについてお気軽にお尋ねください。`,
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }, [selectedGroup])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // ユーザーメッセージを追加
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // AIの応答を生成（モック）
    setTimeout(() => {
      let responseContent = ""

      // 入力に基づいて応答を選択
      const lowerInput = input.toLowerCase()
      let foundResponse = false

      for (const [keyword, responses] of Object.entries(sampleResponses)) {
        if (lowerInput.includes(keyword)) {
          responseContent = responses[Math.floor(Math.random() * responses.length)]
          foundResponse = true
          break
        }
      }

      // キーワードに一致しない場合はデフォルト応答
      if (!foundResponse) {
        responseContent = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold">AI360° アシスタント</h2>
        </div>
        <div className="text-sm text-gray-500">{selectedGroup}グループ</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex items-start gap-3 max-w-[80%]", message.role === "user" ? "ml-auto" : "")}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8 bg-blue-100">
                <Bot className="h-5 w-5 text-blue-600" />
              </Avatar>
            )}
            <Card className={cn(message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100")}>
              <CardContent className="p-3">
                <p>{message.content}</p>
                <div className={cn("text-xs mt-1", message.role === "user" ? "text-blue-100" : "text-gray-500")}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </CardContent>
            </Card>
            {message.role === "user" && (
              <Avatar className="h-8 w-8 bg-blue-500">
                <User className="h-5 w-5 text-white" />
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 bg-blue-100">
              <Bot className="h-5 w-5 text-blue-600" />
            </Avatar>
            <Card className="bg-gray-100">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${selectedGroup}グループについて質問する...`}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">送信</span>
          </Button>
        </form>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setInput("取引状況を教えて")}>
            取引状況
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("主要担当者は誰ですか")}>
            主要担当者
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("進行中の商談について")}>
            進行中の商談
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput("競合状況を分析して")}>
            競合分析
          </Button>
        </div>
      </div>
    </div>
  )
}
