"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumePerformanceChart } from "@/components/dashboard/resume-performance-chart"
import { ApplicationStatusChart } from "@/components/dashboard/application-status-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { PersonalizedRecommendations } from "@/components/dashboard/personalized-recommendations"
import { GuideHighlight } from "@/components/dashboard/guide-highlight"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Briefcase, LineChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserDashboardData } from "@/actions/dashboard-actions"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorAlert } from "@/components/ui/error-alert"

export default function Dashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const data = await getUserDashboardData()
        setDashboardData(data)
        setError(null)
      } catch (err) {
        console.error("Error loading dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <LoadingState message="Loading dashboard data..." />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  // Format data for charts
  const formattedData = {
    resumePerformance: {
      scores: dashboardData?.resumeHistory?.map((item) => item.score) || [],
      dates: dashboardData?.resumeHistory?.map((item) => item.date) || [],
      currentScore: dashboardData?.resumeScore || 0,
    },
    applicationStatus: {
      applied: dashboardData?.applications?.total || 0,
      screening: dashboardData?.applications?.statusBreakdown?.find((s) => s.name === "Screening")?.value || 0,
      interview: dashboardData?.applications?.statusBreakdown?.find((s) => s.name === "Interview")?.value || 0,
      offer: dashboardData?.applications?.statusBreakdown?.find((s) => s.name === "Offer")?.value || 0,
      rejected: dashboardData?.applications?.statusBreakdown?.find((s) => s.name === "Rejected")?.value || 0,
    },
    recentActivity:
      dashboardData?.recentActivities?.map((activity) => ({
        id: activity.id,
        type: activity.type.split("_")[0],
        action: activity.description,
        date: new Date(activity.timestamp).toLocaleDateString(),
      })) || [],
    recommendations:
      dashboardData?.recommendations?.map((rec) => ({
        id: rec.id,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
      })) || [],
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/resume-optimizer")}
            variant="outline"
            size="sm"
            className="hidden md:flex gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Upload Resume</span>
          </Button>
          <Button
            onClick={() => router.push("/job-search")}
            variant="outline"
            size="sm"
            className="hidden md:flex gap-1"
          >
            <Briefcase className="h-4 w-4" />
            <span>Find Jobs</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formattedData.resumePerformance.currentScore}/100</div>
                <p className="text-xs text-muted-foreground">
                  {formattedData.resumePerformance.scores.length > 1
                    ? `+${
                        formattedData.resumePerformance.scores[formattedData.resumePerformance.scores.length - 1] -
                        formattedData.resumePerformance.scores[formattedData.resumePerformance.scores.length - 2]
                      } from last update`
                    : "No previous data"}
                </p>
                <Button
                  variant="link"
                  className="px-0 text-xs text-blue-600"
                  onClick={() => router.push("/resume-score")}
                >
                  View details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formattedData.applicationStatus.applied}</div>
                <p className="text-xs text-muted-foreground">
                  {formattedData.applicationStatus.interview} interviews scheduled
                </p>
                <Button
                  variant="link"
                  className="px-0 text-xs text-blue-600"
                  onClick={() => router.push("/application-tracker")}
                >
                  View applications
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.jobMatches || 0}</div>
                <p className="text-xs text-muted-foreground">{dashboardData?.newMatches || 0} new matches this week</p>
                <Button variant="link" className="px-0 text-xs text-blue-600" onClick={() => router.push("/job-match")}>
                  View matches
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interview Success</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.interviews?.rate || 0}%</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData?.interviews?.upcoming || 0} upcoming interviews
                </p>
                <Button
                  variant="link"
                  className="px-0 text-xs text-blue-600"
                  onClick={() => router.push("/ai-assistance")}
                >
                  Prepare for interviews
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resume Performance</CardTitle>
                <CardDescription>Your resume score over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResumePerformanceChart data={formattedData.resumePerformance} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Current status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationStatusChart data={formattedData.applicationStatus} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity activities={formattedData.recentActivity} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Guide</CardTitle>
                <CardDescription>Tips to maximize your job search</CardDescription>
              </CardHeader>
              <CardContent>
                <GuideHighlight />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resume Performance</CardTitle>
                <CardDescription>Your resume score over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResumePerformanceChart data={formattedData.resumePerformance} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Current status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationStatusChart data={formattedData.applicationStatus} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Actions to improve your job search success</CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalizedRecommendations recommendations={formattedData.recommendations} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
