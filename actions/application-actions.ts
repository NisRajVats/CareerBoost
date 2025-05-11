"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { AppError, logError } from "@/lib/error-handling"

// Mock data for demonstration purposes
// In a real implementation, this would interact with a database
const mockApplications = [
  {
    id: "app-1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    status: "interview",
    appliedDate: "2023-06-15T10:30:00Z",
    lastUpdated: "2023-06-20T14:45:00Z",
    tags: ["React", "TypeScript", "Remote"],
    contactInfo: {
      name: "Sarah Johnson",
      position: "HR Manager",
      email: "sarah@techcorp.com",
      phone: "555-123-4567",
    },
    notes: [
      {
        id: "note-1",
        content:
          "Had a great initial call with the recruiter. They're looking for someone with strong React experience and leadership skills.",
        createdAt: "2023-06-15T11:45:00Z",
      },
      {
        id: "note-2",
        content:
          'Technical interview scheduled for next week. Need to review system design concepts an "Technical interview scheduled for next week. Need to review system design concepts and React performance optimization.',
        createdAt: "2023-06-18T09:20:00Z",
      },
    ],
  },
  {
    id: "app-2",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    location: "New York, NY",
    status: "applied",
    appliedDate: "2023-06-10T08:15:00Z",
    lastUpdated: "2023-06-10T08:15:00Z",
    tags: ["Node.js", "React", "MongoDB"],
    contactInfo: {
      name: "Michael Chen",
      position: "Technical Recruiter",
      email: "mchen@innovatetech.com",
    },
  },
  {
    id: "app-3",
    jobTitle: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    status: "screening",
    appliedDate: "2023-06-05T14:20:00Z",
    lastUpdated: "2023-06-12T11:30:00Z",
    tags: ["Figma", "UI Design", "Remote"],
    contactInfo: {
      name: "Alex Rivera",
      email: "alex@designhub.io",
    },
  },
  {
    id: "app-4",
    jobTitle: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    status: "rejected",
    appliedDate: "2023-05-28T09:45:00Z",
    lastUpdated: "2023-06-08T16:10:00Z",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    contactInfo: {
      name: "Jamie Wilson",
      position: "Engineering Manager",
      email: "jwilson@cloudsystems.com",
      phone: "555-987-6543",
    },
  },
  {
    id: "app-5",
    jobTitle: "Product Manager",
    company: "ProductLabs",
    location: "Chicago, IL (Hybrid)",
    status: "offer",
    appliedDate: "2023-05-20T11:00:00Z",
    lastUpdated: "2023-06-18T15:30:00Z",
    tags: ["Product Management", "Agile", "Hybrid"],
    contactInfo: {
      name: "Taylor Smith",
      position: "Director of Product",
      email: "tsmith@productlabs.com",
      phone: "555-456-7890",
    },
  },
]

// Get user applications with filtering and pagination
export async function getUserApplications({ query = "", status = "", dateRange = "", page = 1, limit = 10 } = {}) {
  try {
    // In a real implementation, this would query a database
    // For now, we'll filter the mock data
    let filteredApplications = [...mockApplications]

    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredApplications = filteredApplications.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(lowerQuery) ||
          app.company.toLowerCase().includes(lowerQuery) ||
          app.location?.toLowerCase().includes(lowerQuery) ||
          app.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      )
    }

    if (status) {
      filteredApplications = filteredApplications.filter((app) => app.status === status)
    }

    if (dateRange) {
      const now = new Date()
      let startDate

      switch (dateRange) {
        case "7days":
          startDate = new Date(now.setDate(now.getDate() - 7))
          break
        case "30days":
          startDate = new Date(now.setDate(now.getDate() - 30))
          break
        case "90days":
          startDate = new Date(now.setDate(now.getDate() - 90))
          break
        case "thisYear":
          startDate = new Date(now.getFullYear(), 0, 1)
          break
        default:
          startDate = null
      }

      if (startDate) {
        filteredApplications = filteredApplications.filter((app) => new Date(app.appliedDate) >= startDate)
      }
    }

    // Sort by last updated date (most recent first)
    filteredApplications.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())

    // Get total count before pagination
    const totalApplications = filteredApplications.length

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

    return {
      applications: paginatedApplications,
      totalApplications,
      currentPage: page,
      totalPages: Math.ceil(totalApplications / limit),
    }
  } catch (error) {
    logError(error, { action: "getUserApplications" })
    throw new AppError("Failed to fetch applications", "FETCH_ERROR")
  }
}

