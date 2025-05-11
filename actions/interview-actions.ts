"use server"

import { AppError, logError } from "@/lib/error-handling"

// Mock data for demonstration purposes
const mockInterviewQuestions = {
  behavioral: [
    {
      id: "bq1",
      category: "behavioral",
      question: "Tell me about a time when you had to work under a tight deadline.",
      answer:
        "In my previous role, we had a client emergency that required a complete website redesign in just three days. I organized the team, prioritized critical features, and worked extended hours to deliver on time. The client was thrilled with the results, and we maintained the relationship.",
      difficulty: "medium",
    },
    {
      id: "bq2",
      category: "behavioral",
      question: "Describe a situation where you had to resolve a conflict within your team.",
      answer:
        "Two team members had different approaches to a project, causing tension. I organized a meeting to let both present their ideas, facilitated a discussion of pros and cons, and helped the team reach a compromise that incorporated the best elements of both approaches. This improved team dynamics and led to a successful project.",
      difficulty: "medium",
    },
    {
      id: "bq3",
      category: "behavioral",
      question: "Tell me about a time when you failed at something and what you learned from it.",
      answer:
        "I once underestimated the complexity of a project and committed to an unrealistic deadline. We missed the deadline, disappointing the client. I learned to thoroughly assess project requirements, add buffer time for unexpected issues, and communicate more transparently about timelines. Since then, I've consistently met or exceeded expectations.",
      difficulty: "hard",
    },
    {
      id: "bq4",
      category: "behavioral",
      question: "Give an example of how you set goals and achieve them.",
      answer:
        "When I wanted to improve our team's code quality, I set a goal to reduce bugs by 30% in three months. I implemented code reviews, unit testing standards, and weekly quality metrics. By the end of the quarter, we had reduced bugs by 45% and improved deployment stability.",
      difficulty: "easy",
    },
    {
      id: "bq5",
      category: "behavioral",
      question: "How do you handle working with people from different backgrounds?",
      answer:
        "In my last role, I worked with team members across three different countries. I made an effort to learn about their cultural norms, adjusted meeting times to accommodate different time zones, and created documentation that was accessible to non-native English speakers. This inclusive approach led to better collaboration and stronger relationships.",
      difficulty: "easy",
    },
  ],
  technical: [
    {
      id: "tq1",
      category: "technical",
      question: "Explain the difference between REST and GraphQL APIs.",
      answer:
        "REST APIs use multiple endpoints for different resources with fixed data structures, while GraphQL uses a single endpoint where clients can specify exactly what data they need. REST is simpler to implement and benefits from caching, while GraphQL reduces over-fetching and under-fetching of data and gives clients more flexibility.",
      difficulty: "medium",
    },
    {
      id: "tq2",
      category: "technical",
      question: "How would you optimize a website's performance?",
      answer:
        "I would start by measuring current performance using tools like Lighthouse. Then I'd implement optimizations like: compressing images, implementing lazy loading, minifying CSS/JS, using a CDN, enabling browser caching, reducing third-party scripts, and implementing code splitting. After each change, I'd measure again to quantify improvements.",
      difficulty: "medium",
    },
    {
      id: "tq3",
      category: "technical",
      question: "Explain how you would design a scalable microservice architecture.",
      answer:
        "I'd design services around business domains, ensure loose coupling with well-defined APIs, implement service discovery and API gateways, use event-driven communication for asynchronous processes, implement circuit breakers for fault tolerance, containerize services with Kubernetes for orchestration, and set up comprehensive monitoring and distributed tracing.",
      difficulty: "hard",
    },
    {
      id: "tq4",
      category: "technical",
      question: "What is the difference between cookies, local storage, and session storage?",
      answer:
        "Cookies are small text files (4KB max) sent with HTTP requests, can have expiration dates, and are used for authentication. Local Storage provides 5-10MB of storage that persists indefinitely until cleared. Session Storage is similar to Local Storage but data is cleared when the browser session ends. Both storage options are only accessible on the client side.",
      difficulty: "easy",
    },
    {
      id: "tq5",
      category: "technical",
      question: "Explain the concept of Big O notation and give examples.",
      answer:
        "Big O notation describes the performance or complexity of an algorithm in terms of time or space as input size grows. O(1) is constant time (array access), O(log n) is logarithmic (binary search), O(n) is linear (simple loop), O(n log n) is linearithmic (efficient sorting algorithms), O(n²) is quadratic (nested loops), and O(2^n) is exponential (recursive fibonacci). We aim for the lowest possible complexity.",
      difficulty: "hard",
    },
  ],
  roleSpecific: [
    {
      id: "rq1",
      category: "roleSpecific",
      question: "As a frontend developer, how do you approach responsive design?",
      answer:
        "I start with a mobile-first approach, using flexible grids and relative units (%, rem). I implement media queries at standard breakpoints, test on multiple devices, and use tools like Flexbox and CSS Grid for complex layouts. I also ensure accessibility across devices and use responsive images to optimize performance.",
      difficulty: "medium",
    },
    {
      id: "rq2",
      category: "roleSpecific",
      question: "How would you handle a situation where product requirements change mid-sprint?",
      answer:
        "I would first assess the impact on current work and timeline. For minor changes, I might accommodate them within the sprint. For significant changes, I'd discuss with the product manager to either defer the changes to the next sprint or re-prioritize current tasks. I'd ensure the team understands the changes and update documentation accordingly.",
      difficulty: "medium",
    },
    {
      id: "rq3",
      category: "roleSpecific",
      question: "Describe your experience with CI/CD pipelines.",
      answer:
        "I've set up CI/CD pipelines using GitHub Actions and Jenkins. These pipelines automated linting, testing, building, and deployment processes. For example, I implemented a pipeline that ran unit and integration tests on pull requests, deployed to staging on merge to develop, and to production on merge to main after manual approval. This reduced deployment errors by 70%.",
      difficulty: "hard",
    },
    {
      id: "rq4",
      category: "roleSpecific",
      question: "How do you stay updated with the latest industry trends and technologies?",
      answer:
        "I follow industry leaders on Twitter and LinkedIn, subscribe to newsletters like JavaScript Weekly, read blogs from companies like Vercel and Netlify, participate in online communities like Dev.to and Stack Overflow, attend virtual conferences, take online courses, and work on side projects to experiment with new technologies.",
      difficulty: "easy",
    },
    {
      id: "rq5",
      category: "roleSpecific",
      question: "How would you architect a large-scale React application?",
      answer:
        "I'd organize by feature rather than type, use a state management solution like Redux for complex state, implement code splitting for performance, create a component library for consistency, use TypeScript for type safety, set up comprehensive testing (unit, integration, E2E), implement proper error boundaries, and use React Query or SWR for data fetching. I'd also consider using Next.js for SSR/SSG benefits.",
      difficulty: "hard",
    },
  ],
}

