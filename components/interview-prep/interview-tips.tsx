import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function InterviewTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Tips</CardTitle>
        <CardDescription>Expert advice to help you succeed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">Before the Interview</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Research the company thoroughly</li>
            <li>Review the job description and match your skills</li>
            <li>Prepare your STAR stories (Situation, Task, Action, Result)</li>
            <li>Practice with mock interviews</li>
            <li>Prepare questions to ask the interviewer</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-1">During the Interview</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Make a strong first impression with professional attire</li>
            <li>Use the STAR method for behavioral questions</li>
            <li>Show enthusiasm and positive body language</li>
            <li>Listen carefully and ask for clarification if needed</li>
            <li>Provide specific examples from your experience</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-1">After the Interview</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Send a thank-you email within 24 hours</li>
            <li>Follow up if you haven't heard back in a week</li>
            <li>Reflect on what went well and areas for improvement</li>
            <li>Continue your job search until you have an offer</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
