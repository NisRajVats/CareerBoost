import { Percent } from "lucide-react"

export function ResumeScoreHeader() {
  return (
    <div className="border-b border-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Percent className="h-5 w-5 text-blue-500" />
          <h1 className="text-2xl font-bold">Resume Score</h1>
        </div>
        <p className="text-gray-400">
          Comprehensive analysis of your resume's effectiveness with industry benchmarks and improvement recommendations
        </p>
      </div>
    </div>
  )
}
