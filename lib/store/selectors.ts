import { useStore } from "./index"

// Resume selectors
export const useResumes = () => useStore((state) => state.resumes)
export const useCurrentResumeId = () => useStore((state) => state.currentResumeId)
export const useCurrentResume = () => {
  const resumes = useStore((state) => state.resumes)
  const currentResumeId = useStore((state) => state.currentResumeId)
  return resumes.find((resume) => resume.id === currentResumeId) || null
}
export const useResumeScore = (resumeId?: string) => {
  const scores = useStore((state) => state.resumeScores)
  const currentResumeId = useStore((state) => state.currentResumeId)
  const id = resumeId || currentResumeId || "latest"
  return scores[id] || null
}
export const useResumeHistory = () => useStore((state) => state.resumeHistory)
export const useResumeLoading = () => useStore((state) => state.isLoading)
export const useResumeError = () => useStore((state) => state.error)

// Job selectors
export const useJobs = () => useStore((state) => state.jobs)
export const useJobMatches = () => useStore((state) => state.jobMatches)
export const useJobById = (jobId: string) => {
  const jobs = useStore((state) => state.jobs)
  return jobs.find((job) => job.id === jobId) || null
}

// Application selectors
export const useApplications = () => useStore((state) => state.applications)
export const useApplicationById = (applicationId: string) => {
  const applications = useStore((state) => state.applications)
  return applications.find((app) => app.id === applicationId) || null
}
export const useApplicationsByStatus = (status: string) => {
  const applications = useStore((state) => state.applications)
  return applications.filter((app) => app.status === status)
}

// User selectors
export const useUser = () => useStore((state) => state.user)
export const useUserStats = () => useStore((state) => state.userStats)

// Events selectors
export const useEvents = () => useStore((state) => state.events)
export const useUnreadEvents = () => {
  const events = useStore((state) => state.events)
  return events.filter((event) => !event.read)
}
export const useEventsByType = (type: string) => {
  const events = useStore((state) => state.events)
  return events.filter((event) => event.type === type)
}
