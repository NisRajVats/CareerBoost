import type { ParsedResume, ResumeAnalysis, JobTarget } from "@/lib/types/resume"
import { v4 as uuidv4 } from "uuid"
import { AppError } from "@/lib/error-handling"
import type { Resume } from "@/lib/types/resume"

// Analyze the content quality of a resume
async function analyzeContent(resume: ParsedResume): Promise<ResumeAnalysis["contentAnalysis"]> {
  try {
    // In a real implementation, this would use NLP and ML techniques
    // For now, we'll create mock analysis data

    // Extract all action verbs from work experience
    const actionVerbs = new Set<string>()
    let achievementCount = 0
    let quantifiedCount = 0

    resume.workExperience.forEach((job) => {
      job.responsibilities.forEach((resp) => {
        const firstWord = resp.split(" ")[0].toLowerCase()
        if (isActionVerb(firstWord)) {
          actionVerbs.add(firstWord)
        }
      })

      job.achievements.forEach((achievement) => {
        achievementCount++
        if (containsQuantifiableMetric(achievement)) {
          quantifiedCount++
        }
      })
    })

    return {
      actionVerbs: {
        count: countAllActionVerbs(resume),
        unique: actionVerbs.size,
        strength: calculateVerbStrength(actionVerbs),
        suggestions: generateStrongerVerbSuggestions(actionVerbs),
      },
      achievements: {
        count: achievementCount,
        quantified: quantifiedCount,
        impactLevel: calculateImpactLevel(resume),
        suggestions: generateAchievementSuggestions(resume),
      },
      specificity: {
        score: calculateSpecificityScore(resume),
        vague: findVagueStatements(resume),
        specific: findSpecificStatements(resume),
        suggestions: generateSpecificityImprovements(resume),
      },
    }
  } catch (error) {
    console.error("Error analyzing content:", error)
    throw new AppError("Failed to analyze resume content", "CONTENT_ANALYSIS_ERROR")
  }
}

// Analyze keywords in the resume
async function analyzeKeywords(
  resume: ParsedResume,
  jobTarget?: JobTarget,
): Promise<ResumeAnalysis["keywordAnalysis"]> {
  try {
    // In a real implementation, this would compare resume keywords with industry standards
    // and job descriptions
    // For now, we'll create mock analysis data

    const allKeywords = extractAllKeywords(resume)
    const industryKeywords = jobTarget ? getIndustryKeywords(jobTarget.industry) : getIndustryKeywords("technology") // Default to technology

    const present = allKeywords.filter((kw) => industryKeywords.includes(kw))
    const missing = industryKeywords.filter((kw) => !allKeywords.includes(kw))
    const overused = findOverusedKeywords(resume)

    return {
      present,
      missing,
      overused,
      industry: industryKeywords,
      suggestions: generateKeywordSuggestions(present, missing, jobTarget),
    }
  } catch (error) {
    console.error("Error analyzing keywords:", error)
    throw new AppError("Failed to analyze resume keywords", "KEYWORD_ANALYSIS_ERROR")
  }
}

// Analyze the format and structure of the resume
async function analyzeFormat(resume: ParsedResume): Promise<ResumeAnalysis["formatAnalysis"]> {
  try {
    // In a real implementation, this would analyze the structure and readability
    // For now, we'll create mock analysis data

    const wordCount = countWords(resume.rawText)
    const pageEstimate = Math.ceil(wordCount / 500) // Rough estimate: 500 words per page

    return {
      readability: {
        score: calculateReadabilityScore(resume),
        issues: findReadabilityIssues(resume),
        suggestions: generateReadabilitySuggestions(resume),
      },
      structure: {
        score: calculateStructureScore(resume),
        issues: findStructureIssues(resume),
        suggestions: generateStructureSuggestions(resume),
      },
      length: {
        score: calculateLengthScore(pageEstimate),
        wordCount,
        pageEstimate,
        suggestions: generateLengthSuggestions(pageEstimate),
      },
    }
  } catch (error) {
    console.error("Error analyzing format:", error)
    throw new AppError("Failed to analyze resume format", "FORMAT_ANALYSIS_ERROR")
  }
}

// Analyze ATS compatibility
async function analyzeAtsCompatibility(resume: ParsedResume): Promise<ResumeAnalysis["atsAnalysis"]> {
  try {
    // In a real implementation, this would check for ATS-friendly formatting
    // For now, we'll create mock analysis data

    const issues = findAtsIssues(resume)
    const compatibility = calculateAtsCompatibility(issues)

    return {
      compatibility,
      issues,
      suggestions: generateAtsSuggestions(issues),
    }
  } catch (error) {
    console.error("Error analyzing ATS compatibility:", error)
    throw new AppError("Failed to analyze ATS compatibility", "ATS_ANALYSIS_ERROR")
  }
}

