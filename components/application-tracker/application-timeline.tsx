"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Calendar, Mail, MessageSquare, FileText } from "lucide-react"
import { format } from "date-fns"

export function ApplicationTimeline({ timeline }) {
  const getEventIcon = (type) => {
    switch (type) {
      case "applied":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "status_change":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "interview_scheduled":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "interview_completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "follow_up_sent":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "response_received":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "offer_received":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "withdrawn":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case "applied":
        return "border-blue-800"
      case "status_change":
        return "border-yellow-800"
      case "interview_scheduled":
        return "border-purple-800"
      case "interview_completed":
        return "border-green-800"
      case "follow_up_sent":
        return "border-blue-800"
      case "response_received":
        return "border-green-800"
      case "offer_received":
        return "border-green-800"
      case "rejected":
        return "border-red-800"
      case "withdrawn":
        return "border-gray-800"
      default:
        return "border-gray-800"
    }
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6 border-l border-gray-800">
          {timeline.map((event, index) => (
            <div key={event.id} className={`mb-6 ${index === timeline.length - 1 ? "" : ""}`}>
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 bg-[#111827] border-gray-800"></div>
              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getEventIcon(event.type)}
                    <h3 className="text-sm font-medium">{event.title}</h3>
                    <Badge variant="outline" className={`text-xs ${getEventColor(event.type)}`}>
                      {format(new Date(event.date), "MMM d, yyyy")}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{event.description}</p>
                  {event.details && (
                    <div className="mt-2 p-2 bg-[#0a0e17] rounded text-xs text-gray-400">{event.details}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
