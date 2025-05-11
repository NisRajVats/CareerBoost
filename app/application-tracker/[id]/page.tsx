import { ApplicationDetail } from "@/components/application-tracker/application-detail"
import { ApplicationTimeline } from "@/components/application-tracker/application-timeline"
import { ApplicationNotes } from "@/components/application-tracker/application-notes"
import {
  getApplicationById,
  getApplicationTimeline,
  getApplicationNotes,
  getInterviewPrep,
  getApplicationDocuments,
} from "@/actions/application-actions"
import { notFound } from "next/navigation"

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  try {
    // Fetch application data
    const application = await getApplicationById(params.id)
    const timeline = await getApplicationTimeline(params.id)
    const notes = await getApplicationNotes(params.id)
    const interviewPrep = await getInterviewPrep(params.id)
    const documents = await getApplicationDocuments(params.id)

    return (
      <div className="flex flex-col h-full">
        <ApplicationDetail application={application} />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ApplicationTimeline timeline={timeline} />
                <ApplicationNotes notes={notes} applicationId={params.id} />
              </div>
              <div className="space-y-6">{/* Interview prep and documents components would go here */}</div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
