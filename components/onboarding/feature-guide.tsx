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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeatureGuide() {
  const steps = [
    {
      id: 1,
      title: "Profile Setup",
      icon: <User className="h-5 w-5 text-blue-500" />,
      path: "/profile",
      description: "Complete your profile and upload your resume",
    },
    {
      id: 2,
      title: "Resume Optimizer",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      path: "/resume-optimizer",
      description: "Get AI-powered resume improvements",
    },
    {
      id: 3,
      title: "Resume Score",
      icon: <Percent className="h-5 w-5 text-blue-500" />,
      path: "/resume-score",
      description: "Check your resume's effectiveness score",
    },
    {
      id: 4,
      title: "Job Search",
      icon: <Search className="h-5 w-5 text-blue-500" />,
      path: "/job-search",
      description: "Find relevant job opportunities",
    },
    {
      id: 5,
      title: "Job Match",
      icon: <ArrowRightLeft className="h-5 w-5 text-blue-500" />,
      path: "/job-match",
      description: "See how well you match with jobs",
    },
    {
      id: 6,
      title: "Application Tracker",
      icon: <ClipboardList className="h-5 w-5 text-blue-500" />,
      path: "/application-tracker",
      description: "Track all your job applications",
    },
    {
      id: 7,
      title: "Follow-Up Generator",
      icon: <Mail className="h-5 w-5 text-blue-500" />,
      path: "/follow-up",
      description: "Create professional follow-up emails",
    },
    {
      id: 8,
      title: "AI Assistant",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      path: "/ai-assistance",
      description: "Get interview prep and career advice",
    },
    {
      id: 9,
      title: "Dashboard",
      icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
      path: "/",
      description: "Monitor your progress and insights",
    },
  ]

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Getting Started Guide</h3>
      <p className="text-gray-400 mb-6">Follow these steps to maximize your job search success:</p>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-[#1a2236] transition-colors">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 shrink-0">
              {step.id}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium flex items-center gap-2">
                {step.icon}
                <span>{step.title}</span>
              </h4>
              <p className="text-sm text-gray-400 truncate">{step.description}</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="shrink-0">
              <Link href={step.path}>Go</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/user-guide">View Detailed Guide</Link>
        </Button>
      </div>
    </div>
  )
}