// Generate industry comparison data
async function generateIndustryComparison(
  resume: ParsedResume,
  jobTarget?: JobTarget,
): Promise<ResumeAnalysis["industryComparison"]> {
  try {
    // In a real implementation, this would compare with industry benchmarks
    // For now, we'll create mock comparison data

    const industry = jobTarget?.industry || "technology"
    const percentile = Math.floor(Math.random() * 100)

    return {
      percentile,
      averageScore: 65, // Mock average score
      topScore: 95, // Mock top score
      insights: generateIndustryInsights(percentile, industry),
    }
  } catch (error) {
    console.error("Error generating industry comparison:", error)
    throw new AppError("Failed to generate industry comparison", "COMPARISON_ERROR")
  }
}

// Generate improvement suggestions
async function generateImprovementSuggestions(
  resume: ParsedResume,
  contentAnalysis: ResumeAnalysis["contentAnalysis"],
  keywordAnalysis: ResumeAnalysis["keywordAnalysis"],
  formatAnalysis: ResumeAnalysis["formatAnalysis"],
  atsAnalysis: ResumeAnalysis["atsAnalysis"],
): Promise<ResumeAnalysis["improvementSuggestions"]> {
  try {
    // In a real implementation, this would generate specific suggestions based on the analysis
    // For now, we'll create mock suggestions

    const suggestions: ResumeAnalysis["improvementSuggestions"] = []

    // Add content improvement suggestions
    if (contentAnalysis.achievements.quantified < contentAnalysis.achievements.count / 2) {
      resume.workExperience.forEach((job) => {
        job.achievements.forEach((achievement, index) => {
          if (!containsQuantifiableMetric(achievement)) {
            suggestions.push({
              id: uuidv4(),
              section: `workExperience[${job.company}].achievements[${index}]`,
              original: achievement,
              suggested: addQuantifiableMetric(achievement),
              explanation: "Adding specific metrics makes your achievement more impactful and credible.",
              impact: "high",
              type: "content",
            })
          }
        })
      })
    }

    // Add keyword suggestions
    if (keywordAnalysis.missing.length > 0) {
      keywordAnalysis.missing.slice(0, 3).forEach((keyword) => {
        suggestions.push({
          id: uuidv4(),
          section: "skills",
          original: "",
          suggested: `Add "${keyword}" to your skills section or incorporate it into your work experience.`,
          explanation: `"${keyword}" is a key skill for your target industry that's missing from your resume.`,
          impact: "high",
          type: "keyword",
        })
      })
    }

    // Add format suggestions
    formatAnalysis.structure.issues.forEach((issue, index) => {
      suggestions.push({
        id: uuidv4(),
        section: "format",
        original: "",
        suggested: formatAnalysis.structure.suggestions[index] || "Improve structure",
        explanation: issue,
        impact: "medium",
        type: "structure",
      })
    })

    // Add ATS suggestions
    atsAnalysis.issues.forEach((issue, index) => {
      suggestions.push({
        id: uuidv4(),
        section: "ats",
        original: "",
        suggested: atsAnalysis.suggestions[index] || "Improve ATS compatibility",
        explanation: issue,
        impact: "high",
        type: "format",
      })
    })

    return suggestions
  } catch (error) {
    console.error("Error generating improvement suggestions:", error)
    throw new AppError("Failed to generate improvement suggestions", "SUGGESTIONS_ERROR")
  }
}

// Main function to analyze a resume
export async function analyzeResume(resume: Resume): Promise<ResumeAnalysis> {
  // In a real application, this would use AI/ML to analyze the resume
  // For now, we'll simulate the analysis process

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate mock analysis
  return {
    resumeId: resume.id,
    overallScore: 78,
    categoryScores: {
      content: 82,
      format: 75,
      relevance: 80,
      keywords: 76,
      atsCompatibility: 85,
    },
    strengths: [
      "Strong technical skills section with in-demand technologies",
      "Clear work experience with quantifiable achievements",
      "Good education credentials from a reputable institution",
      "Well-structured resume with clear sections",
    ],
    weaknesses: [
      "Summary could be more impactful and targeted",
      "Some technical jargon may not be ATS-friendly",
      "Limited demonstration of soft skills",
      "Could benefit from more specific project details",
    ],
    keywordAnalysis: {
      present: ["JavaScript", "React", "Node.js", "TypeScript", "AWS", "Docker"],
      missing: ["CI/CD", "Agile", "Team Leadership", "Project Management", "Full Stack"],
    },
    improvementSuggestions: [
      "Add more quantifiable achievements to highlight impact",
      "Include specific projects with technologies used and outcomes",
      "Enhance summary to target specific job roles",
      "Add certifications section if applicable",
      "Include soft skills like communication and teamwork",
    ],
    atsCompatibilityIssues: [
      "Avoid using tables or complex formatting",
      "Ensure all acronyms are spelled out at least once",
      'Use standard section headings (e.g., "Experience" instead of "Work History")',
      "Remove any headers/footers as ATS may not parse them correctly",
    ],
  }
}

