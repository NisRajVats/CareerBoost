"use server"

import { put, list } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

// Import the error handling utilities at the top of the file
import { AppError, logError } from "@/lib/error-handling"

// Get the latest resume score
export async function getLatestResumeScore() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll check if we have a mock score in Vercel Blob
    const { blobs } = await list({ prefix: "resume-scores/latest.json" })

    if (blobs.length === 0) {
      // No score exists yet
      return null
    }

    // Fetch the blob content using the URL
    const response = await fetch(blobs[0].url)
    if (!response.ok) {
      return null
    }

    const scoreText = await response.text()
    const scoreData = JSON.parse(scoreText)

    // Return the data with a timestamp if it doesn't have one
    return {
      ...scoreData,
      updatedAt: scoreData.updatedAt || new Date().toISOString(),
    }
  } catch (error) {
    logError(error, { action: "getLatestResumeScore" })
    throw new AppError("Failed to retrieve resume score", "FETCH_ERROR")
  }
}

// Get score history
export async function getScoreHistory() {
  try {
    // In a real implementation, this would query a database
    // For now, we'll return mock data
    return [
      {
        date: "2023-04-01",
        overall: 65,
        content: 60,
        format: 75,
        relevance: 62,
      },
      {
        date: "2023-04-15",
        overall: 72,
        content: 68,
        format: 78,
        relevance: 70,
      },
      {
        date: "2023-05-01",
        overall: 78,
        content: 75,
        format: 82,
        relevance: 76,
      },
      {
        date: "2023-05-15",
        overall: 83,
        content: 80,
        format: 85,
        relevance: 82,
      },
      {
        date: "2023-06-01",
        overall: 85,
        content: 82,
        format: 88,
        relevance: 84,
      },
    ]
  } catch (error) {
    console.error("Error getting score history:", error)
    return []
  }
}

// Get industry benchmarks
export async function getIndustryBenchmarks(industry = "technology") {
  try {
    // In a real implementation, this would query a database with actual benchmarks
    // For now, we'll return mock data
    const benchmarks = {
      technology: {
        average: 72,
        top10Percent: 88,
      },
      finance: {
        average: 75,
        top10Percent: 90,
      },
      healthcare: {
        average: 70,
        top10Percent: 85,
      },
      marketing: {
        average: 68,
        top10Percent: 84,
      },
      default: {
        average: 70,
        top10Percent: 85,
      },
    }

    return benchmarks[industry] || benchmarks.default
  } catch (error) {
    console.error("Error getting industry benchmarks:", error)
    return { average: 70, top10Percent: 85 }
  }
}

// Update the refreshResumeScore function to include proper error handling
export async function refreshResumeScore() {
  try {
    // In a real implementation, this would:
    // 1. Get the latest resume
    // 2. Run it through the scoring algorithm
    // 3. Save the new score

    // For now, we'll generate a mock score using Groq
    const mockResumeText = `
      John Doe
      Software Engineer
      
      EXPERIENCE
      Senior Software Engineer, TechCorp (2020-Present)
      - Led development of cloud-based application using React and Node.js
      - Improved system performance by 40% through code optimization
      - Mentored junior developers and conducted code reviews
      
      Software Developer, StartupInc (2018-2020)
      - Developed RESTful APIs using Express.js and MongoDB
      - Implemented CI/CD pipeline using GitHub Actions
      - Collaborated with design team to implement UI/UX improvements
      
      EDUCATION
      Bachelor of Science in Computer Science
      University of Technology (2014-2018)
      
      SKILLS
      JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Git
    `

    const prompt = `
      You are an expert resume analyzer. Analyze the following resume and provide a detailed score breakdown in JSON format.
      
      Resume:
      ${mockResumeText}
      
      Provide the following in your response:
      1. Overall score (0-100)
      2. Category scores for:
         - Content (quality of information, achievements, etc.)
         - Format (layout, readability, etc.)
         - Relevance (match to industry standards)
      3. Detailed breakdown of subcategories
      4. Improvement recommendations
      5. Competitive analysis against typical applicants
      
      Format your response as a valid JSON object with the following structure:
      {
        "overallScore": number,
        "industry": string,
        "updatedAt": string (ISO date),
        "categories": [
          {
            "name": string,
            "type": "content" | "format" | "relevance",
            "score": number,
            "description": string
          }
        ],
        "recommendations": [
          {
            "name": string,
            "icon": "check" | "alert",
            "potentialImprovement": number,
            "items": string[]
          }
        ],
        "competitiveAnalysis": {
          "percentileRanking": number,
          "insights": string[],
          "topApplicantStrengths": string[]
        }
      }
    `

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.2,
      maxTokens: 2000,
    })

    // Parse the JSON response
    let scoreData
    try {
      scoreData = JSON.parse(text)
    } catch (parseError) {
      throw new AppError("Failed to parse score data", "PARSE_ERROR", {
        rawText: text.substring(0, 100) + "...", // Log a snippet of the text for debugging
      })
    }

    // Store the score
    try {
      const scoreBlob = new Blob([JSON.stringify(scoreData)], { type: "application/json" })
      await put("resume-scores/latest.json", scoreBlob, {
        access: "public",
      })

      // Also store it in the history
      const timestamp = new Date().toISOString()
      await put(`resume-scores/history/${timestamp}.json`, scoreBlob, {
        access: "public",
      })
    } catch (storageError) {
      throw new AppError("Failed to store resume score", "STORAGE_ERROR", {
        cause: storageError instanceof Error ? storageError.message : String(storageError),
      })
    }

    revalidatePath("/resume-score")
    return scoreData
  } catch (error) {
    logError(error, { action: "refreshResumeScore" })

    // Rethrow with a user-friendly message
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError("Failed to refresh resume score. Please try again later.", "REFRESH_ERROR")
  }
}

