import { Button } from "@/components/ui/button"
import { FileText, BarChart2 } from "lucide-react"

export function JobMatchHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Job Match</h1>
        <p className="text-muted-foreground">Compare your resume with job descriptions and get tailoring suggestions</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <BarChart2 className="h-4 w-4 mr-2" />
          Skills Gap Analysis
        </Button>
        <Button size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Match New Job
        </Button>
      </div>
    </div>
  )
}
