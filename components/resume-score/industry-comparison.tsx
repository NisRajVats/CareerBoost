"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function IndustryComparison({ score, benchmarks }) {
  // Format data for the chart
  const data = [
    {
      name: "Your Score",
      value: score,
    },
    {
      name: "Industry Average",
      value: benchmarks.average,
    },
    {
      name: "Top 10%",
      value: benchmarks.top10Percent,
    },
  ]

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Industry Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              value: {
                label: "Score",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                <YAxis domain={[0, 100]} stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "white",
                  }}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>Your resume scores {getComparisonText(score, benchmarks.average)} the industry average.</p>
          <p className="mt-1">Top performers in your industry typically score above {benchmarks.top10Percent}.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function getComparisonText(score, average) {
  const difference = score - average
  if (difference >= 15) return "significantly above"
  if (difference >= 5) return "above"
  if (difference <= -15) return "significantly below"
  if (difference <= -5) return "below"
  return "around"
}
