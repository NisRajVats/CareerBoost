import type { StateCreator } from "zustand"
import type { StoreState } from "./index"
import { AppError } from "@/lib/error-handling"

// Define types for user-related data
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
  phone?: string
  location?: string
  title?: string
  bio?: string
  skills?: string[]
  experience?: Array<{
    id: string
    title: string
    company: string
    location?: string
    startDate: string
    endDate?: string
    current: boolean
    description?: string
  }>
  education?: Array<{
    id: string
    degree: string
    institution: string
    location?: string
    startDate: string
    endDate?: string
    current: boolean
    description?: string
  }>
  preferences?: {
    jobTypes?: ("full-time" | "part-time" | "contract" | "internship" | "remote")[]
    locations?: string[]
    industries?: string[]
    minSalary?: number
    notifications?: {
      email?: boolean
      push?: boolean
      jobAlerts?: boolean
      applicationUpdates?: boolean
      newMatches?: boolean
    }
  }
  createdAt: string
  updatedAt: string
}

export interface UserStats {
  applicationsTotal: number
  applicationsActive: number
  interviewsTotal: number
  interviewRate: number
  offersTotal: number
  offerRate: number
  averageResponseTime: number
  topSkills: Array<{ skill: string; score: number }>
  improvementAreas: Array<{ area: string; score: number }>
}

// Define the user slice of the store
export interface UserSlice {
  user: User | null
  userStats: UserStats | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  // Actions
  setUser: (user: User | null) => void
  updateUser: (data: Partial<User>) => void
  setUserStats: (stats: UserStats | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
}

// Create the user slice
export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (set, get) => ({
  user: null,
  userStats: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // User actions
  setUser: (user) => set({ user }),

  updateUser: (data) => {
    const { user } = get()

    if (!user) {
      throw new AppError("No user is currently logged in", "NO_USER")
    }

    const updatedUser = {
      ...user,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    set({ user: updatedUser })

    // Notify the events system about the user update
    const { addEvent } = get()
    addEvent({
      type: "user_updated",
      title: "Profile Updated",
      description: `Your profile information was updated`,
      timestamp: new Date().toISOString(),
      data: { userId: user.id },
    })
  },

  setUserStats: (userStats) => set({ userStats }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  logout: () => {
    set({
      user: null,
      userStats: null,
      isAuthenticated: false,
    })

    // Notify the events system about the logout
    const { addEvent } = get()
    addEvent({
      type: "user_logged_out",
      title: "Logged Out",
      description: `You have been logged out`,
      timestamp: new Date().toISOString(),
      data: {},
    })
  },
})
