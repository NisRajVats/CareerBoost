"use server"

import { revalidatePath } from "next/cache"
import type { SystemEvent } from "@/lib/store/events-slice"

// In a real app, this would interact with a database
// For now, we'll use a simple in-memory store
let notifications: SystemEvent[] = [
  {
    id: "notif-1",
    type: "application",
    title: "Application Status Update",
    description: "Your application for Senior Frontend Developer at TechCorp has moved to the interview stage.",
    timestamp: new Date().toISOString(),
    data: { applicationId: "app-1" },
    read: false,
  },
  {
    id: "notif-2",
    type: "resume",
    title: "Resume Score Updated",
    description: "Your resume score has increased by 15 points after recent optimizations.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "notif-3",
    type: "job",
    title: "New Job Match",
    description: "We found 5 new jobs that match your profile with 85%+ compatibility.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "notif-4",
    type: "interview",
    title: "Interview Reminder",
    description: "You have an interview with DesignHub tomorrow at 10:30 AM.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    data: { interviewId: "interview-2" },
    read: true,
  },
]

export async function getNotifications() {
  // In a real app, this would fetch from a database
  return [...notifications]
}

export async function markNotificationAsRead(id: string) {
  // In a real app, this would update a database
  notifications = notifications.map((notification) =>
    notification.id === id ? { ...notification, read: true } : notification,
  )
  revalidatePath("/")
  return { success: true }
}

export async function markAllNotificationsAsRead() {
  // In a real app, this would update a database
  notifications = notifications.map((notification) => ({ ...notification, read: true }))
  revalidatePath("/")
  return { success: true }
}

export async function clearAllNotifications() {
  // In a real app, this would update a database
  notifications = []
  revalidatePath("/")
  return { success: true }
}

export async function addNotification(notification: Omit<SystemEvent, "id" | "read">) {
  // In a real app, this would add to a database
  const newNotification: SystemEvent = {
    id: `notif-${Date.now()}`,
    ...notification,
    read: false,
  }
  notifications = [newNotification, ...notifications]
  revalidatePath("/")
  return { success: true, notification: newNotification }
}
