import { ApplicationHeader } from "@/components/application-tracker/application-header"
import { ApplicationStats } from "@/components/application-tracker/application-stats"
import { ApplicationFilters } from "@/components/application-tracker/application-filters"
import { ApplicationList } from "@/components/application-tracker/application-list"
import { UpcomingInterviews } from "@/components/application-tracker/upcoming-interviews"
import { FollowUpReminders } from "@/components/application-tracker/follow-up-reminders"
import {
  getUserApplications,
  getApplicationStats,
  getUpcomingInterviews,
  getFollowUpReminders,
} from "@/actions/application-actions"
import { StepCompletion } from "@/components/onboarding/step-completion"

export default async function ApplicationTrackerPage({
  searchParams,
}: {
  searchParams: { query?: string; status?: string; dateRange?: string; page?: string }
}) {
  // Parse query parameters
  const query = searchParams.query || ""
  const status = searchParams.status || ""
  const dateRange = searchParams.dateRange || ""
  const page = Number.parseInt(searchParams.page || "1")

  // Fetch application data
  const { applications, totalApplications, currentPage, totalPages } = await getUserApplications({
    query,
    status,
    dateRange,
    page,
  })
  const stats = await getApplicationStats()
  const interviews = await getUpcomingInterviews()
  const reminders = await getFollowUpReminders()

  return (
    <div className="flex flex-col h-full">
      <ApplicationHeader />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <StepCompletion stepId="application-tracker" nextStepId="follow-up" />

          <ApplicationStats stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ApplicationFilters query={query} status={status} dateRange={dateRange} />
              <ApplicationList
                applications={applications}
                totalApplications={totalApplications}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
            <div className="space-y-6">
              <UpcomingInterviews interviews={interviews} />
              <FollowUpReminders reminders={reminders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
