import { FileText } from "lucide-react"

export function ResumeOptimizerHeader() {
  return (
    <div className="border-b border-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h1 className="text-2xl font-bold">Resume Optimizer</h1>
        </div>
        <p className="text-gray-400">
          AI-powered resume analysis and improvement suggestions to help you land your dream job
        </p>
      </div>
    </div>
  )
}
