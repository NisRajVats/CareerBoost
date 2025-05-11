"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateCoverLetter } from "@/actions/job-match-actions"
import { Copy } from "lucide-react"

export function CoverLetterGenerator() {
  const [jobId, setJobId] = useState("")
  const [loading, setLoading] = useState(false)
  const [coverLetter, setCoverLetter] = useState(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generateCoverLetter(jobId)
      setCoverLetter(result)
    } catch (error) {
      console.error("Failed to generate cover letter:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter.content)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cover Letter Generator</CardTitle>
        <CardDescription>Create personalized cover letters for job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? "Generating..." : "Generate Cover Letter"}
          </Button>

          {coverLetter && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{coverLetter.subject}</h3>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea value={coverLetter.content} readOnly className="min-h-[300px] font-mono text-sm" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
