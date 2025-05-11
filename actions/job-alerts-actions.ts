"use server"

import { revalidatePath } from "next/cache"
import { AppError, logError } from "@/lib/error-handling"

// Get job alerts
export async function getJobAlerts() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "alert-1",
        name: "Frontend Developer Jobs",
        keywords: ["React", "Frontend", "JavaScript"],
        locations: ["San Francisco, CA", "Remote"],
        salary: { min: 100000, max: 150000 },
        jobType: ["Full-time"],
        frequency: "daily",
        createdAt: "2023-06-01T10:00:00Z",
        lastSent: "2023-06-25T08:00:00Z",
        active: true,
      },
      {
        id: "alert-2",
        name: "UX Designer Positions",
        keywords: ["UX", "UI", "Design", "Figma"],
        locations: ["New York, NY", "Boston, MA", "Remote"],
        salary: { min: 90000, max: 130000 },
        jobType: ["Full-time", "Contract"],
        frequency: "weekly",
        createdAt: "2023-05-15T14:30:00Z",
        lastSent: "2023-06-22T08:00:00Z",
        active: true,
      },
      {
        id: "alert-3",
        name: "Product Manager Roles",
        keywords: ["Product Manager", "Product Owner", "Agile"],
        locations: ["Austin, TX", "Denver, CO", "Remote"],
        salary: { min: 110000, max: 160000 },
        jobType: ["Full-time"],
        frequency: "daily",
        createdAt: "2023-06-10T09:15:00Z",
        lastSent: "2023-06-25T08:00:00Z",
        active: true,
      },
    ]
  } catch (error) {
    logError(error, { action: "getJobAlerts" })
    throw new AppError("Failed to fetch job alerts", "FETCH_ERROR")
  }
}

// Get alert settings
export async function getAlertSettings() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return {
      notificationChannels: {
        email: true,
        push: true,
        inApp: true,
      },
      emailFrequency: "daily", // daily, weekly, immediate
      pushNotifications: true,
      alertSummary: true,
      alertSummaryFrequency: "weekly", // daily, weekly
    }
  } catch (error) {
    logError(error, { action: "getAlertSettings" })
    throw new AppError("Failed to fetch alert settings", "FETCH_ERROR")
  }
}

// Get recent alerts
export async function getRecentAlerts() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "recent-1",
        alertId: "alert-1",
        alertName: "Frontend Developer Jobs",
        jobTitle: "Senior React Developer",
        company: "TechInnovate",
        location: "San Francisco, CA (Remote)",
        salary: "$130,000 - $150,000",
        matchScore: 92,
        postedDate: "2023-06-24T10:30:00Z",
        url: "#",
      },
      {
        id: "recent-2",
        alertId: "alert-1",
        alertName: "Frontend Developer Jobs",
        jobTitle: "Frontend Engineer",
        company: "WebSolutions",
        location: "Remote",
        salary: "$110,000 - $135,000",
        matchScore: 88,
        postedDate: "2023-06-24T09:15:00Z",
        url: "#",
      },
      {
        id: "recent-3",
        alertId: "alert-2",
        alertName: "UX Designer Positions",
        jobTitle: "Senior UX Designer",
        company: "CreativeMinds",
        location: "New York, NY",
        salary: "$120,000 - $140,000",
        matchScore: 95,
        postedDate: "2023-06-23T14:45:00Z",
        url: "#",
      },
      {
        id: "recent-4",
        alertId: "alert-3",
        alertName: "Product Manager Roles",
        jobTitle: "Senior Product Manager",
        company: "ProductFirst",
        location: "Remote",
        salary: "$140,000 - $160,000",
        matchScore: 90,
        postedDate: "2023-06-23T11:20:00Z",
        url: "#",
      },
      {
        id: "recent-5",
        alertId: "alert-2",
        alertName: "UX Designer Positions",
        jobTitle: "UI/UX Designer",
        company: "DesignWorks",
        location: "Boston, MA (Hybrid)",
        salary: "$100,000 - $120,000",
        matchScore: 85,
        postedDate: "2023-06-22T16:10:00Z",
        url: "#",
      },
    ]
  } catch (error) {
    logError(error, { action: "getRecentAlerts" })
    throw new AppError("Failed to fetch recent alerts", "FETCH_ERROR")
  }
}

// Create job alert
export async function createJobAlert(data) {
  try {
    // In a real implementation, this would create a record in the database
    // For now, we'll just simulate the creation
    console.log("Creating job alert:", data)

    // Revalidate the job alerts page to reflect the changes
    revalidatePath("/job-alerts")

    return {
      success: true,
      alert: {
        id: `alert-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastSent: null,
        active: true,
        ...data,
      },
    }
  } catch (error) {
    logError(error, { action: "createJobAlert" })
    throw new AppError("Failed to create job alert", "CREATE_ERROR")
  }
}

// Update job alert
export async function updateJobAlert(id, data) {
  try {
    // In a real implementation, this would update a record in the database
    // For now, we'll just simulate the update
    console.log(`Updating job alert ${id}:`, data)

    // Revalidate the job alerts page to reflect the changes
    revalidatePath("/job-alerts")

    return { success: true }
  } catch (error) {
    logError(error, { action: "updateJobAlert" })
    throw new AppError("Failed to update job alert", "UPDATE_ERROR")
  }
}

// Delete job alert
export async function deleteJobAlert(id) {
  try {
    // In a real implementation, this would delete a record from the database
    // For now, we'll just simulate the deletion
    console.log(`Deleting job alert ${id}`)

    // Revalidate the job alerts page to reflect the changes
    revalidatePath("/job-alerts")

    return { success: true }
  } catch (error) {
    logError(error, { action: "deleteJobAlert" })
    throw new AppError("Failed to delete job alert", "DELETE_ERROR")
  }
}

// Update alert settings
export async function updateAlertSettings(settings) {
  try {
    // In a real implementation, this would update settings in the database
    // For now, we'll just simulate the update
    console.log("Updating alert settings:", settings)

    // Revalidate the job alerts page to reflect the changes
    revalidatePath("/job-alerts")

    return { success: true }
  } catch (error) {
    logError(error, { action: "updateAlertSettings" })
    throw new AppError("Failed to update alert settings", "UPDATE_ERROR")
  }
}

// Add the missing updateJobAlertSettings function
export async function updateJobAlertSettings(settings) {
  try {
    // In a real implementation, this would update job alert settings in the database
    // For now, we'll just simulate the update
    console.log("Updating job alert settings:", settings)

    // Revalidate the job alerts page to reflect the changes
    revalidatePath("/job-alerts")

    return { success: true }
  } catch (error) {
    logError(error, { action: "updateJobAlertSettings" })
    throw new AppError("Failed to update job alert settings", "UPDATE_ERROR")
  }
}
