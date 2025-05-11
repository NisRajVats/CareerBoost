"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Search,
  CheckSquare,
  MessageSquare,
  DollarSign,
  Calendar,
  Bell,
  User,
  HelpCircle,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", path: "/", icon: BarChart3 },
    { name: "Resume Optimizer", path: "/resume-optimizer", icon: FileText },
    { name: "Resume Score", path: "/resume-score", icon: CheckSquare },
    { name: "Job Search", path: "/job-search", icon: Search },
    { name: "Application Tracker", path: "/application-tracker", icon: CheckSquare },
    { name: "Interview Prep", path: "/interview-prep", icon: Calendar },
    { name: "Follow-up", path: "/follow-up", icon: MessageSquare },
    { name: "Job Alerts", path: "/job-alerts", icon: Bell },
    { name: "Job Match", path: "/job-match", icon: CheckSquare },
    { name: "AI Assistance", path: "/ai-assistance", icon: MessageSquare },
    { name: "Salary Negotiation", path: "/salary-negotiation", icon: DollarSign },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Notification Settings", path: "/notification-settings", icon: Bell },
    { name: "User Guide", path: "/user-guide", icon: HelpCircle },
  ]

  return (
    <div className="w-64 h-full bg-[#0f1724] border-r border-[#1e293b] flex flex-col">
      <div className="p-4 border-b border-[#1e293b]">
        <h1 className="text-xl font-bold">AI Resume Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-[#1e293b] text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#1e293b]/50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
