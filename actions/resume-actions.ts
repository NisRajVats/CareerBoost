"use server"
import { handleError } from "@/lib/error-handling"
import { parseResumeDocument } from "@/lib/services/document-parser"
import { analyzeResume } from "@/lib/services/resume-analyzer"
import { optimizeResume } from "@/lib/services/resume-optimizer"
import type { Resume, ResumeAnalysis, OptimizedResume } from "@/lib/types/resume"

export async function uploadResume(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      throw new Error("No file provided")
    }

    // Process the file
    const resumeText = await parseResumeDocument(file)

    // Generate a unique ID for the resume
    const resumeId = `resume_${Date.now()}`

    // In a real application, this would save to a database
    console.log(`Processed resume ${resumeId}:`, resumeText.substring(0, 100) + "...")

    // Return the resume ID for the next step
    return {
      success: true,
      resumeId,
    }
  } catch (error) {
    return handleError(error, "Failed to upload resume")
  }
}

export async function getParsedResume(resumeId: string): Promise<Resume> {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: resumeId,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced software engineer with a passion for building scalable web applications.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          location: "San Francisco, CA",
          startDate: "2020-01",
          endDate: "Present",
          description: "Led development of cloud-based SaaS platform. Improved system performance by 40%.",
        },
        {
          title: "Software Engineer",
          company: "WebDev Co.",
          location: "San Francisco, CA",
          startDate: "2017-03",
          endDate: "2019-12",
          description: "Developed and maintained multiple client-facing applications using React and Node.js.",
        },
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          institution: "University of California, Berkeley",
          location: "Berkeley, CA",
          startDate: "2013-09",
          endDate: "2017-05",
        },
      ],
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "AWS", "Docker"],
      rawText:
        "John Doe\nSan Francisco, CA | (555) 123-4567 | john.doe@example.com\n\nSUMMARY\nExperienced software engineer with a passion for building scalable web applications.\n\nEXPERIENCE\nSenior Software Engineer | Tech Solutions Inc. | San Francisco, CA | 2020 - Present\n- Led development of cloud-based SaaS platform\n- Improved system performance by 40%\n\nSoftware Engineer | WebDev Co. | San Francisco, CA | 2017 - 2019\n- Developed and maintained multiple client-facing applications using React and Node.js\n\nEDUCATION\nBachelor of Science in Computer Science | University of California, Berkeley | 2013 - 2017\n\nSKILLS\nJavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Docker",
    }
  } catch (error) {
    throw new Error(`Failed to get parsed resume: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function getResumeAnalysis(resumeId: string): Promise<ResumeAnalysis> {
  try {
    // In a real application, this would fetch the resume from a database
    // and then analyze it or fetch the existing analysis
    const resume = await getParsedResume(resumeId)

    // Analyze the resume
    return await analyzeResume(resume)
  } catch (error) {
    throw new Error(`Failed to get resume analysis: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function optimizeResumeForJob(resumeId: string, jobDescription: string): Promise<OptimizedResume> {
  try {
    // In a real application, this would fetch the resume from a database
    const resume = await getParsedResume(resumeId)

    // Optimize the resume for the job
    return await optimizeResume(resume, jobDescription)
  } catch (error) {
    throw new Error(`Failed to optimize resume: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