// Helper functions (these would be more sophisticated in a real implementation)

function isActionVerb(word: string): boolean {
  const actionVerbs = [
    "managed",
    "developed",
    "created",
    "implemented",
    "led",
    "designed",
    "built",
    "improved",
    "increased",
    "reduced",
  ]
  return actionVerbs.includes(word)
}

function containsQuantifiableMetric(text: string): boolean {
  // Check if the text contains numbers, percentages, or dollar amounts
  return /\d+%|\$\d+|\d+x|\d+/.test(text)
}

function countAllActionVerbs(resume: ParsedResume): number {
  let count = 0
  resume.workExperience.forEach((job) => {
    job.responsibilities.forEach((resp) => {
      const firstWord = resp.split(" ")[0].toLowerCase()
      if (isActionVerb(firstWord)) {
        count++
      }
    })
    job.achievements.forEach((achievement) => {
      const firstWord = achievement.split(" ")[0].toLowerCase()
      if (isActionVerb(firstWord)) {
        count++
      }
    })
  })
  return count
}

function calculateVerbStrength(verbs: Set<string>): number {
  // In a real implementation, this would evaluate the strength of the verbs
  return Math.min(100, verbs.size * 10)
}

function generateStrongerVerbSuggestions(verbs: Set<string>): string[] {
  // In a real implementation, this would suggest stronger alternatives
  return [
    "Replace 'managed' with 'led' or 'directed'",
    "Replace 'helped' with 'facilitated' or 'enabled'",
    "Replace 'made' with 'created' or 'developed'",
  ]
}

function calculateImpactLevel(resume: ParsedResume): number {
  // In a real implementation, this would evaluate the impact of achievements
  let impactScore = 0
  let totalAchievements = 0

  resume.workExperience.forEach((job) => {
    job.achievements.forEach((achievement) => {
      totalAchievements++
      if (containsQuantifiableMetric(achievement)) {
        impactScore += 10
      }
    })
  })

  return totalAchievements > 0 ? Math.min(100, (impactScore / totalAchievements) * 10) : 0
}

function generateAchievementSuggestions(resume: ParsedResume): string[] {
  // In a real implementation, this would suggest improvements to achievements
  return [
    "Add specific metrics to quantify your impact",
    "Focus on outcomes rather than activities",
    "Include business impact of your technical achievements",
  ]
}

function calculateSpecificityScore(resume: ParsedResume): number {
  // In a real implementation, this would evaluate how specific the content is
  return Math.floor(Math.random() * 40) + 60 // Mock score between 60-100
}

function findVagueStatements(resume: ParsedResume): string[] {
  // In a real implementation, this would identify vague statements
  return ["Helped with various projects", "Worked on improving system performance", "Assisted team members as needed"]
}

function findSpecificStatements(resume: ParsedResume): string[] {
  // In a real implementation, this would identify specific statements
  return [
    "Reduced page load time by 40% through code optimization",
    "Led a team of 5 developers to deliver project 2 weeks ahead of schedule",
    "Implemented CI/CD pipeline that decreased deployment time by 60%",
  ]
}

function generateSpecificityImprovements(resume: ParsedResume): string[] {
  // In a real implementation, this would suggest ways to be more specific
  return [
    "Add numbers, percentages, or other metrics to quantify your impact",
    "Specify the technologies or methodologies you used",
    "Include the size of the team or project you worked on",
  ]
}

function extractAllKeywords(resume: ParsedResume): string[] {
  // In a real implementation, this would extract all keywords from the resume
  const keywords: string[] = []

  // Extract from skills
  resume.skills.forEach((skill) => {
    keywords.push(skill.name)
    keywords.push(...skill.keywords)
  })

  // Extract from work experience
  resume.workExperience.forEach((job) => {
    keywords.push(...job.keywords)
  })

  // Extract from projects
  resume.projects.forEach((project) => {
    keywords.push(...project.technologies)
  })

  // Remove duplicates and return
  return [...new Set(keywords)]
}

