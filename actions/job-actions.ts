"use server"

import { revalidatePath } from "next/cache"
import { put, del } from "@vercel/blob"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { v4 as uuidv4 } from "uuid"

// Mock data for demonstration purposes
// In a real implementation, this would be fetched from an API or database
const mockJobs = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "We're looking for a senior frontend developer with React experience.",
    fullDescription: `
      <p>TechCorp is seeking a Senior Frontend Developer to join our growing team. You will be responsible for building user interfaces for our web applications using React and related technologies.</p>
      <p>As a Senior Frontend Developer, you will work closely with our design and backend teams to create seamless user experiences.</p>
    `,
    requirements: [
      "5+ years of experience with JavaScript and React",
      "Experience with TypeScript and Next.js",
      "Strong understanding of web performance optimization",
      "Experience with responsive design and cross-browser compatibility",
      "Excellent problem-solving skills and attention to detail",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work schedule and remote options",
      "Professional development budget",
      "Generous PTO policy",
    ],
    postedAt: "3 days ago",
    salary: "$120,000 - $150,000",
    jobType: "Full-time",
    experienceLevel: "Senior",
    tags: ["React", "TypeScript", "Next.js", "Frontend"],
    source: "LinkedIn",
    externalUrl: "https://linkedin.com/jobs/123",
    isBookmarked: false,
  },
  {
    id: "job-2",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Remote",
    description: "Backend engineer with Node.js and database experience needed.",
    fullDescription: `
      <p>DataSystems is looking for a Backend Engineer to help build and maintain our server infrastructure. You will be working with Node.js, Express, and various database technologies.</p>
      <p>This is a remote position with occasional team meetups.</p>
    `,
    requirements: [
      "3+ years of experience with Node.js and Express",
      "Experience with SQL and NoSQL databases",
      "Knowledge of API design and implementation",
      "Understanding of cloud services (AWS, Azure, or GCP)",
      "Experience with microservices architecture",
    ],
    benefits: [
      "Competitive salary",
      "Remote-first culture",
      "Flexible working hours",
      "Health insurance",
      "Annual team retreats",
    ],
    postedAt: "1 week ago",
    salary: "$100,000 - $130,000",
    jobType: "Full-time",
    experienceLevel: "Mid-Level",
    tags: ["Node.js", "Express", "MongoDB", "Backend"],
    source: "Indeed",
    externalUrl: "https://indeed.com/jobs/456",
    isBookmarked: false,
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    location: "New York, NY",
    description: "Creative UX/UI designer needed for innovative projects.",
    fullDescription: `
      <p>CreativeMinds is seeking a talented UX/UI Designer to join our design team. You will be responsible for creating user-centered designs for web and mobile applications.</p>
      <p>The ideal candidate has a strong portfolio demonstrating their design thinking and problem-solving abilities.</p>
    `,
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency with design tools like Figma and Adobe Creative Suite",
      "Experience with user research and usability testing",
      "Understanding of accessibility standards",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "Flexible work hours",
      "Creative work environment",
      "Professional development opportunities",
    ],
    postedAt: "2 days ago",
    salary: "$90,000 - $120,000",
    jobType: "Full-time",
    experienceLevel: "Mid-Level",
    tags: ["UX", "UI", "Figma", "Design"],
    source: "Dribbble",
    externalUrl: "https://dribbble.com/jobs/789",
    isBookmarked: false,
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    description: "DevOps engineer with cloud infrastructure experience needed.",
    fullDescription: `
      <p>CloudTech is looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will be working with AWS, Docker, and Kubernetes.</p>
      <p>This role requires a strong understanding of CI/CD pipelines and infrastructure as code.</p>
    `,
    requirements: [
      "3+ years of experience with AWS or other cloud platforms",
      "Experience with Docker and Kubernetes",
      "Knowledge of CI/CD tools like Jenkins or GitHub Actions",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Strong scripting skills (Bash, Python)",
    ],
    benefits: [
      "Competitive salary and stock options",
      "Comprehensive health benefits",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events",
    ],
    postedAt: "5 days ago",
    salary: "$110,000 - $140,000",
    jobType: "Full-time",
    experienceLevel: "Mid-Level to Senior",
    tags: ["DevOps", "AWS", "Docker", "Kubernetes"],
    source: "Stack Overflow",
    externalUrl: "https://stackoverflow.com/jobs/101112",
    isBookmarked: false,
  },
  {
    id: "job-5",
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Chicago, IL",
    description: "Full stack developer with React and Node.js experience.",
    fullDescription: `
      <p>WebSolutions is seeking a Full Stack Developer to work on our client projects. You will be responsible for both frontend and backend development using React and Node.js.</p>
      <p>The ideal candidate is comfortable working in a fast-paced environment and can adapt to changing requirements.</p>
    `,
    requirements: [
      "3+ years of experience with React and Node.js",
      "Experience with database design and implementation",
      "Knowledge of RESTful API design",
      "Understanding of version control systems (Git)",
      "Experience with testing frameworks",
    ],
    benefits: [
      "Competitive salary",
      "Health and dental insurance",
      "401(k) matching",
      "Flexible work hours",
      "Professional development opportunities",
    ],
    postedAt: "1 day ago",
    salary: "$90,000 - $120,000",
    jobType: "Full-time",
    experienceLevel: "Mid-Level",
    tags: ["React", "Node.js", "Full Stack", "JavaScript"],
    source: "AngelList",
    externalUrl: "https://angel.co/jobs/131415",
    isBookmarked: false,
  },
]

