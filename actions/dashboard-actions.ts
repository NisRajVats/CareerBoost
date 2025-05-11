"use server"

export async function getUserDashboardData() {
  // In a real implementation, this would fetch data from a database
  // For now, we'll return mock data
  return {
    user: {
      id: "user-1",
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex@example.com",
      profileImage: null,
    },
    resumeScore: 85,
    applications: {
      total: 12,
      active: 8,
      statusBreakdown: [
        { name: "Applied", value: 12 },
        { name: "Screening", value: 5 },
        { name: "Interview", value: 3 },
        { name: "Offer", value: 1 },
        { name: "Rejected", value: 3 },
      ],
    },
    interviews: {
      total: 3,
      upcoming: 1,
      completed: 2,
      rate: 25, // 25% of applications resulted in interviews
    },
    jobMatches: 24,
    newMatches: 3,
    resumeHistory: [
      {
        date: "Jan 1",
        score: 65,
        atsScore: 60,
        relevanceScore: 70,
        contentScore: 65,
      },
      {
        date: "Jan 15",
        score: 70,
        atsScore: 68,
        relevanceScore: 72,
        contentScore: 70,
      },
      {
        date: "Feb 1",
        score: 75,
        atsScore: 72,
        relevanceScore: 75,
        contentScore: 78,
      },
      {
        date: "Feb 15",
        score: 78,
        atsScore: 75,
        relevanceScore: 78,
        contentScore: 80,
      },
      {
        date: "Mar 1",
        score: 82,
        atsScore: 80,
        relevanceScore: 82,
        contentScore: 83,
      },
      {
        date: "Mar 15",
        score: 85,
        atsScore: 85,
        relevanceScore: 84,
        contentScore: 86,
      },
    ],
    recentActivities: [
      {
        id: "activity-1",
        type: "resume_update",
        title: "Resume Updated",
        description: "You updated your resume and improved your score by 5 points",
        timestamp: "2023-03-15T14:30:00Z",
      },
      {
        id: "activity-2",
        type: "job_search",
        title: "New Job Matches",
        description: "3 new jobs match your profile in Software Development",
        timestamp: "2023-03-14T10:15:00Z",
      },
      {
        id: "activity-3",
        type: "application",
        title: "Application Submitted",
        description: "You applied for Senior Frontend Developer at TechCorp",
        timestamp: "2023-03-12T09:45:00Z",
      },
      {
        id: "activity-4",
        type: "interview",
        title: "Interview Scheduled",
        description: "Interview with DataSystems for Backend Engineer position",
        timestamp: "2023-03-10T16:20:00Z",
      },
      {
        id: "activity-5",
        type: "follow_up",
        title: "Follow-Up Email Sent",
        description: "You sent a follow-up email to CloudTech regarding your application",
        timestamp: "2023-03-08T11:05:00Z",
      },
    ],
    recommendations: [
      {
        id: "rec-1",
        title: "Improve Your Resume ATS Score",
        description: "Your resume could be better optimized for Applicant Tracking Systems.",
        priority: "high",
        actionText: "Optimize Resume",
        actionUrl: "/resume-optimizer",
      },
      {
        id: "rec-2",
        title: "Follow Up on Your Application",
        description: "It's been 7 days since you applied to WebSolutions. Consider sending a follow-up.",
        priority: "medium",
        actionText: "Generate Follow-Up",
        actionUrl: "/follow-up",
      },
      {
        id: "rec-3",
        title: "Prepare for Your Upcoming Interview",
        description: "You have an interview with DataSystems in 2 days. Prepare with our AI assistant.",
        priority: "high",
        actionText: "Practice Interview",
        actionUrl: "/ai-assistant",
      },
      {
        id: "rec-4",
        title: "Update Your Skills Section",
        description: "Adding emerging technologies to your skills could increase your job matches.",
        priority: "low",
        actionText: "Update Skills",
        actionUrl: "/profile",
      },
    ],
  }
}
