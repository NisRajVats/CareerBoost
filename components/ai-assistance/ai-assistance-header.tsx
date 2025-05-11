import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles } from "lucide-react"

export function AIAssistanceHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">AI Assistance</h1>
        </div>
        <Button size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <p className="text-muted-foreground">
        Get personalized AI assistance for your job search, resume optimization, and interview preparation.
      </p>
    </div>
  )
}