// Generate a mock resume score for testing
export async function generateMockResumeScore() {
  try {
    const mockScore = {
      overallScore: 85,
      industry: "technology",
      updatedAt: new Date().toISOString(),
      categories: [
        {
          name: "Content Quality",
          type: "content",
          score: 82,
          description: "Strength of achievements, skills, and experience descriptions",
        },
        {
          name: "Achievement Focus",
          type: "content",
          score: 78,
          description: "Use of metrics and specific accomplishments",
        },
        {
          name: "Skills Relevance",
          type: "relevance",
          score: 90,
          description: "Match between skills and industry requirements",
        },
        {
          name: "Experience Alignment",
          type: "relevance",
          score: 85,
          description: "Relevance of experience to target roles",
        },
        {
          name: "Layout & Design",
          type: "format",
          score: 88,
          description: "Visual organization and readability",
        },
        {
          name: "ATS Compatibility",
          type: "format",
          score: 92,
          description: "Compatibility with applicant tracking systems",
        },
      ],
      recommendations: [
        {
          name: "Content Improvements",
          icon: "alert",
          potentialImprovement: 8,
          items: [
            "Add more quantifiable achievements to demonstrate impact",
            "Enhance job descriptions with more industry-specific keywords",
            "Include relevant certifications or professional development",
          ],
        },
        {
          name: "Format Strengths",
          icon: "check",
          potentialImprovement: 2,
          items: [
            "Clean, scannable layout makes information easy to find",
            "Good use of section headers and white space",
            "Consistent formatting throughout the document",
          ],
        },
        {
          name: "Relevance Enhancements",
          icon: "alert",
          potentialImprovement: 5,
          items: [
            "Tailor experience descriptions to highlight skills most relevant to target roles",
            "Consider adding a professional summary that aligns with industry expectations",
            "Emphasize emerging technologies in your skill set",
          ],
        },
      ],
      competitiveAnalysis: {
        percentileRanking: 75,
        insights: [
          "Your resume outperforms 75% of applicants in your field",
          "Your technical skills section is particularly strong",
          "Adding more quantifiable achievements could push you into the top 10%",
        ],
        topApplicantStrengths: [
          "Quantified achievements with specific metrics",
          "Tailored content to specific job descriptions",
          "Demonstrated progression and growth in responsibilities",
          "Included relevant projects with measurable outcomes",
        ],
      },
    }

    // Store the mock score
    const scoreBlob = new Blob([JSON.stringify(mockScore)], { type: "application/json" })
    await put("resume-scores/latest.json", scoreBlob, {
      access: "public",
    })

    revalidatePath("/resume-score")
    return mockScore
  } catch (error) {
    console.error("Error generating mock resume score:", error)
    throw error
  }
}
