import type { StateCreator } from "zustand"
import type { StoreState } from "./index"

export interface SystemEvent {
  id?: string
  type: string
  title: string
  description: string
  timestamp: string
  data?: Record<string, any>
  read?: boolean
}

export interface EventsSlice {
  events: SystemEvent[]

  // Actions
  addEvent: (event: Omit<SystemEvent, "id" | "read">) => void
  markEventAsRead: (id: string) => void
  clearEvents: () => void
}

// Helper to prevent duplicate events
const isDuplicateEvent = (events: SystemEvent[], newEvent: Omit<SystemEvent, "id" | "read">) => {
  return events.some(
    (e) =>
      e.type === newEvent.type && e.title === newEvent.title && new Date(e.timestamp).getTime() > Date.now() - 5000,
  )
}

export const createEventsSlice: StateCreator<StoreState, [], [], EventsSlice> = (set, get) => ({
  events: [],

  addEvent: (event) => {
    // Check for duplicates before creating a new event
    if (isDuplicateEvent(get().events, event)) {
      return // Don't add duplicate events
    }

    const newEvent: SystemEvent = {
      id: crypto.randomUUID(),
      ...event,
      read: false,
    }

    set((state) => ({
      events: [newEvent, ...state.events].slice(0, 100), // Keep only the last 100 events
    }))

    // Log the event
    console.log(`[Event] ${event.type}: ${event.title}`, event)
  },

  markEventAsRead: (id) => {
    set((state) => ({
      events: state.events.map((event) => (event.id === id ? { ...event, read: true } : event)),
    }))
  },

  clearEvents: () => set({ events: [] }),
})
