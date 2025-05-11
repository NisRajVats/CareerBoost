// This service handles parsing different document types into text

export async function parseResumeDocument(file: File): Promise<string> {
  // In a real application, this would use libraries to extract text from different file types
  // For now, we'll simulate the parsing process

  const fileType = file.name.split(".").pop()?.toLowerCase()

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Return mock text based on file type
  switch (fileType) {
    case "pdf":
      return mockParsePdf()
    case "docx":
    case "doc":
      return mockParseWord()
    case "txt":
      return mockParseTxt()
    default:
      throw new Error(`Unsupported file type: ${fileType}`)
  }
}

function mockParsePdf(): string {
  return `John Doe
San Francisco, CA | (555) 123-4567 | john.doe@example.com

SUMMARY
Experienced software engineer with a passion for building scalable web applications.

EXPERIENCE
Senior Software Engineer | Tech Solutions Inc. | San Francisco, CA | 2020 - Present
- Led development of cloud-based SaaS platform
- Improved system performance by 40%
- Mentored junior developers and implemented code review processes
- Designed and implemented RESTful APIs and microservices architecture

Software Engineer | WebDev Co. | San Francisco, CA | 2017 - 2019
- Developed and maintained multiple client-facing applications using React and Node.js
- Collaborated with UX designers to implement responsive user interfaces
- Participated in agile development processes and sprint planning
- Implemented automated testing and CI/CD pipelines

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2013 - 2017

SKILLS
JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Docker, Kubernetes, GraphQL, Redux`
}

function mockParseWord(): string {
  return `John Doe
San Francisco, CA | (555) 123-4567 | john.doe@example.com

SUMMARY
Experienced software engineer with a passion for building scalable web applications.

EXPERIENCE
Senior Software Engineer | Tech Solutions Inc. | San Francisco, CA | 2020 - Present
- Led development of cloud-based SaaS platform
- Improved system performance by 40%
- Mentored junior developers and implemented code review processes
- Designed and implemented RESTful APIs and microservices architecture

Software Engineer | WebDev Co. | San Francisco, CA | 2017 - 2019
- Developed and maintained multiple client-facing applications using React and Node.js
- Collaborated with UX designers to implement responsive user interfaces
- Participated in agile development processes and sprint planning
- Implemented automated testing and CI/CD pipelines

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2013 - 2017

SKILLS
JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Docker, Kubernetes, GraphQL, Redux`
}

function mockParseTxt(): string {
  return `John Doe
San Francisco, CA | (555) 123-4567 | john.doe@example.com

SUMMARY
Experienced software engineer with a passion for building scalable web applications.

EXPERIENCE
Senior Software Engineer | Tech Solutions Inc. | San Francisco, CA | 2020 - Present
- Led development of cloud-based SaaS platform
- Improved system performance by 40%
- Mentored junior developers and implemented code review processes
- Designed and implemented RESTful APIs and microservices architecture

Software Engineer | WebDev Co. | San Francisco, CA | 2017 - 2019
- Developed and maintained multiple client-facing applications using React and Node.js
- Collaborated with UX designers to implement responsive user interfaces
- Participated in agile development processes and sprint planning
- Implemented automated testing and CI/CD pipelines

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2013 - 2017

SKILLS
JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Docker, Kubernetes, GraphQL, Redux`
}
