"use client"

import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function ResumePerformanceChart({ data }) {
  return (
    <ChartContainer
      config={{
        score: {
          label: "Resume Score",
          color: "hsl(var(--chart-1))",
        },
        atsScore: {
          label: "ATS Compatibility",
          color: "hsl(var(--chart-2))",
        },
        relevanceScore: {
          label: "Job Relevance",
          color: "hsl(var(--chart-3))",
        },
        contentScore: {
          label: "Content Quality",
          color: "hsl(var(--chart-4))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-score)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line type="monotone" dataKey="atsScore" stroke="var(--color-atsScore)" strokeWidth={2} dot={{ r: 4 }} />
          <Line
            type="monotone"
            dataKey="relevanceScore"
            stroke="var(--color-relevanceScore)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="contentScore"
            stroke="var(--color-contentScore)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
