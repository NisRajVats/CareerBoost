import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export function CompetitiveAnalysis({ analysis }) {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Competitive Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="text-center p-4 bg-[#0a0e17] rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Your resume is better than</p>
            <p className="text-3xl font-bold text-blue-500">{analysis.percentileRanking}%</p>
            <p className="text-sm text-gray-400">of applicants in your field</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">What this means:</h3>
            <ul className="space-y-2">
              {analysis.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-gray-800">
            <h3 className="text-sm font-medium mb-2">Common strengths of top applicants:</h3>
            <ul className="space-y-1">
              {analysis.topApplicantStrengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
