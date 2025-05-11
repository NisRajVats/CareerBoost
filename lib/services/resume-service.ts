import { useStore } from "@/lib/store"
import { TransactionManager, getAffectedEntities } from "@/lib/dependency-mapping"
import { AppError } from "@/lib/error-handling"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function updateResume(resumeId: string, data: any) {
  const transaction = new TransactionManager()

  // Store the original resume for rollback
  const store = useStore.getState()
  const originalResume = store.resumes.find((r) => r.id === resumeId)

  if (!originalResume) {
    throw new AppError("Resume not found", "RESUME_NOT_FOUND")
  }

  // Add the resume update operation
  transaction.addOperation(
    async () => {
      // Update in store
      store.updateResume(resumeId, data)

      // Update in blob storage
      const updatedResume = store.resumes.find((r) => r.id === resumeId)
      const resumeBlob = new Blob([JSON.stringify(updatedResume)], { type: "application/json" })
      await put(`resumes/${resumeId}/data.json`, resumeBlob, {
        access: "public",
      })

      // Process dependencies
      const affectedEntities = getAffectedEntities("resume", "update")

      for (const affected of affectedEntities) {
        if (affected.entity === "score" && affected.action === "invalidate") {
          // Mark the score as needing refresh
          store.setResumeScoreStatus(resumeId, "needs-refresh")
        }

        if (affected.entity === "job" && affected.action === "recalculate-match") {
          // Queue job match recalculation
          await queueJobMatchRecalculation(resumeId)
        }
      }

      // Revalidate paths
      revalidatePath(`/resume-optimizer/${resumeId}`)
      revalidatePath("/resume-score")
    },
    async () => {
      // Rollback operation - restore original resume
      if (originalResume) {
        store.setResumes(store.resumes.map((r) => (r.id === resumeId ? originalResume : r)))

        const resumeBlob = new Blob([JSON.stringify(originalResume)], { type: "application/json" })
        await put(`resumes/${resumeId}/data.json`, resumeBlob, {
          access: "public",
        })
      }
    },
  )

  // Execute the transaction
  const success = await transaction.execute()

  if (!success) {
    throw new AppError("Failed to update resume", "TRANSACTION_FAILED")
  }

  return store.resumes.find((r) => r.id === resumeId)
}

async function queueJobMatchRecalculation(resumeId: string) {
  // In a real implementation, this would add a job to a queue
  // For now, we'll just log it
  console.log(`Queued job match recalculation for resume ${resumeId}`)

  // Add an event
  const store = useStore.getState()
  store.addEvent({
    type: "job_match_recalculation_queued",
    title: "Job Match Recalculation",
    description: "Your job matches are being recalculated based on resume changes",
    timestamp: new Date().toISOString(),
    data: { resumeId },
  })
}