const mockCompanyResearch = [
  {
    id: "company1",
    name: "TechCorp",
    logo: "/companies/techcorp.png",
    industry: "Software Development",
    size: "1,000-5,000 employees",
    founded: "2005",
    headquarters: "San Francisco, CA",
    website: "https://techcorp.example.com",
    description:
      "TechCorp is a leading software development company specializing in cloud-based solutions for enterprise clients. They focus on creating scalable, secure applications that help businesses streamline their operations.",
    culture:
      "TechCorp values innovation, collaboration, and work-life balance. They have a flexible work policy and encourage continuous learning through regular workshops and education stipends.",
    interviewProcess: [
      "Initial phone screen with recruiter (30 minutes)",
      "Technical assessment or coding challenge (1-2 hours)",
      "Technical interview with team members (1 hour)",
      "System design interview (1 hour)",
      "Cultural fit interview with hiring manager (45 minutes)",
      "Final interview with senior leadership (30 minutes)",
    ],
    commonQuestions: [
      "How do you approach debugging a complex issue in production?",
      "Describe a time when you had to make a difficult technical decision.",
      "How do you stay updated with the latest technologies?",
      "Tell us about a project where you had to learn a new technology quickly.",
      "How do you handle disagreements within your team?",
    ],
  },
  {
    id: "company2",
    name: "InnovateTech",
    logo: "/companies/innovatetech.png",
    industry: "AI and Machine Learning",
    size: "500-1,000 employees",
    founded: "2012",
    headquarters: "Boston, MA",
    website: "https://innovatetech.example.com",
    description:
      "InnovateTech is at the forefront of AI and machine learning innovation, developing cutting-edge solutions for healthcare, finance, and retail industries. Their products help businesses leverage data for better decision-making.",
    culture:
      "InnovateTech has a research-oriented culture that encourages experimentation and learning from failures. They promote diversity of thought and have a collaborative environment where ideas are valued regardless of hierarchy.",
    interviewProcess: [
      "Initial video call with HR (45 minutes)",
      "Technical assessment focusing on algorithms and data structures (2 hours)",
      "Panel interview with the engineering team (1.5 hours)",
      "Case study presentation (1 hour)",
      "Final interview with department head (1 hour)",
    ],
    commonQuestions: [
      "Explain a complex machine learning concept in simple terms.",
      "How would you approach building a recommendation system from scratch?",
      "Describe a time when you had to optimize an algorithm for performance.",
      "How do you ensure your models are fair and unbiased?",
      "What metrics would you use to evaluate the success of an AI project?",
    ],
  },
  {
    id: "company3",
    name: "DesignHub",
    logo: "/companies/designhub.png",
    industry: "UX/UI Design",
    size: "100-500 employees",
    founded: "2015",
    headquarters: "New York, NY",
    website: "https://designhub.example.com",
    description:
      "DesignHub is a creative agency that specializes in user experience and interface design. They work with startups and established companies to create intuitive, beautiful digital products that users love.",
    culture:
      "DesignHub fosters a creative and inclusive environment where designers are encouraged to push boundaries. They have a flat organizational structure and emphasize design thinking in all aspects of their work.",
    interviewProcess: [
      "Portfolio review with design lead (1 hour)",
      "Design challenge to complete at home (3-5 days)",
      "Presentation of design challenge and discussion (1 hour)",
      "Team lunch or coffee chat (1 hour)",
      "Final interview with creative director (45 minutes)",
    ],
    commonQuestions: [
      "Walk us through your design process for a recent project.",
      "How do you handle feedback and criticism of your designs?",
      "How do you balance user needs with business requirements?",
      "Describe a time when you had to convince stakeholders to adopt your design solution.",
      "How do you stay inspired and keep your design skills fresh?",
    ],
  },
  {
    id: "company4",
    name: "DataSystems",
    logo: "/companies/datasystems.png",
    industry: "Data Analytics",
    size: "1,000-5,000 employees",
    founded: "2008",
    headquarters: "Chicago, IL",
    website: "https://datasystems.example.com",
    description:
      "DataSystems provides data analytics and business intelligence solutions that help companies transform their raw data into actionable insights. Their platform integrates with various data sources to provide comprehensive analytics capabilities.",
    culture:
      "DataSystems has a data-driven culture where decisions are backed by evidence. They value precision, continuous improvement, and intellectual curiosity. The company offers a structured environment with clear career progression paths.",
    interviewProcess: [
      "Initial screening call with recruiter (30 minutes)",
      "Technical assessment on SQL and data modeling (1 hour)",
      "Technical interview with team lead (1 hour)",
      "Case study analysis (1 hour)",
      "Behavioral interview with hiring manager (45 minutes)",
      "Final interview with department director (30 minutes)",
    ],
    commonQuestions: [
      "How would you design a data warehouse for a retail company?",
      "Explain how you would approach cleaning and preparing a messy dataset.",
      "Describe a time when your data analysis led to a significant business decision.",
      "How do you ensure data quality and integrity in your work?",
      "What tools and technologies do you use for data visualization?",
    ],
  },
  {
    id: "company5",
    name: "CloudSystems",
    logo: "/companies/cloudsystems.png",
    industry: "Cloud Infrastructure",
    size: "5,000-10,000 employees",
    founded: "2006",
    headquarters: "Seattle, WA",
    website: "https://cloudsystems.example.com",
    description:
      "CloudSystems is a leading provider of cloud infrastructure and services. They help businesses migrate to the cloud, optimize their infrastructure, and implement security best practices for cloud environments.",
    culture:
      "CloudSystems has a fast-paced, customer-obsessed culture. They emphasize operational excellence, security, and reliability. The company offers a challenging environment where employees are encouraged to take ownership and drive innovation.",
    interviewProcess: [
      "Initial phone screen with recruiter (30 minutes)",
      "Technical screening with engineer (45 minutes)",
      "Online assessment on cloud technologies (1 hour)",
      "System design and architecture interview (1 hour)",
      "Technical deep dive with team members (1 hour)",
      "Leadership principles interview (45 minutes)",
      "Final interview with hiring manager (30 minutes)",
    ],
    commonQuestions: [
      "How would you design a highly available and scalable web application on AWS?",
      "Describe your experience with infrastructure as code.",
      "How do you approach security in cloud environments?",
      "Tell us about a time when you had to troubleshoot a complex infrastructure issue.",
      "How do you stay updated with the rapidly evolving cloud services landscape?",
    ],
  },
]

