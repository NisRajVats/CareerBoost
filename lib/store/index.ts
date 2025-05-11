import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createResumeSlice, type ResumeSlice } from "./resume-slice"
import { createJobsSlice, type JobsSlice } from "./jobs-slice"
import { createApplicationsSlice, type ApplicationsSlice } from "./applications-slice"
import { createUserSlice, type UserSlice } from "./user-slice"
import { createEventsSlice, type EventsSlice } from "./events-slice"
import { logger } from "./middleware"

export type StoreState = ResumeSlice & JobsSlice & ApplicationsSlice & UserSlice & EventsSlice

export const useStore = create<StoreState>()(
  logger(
    persist(
      (...a) => ({
        ...createResumeSlice(...a),
        ...createJobsSlice(...a),
        ...createApplicationsSlice(...a),
        ...createUserSlice(...a),
        ...createEventsSlice(...a),
      }),
      {
        name: "ai-resume-dashboard-store",
        partialize: (state) => ({
          user: state.user,
          // Only persist user data, not the entire state
        }),
      },
    ),
    "ai-resume-dashboard",
  ),
)
