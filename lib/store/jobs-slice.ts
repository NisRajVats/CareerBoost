import type { StateCreator } from "zustand"
import type { StoreState } from "./index"
import { AppError } from "@/lib/error-handling"

// Define types for job-related data
export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  fullDescription?: string
  requirements?: string[]
  benefits?: string[]
  postedAt: string
  salary?: string
  jobType?: string
  experienceLevel?: string
  tags: string[]
  source?: string
  externalUrl?: string
  isBookmarked?: boolean
}

export interface JobMatch {
  jobId: string
  resumeId: string
  matchScore: number
  matchReasons: string[]
  updatedAt: string
}

export interface SavedSearch {
  id: string
  query?: string
  location?: string
  industry?: string
  experience?: string
  notifications: boolean
  createdAt: string
}

export interface JobAlert {
  id: string
  name: string
  criteria: {
    keywords?: string[]
    location?: string
    industry?: string
    experienceLevel?: string
    salary?: {
      min?: number
      max?: number
    }
  }
  frequency: "daily" | "weekly" | "immediate"
  notificationChannels: ("email" | "push" | "in-app")[]
  isActive: boolean
  createdAt: string
  lastTriggered?: string
}

// Define the jobs slice of the store
export interface JobsSlice {
  jobs: Job[]
  jobMatches: JobMatch[]
  savedSearches: SavedSearch[]
  jobAlerts: JobAlert[]
  isLoading: boolean
  error: string | null

  // Actions
  setJobs: (jobs: Job[]) => void
  addJob: (job: Job) => void
  updateJob: (id: string, data: Partial<Job>) => void
  deleteJob: (id: string) => void
  bookmarkJob: (id: string, isBookmarked: boolean) => void

  setJobMatches: (matches: JobMatch[]) => void
  addJobMatch: (match: JobMatch) => void
  updateJobMatch: (jobId: string, resumeId: string, data: Partial<JobMatch>) => void

  setSavedSearches: (searches: SavedSearch[]) => void
  addSavedSearch: (search: SavedSearch) => void
  updateSavedSearch: (id: string, data: Partial<SavedSearch>) => void
  deleteSavedSearch: (id: string) => void

  setJobAlerts: (alerts: JobAlert[]) => void
  addJobAlert: (alert: JobAlert) => void
  updateJobAlert: (id: string, data: Partial<JobAlert>) => void
  deleteJobAlert: (id: string) => void

  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

// Create the jobs slice
export const createJobsSlice: StateCreator<StoreState, [], [], JobsSlice> = (set, get) => ({
  jobs: [],
  jobMatches: [],
  savedSearches: [],
  jobAlerts: [],
  isLoading: false,
  error: null,

  // Jobs actions
  setJobs: (jobs) => set({ jobs }),

  addJob: (job) => {
    const { jobs } = get()
    const existingJob = jobs.find((j) => j.id === job.id)

    if (existingJob) {
      throw new AppError("Job with this ID already exists", "DUPLICATE_JOB")
    }

    set({ jobs: [...jobs, job] })

    // Notify the events system about the new job
    const { addEvent } = get()
    addEvent({
      type: "job_added",
      title: "New Job Added",
      description: `Job "${job.title}" at ${job.company} was added`,
      timestamp: new Date().toISOString(),
      data: { jobId: job.id },
    })
  },

  updateJob: (id, data) => {
    const { jobs } = get()
    const jobIndex = jobs.findIndex((j) => j.id === id)

    if (jobIndex === -1) {
      throw new AppError("Job not found", "JOB_NOT_FOUND")
    }

    const updatedJob = {
      ...jobs[jobIndex],
      ...data,
    }

    const updatedJobs = [...jobs]
    updatedJobs[jobIndex] = updatedJob

    set({ jobs: updatedJobs })
  },

  deleteJob: (id) => {
    const { jobs } = get()
    const jobToDelete = jobs.find((j) => j.id === id)

    if (!jobToDelete) {
      throw new AppError("Job not found", "JOB_NOT_FOUND")
    }

    set({
      jobs: jobs.filter((j) => j.id !== id),
    })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "job_deleted",
      title: "Job Deleted",
      description: `Job "${jobToDelete.title}" at ${jobToDelete.company} was deleted`,
      timestamp: new Date().toISOString(),
      data: { jobId: id },
    })
  },

  bookmarkJob: (id, isBookmarked) => {
    const { jobs } = get()
    const jobIndex = jobs.findIndex((j) => j.id === id)

    if (jobIndex === -1) {
      throw new AppError("Job not found", "JOB_NOT_FOUND")
    }

    const updatedJob = {
      ...jobs[jobIndex],
      isBookmarked,
    }

    const updatedJobs = [...jobs]
    updatedJobs[jobIndex] = updatedJob

    set({ jobs: updatedJobs })

    // Notify the events system about the bookmark
    const { addEvent } = get()
    addEvent({
      type: isBookmarked ? "job_bookmarked" : "job_unbookmarked",
      title: isBookmarked ? "Job Bookmarked" : "Job Removed from Bookmarks",
      description: `Job "${updatedJob.title}" at ${updatedJob.company} was ${isBookmarked ? "bookmarked" : "removed from bookmarks"}`,
      timestamp: new Date().toISOString(),
      data: { jobId: id },
    })
  },

