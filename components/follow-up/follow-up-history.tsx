import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export function FollowUpHistory({ history = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-Up History</CardTitle>
        <CardDescription>Track your sent follow-up emails and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No follow-up emails sent yet</p>
          ) : (
            <div className="divide-y">
              {history.map((item) => (
                <div key={item.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.company}</h4>
                      <p className="text-sm text-muted-foreground">{item.jobTitle}</p>
                    </div>
                    <Badge variant={item.status === "opened" ? "success" : "secondary"}>
                      {item.status === "opened" ? "Opened" : "Sent"}
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">{item.subject}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>To: {item.recipient}</span>
                    <span>{formatDistanceToNow(new Date(item.sentDate), { addSuffix: true })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