export async function getInterviewQuestions() {
  try {
    // In a real implementation, this would fetch from a database
    return mockInterviewQuestions
  } catch (error) {
    logError(error, { action: "getInterviewQuestions" })
    throw new AppError("Failed to fetch interview questions", "FETCH_ERROR")
  }
}

export async function getCompanyResearch() {
  try {
    // In a real implementation, this would fetch from a database
    return mockCompanyResearch
  } catch (error) {
    logError(error, { action: "getCompanyResearch" })
    throw new AppError("Failed to fetch company research", "FETCH_ERROR")
  }
}

export async function saveInterviewFeedback(interviewId, feedback) {
  try {
    // In a real implementation, this would save to a database
    console.log(`Saving feedback for interview ${interviewId}:`, feedback)
    return { success: true }
  } catch (error) {
    logError(error, { action: "saveInterviewFeedback" })
    throw new AppError("Failed to save interview feedback", "SAVE_ERROR")
  }
}

export async function scheduleInterviewPractice(date, type, duration) {
  try {
    // In a real implementation, this would save to a database
    console.log(`Scheduling interview practice: ${date}, ${type}, ${duration} minutes`)
    return {
      success: true,
      id: `practice-${Date.now()}`,
      date,
      type,
      duration,
    }
  } catch (error) {
    logError(error, { action: "scheduleInterviewPractice" })
    throw new AppError("Failed to schedule interview practice", "SCHEDULE_ERROR")
  }
}
