import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobAlertsHeader } from "@/components/job-alerts/job-alerts-header"
import { AlertsList } from "@/components/job-alerts/alerts-list"
import { NewAlertForm } from "@/components/job-alerts/new-alert-form"
import { RecentAlerts } from "@/components/job-alerts/recent-alerts"
import { AlertsSettings } from "@/components/job-alerts/alerts-settings"
import { getJobAlerts, getRecentAlerts, getAlertSettings } from "@/actions/job-alerts-actions"

export default async function JobAlertsPage() {
  // Fetch data for the page
  const alerts = await getJobAlerts()
  const recentAlerts = await getRecentAlerts()
  const settings = await getAlertSettings()

  return (
    <div className="container mx-auto py-6">
      <JobAlertsHeader />

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Your Alerts</TabsTrigger>
          <TabsTrigger value="new">Create Alert</TabsTrigger>
          <TabsTrigger value="recent">Recent Matches</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <AlertsList alerts={alerts} />
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <NewAlertForm />
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <RecentAlerts alerts={recentAlerts} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <AlertsSettings settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
