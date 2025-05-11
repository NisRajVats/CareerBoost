"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function NotificationAnalytics() {
  const [analytics, setAnalytics] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnalytics = localStorage.getItem("notification-analytics")
      if (savedAnalytics) {
        try {
          setAnalytics(JSON.parse(savedAnalytics))
        } catch (e) {
          console.error("Failed to parse saved analytics", e)
        }
      }
      setLoading(false)
    }
  }, [])

  const interactionData = [
    { name: "Read", value: analytics["read-count"] || 0 },
    { name: "Clicked", value: analytics["clicked-count"] || 0 },
    { name: "Dismissed", value: analytics["dismissed-count"] || 0 },
  ]

  const typeData = Object.entries(analytics)
    .filter(([key]) => key.startsWith("type-"))
    .map(([key, value]) => ({
      name: key.replace("type-", ""),
      value,
    }))

  if (loading) {
    return <div>Loading analytics...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Analytics</CardTitle>
        <CardDescription>Track how users interact with notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="interactions">
          <TabsList>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="types">Notification Types</TabsTrigger>
          </TabsList>

          <TabsContent value="interactions">
            <ChartContainer
              config={{
                value: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="types">
            <ChartContainer
              config={{
                value: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
