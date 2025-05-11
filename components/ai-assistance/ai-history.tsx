import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Trash2 } from "lucide-react"

export function AIHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chat History</CardTitle>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear history</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Resume Improvement Tips</span>
          </div>
          <span className="text-xs text-muted-foreground">Today</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Interview Question Practice</span>
          </div>
          <span className="text-xs text-muted-foreground">Yesterday</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Cover Letter Generator</span>
          </div>
          <span className="text-xs text-muted-foreground">3 days ago</span>
        </div>
      </CardContent>
    </Card>
  )
}
