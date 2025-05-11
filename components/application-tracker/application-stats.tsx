import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

export function ApplicationStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
              <p className="text-2xl font-bold">{stats.totalApplications}</p>
            </div>
            <div className={`flex items-center ${stats.totalChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.totalChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="text-sm font-medium">{Math.abs(stats.totalChange)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Interview Rate</p>
              <p className="text-2xl font-bold">{stats.interviewRate}%</p>
            </div>
            <div className={`flex items-center ${stats.interviewRateChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.interviewRateChange >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(stats.interviewRateChange)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
              <p className="text-2xl font-bold">{stats.responseRate}%</p>
            </div>
            <div className={`flex items-center ${stats.responseRateChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.responseRateChange >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(stats.responseRateChange)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
              <p className="text-2xl font-bold">{stats.avgResponseTime} days</p>
            </div>
            <div className={`flex items-center ${stats.responseTimeChange <= 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.responseTimeChange <= 0 ? (
                <ArrowDown className="h-4 w-4 mr-1" />
              ) : (
                <ArrowUp className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(stats.responseTimeChange)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
