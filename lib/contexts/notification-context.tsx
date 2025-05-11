"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useStore } from "@/lib/store"
import type { SystemEvent } from "@/lib/store/events-slice"

export type NotificationPreference = {
  type: string
  enabled: boolean
}

type NotificationContextType = {
  notifications: SystemEvent[]
  unreadCount: number
  groupedNotifications: Record<string, SystemEvent[]>
  preferences: NotificationPreference[]
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  updatePreference: (type: string, enabled: boolean) => void
}

const defaultPreferences: NotificationPreference[] = [
  { type: "application", enabled: true },
  { type: "interview", enabled: true },
  { type: "resume", enabled: true },
  { type: "job", enabled: true },
  { type: "system", enabled: true },
]

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Simple debounce implementation that doesn't rely on closures
function createDebouncer(delay: number) {
  let timeoutId: NodeJS.Timeout | null = null

  return {
    debounce: (fn: Function) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        fn()
        timeoutId = null
      }, delay)
    },
    cancel: () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    },
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  // Create a stable reference to the store selectors
  const storeRef = useRef({
    events: useStore.getState().events,
    markEventAsRead: useStore.getState().markEventAsRead,
    clearEvents: useStore.getState().clearEvents,
  })

  // Update the ref when the store changes
  useEffect(() => {
    return useStore.subscribe((state) => {
      storeRef.current = {
        events: state.events,
        markEventAsRead: state.markEventAsRead,
        clearEvents: state.clearEvents,
      }
    })
  }, [])

  // Local state
  const [notifications, setNotifications] = useState<SystemEvent[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [groupedNotifications, setGroupedNotifications] = useState<Record<string, SystemEvent[]>>({})
  const [preferences, setPreferences] = useState<NotificationPreference[]>(defaultPreferences)

  // Processing flag to prevent infinite loops
  const isProcessingRef = useRef(false)

  // Create a stable debouncer
  const debouncerRef = useRef(createDebouncer(300))

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedPrefs = localStorage.getItem("notification-preferences")
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs))
        }
      } catch (e) {
        console.error("Failed to load notification preferences", e)
      }
    }

    // Cleanup debouncer on unmount
    return () => {
      debouncerRef.current.cancel()
    }
  }, [])

  // Save preferences when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notification-preferences", JSON.stringify(preferences))
    }
  }, [preferences])

  // Process events from the store
  useEffect(() => {
    // Function to process events
    const processEvents = () => {
      if (isProcessingRef.current) return

      isProcessingRef.current = true

      try {
        const events = storeRef.current.events

        // Filter events based on preferences
        const filteredEvents = events.filter((event) => {
          const pref = preferences.find((p) => p.type === event.type)
          return pref ? pref.enabled : true
        })

        // Update notifications
        setNotifications(filteredEvents)

        // Update unread count
        setUnreadCount(filteredEvents.filter((event) => !event.read).length)

        // Group notifications by type
        const grouped: Record<string, SystemEvent[]> = {}
        filteredEvents.forEach((event) => {
          if (!grouped[event.type]) {
            grouped[event.type] = []
          }
          grouped[event.type].push(event)
        })
        setGroupedNotifications(grouped)

        // Persist notifications
        if (typeof window !== "undefined") {
          localStorage.setItem("notifications", JSON.stringify(filteredEvents))
        }
      } finally {
        isProcessingRef.current = false
      }
    }

    // Subscribe to store changes
    const unsubscribe = useStore.subscribe(
      (state) => state.events,
      (events) => {
        debouncerRef.current.debounce(processEvents)
      },
    )

    // Initial processing
    processEvents()

    return unsubscribe
  }, [preferences])

  // Mark a notification as read
  const markAsRead = (id: string) => {
    storeRef.current.markEventAsRead(id)
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    const events = storeRef.current.events
    events.forEach((event) => {
      if (!event.read && event.id) {
        storeRef.current.markEventAsRead(event.id)
      }
    })
  }

  // Clear all notifications
  const clearNotifications = () => {
    storeRef.current.clearEvents()
    if (typeof window !== "undefined") {
      localStorage.removeItem("notifications")
    }
  }

  // Update notification preference
  const updatePreference = (type: string, enabled: boolean) => {
    setPreferences((prev) => prev.map((pref) => (pref.type === type ? { ...pref, enabled } : pref)))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        groupedNotifications,
        preferences,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        updatePreference,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