const mockCompanies = {
  TechCorp: {
    id: "company-1",
    name: "TechCorp",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "Software Development",
    size: "500-1000",
    headquarters: "San Francisco, CA",
    website: "https://techcorp.example.com",
    description:
      "TechCorp is a leading software development company specializing in web and mobile applications. Founded in 2010, we've helped hundreds of businesses transform their digital presence.",
  },
  DataSystems: {
    id: "company-2",
    name: "DataSystems",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "Data Management",
    size: "100-500",
    headquarters: "Austin, TX",
    website: "https://datasystems.example.com",
    description:
      "DataSystems provides enterprise-level data management solutions. Our cloud-based platforms help businesses organize, analyze, and leverage their data effectively.",
  },
  CreativeMinds: {
    id: "company-3",
    name: "CreativeMinds",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "Design Agency",
    size: "50-100",
    headquarters: "New York, NY",
    website: "https://creativeminds.example.com",
    description:
      "CreativeMinds is a design agency focused on creating beautiful and functional user experiences. We work with startups and established companies to bring their digital products to life.",
  },
  CloudTech: {
    id: "company-4",
    name: "CloudTech",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "Cloud Infrastructure",
    size: "200-500",
    headquarters: "Austin, TX",
    website: "https://cloudtech.example.com",
    description:
      "CloudTech specializes in cloud infrastructure and DevOps solutions. We help companies migrate to the cloud and optimize their infrastructure for performance and cost.",
  },
  WebSolutions: {
    id: "company-5",
    name: "WebSolutions",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "Web Development",
    size: "20-50",
    headquarters: "Chicago, IL",
    website: "https://websolutions.example.com",
    description:
      "WebSolutions is a web development agency that creates custom websites and web applications for businesses of all sizes. We focus on delivering high-quality, responsive, and user-friendly solutions.",
  },
}

// Get jobs with filtering and pagination
export async function getJobs({ query = "", location = "", industry = "", experience = "", page = 1, limit = 10 }) {
  try {
    // In a real implementation, this would query an API or database
    // For now, we'll filter the mock data
    let filteredJobs = [...mockJobs]

    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerQuery) ||
          job.company.toLowerCase().includes(lowerQuery) ||
          job.description.toLowerCase().includes(lowerQuery) ||
          job.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      )
    }

    if (location) {
      const lowerLocation = location.toLowerCase()
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(lowerLocation))
    }

    if (industry) {
      // In a real implementation, we would have industry data
      // For now, we'll just filter by tags as a proxy
      filteredJobs = filteredJobs.filter((job) => job.tags.some((tag) => tag.toLowerCase() === industry.toLowerCase()))
    }

    if (experience) {
      filteredJobs = filteredJobs.filter((job) => job.experienceLevel.toLowerCase().includes(experience.toLowerCase()))
    }

    // Get total count before pagination
    const totalJobs = filteredJobs.length

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

    return {
      jobs: paginatedJobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    }
  } catch (error) {
    console.error("Error getting jobs:", error)
    return { jobs: [], totalJobs: 0, currentPage: 1, totalPages: 0 }
  }
}

// Get job by ID
export async function getJobById(id) {
  try {
    // In a real implementation, this would query an API or database
    const job = mockJobs.find((job) => job.id === id)
    return job || null
  } catch (error) {
    console.error("Error getting job:", error)
    return null
  }
}

// Get similar jobs
export async function getSimilarJobs(jobId) {
  try {
    const job = await getJobById(jobId)

    if (!job) {
      return []
    }

    // In a real implementation, this would use more sophisticated matching
    // For now, we'll just match based on tags
    const similarJobs = mockJobs
      .filter((j) => j.id !== jobId && j.tags.some((tag) => job.tags.includes(tag)))
      .slice(0, 3)

    return similarJobs
  } catch (error) {
    console.error("Error getting similar jobs:", error)
    return []
  }
}

