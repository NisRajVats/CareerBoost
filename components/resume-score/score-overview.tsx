"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Download, RefreshCw } from "lucide-react"
import { refreshResumeScore } from "@/actions/score-actions"
import { ErrorAlert } from "@/components/ui/error-alert"
import { getErrorMessage } from "@/lib/error-handling"
import { useResumeScore } from "@/lib/store/selectors"

export function ScoreOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const score = useResumeScore()

  if (!score) {
    return null
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      await refreshResumeScore()
      // The page will be revalidated and refreshed automatically
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setIsRefreshing(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e" // green-500
    if (score >= 60) return "#eab308" // yellow-500
    return "#ef4444" // red-500
  }

  const scoreColor = getScoreColor(score.overallScore)

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Overall Resume Score</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {error && <ErrorAlert message={error} onDismiss={() => setError(null)} className="mb-4" />}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 mb-4">
            <CircularProgressbar
              value={score.overallScore}
              text={`${score.overallScore}`}
              maxValue={100}
              styles={buildStyles({
                textSize: "24px",
                pathColor: scoreColor,
                textColor: "white",
                trailColor: "#1f2937",
              })}
            />
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-400 mb-1">Last updated</p>
            <p className="font-medium">{new Date(score.updatedAt).toLocaleDateString()}</p>
          </div>

          <div className="w-full space-y-2">
            <Button onClick={handleRefresh} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Score
                </>
              )}
            </Button>

            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
