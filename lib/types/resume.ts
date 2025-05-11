export interface ContactInfo {
  name: string
  email: string
  phone?: string
  location?: string
  linkedin?: string
  website?: string
  github?: string
}

export interface WorkExperience {
  id: string
  company: string
  title: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  responsibilities: string[]
  achievements: string[]
  keywords: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: number
  highlights: string[]
}

export interface Skill {
  id: string
  name: string
  category: "technical" | "soft" | "language" | "industry" | "other"
  level?: "beginner" | "intermediate" | "advanced" | "expert"
  keywords: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
  startDate?: string
  endDate?: string
  current: boolean
  highlights: string[]
  technologies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expires?: string
  url?: string
  description?: string
}

export interface AdditionalSection {
  id: string
  title: string
  items: Array<{
    id: string
    title?: string
    date?: string
    description?: string
    bullets?: string[]
  }>
}

export interface ParsedResume {
  id: string
  fileName: string
  fileType: string
  fileUrl: string
  uploadDate: string
  lastModified: string
  contactInfo: ContactInfo
  summary?: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  additionalSections: AdditionalSection[]
  rawText: string
  confidence: {
    overall: number
    contactInfo: number
    workExperience: number
    education: number
    skills: number
  }
  parseErrors?: string[]
}

export interface ResumeAnalysis {
  id: string
  resumeId: string
  timestamp: string
  scores: {
    overall: number
    content: number
    format: number
    atsCompatibility: number
    keywordRelevance: number
  }
  contentAnalysis: {
    actionVerbs: {
      count: number
      unique: number
      strength: number
      suggestions: string[]
    }
    achievements: {
      count: number
      quantified: number
      impactLevel: number
      suggestions: string[]
    }
    specificity: {
      score: number
      vague: string[]
      specific: string[]
      suggestions: string[]
    }
  }
  keywordAnalysis: {
    present: string[]
    missing: string[]
    overused: string[]
    industry: string[]
    suggestions: string[]
  }
  formatAnalysis: {
    readability: {
      score: number
      issues: string[]
      suggestions: string[]
    }
    structure: {
      score: number
      issues: string[]
      suggestions: string[]
    }
    length: {
      score: number
      wordCount: number
      pageEstimate: number
      suggestions: string[]
    }
  }
  atsAnalysis: {
    compatibility: number
    issues: string[]
    suggestions: string[]
  }
  strengths: string[]
  weaknesses: string[]
  improvementSuggestions: Array<{
    id: string
    section: string
    original: string
    suggested: string
    explanation: string
    impact: "low" | "medium" | "high"
    type: "content" | "format" | "keyword" | "structure"
  }>
  industryComparison: {
    percentile: number
    averageScore: number
    topScore: number
    insights: string[]
  }
}

export interface ResumeVersion {
  id: string
  resumeId: string
  version: number
  timestamp: string
  changes: Array<{
    section: string
    type: "add" | "modify" | "delete"
    before?: string
    after?: string
  }>
  data: ParsedResume
  analysis?: ResumeAnalysis
}

export interface JobTarget {
  id: string
  title: string
  company?: string
  industry: string
  description?: string
  requirements?: string[]
  preferences?: string[]
  keywords: string[]
  location?: string
  level: "entry" | "mid" | "senior" | "executive"
}

export interface ResumeOptimization {
  id: string
  resumeId: string
  targetJobId?: string
  timestamp: string
  originalResumeVersion: number
  optimizedResumeVersion: number
  changes: Array<{
    id: string
    section: string
    original: string
    optimized: string
    explanation: string
    accepted: boolean
  }>
  keywordsAdded: string[]
  improvementMetrics: {
    contentScore: { before: number; after: number }
    atsCompatibility: { before: number; after: number }
    keywordRelevance: { before: number; after: number }
    overallScore: { before: number; after: number }
  }
}
