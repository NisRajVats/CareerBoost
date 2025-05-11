"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"
import { matchResumeWithJob } from "@/actions/job-match-actions"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MatchList({ matches = [] }) {
  const router = useRouter()
  const [isMatching, setIsMatching] = useState(false)
  const [jobUrl, setJobUrl] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleMatchJob = async (e) => {
    e.preventDefault()
    if (!jobUrl) {
      toast({
        title: "Job URL required",
        description: "Please enter a job posting URL to match with your resume.",
        variant: "destructive",
      })
      return
    }

    setIsMatching(true)
    try {
      const result = await matchResumeWithJob(jobUrl)

      toast({
        title: "Resume matched successfully",
        description: `Your resume has a ${result.matchScore}% match with this job.`,
      })

      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error matching resume with job:", error)
      toast({
        title: "Matching failed",
        description: "There was an error matching your resume with this job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMatching(false)
    }
  }

  const handleTailorResume = (matchId) => {
    router.push(`/job-match/tailor/${matchId}`)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Job Matches</CardTitle>
          <CardDescription>Jobs that match your resume and skills</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Match New Job</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Match with Job Posting</DialogTitle>
              <DialogDescription>
                Enter a job posting URL to match with your resume and get tailoring suggestions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleMatchJob}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-url">Job Posting URL</Label>
                  <Input
                    id="job-url"
                    placeholder="https://example.com/job-posting"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isMatching}>
                  {isMatching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Matching...
                    </>
                  ) : (
                    "Match Resume"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {matches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No job matches found</p>
            <Button onClick={() => setIsDialogOpen(true)}>Match with a Job Posting</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{match.jobTitle}</h3>
                  <Badge variant={match.matchScore >= 90 ? "success" : "secondary"}>{match.matchScore}% Match</Badge>
                </div>
                <p className="text-sm">{match.company}</p>
                <p className="text-sm text-muted-foreground">{match.location}</p>
                <p className="text-sm mt-1">{match.salary}</p>

                <div className="mt-3">
                  <h4 className="text-xs font-medium mb-1">Key Matches</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.keyMatches.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className="text-xs font-medium mb-1">Skill Gaps</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.gaps.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-amber-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    Posted {formatDistanceToNow(new Date(match.postedDate), { addSuffix: true })}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleTailorResume(match.id)}>
                      Tailor Resume
                    </Button>
                    <Button size="sm" onClick={() => window.open(match.url, "_blank")}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
