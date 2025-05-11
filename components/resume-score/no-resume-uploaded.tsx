import Link from "next/link"
import { FileText, Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NoResumeUploaded() {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardContent className="p-6">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Resume Found</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Upload your resume to get a comprehensive score analysis, industry benchmarks, and personalized improvement
            recommendations.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/resume-optimizer">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
