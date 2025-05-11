import { notFound } from "next/navigation"
import { ResumeOptimizerHeader } from "@/components/resume-optimizer/resume-optimizer-header"
import { ResumeAnalysis } from "@/components/resume-optimizer/resume-analysis"
import { getResumeAnalysis } from "@/actions/resume-actions"

export default async function ResumeAnalysisPage({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    const analysis = await getResumeAnalysis(id)

    if (!analysis) {
      return (
        <div className="flex flex-col h-full">
          <ResumeOptimizerHeader />
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Analysis in Progress</h2>
                <p className="text-gray-400">Your resume is being analyzed by our AI. This may take a few moments.</p>
                <div className="mt-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col h-full">
        <ResumeOptimizerHeader />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <ResumeAnalysis id={id} analysis={analysis} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching resume analysis:", error)
    notFound()
  }
}
