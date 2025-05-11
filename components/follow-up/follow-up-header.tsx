import { Button } from "@/components/ui/button"
import { Mail, BarChart } from "lucide-react"

export function FollowUpHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Follow-Up Generator</h1>
        <p className="text-muted-foreground">Create professional follow-up emails for your job applications</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <BarChart className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button size="sm">
          <Mail className="h-4 w-4 mr-2" />
          New Follow-Up
        </Button>
      </div>
    </div>
  )
}