function getIndustryKeywords(industry: string): string[] {
  // In a real implementation, this would return industry-specific keywords
  const industryKeywords: Record<string, string[]> = {
    technology: [
      "JavaScript",
      "React",
      "Node.js",
      "AWS",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Agile",
      "Scrum",
      "REST API",
    ],
    finance: [
      "Financial Analysis",
      "Risk Management",
      "Banking",
      "Investment",
      "Portfolio Management",
      "Financial Modeling",
    ],
    healthcare: ["Electronic Health Records", "HIPAA", "Patient Care", "Clinical", "Medical Coding", "Healthcare IT"],
    marketing: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics", "Campaign Management"],
  }

  return industryKeywords[industry] || industryKeywords.technology
}

function findOverusedKeywords(resume: ParsedResume): string[] {
  // In a real implementation, this would identify overused keywords
  return ["team player", "hard worker", "detail-oriented", "problem solver"]
}

function generateKeywordSuggestions(present: string[], missing: string[], jobTarget?: JobTarget): string[] {
  // In a real implementation, this would suggest keywords to add or remove
  return [
    `Add these missing keywords: ${missing.slice(0, 3).join(", ")}`,
    "Incorporate keywords naturally into your work experience",
    "Remove generic buzzwords and focus on specific skills",
  ]
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

function calculateReadabilityScore(resume: ParsedResume): number {
  // In a real implementation, this would calculate readability metrics
  return Math.floor(Math.random() * 30) + 70 // Mock score between 70-100
}

function findReadabilityIssues(resume: ParsedResume): string[] {
  // In a real implementation, this would identify readability issues
  return [
    "Some sentences are too long and complex",
    "Inconsistent use of bullet points",
    "Technical jargon may be difficult for non-technical recruiters",
  ]
}

function generateReadabilitySuggestions(resume: ParsedResume): string[] {
  // In a real implementation, this would suggest readability improvements
  return [
    "Use shorter, more concise sentences",
    "Maintain consistent formatting for bullet points",
    "Explain technical terms when necessary",
  ]
}

function calculateStructureScore(resume: ParsedResume): number {
  // In a real implementation, this would evaluate the resume structure
  return Math.floor(Math.random() * 20) + 80 // Mock score between 80-100
}

function findStructureIssues(resume: ParsedResume): string[] {
  // In a real implementation, this would identify structure issues
  return [
    "Education section should come after work experience for experienced professionals",
    "Skills section could be more prominently displayed",
    "Consider adding a professional summary at the top",
  ]
}

function generateStructureSuggestions(resume: ParsedResume): string[] {
  // In a real implementation, this would suggest structure improvements
  return [
    "Move education section after work experience",
    "Create a skills summary at the top of the resume",
    "Group related skills into categories",
  ]
}

function calculateLengthScore(pageEstimate: number): number {
  // In a real implementation, this would evaluate if the resume length is appropriate
  if (pageEstimate === 1) return 100
  if (pageEstimate === 2) return 90
  if (pageEstimate > 2) return 70
  return 80 // Less than 1 page
}

function generateLengthSuggestions(pageEstimate: number): string[] {
  // In a real implementation, this would suggest length improvements
  if (pageEstimate > 2) {
    return [
      "Condense your resume to 1-2 pages",
      "Focus on recent and relevant experience",
      "Remove outdated information",
    ]
  }
  if (pageEstimate < 1) {
    return [
      "Add more detail to your experience",
      "Include relevant projects or certifications",
      "Expand on your achievements",
    ]
  }
  return ["Your resume length is appropriate"]
}

function findAtsIssues(resume: ParsedResume): string[] {
  // In a real implementation, this would identify ATS compatibility issues
  return [
    "Avoid using tables or columns as they may confuse ATS systems",
    "Ensure job titles match standard industry titles",
    "Use standard section headings (e.g., 'Experience' instead of 'Career History')",
  ]
}

function calculateAtsCompatibility(issues: string[]): number {
  // In a real implementation, this would calculate ATS compatibility score
  return Math.max(60, 100 - issues.length * 10)
}

function generateAtsSuggestions(issues: string[]): string[] {
  // In a real implementation, this would suggest ATS compatibility improvements
  return [
    "Use standard section headings",
    "Avoid graphics, tables, and columns",
    "Include keywords from the job description",
    "Use standard file formats (PDF, DOCX)",
  ]
}

function generateStrengths(
  contentAnalysis: ResumeAnalysis["contentAnalysis"],
  keywordAnalysis: ResumeAnalysis["keywordAnalysis"],
  formatAnalysis: ResumeAnalysis["formatAnalysis"],
  atsAnalysis: ResumeAnalysis["atsAnalysis"],
): string[] {
  // In a real implementation, this would identify strengths based on the analysis
  const strengths: string[] = []

  if (contentAnalysis.actionVerbs.unique > 5) {
    strengths.push("Good variety of action verbs")
  }

  if (contentAnalysis.achievements.quantified > 0) {
    strengths.push("Includes quantifiable achievements")
  }

  if (keywordAnalysis.present.length > 5) {
    strengths.push("Strong keyword presence for target industry")
  }

  if (formatAnalysis.readability.score > 80) {
    strengths.push("Excellent readability")
  }

  if (atsAnalysis.compatibility > 80) {
    strengths.push("Good ATS compatibility")
  }

  return strengths
}

function generateWeaknesses(
  contentAnalysis: ResumeAnalysis["contentAnalysis"],
  keywordAnalysis: ResumeAnalysis["keywordAnalysis"],
  formatAnalysis: ResumeAnalysis["formatAnalysis"],
  atsAnalysis: ResumeAnalysis["atsAnalysis"],
): string[] {
  // In a real implementation, this would identify weaknesses based on the analysis
  const weaknesses: string[] = []

  if (contentAnalysis.actionVerbs.unique < 5) {
    weaknesses.push("Limited variety of action verbs")
  }

  if (contentAnalysis.achievements.quantified === 0) {
    weaknesses.push("Lacks quantifiable achievements")
  }

  if (keywordAnalysis.missing.length > 5) {
    weaknesses.push("Missing important industry keywords")
  }

  if (formatAnalysis.readability.score < 70) {
    weaknesses.push("Poor readability")
  }

  if (atsAnalysis.compatibility < 70) {
    weaknesses.push("Poor ATS compatibility")
  }

  return weaknesses
}

function calculateContentScore(contentAnalysis: ResumeAnalysis["contentAnalysis"]): number {
  // In a real implementation, this would calculate a content quality score
  const verbScore = Math.min(100, contentAnalysis.actionVerbs.unique * 10)
  const achievementScore =
    contentAnalysis.achievements.count > 0
      ? (contentAnalysis.achievements.quantified / contentAnalysis.achievements.count) * 100
      : 0
  const specificityScore = contentAnalysis.specificity.score

  return Math.round(verbScore * 0.3 + achievementScore * 0.4 + specificityScore * 0.3)
}

function calculateKeywordScore(keywordAnalysis: ResumeAnalysis["keywordAnalysis"]): number {
  // In a real implementation, this would calculate a keyword relevance score
  const totalKeywords = keywordAnalysis.industry.length
  const presentKeywords = keywordAnalysis.present.length

  return Math.round((presentKeywords / totalKeywords) * 100)
}

function calculateFormatScore(formatAnalysis: ResumeAnalysis["formatAnalysis"]): number {
  // In a real implementation, this would calculate a format quality score
  return Math.round(
    formatAnalysis.readability.score * 0.4 + formatAnalysis.structure.score * 0.4 + formatAnalysis.length.score * 0.2,
  )
}

function addQuantifiableMetric(achievement: string): string {
  // In a real implementation, this would suggest how to add metrics
  return achievement.replace(/improved|increased|reduced|enhanced|developed|implemented/i, (match) => `${match} by 30%`)
}

function generateIndustryInsights(percentile: number, industry: string): string[] {
  // In a real implementation, this would provide industry-specific insights
  if (percentile > 80) {
    return [
      `Your resume is in the top ${100 - percentile}% of ${industry} resumes`,
      "Your technical skills are well-aligned with industry demands",
      "Your quantified achievements stand out compared to peers",
    ]
  } else if (percentile > 50) {
    return [
      `Your resume is better than ${percentile}% of ${industry} resumes`,
      "Adding more industry-specific keywords would improve your ranking",
      "More quantified achievements would help you stand out",
    ]
  } else {
    return [
      `Your resume is in the bottom ${percentile}% of ${industry} resumes`,
      "Focus on adding industry-specific keywords and skills",
      "Quantify your achievements to stand out from competitors",
      "Consider restructuring to highlight your most relevant experience",
    ]
  }
}
