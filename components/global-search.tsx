"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchResult {
  id: string
  name: string
  type: "group" | "company" | "executive" | "opportunity"
  subtitle?: string
  color?: string
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (!open || query.length < 2) {
      setResults([])
      return
    }

    const searchData = async () => {
      setLoading(true)

      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockResults: SearchResult[] = [
        { id: "HTG001", name: "日立グループ", type: "group", subtitle: "製造業・電子機器" },
        { id: "HT001", name: "日立製作所", type: "company", subtitle: "日立グループ", color: "#1E40AF" },
        { id: "HT002", name: "日立建機", type: "company", subtitle: "日立グループ", color: "#3B82F6" },
        { id: "AE001", name: "日立 太郎", type: "executive", subtitle: "執行役員 • 日立製作所" },
        {
          id: "OPP001",
          name: "グローバルサプライチェーン構築",
          type: "opportunity",
          subtitle: "日立製作所 • 12.5億円",
        },
      ].filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())),
      )

      setResults(mockResults)
      setLoading(false)
    }

    searchData()
  }, [open, query])

  const handleSelect = (item: SearchResult) => {
    setOpen(false)
    // In a real app, this would navigate to the appropriate page
    console.log("Selected:", item)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground pl-9"
        onClick={() => setOpen(true)}
      >
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <span>クライアントグループを検索...</span>
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="クライアント、企業、担当者を検索..." value={query} onValueChange={setQuery} />
        <CommandList>
          {loading && <CommandEmpty>検索中...</CommandEmpty>}
          {!loading && results.length === 0 && query.length > 1 && <CommandEmpty>結果が見つかりません</CommandEmpty>}
          {results.length > 0 && (
            <>
              <CommandGroup heading="グループ">
                {results
                  .filter((item) => item.type === "group")
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSelect(item)}>
                      <div className="flex items-center">
                        <div className="mr-2 text-muted-foreground">
                          <Search className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.subtitle && <div className="text-xs text-muted-foreground">{item.subtitle}</div>}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="企業">
                {results
                  .filter((item) => item.type === "company")
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSelect(item)}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.subtitle && <div className="text-xs text-muted-foreground">{item.subtitle}</div>}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="担当者">
                {results
                  .filter((item) => item.type === "executive")
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSelect(item)}>
                      <div className="flex items-center">
                        <div className="mr-2 text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {item.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.subtitle && <div className="text-xs text-muted-foreground">{item.subtitle}</div>}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="商談">
                {results
                  .filter((item) => item.type === "opportunity")
                  .map((item) => (
                    <CommandItem key={item.id} onSelect={() => handleSelect(item)}>
                      <div className="flex items-center">
                        <div className="mr-2 text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-800">
                            ¥
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.subtitle && <div className="text-xs text-muted-foreground">{item.subtitle}</div>}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
