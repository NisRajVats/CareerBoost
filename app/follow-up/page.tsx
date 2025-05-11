import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FollowUpHeader } from "@/components/follow-up/follow-up-header"
import { FollowUpGenerator } from "@/components/follow-up/follow-up-generator"
import { FollowUpTemplates } from "@/components/follow-up/follow-up-templates"
import { FollowUpHistory } from "@/components/follow-up/follow-up-history"
import { FollowUpAnalytics } from "@/components/follow-up/follow-up-analytics"
import { getFollowUpTemplates, getFollowUpHistory, getFollowUpAnalytics } from "@/actions/follow-up-actions"

export default async function FollowUpPage() {
  // Fetch data for the page
  const templates = await getFollowUpTemplates()
  const history = await getFollowUpHistory()
  const analytics = await getFollowUpAnalytics()

  return (
    <div className="container mx-auto py-6">
      <FollowUpHeader />

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <FollowUpGenerator templates={templates} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <FollowUpTemplates templates={templates} />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <FollowUpHistory history={history} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <FollowUpAnalytics analytics={analytics} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
