"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { matchResumeWithJob, getResumeAdjustments } from "@/actions/job-match-actions"

export function ResumeAdjustments() {
  const [jobUrl, setJobUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First match the resume with the job
      const matchResult = await matchResumeWithJob(jobUrl)

      // Then get adjustment suggestions
      const adjustments = await getResumeAdjustments(matchResult.matchId)
      setSuggestions(adjustments)
    } catch (error) {
      console.error("Failed to get resume adjustments:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Adjustments</CardTitle>
        <CardDescription>Tailor your resume for specific job postings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Paste job posting URL"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Job"}
            </Button>
          </div>
        </form>

        {suggestions && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">Suggested Improvements</h3>

            {suggestions.suggestions.map((suggestion, index) => (
              <div key={index} className="border rounded-md p-3 space-y-2">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground">{suggestion.section}</h4>
                  <p className="text-sm line-through">{suggestion.original}</p>
                  <p className="text-sm font-medium">{suggestion.suggested}</p>
                </div>
                <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
              </div>
            ))}

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Keywords to Add</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.keywordsToAdd.map((keyword, index) => (
                  <div key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md">
                    {keyword}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
