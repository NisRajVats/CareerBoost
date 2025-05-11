import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, PenTool, Search } from "lucide-react"

export function AIFeatures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Resume Analysis</h3>
            <p className="text-sm text-muted-foreground">Get detailed feedback on your resume</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Search className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Job Search Assistance</h3>
            <p className="text-sm text-muted-foreground">Find relevant job opportunities</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Interview Preparation</h3>
            <p className="text-sm text-muted-foreground">Practice with AI-powered mock interviews</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <PenTool className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Cover Letter Generation</h3>
            <p className="text-sm text-muted-foreground">Create tailored cover letters</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
