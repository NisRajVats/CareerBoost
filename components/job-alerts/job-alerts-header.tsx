import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"

export function JobAlertsHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Job Alerts</h1>
        <p className="text-muted-foreground">Get notified about new job opportunities that match your preferences</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Alert Settings
        </Button>
        <Button size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Create New Alert
        </Button>
      </div>
    </div>
  )
}
