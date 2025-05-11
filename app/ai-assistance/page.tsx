import { AIChat } from "@/components/ai-assistance/ai-chat"
import { MessageSquare } from "lucide-react"

export default function AIAssistancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Get personalized help with your resume, job search, interview preparation, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AIChat />
      </div>
    </div>
  )
}
