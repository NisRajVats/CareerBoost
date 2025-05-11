import { ResumeUploader } from "@/components/resume-optimizer/resume-uploader"
import { ResumeOptimizerHeader } from "@/components/resume-optimizer/resume-optimizer-header"
import { StepCompletion } from "@/components/onboarding/step-completion"

export default function ResumeOptimizerPage() {
  return (
    <div className="flex flex-col h-full">
      <ResumeOptimizerHeader />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <StepCompletion stepId="resume-upload" nextStepId="resume-score" />
          <ResumeUploader />
        </div>
      </div>
    </div>
  )
}
