import type { Resume, OptimizedResume } from "@/lib/types/resume"

export async function optimizeResume(resume: Resume, jobDescription: string): Promise<OptimizedResume> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, this would use AI to optimize the resume
  return {
    id: resume.id,
    originalResume: resume,
    optimizedSections: {
      summary:
        "Results-driven software engineer with 5+ years of experience building scalable web applications and cloud solutions. Proven track record of improving system performance and leading development teams.",
      experience: [
        {
          original: resume.experience[0].description,
          optimized:
            "• Led development of cloud-based SaaS platform serving 10,000+ users, resulting in 40% performance improvement\n• Implemented CI/CD pipeline reducing deployment time by 65% and improving code quality\n• Mentored junior developers and established best practices for the engineering team",
          reasoning: "Added specific metrics and achievements to demonstrate impact.",
        },
        {
          original: resume.experience[1]?.description || "",
          optimized:
            "• Developed and maintained multiple React/Node.js applications with 99.9% uptime\n• Reduced API response time by 60% through query optimization and caching strategies\n• Collaborated with UX team to implement responsive design, improving mobile conversion by 25%",
          reasoning: "Added specific technologies and quantifiable achievements.",
        },
      ],
      skills: [...resume.skills, "CI/CD", "RESTful APIs", "GraphQL", "System Design"],
      additions: [
        "Consider adding a Projects section to showcase specific technical achievements",
        "Include relevant certifications if you have any",
        "Add metrics and specific achievements to all experience items",
      ],
      removals: [
        "Remove generic phrases like 'responsible for' and 'worked on'",
        "Consider removing older experience if not directly relevant",
      ],
    },
    matchScore: 85,
    keywordMatches: [
      { keyword: "JavaScript", count: 1 },
      { keyword: "React", count: 2 },
      { keyword: "Node.js", count: 2 },
      { keyword: "TypeScript", count: 1 },
    ],
    missingKeywords: ["GraphQL", "CI/CD", "Agile"],
    jobDescription: jobDescription,
  }
}