// Get company information
export async function getCompanyInfo(companyName) {
  try {
    // In a real implementation, this would query an API or database
    return mockCompanies[companyName] || null
  } catch (error) {
    console.error("Error getting company info:", error)
    return null
  }
}

// Get recommended jobs based on resume content
export async function getRecommendedJobs() {
  try {
    // In a real implementation, this would use AI to match resume content with jobs
    // For now, we'll just return a subset of mock jobs
    return mockJobs.slice(0, 3).map((job) => ({
      ...job,
      matchPercentage: Math.floor(Math.random() * 30) + 70, // Random match percentage between 70-99
    }))
  } catch (error) {
    console.error("Error getting recommended jobs:", error)
    return []
  }
}

// Save search
export async function saveSearch(searchData) {
  try {
    const searchId = uuidv4()
    const search = {
      id: searchId,
      ...searchData,
      createdAt: new Date().toISOString(),
    }

    // In a real implementation, this would be saved to a database
    // For now, we'll save it to Vercel Blob
    const searchBlob = new Blob([JSON.stringify(search)], { type: "application/json" })
    await put(`searches/${searchId}.json`, searchBlob, {
      access: "public",
    })

    revalidatePath("/job-search")
    return { success: true, id: searchId }
  } catch (error) {
    console.error("Error saving search:", error)
    throw error
  }
}

// Get saved searches
export async function getSavedSearches() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        id: "search-1",
        query: "Frontend Developer",
        location: "Remote",
        industry: "Technology",
        experience: "mid",
        notifications: true,
        createdAt: "2023-04-15T10:30:00Z",
      },
      {
        id: "search-2",
        query: "UX Designer",
        location: "New York",
        industry: "",
        experience: "",
        notifications: false,
        createdAt: "2023-04-10T14:20:00Z",
      },
    ]
  } catch (error) {
    console.error("Error getting saved searches:", error)
    return []
  }
}

// Delete saved search
export async function deleteSavedSearch(id) {
  try {
    // In a real implementation, this would delete from a database
    // For now, we'll just simulate deletion
    await del(`searches/${id}.json`)

    revalidatePath("/job-search")
    return { success: true }
  } catch (error) {
    console.error("Error deleting saved search:", error)
    throw error
  }
}

// Toggle saved search notifications
export async function toggleSavedSearchNotifications(id, enabled) {
  try {
    // In a real implementation, this would update a database
    // For now, we'll just simulate the update
    const search = {
      id,
      notifications: enabled,
      updatedAt: new Date().toISOString(),
    }

    const searchBlob = new Blob([JSON.stringify(search)], { type: "application/json" })
    await put(`searches/${id}-notifications.json`, searchBlob, {
      access: "public",
    })

    revalidatePath("/job-search")
    return { success: true }
  } catch (error) {
    console.error("Error toggling notifications:", error)
    throw error
  }
}

// Bookmark job
export async function bookmarkJob(jobId, bookmarked) {
  try {
    // In a real implementation, this would update a database
    // For now, we'll just simulate the update
    const bookmark = {
      jobId,
      bookmarked,
      updatedAt: new Date().toISOString(),
    }

    const bookmarkBlob = new Blob([JSON.stringify(bookmark)], { type: "application/json" })
    await put(`bookmarks/${jobId}.json`, bookmarkBlob, {
      access: "public",
    })

    revalidatePath(`/job-search/${jobId}`)
    revalidatePath("/job-search")
    return { success: true }
  } catch (error) {
    console.error("Error bookmarking job:", error)
    throw error
  }
}

// Generate job recommendations based on resume
export async function generateJobRecommendations(resumeText) {
  try {
    // Use Groq to analyze the resume and match with jobs
    const prompt = `
      You are an expert job matching system. Analyze the following resume and the available job listings to find the best matches.
      
      Resume: ${resumeText}
      
      Available Jobs:
      ${JSON.stringify(
        mockJobs.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company,
          description: job.description,
          requirements: job.requirements,
          tags: job.tags,
        })),
      )}
      
      Provide the top 3 job matches in JSON format with the following structure:
      [
        {
          "jobId": "string",
          "matchScore": number (0-100),
          "matchReasons": string[]
        }
      ]
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.2,
      maxTokens: 2000,
    })

    // Parse the JSON response
    const recommendations = JSON.parse(text)

    // Store the recommendations
    const recommendationsBlob = new Blob([JSON.stringify(recommendations)], { type: "application/json" })
    await put(`recommendations/latest.json`, recommendationsBlob, {
      access: "public",
    })

    revalidatePath("/job-search")
    return recommendations
  } catch (error) {
    console.error("Error generating job recommendations:", error)
    return []
  }
}