// Add a new application
export async function addApplication(applicationData) {
  try {
    // Validate required fields
    if (!applicationData.jobTitle || !applicationData.company) {
      throw new AppError("Job title and company are required", "VALIDATION_ERROR")
    }

    // In a real implementation, this would add to a database
    const newApplication = {
      id: `app-${uuidv4()}`,
      jobTitle: applicationData.jobTitle,
      company: applicationData.company,
      location: applicationData.location || "",
      status: "applied",
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      tags: [], // Tags would be extracted from job description or added manually
      contactInfo: {
        name: applicationData.contactName || "",
        email: applicationData.contactEmail || "",
        phone: applicationData.contactPhone || "",
      },
      notes: applicationData.notes
        ? [
            {
              id: `note-${uuidv4()}`,
              content: applicationData.notes,
              createdAt: new Date().toISOString(),
            },
          ]
        : [],
    }

    // In a real app, we would add to the database here
    console.log("Adding new application:", newApplication)

    // Revalidate the applications page to reflect the changes
    revalidatePath("/application-tracker")

    return { success: true, application: newApplication }
  } catch (error) {
    logError(error, { action: "addApplication" })

    if (error instanceof AppError) {
      throw error
    }

    throw new AppError("Failed to add application", "CREATE_ERROR")
  }
}

// Get application statistics
export async function getApplicationStats() {
  try {
    // In a real implementation, this would calculate stats from the database
    // For now, we'll return mock data
    return {
      totalApplications: mockApplications.length,
      totalChange: 20, // 20% increase from last month
      interviewRate: 40, // 40% of applications resulted in interviews
      interviewRateChange: 5, // 5% increase from last month
      responseRate: 60, // 60% of applications received a response
      responseRateChange: -2, // 2% decrease from last month
      avgResponseTime: 5, // 5 days average response time
      responseTimeChange: -10, // 10% decrease (improvement) from last month
      statusBreakdown: [
        { name: "Applied", value: 1 },
        { name: "Screening", value: 1 },
        { name: "Interview", value: 1 },
        { name: "Offer", value: 1 },
        { name: "Rejected", value: 1 },
        { name: "Withdrawn", value: 0 },
      ],
    }
  } catch (error) {
    logError(error, { action: "getApplicationStats" })
    throw new AppError("Failed to fetch application statistics", "FETCH_ERROR")
  }
}

// Get upcoming interviews
export async function getUpcomingInterviews() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "interview-1",
        applicationId: "app-1",
        company: "TechCorp",
        jobTitle: "Senior Frontend Developer",
        date: "2023-07-05T14:00:00Z",
        type: "video",
        location: "Zoom",
      },
      {
        id: "interview-2",
        applicationId: "app-3",
        company: "DesignHub",
        jobTitle: "UX/UI Designer",
        date: "2023-07-02T10:30:00Z",
        type: "phone",
      },
      {
        id: "interview-3",
        applicationId: "app-5",
        company: "ProductLabs",
        jobTitle: "Product Manager",
        date: "2023-07-10T15:00:00Z",
        type: "in-person",
        location: "123 Main St, Chicago, IL",
      },
    ]
  } catch (error) {
    logError(error, { action: "getUpcomingInterviews" })
    throw new AppError("Failed to fetch upcoming interviews", "FETCH_ERROR")
  }
}

