import { Button } from "@/components/ui/button"
import { Calendar, Video } from "lucide-react"

export function InterviewPrepHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Interview Preparation</h1>
        </div>
        <Button size="sm">
          <Video className="mr-2 h-4 w-4" />
          Start Mock Interview
        </Button>
      </div>
      <p className="text-muted-foreground">
        Practice common interview questions, prepare for specific companies, and simulate real interviews.
      </p>
    </div>
  )
}
