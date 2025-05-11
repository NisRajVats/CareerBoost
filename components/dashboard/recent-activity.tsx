import { formatDistanceToNow } from "date-fns"
import { FileText, Search, CheckCircle, Calendar, Mail } from "lucide-react"

// Helper function to validate date
const isValidDate = (dateString) => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export function RecentActivity({ activities }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case "resume_update":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "job_search":
        return <Search className="h-4 w-4 text-green-500" />
      case "application":
        return <CheckCircle className="h-4 w-4 text-yellow-500" />
      case "interview":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "follow_up":
        return <Mail className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="p-2 bg-[#1a2236] rounded-full">{getActivityIcon(activity.type)}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-gray-400 truncate">{activity.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {activity.timestamp && isValidDate(activity.timestamp)
                ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })
                : "recently"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
