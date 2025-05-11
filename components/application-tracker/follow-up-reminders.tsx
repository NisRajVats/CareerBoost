import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, isPast, isToday, isTomorrow } from "date-fns"

export function FollowUpReminders({ reminders = [] }) {
  const getDateLabel = (dateString) => {
    const date = new Date(dateString)
    if (isPast(date) && !isToday(date)) {
      return "Overdue"
    } else if (isToday(date)) {
      return "Today"
    } else if (isTomorrow(date)) {
      return "Tomorrow"
    } else {
      return format(date, "MMM d, yyyy")
    }
  }

  const getFollowUpTypeLabel = (type) => {
    switch (type) {
      case "application-follow-up":
        return "Application Follow-Up"
      case "interview-follow-up":
        return "Interview Thank You"
      case "screening-follow-up":
        return "Screening Follow-Up"
      default:
        return "Follow-Up"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-Up Reminders</CardTitle>
        <CardDescription>Don't forget to follow up on your applications</CardDescription>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No follow-up reminders</p>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{reminder.company}</h4>
                  <Badge
                    variant="outline"
                    className={
                      isPast(new Date(reminder.dueDate)) && !isToday(new Date(reminder.dueDate))
                        ? "bg-red-50 text-red-700 border-red-200"
                        : isToday(new Date(reminder.dueDate))
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {getDateLabel(reminder.dueDate)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{reminder.jobTitle}</p>
                <p className="text-xs mt-1">{getFollowUpTypeLabel(reminder.type)}</p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Create Follow-Up
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
