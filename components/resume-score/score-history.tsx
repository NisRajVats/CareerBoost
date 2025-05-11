"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ScoreHistory({ history }) {
  // Format dates for the chart
  const formattedHistory = history.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Score History</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              overall: {
                label: "Overall Score",
                color: "hsl(var(--chart-1))",
              },
              content: {
                label: "Content Score",
                color: "hsl(var(--chart-2))",
              },
              format: {
                label: "Format Score",
                color: "hsl(var(--chart-3))",
              },
              relevance: {
                label: "Relevance Score",
                color: "hsl(var(--chart-4))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                <YAxis domain={[0, 100]} stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="overall"
                  stroke="var(--color-overall)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line type="monotone" dataKey="content" stroke="var(--color-content)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="format" stroke="var(--color-format)" strokeWidth={2} dot={{ r: 4 }} />
                <Line
                  type="monotone"
                  dataKey="relevance"
                  stroke="var(--color-relevance)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
