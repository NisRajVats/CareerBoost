import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertCircle, ArrowUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ImprovementRecommendations({ recommendations }) {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Improvement Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {recommendations.map((category, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-md font-medium flex items-center gap-2">
                {category.icon === "check" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                {category.name}
                <Badge variant="outline" className="ml-2 bg-blue-900/20 text-blue-400 border-blue-800">
                  <ArrowUp className="h-3 w-3 mr-1" />+{category.potentialImprovement} points
                </Badge>
              </h3>
              <ul className="space-y-2 pl-6">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="list-disc text-sm text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
