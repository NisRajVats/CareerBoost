import {
  User,
  FileText,
  Percent,
  Search,
  ArrowRightLeft,
  ClipboardList,
  Mail,
  MessageSquare,
  BarChart3,
  CheckCircle,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UserGuide() {
  const steps = [
    {
      id: 1,
      title: "Start with Profile Setup",
      icon: <User className="h-6 w-6 text-blue-500" />,
      path: "/profile",
      content: [
        "Complete your profile with all relevant experience, skills, and education",
        "Set your career goals and job preferences",
        "Upload your current resume",
      ],
    },
    {
      id: 2,
      title: "Use Resume Optimizer",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      path: "/resume-optimizer",
      content: [
        "Upload your existing resume or create one from templates",
        "Review AI-suggested improvements section by section",
        "Implement keyword optimizations for target industries",
      ],
    },
    {
      id: 3,
      title: "Check Your Resume Score",
      icon: <Percent className="h-6 w-6 text-blue-500" />,
      path: "/resume-score",
      content: [
        "Identify weak areas in your resume",
        "Focus improvements on lowest-scoring categories",
        "Set score improvement goals",
      ],
    },
    {
      id: 4,
      title: "Set Up Job Search & Alerts",
      icon: <Search className="h-6 w-6 text-blue-500" />,
      path: "/job-search",
      content: ["Define your job search criteria", "Configure alert preferences", "Begin exploring matched positions"],
    },
    {
      id: 5,
      title: "Use Job Match Features",
      icon: <ArrowRightLeft className="h-6 w-6 text-blue-500" />,
      path: "/job-match",
      content: [
        "For each interesting position, run a match analysis",
        "Review compatibility scores and missing qualifications",
        "Customize your resume using the suggestions",
      ],
    },
    {
      id: 6,
      title: "Track Applications",
      icon: <ClipboardList className="h-6 w-6 text-blue-500" />,
      path: "/application-tracker",
      content: ["Add all applications to the tracker", "Set follow-up reminders", "Document all communications"],
    },
    {
      id: 7,
      title: "Generate Follow-Ups",
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      path: "/follow-up",
      content: [
        "Use the generator at appropriate intervals",
        "Customize templates to reference specific conversations",
        "Track response rates",
      ],
    },
    {
      id: 8,
      title: "Prepare for Interviews",
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      path: "/ai-assistance",
      content: [
        "Use the AI Assistant for practice questions",
        "Research salary data for negotiation preparation",
        "Develop negotiation strategies based on recommendations",
      ],
    },
    {
      id: 9,
      title: "Ongoing Optimization",
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      path: "/",
      content: [
        "Regularly check your dashboard for insights",
        "Refine your resume based on application success patterns",
        "Adjust your strategy based on metrics and feedback",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">How to Apply These Features</h2>
        <p className="text-gray-400 mb-6">
          Follow this step-by-step guide to maximize your job search success with our AI-powered tools. Each step builds
          on the previous one to create a comprehensive job search strategy.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <Card key={step.id} className="bg-[#111827] border-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-[#1a2236] p-6 flex items-center justify-center md:w-24">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900/30">
                    {step.icon}
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 mr-3 text-sm">
                        {step.id}
                      </span>
                      {step.title}
                    </h3>
                    <Button asChild variant="outline" size="sm" className="hidden md:flex">
                      <Link href={step.path}>
                        Go to {step.title.split(" ").slice(-1)}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {step.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm" className="md:hidden w-full">
                    <Link href={step.path}>
                      Go to {step.title.split(" ").slice(-1)}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 max-w-3xl">
        <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
        <p className="text-gray-400 mb-4">If you need additional guidance on how to use any feature, you can:</p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-300">
            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <span>Use the AI Assistant to ask specific questions</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300">
            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <span>Check the tooltips and help icons throughout the application</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300">
            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <span>Contact our support team for personalized assistance</span>
          </li>
        </ul>
        <Button asChild>
          <Link href="/ai-assistance">
            Ask the AI Assistant
            <MessageSquare className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