  // Job matches actions
  setJobMatches: (jobMatches) => set({ jobMatches }),

  addJobMatch: (match) => {
    const { jobMatches } = get()
    const existingMatch = jobMatches.find((m) => m.jobId === match.jobId && m.resumeId === match.resumeId)

    if (existingMatch) {
      throw new AppError("Job match already exists", "DUPLICATE_JOB_MATCH")
    }

    set({ jobMatches: [...jobMatches, match] })

    // Notify the events system about the new match
    const { addEvent } = get()
    addEvent({
      type: "job_match_created",
      title: "New Job Match",
      description: `A new job match with score ${match.matchScore}% was found`,
      timestamp: new Date().toISOString(),
      data: { jobId: match.jobId, resumeId: match.resumeId, matchScore: match.matchScore },
    })
  },

  updateJobMatch: (jobId, resumeId, data) => {
    const { jobMatches } = get()
    const matchIndex = jobMatches.findIndex((m) => m.jobId === jobId && m.resumeId === resumeId)

    if (matchIndex === -1) {
      throw new AppError("Job match not found", "JOB_MATCH_NOT_FOUND")
    }

    const updatedMatch = {
      ...jobMatches[matchIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    const updatedMatches = [...jobMatches]
    updatedMatches[matchIndex] = updatedMatch

    set({ jobMatches: updatedMatches })
  },

  // Saved searches actions
  setSavedSearches: (savedSearches) => set({ savedSearches }),

  addSavedSearch: (search) => {
    const { savedSearches } = get()
    set({ savedSearches: [...savedSearches, search] })

    // Notify the events system about the new saved search
    const { addEvent } = get()
    addEvent({
      type: "search_saved",
      title: "Search Saved",
      description: `A new job search was saved${search.query ? ` for "${search.query}"` : ""}`,
      timestamp: new Date().toISOString(),
      data: { searchId: search.id },
    })
  },

  updateSavedSearch: (id, data) => {
    const { savedSearches } = get()
    const searchIndex = savedSearches.findIndex((s) => s.id === id)

    if (searchIndex === -1) {
      throw new AppError("Saved search not found", "SAVED_SEARCH_NOT_FOUND")
    }

    const updatedSearch = {
      ...savedSearches[searchIndex],
      ...data,
    }

    const updatedSearches = [...savedSearches]
    updatedSearches[searchIndex] = updatedSearch

    set({ savedSearches: updatedSearches })
  },

  deleteSavedSearch: (id) => {
    const { savedSearches } = get()
    const searchToDelete = savedSearches.find((s) => s.id === id)

    if (!searchToDelete) {
      throw new AppError("Saved search not found", "SAVED_SEARCH_NOT_FOUND")
    }

    set({
      savedSearches: savedSearches.filter((s) => s.id !== id),
    })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "search_deleted",
      title: "Saved Search Deleted",
      description: `A saved job search was deleted`,
      timestamp: new Date().toISOString(),
      data: { searchId: id },
    })
  },

  // Job alerts actions
  setJobAlerts: (jobAlerts) => set({ jobAlerts }),

  addJobAlert: (alert) => {
    const { jobAlerts } = get()
    set({ jobAlerts: [...jobAlerts, alert] })

    // Notify the events system about the new alert
    const { addEvent } = get()
    addEvent({
      type: "job_alert_created",
      title: "Job Alert Created",
      description: `Job alert "${alert.name}" was created`,
      timestamp: new Date().toISOString(),
      data: { alertId: alert.id },
    })
  },

  updateJobAlert: (id, data) => {
    const { jobAlerts } = get()
    const alertIndex = jobAlerts.findIndex((a) => a.id === id)

    if (alertIndex === -1) {
      throw new AppError("Job alert not found", "JOB_ALERT_NOT_FOUND")
    }

    const updatedAlert = {
      ...jobAlerts[alertIndex],
      ...data,
    }

    const updatedAlerts = [...jobAlerts]
    updatedAlerts[alertIndex] = updatedAlert

    set({ jobAlerts: updatedAlerts })
  },

  deleteJobAlert: (id) => {
    const { jobAlerts } = get()
    const alertToDelete = jobAlerts.find((a) => a.id === id)

    if (!alertToDelete) {
      throw new AppError("Job alert not found", "JOB_ALERT_NOT_FOUND")
    }

    set({
      jobAlerts: jobAlerts.filter((a) => a.id !== id),
    })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "job_alert_deleted",
      title: "Job Alert Deleted",
      description: `Job alert "${alertToDelete.name}" was deleted`,
      timestamp: new Date().toISOString(),
      data: { alertId: id },
    })
  },

  // Loading and error state actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})
