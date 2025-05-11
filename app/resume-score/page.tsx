"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/lib/store"
import { ResumeScoreHeader } from "@/components/resume-score/resume-score-header"
import { ScoreOverview } from "@/components/resume-score/score-overview"
import { CategoryBreakdown } from "@/components/resume-score/category-breakdown"
import { IndustryComparison } from "@/components/resume-score/industry-comparison"
import { ScoreHistory } from "@/components/resume-score/score-history"
import { ImprovementRecommendations } from "@/components/resume-score/improvement-recommendations"
import { CompetitiveAnalysis } from "@/components/resume-score/competitive-analysis"
import { NoResumeUploaded } from "@/components/resume-score/no-resume-uploaded"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useResumeData } from "@/hooks/use-resume-data"
import { getIndustryBenchmarks } from "@/actions/score-actions"
import { StepCompletion } from "@/components/onboarding/step-completion"

export default function ResumeScorePage() {
  const { isInitialized } = useResumeData()
  const { resumeScores, resumeHistory, isLoading, error } = useStore()

  const [industryBenchmarks, setIndustryBenchmarks] = useState(null)
  const [showStepCompletion, setShowStepCompletion] = useState(false)

  // Get the latest score
  const latestScore = resumeScores["latest"]

  useEffect(() => {
    async function loadBenchmarks() {
      if (latestScore?.industry) {
        const benchmarks = await getIndustryBenchmarks(latestScore.industry)
        setIndustryBenchmarks(benchmarks)
        
        // Show step completion after data is loaded
        setShowStepCompletion(true)
      }
    }

    loadBenchmarks()
  }, [latestScore?.industry])

  // Show loading state
  if (isLoading || !isInitialized) {
    return (
      <div className="flex flex-col h-full">
        <ResumeScoreHeader />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <LoadingState fullPage message="Loading resume data..." />
          </div>
        </div>
      </div>
    )
  }

  // If no resume has been uploaded yet, show the upload prompt
  if (!latestScore) {
    return (
      <div className="flex flex-col h-full">
        <ResumeScoreHeader />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <NoResumeUploaded />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ResumeScoreHeader />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {showStepCompletion && (
            <div className="mb-6">
              <StepCompletion stepId="resume-score" nextStepId="job-search" />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <ErrorBoundary>
                <ScoreOverview score={latestScore} />
              </ErrorBoundary>
            </div>
            <div className="lg:col-span-2">
              <ErrorBoundary>
                <CategoryBreakdown categories={latestScore.categories} />
              </ErrorBoundary>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ErrorBoundary>
              <ScoreHistory history={resumeHistory} />
            </ErrorBoundary>
            <ErrorBoundary>
              {industryBenchmarks && (
                <IndustryComparison score={latestScore.overallScore} benchmarks={industryBenchmarks} />
              )}
            </ErrorBoundary>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <ErrorBoundary>
                <ImprovementRecommendations recommendations={latestScore.recommendations} />
              </ErrorBoundary>
            </div>
            <div className="lg:col-span-1">
              <ErrorBoundary>
                <CompetitiveAnalysis analysis={latestScore.competitiveAnalysis} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
