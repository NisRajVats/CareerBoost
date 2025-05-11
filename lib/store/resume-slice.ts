import type { StateCreator } from "zustand"
import type { StoreState } from "./index"
import { AppError } from "@/lib/error-handling"

export interface ResumeData {
  id: string
  title: string
  content: string
  updatedAt: string
  version: number
}

export interface ResumeScore {
  overallScore: number
  industry: string
  updatedAt: string
  categories: Array<{
    name: string
    type: string
    score: number
    description: string
  }>
  recommendations: Array<{
    name: string
    icon: string
    potentialImprovement: number
    items: string[]
  }>
  competitiveAnalysis: {
    percentileRanking: number
    insights: string[]
    topApplicantStrengths: string[]
  }
}

export interface ResumeHistory {
  date: string
  score: number
  atsScore: number
  relevanceScore: number
  contentScore: number
}

export interface ResumeSlice {
  resumes: ResumeData[]
  currentResumeId: string | null
  resumeScores: Record<string, ResumeScore>
  resumeHistory: ResumeHistory[]
  isLoading: boolean
  error: string | null

  // Actions
  setResumes: (resumes: ResumeData[]) => void
  addResume: (resume: ResumeData) => void
  updateResume: (id: string, data: Partial<ResumeData>) => void
  deleteResume: (id: string) => void
  setCurrentResume: (id: string | null) => void
  setResumeScore: (resumeId: string, score: ResumeScore) => void
  setResumeHistory: (history: ResumeHistory[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const createResumeSlice: StateCreator<StoreState, [], [], ResumeSlice> = (set, get) => ({
  resumes: [],
  currentResumeId: null,
  resumeScores: {},
  resumeHistory: [],
  isLoading: false,
  error: null,

  setResumes: (resumes) => set({ resumes }),

  addResume: (resume) => {
    const { resumes } = get()
    const existingResume = resumes.find((r) => r.id === resume.id)

    if (existingResume) {
      throw new AppError("Resume with this ID already exists", "DUPLICATE_RESUME")
    }

    set({ resumes: [...resumes, resume] })

    // Notify the events system about the new resume
    const { addEvent } = get()
    addEvent({
      type: "resume_created",
      title: "Resume Created",
      description: `Resume "${resume.title}" was created`,
      timestamp: new Date().toISOString(),
      data: { resumeId: resume.id },
    })
  },

  updateResume: (id, data) => {
    const { resumes } = get()
    const resumeIndex = resumes.findIndex((r) => r.id === id)

    if (resumeIndex === -1) {
      throw new AppError("Resume not found", "RESUME_NOT_FOUND")
    }

    const updatedResume = {
      ...resumes[resumeIndex],
      ...data,
      updatedAt: new Date().toISOString(),
      version: resumes[resumeIndex].version + 1,
    }

    const updatedResumes = [...resumes]
    updatedResumes[resumeIndex] = updatedResume

    set({ resumes: updatedResumes })

    // Notify the events system about the update
    const { addEvent } = get()
    addEvent({
      type: "resume_updated",
      title: "Resume Updated",
      description: `Resume "${updatedResume.title}" was updated`,
      timestamp: new Date().toISOString(),
      data: { resumeId: id },
    })
  },

  deleteResume: (id) => {
    const { resumes, currentResumeId } = get()
    const resumeToDelete = resumes.find((r) => r.id === id)

    if (!resumeToDelete) {
      throw new AppError("Resume not found", "RESUME_NOT_FOUND")
    }

    set({
      resumes: resumes.filter((r) => r.id !== id),
      // If the current resume is being deleted, set currentResumeId to null
      currentResumeId: currentResumeId === id ? null : currentResumeId,
    })

    // Notify the events system about the deletion
    const { addEvent } = get()
    addEvent({
      type: "resume_deleted",
      title: "Resume Deleted",
      description: `Resume "${resumeToDelete.title}" was deleted`,
      timestamp: new Date().toISOString(),
      data: { resumeId: id },
    })
  },

  setCurrentResume: (id) => set({ currentResumeId: id }),

  setResumeScore: (resumeId, score) => {
    set((state) => ({
      resumeScores: {
        ...state.resumeScores,
        [resumeId]: score,
      },
    }))

    // Notify the events system about the score update
    const { addEvent } = get()
    addEvent({
      type: "resume_scored",
      title: "Resume Scored",
      description: `Resume received a score of ${score.overallScore}`,
      timestamp: new Date().toISOString(),
      data: { resumeId, score: score.overallScore },
    })
  },

  setResumeHistory: (history) => set({ resumeHistory: history }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
})