// Get follow-up reminders
export async function getFollowUpReminders() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "reminder-1",
        applicationId: "app-1",
        company: "TechCorp",
        jobTitle: "Senior Frontend Developer",
        dueDate: "2023-07-01T00:00:00Z",
        type: "interview-follow-up",
      },
      {
        id: "reminder-2",
        applicationId: "app-2",
        company: "InnovateTech",
        jobTitle: "Full Stack Engineer",
        dueDate: "2023-07-03T00:00:00Z",
        type: "application-follow-up",
      },
      {
        id: "reminder-3",
        applicationId: "app-3",
        company: "DesignHub",
        jobTitle: "UX/UI Designer",
        dueDate: "2023-07-06T00:00:00Z",
        type: "screening-follow-up",
      },
    ]
  } catch (error) {
    logError(error, { action: "getFollowUpReminders" })
    throw new AppError("Failed to fetch follow-up reminders", "FETCH_ERROR")
  }
}

// Get application by ID
export async function getApplicationById(id) {
  try {
    // In a real implementation, this would query a database
    // For now, we'll find the application in our mock data
    const application = mockApplications.find((app) => app.id === id)

    if (!application) {
      throw new AppError("Application not found", "NOT_FOUND")
    }

    return application
  } catch (error) {
    logError(error, { action: "getApplicationById" })

    if (error instanceof AppError) {
      throw error
    }

    throw new AppError("Failed to fetch application details", "FETCH_ERROR")
  }
}

// Get application timeline
export async function getApplicationTimeline(applicationId) {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "event-1",
        type: "applied",
        title: "Application Submitted",
        description: "You submitted your application for this position.",
        date: "2023-06-15T10:30:00Z",
      },
      {
        id: "event-2",
        type: "status_change",
        title: "Status Changed to Screening",
        description: "Your application moved to the screening stage.",
        date: "2023-06-17T14:20:00Z",
      },
      {
        id: "event-3",
        type: "interview_scheduled",
        title: "Interview Scheduled",
        description: "A video interview has been scheduled.",
        date: "2023-06-18T09:15:00Z",
        details: "Zoom interview with Sarah Johnson (HR Manager) and David Lee (Engineering Manager)",
      },
      {
        id: "event-4",
        type: "interview_completed",
        title: "Interview Completed",
        description: "You completed the scheduled interview.",
        date: "2023-06-20T14:45:00Z",
      },
      {
        id: "event-5",
        type: "status_change",
        title: "Status Changed to Interview",
        description: "Your application moved to the interview stage.",
        date: "2023-06-20T15:30:00Z",
      },
    ]
  } catch (error) {
    logError(error, { action: "getApplicationTimeline" })
    throw new AppError("Failed to fetch application timeline", "FETCH_ERROR")
  }
}

// Get application notes
export async function getApplicationNotes(applicationId) {
  try {
    // In a real implementation, this would query a database
    // For now, we'll find the application in our mock data and return its notes
    const application = mockApplications.find((app) => app.id === applicationId)

    if (!application) {
      throw new AppError("Application not found", "NOT_FOUND")
    }

    return application.notes || []
  } catch (error) {
    logError(error, { action: "getApplicationNotes" })

    if (error instanceof AppError) {
      throw error
    }

    throw new AppError("Failed to fetch application notes", "FETCH_ERROR")
  }
}

// Get interview preparation materials
export async function getInterviewPrep(applicationId) {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return {
      commonQuestions: [
        "Tell me about yourself and your experience with React.",
        "Describe a challenging project you worked on and how you solved it.",
        "How do you approach performance optimization in web applications?",
        "What's your experience with state management libraries?",
        "How do you handle responsive design and accessibility?",
      ],
      companyResearch: {
        about: "TechCorp is a leading software company specializing in cloud-based solutions for enterprise clients.",
        culture: "Values innovation, collaboration, and work-life balance.",
        recentNews: "Recently launched a new AI-powered analytics platform.",
      },
      technicalTopics: [
        "React performance optimization",
        "State management patterns",
        "Component design patterns",
        "Testing strategies",
        "CSS-in-JS solutions",
      ],
    }
  } catch (error) {
    logError(error, { action: "getInterviewPrep" })
    throw new AppError("Failed to fetch interview preparation materials", "FETCH_ERROR")
  }
}

