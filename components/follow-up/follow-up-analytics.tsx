import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FollowUpAnalytics({
  analytics = { totalSent: 0, openRate: 0, responseRate: 0, averageResponseTime: 0, byType: [] },
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-Up Analytics</CardTitle>
        <CardDescription>Track the performance of your follow-up emails</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Open Rate</h3>
                <span className="text-sm font-medium">{analytics.openRate}%</span>
              </div>
              <Progress value={analytics.openRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Response Rate</h3>
                <span className="text-sm font-medium">{analytics.responseRate}%</span>
              </div>
              <Progress value={analytics.responseRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Average Response Time</h3>
                <span className="text-sm font-medium">{analytics.averageResponseTime} days</span>
              </div>
              <Progress value={(analytics.averageResponseTime / 5) * 100} className="h-2" />
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Total Emails Sent</h3>
              <p className="text-3xl font-bold">{analytics.totalSent}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Performance by Type</h3>
            <div className="space-y-4">
              {analytics.byType.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm">{type.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {type.responded} / {type.opened} / {type.sent}
                    </span>
                  </div>
                  <div className="flex h-2 items-center gap-1">
                    <div
                      className="bg-green-500 h-full rounded-sm"
                      style={{ width: `${(type.responded / type.sent) * 100}%` }}
                    />
                    <div
                      className="bg-blue-500 h-full rounded-sm"
                      style={{ width: `${((type.opened - type.responded) / type.sent) * 100}%` }}
                    />
                    <div
                      className="bg-gray-300 h-full rounded-sm"
                      style={{ width: `${((type.sent - type.opened) / type.sent) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Responded</span>
                    <span>Opened</span>
                    <span>Sent</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
