"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface BarChartProps {
  data?: Record<string, Record<string, number>>
}

interface PieChartProps {
  data?: {
    early: number
    mid: number
    late: number
  }
}

export function BarChart({ data = {} }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // データを整形
    const years = Object.keys(data).sort()
    const companies: Record<string, string> = {
      MC001: "三菱商事",
      MC002: "メタルワン",
      MC003: "三菱電機",
      MC004: "三菱重工",
      MC005: "三菱ケミカル",
      MC006: "三菱UFJフィナンシャル・グループ",
    }

    const colors: Record<string, string> = {
      MC001: "#EF4444",
      MC002: "#F97316",
      MC003: "#10B981",
      MC004: "#3B82F6",
      MC005: "#8B5CF6",
      MC006: "#0EA5E9",
    }

    const datasets = Object.keys(companies)
      .map((companyId) => {
        const companyData = years.map((year) => {
          return data[year] && data[year][companyId] ? data[year][companyId] : 0
        })

        return {
          label: companies[companyId],
          data: companyData,
          backgroundColor: colors[companyId],
        }
      })
      .filter((dataset) => dataset.data.some((value) => value > 0)) // 値がある会社のみ表示

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: years,
        datasets:
          datasets.length > 0
            ? datasets
            : [
                {
                  label: "データなし",
                  data: [0],
                  backgroundColor: "#CCCCCC",
                },
              ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}

export function PieChart({ data = { early: 0, mid: 0, late: 0 } }: PieChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const hasData = data.early > 0 || data.mid > 0 || data.late > 0

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["初期段階 (10-30%)", "中間段階 (40-60%)", "最終段階 (70-100%)"],
        datasets: [
          {
            data: hasData ? [data.early, data.mid, data.late] : [1, 1, 1],
            backgroundColor: hasData ? ["#3B82F6", "#F59E0B", "#10B981"] : ["#E5E7EB", "#E5E7EB", "#E5E7EB"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (!hasData) return "データなし"
                const value = context.raw as number
                return `${value.toFixed(1)}億円`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}
