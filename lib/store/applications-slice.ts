import type { StateCreator } from "zustand"
import type { StoreState } from "./index"
import { AppError } from "@/lib/error-handling"

// Define types for application-related data
export interface Application {
  id: string
  jobId: string
  resumeId: string
  status: "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn"
  appliedDate: string
  lastUpdated: string
  notes?: string
  contactInfo?: {
    name?: string
    email?: string
    phone?: string
    position?: string
  }
  interviews?: Array<{
    id: string
    date: string
    type: "phone" | "video" | "in-person" | "technical" | "other"
    notes?: string
    completed: boolean
    feedback?: string
  }>
  followUps?: Array<{
    id: string
    date: string
    type: "email" | "phone" | "other"
    notes?: string
    response?: string
  }>
  documents?: Array<{
    id: string
    type: "resume" | "cover_letter" | "portfolio" | "other"
    name: string
    url: string
    uploadedAt: string
  }>
}

// Define the applications slice of the store
export interface ApplicationsSlice {
  applications: Application[]
  isLoading: boolean
  error: string | null

  // Actions
  setApplications: (applications: Application[]) => void
  addApplication: (application: Application) => void
  updateApplication: (id: string, data: Partial<Application>) => void
  deleteApplication: (id: string) => void
  updateApplicationStatus: (id: string, status: Application["status"]) => void
  addInterview: (applicationId: string, interview: Application["interviews"][0]) => void
  updateInterview: (applicationId: string, interviewId: string, data: Partial<Application["interviews"][0]>) => void
  deleteInterview: (applicationId: string, interviewId: string) => void
  addFollowUp: (applicationId: string, followUp: Application["followUps"][0]) => void
  updateFollowUp: (applicationId: string, followUpId: string, data: Partial<Application["followUps"][0]>) => void
  deleteFollowUp: (applicationId: string, followUpId: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

// Create the applications slice
export const createApplicationsSlice: StateCreator<StoreState, [], [], ApplicationsSlice> = (set, get) => ({
  applications: [],
  isLoading: false,
  error: null,

  // Applications actions
  setApplications: (applications) => set({ applications }),

  addApplication: (application) => {
    const { applications } = get()
    const existingApplication = applications.find((a) => a.id === application.id)

    if (existingApplication) {
      throw new AppError("Application with this ID already exists", "DUPLICATE_APPLICATION")
    }

    set({ applications: [...applications, application] })

    // Notify the events system about the new application
    const { addEvent } = get()
    addEvent({
      type: "application_created",
      title: "Application Submitted",
      description: `A new job application was submitted`,
      timestamp: new Date().toISOString(),
      data: { applicationId: application.id, jobId: application.jobId },
    })
  },

  updateApplication: (id, data) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === id)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const updatedApplication = {
      ...applications[applicationIndex],
      ...data,
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })
  },

  deleteApplication: (id) => {
    const { applications } = get()
    const applicationToDelete = applications.find((a) => a.id === id)

    if (!applicationToDelete) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    set({
      applications: applications.filter((a) => a.id !== id),
    })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "application_deleted",
      title: "Application Deleted",
      description: `A job application was deleted`,
      timestamp: new Date().toISOString(),
      data: { applicationId: id },
    })
  },

  updateApplicationStatus: (id, status) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === id)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const prevStatus = applications[applicationIndex].status
    const updatedApplication = {
      ...applications[applicationIndex],
      status,
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })

    // Notify the events system about the status change
    const { addEvent } = get()
    addEvent({
      type: "application_status_changed",
      title: "Application Status Updated",
      description: `Application status changed from ${prevStatus} to ${status}`,
      timestamp: new Date().toISOString(),
      data: { applicationId: id, prevStatus, newStatus: status },
    })
  },

  addInterview: (applicationId, interview) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === applicationId)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const application = applications[applicationIndex]
    const interviews = application.interviews || []

    const updatedApplication = {
      ...application,
      interviews: [...interviews, interview],
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })

    // Notify the events system about the new interview
    const { addEvent } = get()
    addEvent({
      type: "interview_scheduled",
      title: "Interview Scheduled",
      description: `A new interview was scheduled for ${new Date(interview.date).toLocaleDateString()}`,
      timestamp: new Date().toISOString(),
      data: { applicationId, interviewId: interview.id },
    })
  },

  updateInterview: (applicationId, interviewId, data) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === applicationId)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const application = applications[applicationIndex]
    const interviews = application.interviews || []
    const interviewIndex = interviews.findIndex((i) => i.id === interviewId)

    if (interviewIndex === -1) {
      throw new AppError("Interview not found", "INTERVIEW_NOT_FOUND")
    }

    const updatedInterviews = [...interviews]
    updatedInterviews[interviewIndex] = {
      ...interviews[interviewIndex],
      ...data,
    }

    const updatedApplication = {
      ...application,
      interviews: updatedInterviews,
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })
  },

  deleteInterview: (applicationId, interviewId) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === applicationId)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const application = applications[applicationIndex]
    const interviews = application.interviews || []

    const updatedApplication = {
      ...application,
      interviews: interviews.filter((i) => i.id !== interviewId),
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "interview_deleted",
      title: "Interview Deleted",
      description: `An interview was deleted`,
      timestamp: new Date().toISOString(),
      data: { applicationId, interviewId },
    })
  },

  addFollowUp: (applicationId, followUp) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === applicationId)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const application = applications[applicationIndex]
    const followUps = application.followUps || []

    const updatedApplication = {
      ...application,
      followUps: [...followUps, followUp],
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })

    // Notify the events system about the new follow-up
    const { addEvent } = get()
    addEvent({
      type: "follow_up_created",
      title: "Follow-Up Added",
      description: `A new follow-up was added for ${new Date(followUp.date).toLocaleDateString()}`,
      timestamp: new Date().toISOString(),
      data: { applicationId, followUpId: followUp.id },
    })
  },

  updateFollowUp: (applicationId, followUpId, data) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === applicationId)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const application = applications[applicationIndex]
    const followUps = application.followUps || []
    const followUpIndex = followUps.findIndex((f) => f.id === followUpId)

    if (followUpIndex === -1) {
      throw new AppError("Follow-up not found", "FOLLOW_UP_NOT_FOUND")
    }

    const updatedFollowUps = [...followUps]
    updatedFollowUps[followUpIndex] = {
      ...followUps[followUpIndex],
      ...data,
    }

    const updatedApplication = {
      ...application,
      followUps: updatedFollowUps,
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })
  },

  deleteFollowUp: (applicationId, followUpId) => {
    const { applications } = get()
    const applicationIndex = applications.findIndex((a) => a.id === applicationId)

    if (applicationIndex === -1) {
      throw new AppError("Application not found", "APPLICATION_NOT_FOUND")
    }

    const application = applications[applicationIndex]
    const followUps = application.followUps || []

    const updatedApplication = {
      ...application,
      followUps: followUps.filter((f) => f.id !== followUpId),
      lastUpdated: new Date().toISOString(),
    }

    const updatedApplications = [...applications]
    updatedApplications[applicationIndex] = updatedApplication

    set({ applications: updatedApplications })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "follow_up_deleted",
      title: "Follow-Up Deleted",
      description: `A follow-up was deleted`,
      timestamp: new Date().toISOString(),
      data: { applicationId, followUpId },
    })
  },

  // Loading and error state actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})
