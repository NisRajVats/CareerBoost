"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CategoryBreakdown({ categories }) {
  const getCategoryColor = (score) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Score Breakdown by Category</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="relevance">Relevance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-medium">{category.score}/100</span>
                </div>
                <Progress value={category.score} className={`h-2 ${getCategoryColor(category.score)}`} />
                <p className="text-xs text-gray-400">{category.description}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            {categories
              .filter((cat) => cat.type === "content")
              .map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium">{category.score}/100</span>
                  </div>
                  <Progress value={category.score} className={`h-2 ${getCategoryColor(category.score)}`} />
                  <p className="text-xs text-gray-400">{category.description}</p>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="format" className="space-y-4">
            {categories
              .filter((cat) => cat.type === "format")
              .map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium">{category.score}/100</span>
                  </div>
                  <Progress value={category.score} className={`h-2 ${getCategoryColor(category.score)}`} />
                  <p className="text-xs text-gray-400">{category.description}</p>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="relevance" className="space-y-4">
            {categories
              .filter((cat) => cat.type === "relevance")
              .map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium">{category.score}/100</span>
                  </div>
                  <Progress value={category.score} className={`h-2 ${getCategoryColor(category.score)}`} />
                  <p className="text-xs text-gray-400">{category.description}</p>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
