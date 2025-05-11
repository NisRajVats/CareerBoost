import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Lightbulb, TrendingUp, AlertCircle } from "lucide-react"

export function PersonalizedRecommendations({ recommendations }) {
  const getRecommendationIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <TrendingUp className="h-5 w-5 text-yellow-500" />
      case "low":
        return <Lightbulb className="h-5 w-5 text-blue-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-blue-500" />
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-800">
            High Priority
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-900/20 text-yellow-400 border-yellow-800">
            Medium Priority
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
            Suggested
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <div key={recommendation.id} className="bg-[#1a2236] rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-[#111827] rounded-full">{getRecommendationIcon(recommendation.priority)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{recommendation.title}</h3>
                {getPriorityBadge(recommendation.priority)}
              </div>
              <p className="text-sm text-gray-400 mt-1">{recommendation.description}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link href={recommendation.actionUrl}>
                <span>{recommendation.actionText}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
