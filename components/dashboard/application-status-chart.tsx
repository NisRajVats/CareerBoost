"use client"

import { ChartContainer } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function ApplicationStatusChart({ data }) {
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  // Transform the object data into an array format that Recharts can use
  const chartData = [
    { name: "Applied", value: data.applied || 0 },
    { name: "Screening", value: data.screening || 0 },
    { name: "Interview", value: data.interview || 0 },
    { name: "Offer", value: data.offer || 0 },
    { name: "Rejected", value: data.rejected || 0 },
  ].filter((item) => item.value > 0) // Only include non-zero values

  // If there's no data, show a placeholder message
  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-[300px] text-gray-500">No application data available</div>
  }

  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              color: "white",
            }}
            formatter={(value, name) => [`${value} applications`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