// Get application documents
export async function getApplicationDocuments(applicationId) {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "doc-1",
        type: "resume",
        name: "John_Doe_Resume.pdf",
        url: "/documents/resume.pdf",
        uploadedAt: "2023-06-15T10:30:00Z",
      },
      {
        id: "doc-2",
        type: "cover_letter",
        name: "Cover_Letter_TechCorp.pdf",
        url: "/documents/cover_letter.pdf",
        uploadedAt: "2023-06-15T10:30:00Z",
      },
      {
        id: "doc-3",
        type: "portfolio",
        name: "Portfolio_2023.pdf",
        url: "/documents/portfolio.pdf",
        uploadedAt: "2023-06-15T10:30:00Z",
      },
    ]
  } catch (error) {
    logError(error, { action: "getApplicationDocuments" })
    throw new AppError("Failed to fetch application documents", "FETCH_ERROR")
  }
}

// Update application status
export async function updateApplicationStatus(id, status) {
  try {
    // In a real implementation, this would update a database
    // For now, we'll just simulate the update

    // Validate the status
    const validStatuses = ["applied", "screening", "interview", "offer", "rejected", "withdrawn"]
    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid status", "VALIDATION_ERROR")
    }

    // In a real app, we would update the database here
    console.log(`Updating application ${id} status to ${status}`)

    // Revalidate the application page to reflect the changes
    revalidatePath(`/application-tracker/${id}`)
    revalidatePath("/application-tracker")

    return { success: true }
  } catch (error) {
    logError(error, { action: "updateApplicationStatus" })

    if (error instanceof AppError) {
      throw error
    }

    throw new AppError("Failed to update application status", "UPDATE_ERROR")
  }
}

// Delete application
export async function deleteApplication(id) {
  try {
    // In a real implementation, this would delete from a database
    // For now, we'll just simulate the deletion
    console.log(`Deleting application ${id}`)

    // Revalidate the applications page to reflect the changes
    revalidatePath("/application-tracker")

    return { success: true }
  } catch (error) {
    logError(error, { action: "deleteApplication" })
    throw new AppError("Failed to delete application", "DELETE_ERROR")
  }
}

// Add application note
export async function addApplicationNote(applicationId, content) {
  try {
    // In a real implementation, this would add to a database
    // For now, we'll just simulate the addition
    const noteId = uuidv4()
    console.log(`Adding note ${noteId} to application ${applicationId}`)

    // Revalidate the application page to reflect the changes
    revalidatePath(`/application-tracker/${applicationId}`)

    return {
      success: true,
      note: {
        id: noteId,
        content,
        createdAt: new Date().toISOString(),
      },
    }
  } catch (error) {
    logError(error, { action: "addApplicationNote" })
    throw new AppError("Failed to add note", "CREATE_ERROR")
  }
}

// Update application note
export async function updateApplicationNote(applicationId, noteId, content) {
  try {
    // In a real implementation, this would update a database
    // For now, we'll just simulate the update
    console.log(`Updating note ${noteId} for application ${applicationId}`)

    // Revalidate the application page to reflect the changes
    revalidatePath(`/application-tracker/${applicationId}`)

    return { success: true }
  } catch (error) {
    logError(error, { action: "updateApplicationNote" })
    throw new AppError("Failed to update note", "UPDATE_ERROR")
  }
}

// Delete application note
export async function deleteApplicationNote(applicationId, noteId) {
  try {
    // In a real implementation, this would delete from a database
    // For now, we'll just simulate the deletion
    console.log(`Deleting note ${noteId} from application ${applicationId}`)

    // Revalidate the application page to reflect the changes
    revalidatePath(`/application-tracker/${applicationId}`)

    return { success: true }
  } catch (error) {
    logError(error, { action: "deleteApplicationNote" })
    throw new AppError("Failed to delete note", "DELETE_ERROR")
  }
}
