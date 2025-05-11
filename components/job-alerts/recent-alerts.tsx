"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Bookmark, ExternalLink } from "lucide-react"
import { bookmarkJob } from "@/actions/job-actions"
import { toast } from "@/components/ui/use-toast"

// Mock data for recent alerts
const mockAlerts = [
  {
    id: "alert1",
    jobId: "job1",
    jobTitle: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    matchScore: 92,
    alertName: "Frontend Developer Jobs",
    matchDate: new Date().toISOString(),
    jobUrl: "#",
  },
  {
    id: "alert2",
    jobId: "job2",
    jobTitle: "Full Stack Engineer",
    company: "Digital Solutions",
    location: "Remote",
    matchScore: 87,
    alertName: "Remote Developer Jobs",
    matchDate: new Date().toISOString(),
    jobUrl: "#",
  },
  {
    id: "alert3",
    jobId: "job3",
    jobTitle: "React Developer",
    company: "WebApp Co.",
    location: "New York, NY",
    matchScore: 95,
    alertName: "React Jobs",
    matchDate: new Date().toISOString(),
    jobUrl: "#",
  },
]

export function RecentAlerts({ alerts = mockAlerts }) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState({})

  const handleBookmark = async (jobId) => {
    const isCurrentlyBookmarked = bookmarkedJobs[jobId] || false

    // Optimistically update UI
    setBookmarkedJobs((prev) => ({
      ...prev,
      [jobId]: !isCurrentlyBookmarked,
    }))

    try {
      await bookmarkJob(jobId, !isCurrentlyBookmarked)

      toast({
        title: isCurrentlyBookmarked ? "Job removed from bookmarks" : "Job bookmarked",
        description: isCurrentlyBookmarked
          ? "The job has been removed from your bookmarks."
          : "The job has been added to your bookmarks.",
      })
    } catch (error) {
      // Revert on error
      setBookmarkedJobs((prev) => ({
        ...prev,
        [jobId]: isCurrentlyBookmarked,
      }))

      console.error("Error bookmarking job:", error)
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Recently"
      }
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      console.error("Date formatting error:", error)
      return "Recently"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Job Matches</CardTitle>
        <CardDescription>Jobs that match your saved alerts</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent job matches found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Create job alerts to get notified about new matching jobs
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{alert.jobTitle}</h3>
                  <Badge variant={alert.matchScore >= 90 ? "success" : "secondary"}>{alert.matchScore}% Match</Badge>
                </div>
                <p className="text-sm">{alert.company}</p>
                <p className="text-sm text-muted-foreground">{alert.location}</p>

                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Matched from alert: <span className="font-medium">{alert.alertName}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">Found {formatDate(alert.matchDate)}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleBookmark(alert.jobId)}
                      className={bookmarkedJobs[alert.jobId] ? "text-yellow-500" : ""}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(alert.jobUrl, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-1" /> View
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
