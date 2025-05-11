import { InterviewPrepHeader } from "@/components/interview-prep/interview-prep-header"
import { InterviewQuestions } from "@/components/interview-prep/interview-questions"
import { MockInterviewSimulator } from "@/components/interview-prep/mock-interview-simulator"
import { CompanyResearch } from "@/components/interview-prep/company-research"
import { InterviewTips } from "@/components/interview-prep/interview-tips"
import { getInterviewQuestions, getCompanyResearch } from "@/actions/interview-actions"

export default async function InterviewPrepPage() {
  const questions = await getInterviewQuestions()
  const companyResearch = await getCompanyResearch()

  return (
    <div className="container mx-auto px-4 py-8">
      <InterviewPrepHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <InterviewQuestions questions={questions} />
          <MockInterviewSimulator />
        </div>
        <div className="space-y-6">
          <CompanyResearch companies={companyResearch} />
          <InterviewTips />
        </div>
      </div>
    </div>
  )
}
