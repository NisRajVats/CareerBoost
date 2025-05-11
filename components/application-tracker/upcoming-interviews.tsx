import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export function UpcomingInterviews({ interviews = [] }) {
  const getInterviewTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "🎥"
      case "phone":
        return "📱"
      case "in-person":
        return "🏢"
      default:
        return "📅"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
        <CardDescription>Your scheduled interviews</CardDescription>
      </CardHeader>
      <CardContent>
        {interviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No upcoming interviews</p>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div key={interview.id} className="border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getInterviewTypeIcon(interview.type)}</span>
                  <div>
                    <h4 className="font-medium">{interview.company}</h4>
                    <p className="text-sm text-muted-foreground">{interview.jobTitle}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">{format(new Date(interview.date), "MMM d, yyyy 'at' h:mm a")}</div>
                  <Badge variant="outline">{interview.type}</Badge>
                </div>
                {interview.location && <p className="mt-1 text-xs text-muted-foreground">{interview.location}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
