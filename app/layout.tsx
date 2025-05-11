import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { OnboardingProvider } from "@/lib/contexts/onboarding-context"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { NotificationProvider } from "@/lib/contexts/notification-context"
import { NotificationCenter } from "@/components/notifications/notification-center"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Resume Dashboard",
  description: "AI-powered resume optimization and job search platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnboardingProvider>
          <NotificationProvider>
            <div className="flex h-screen bg-[#0a0e17] text-white">
              <Sidebar />
              <div className="flex-1 overflow-auto">
                <div className="flex justify-end p-4">
                  <NotificationCenter />
                </div>
                {children}
              </div>
              <OnboardingWizard />
            </div>
          </NotificationProvider>
        </OnboardingProvider>
      </body>
    </html>
  )
}
