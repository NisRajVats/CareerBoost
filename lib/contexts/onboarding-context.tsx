"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the onboarding steps
export const onboardingSteps = [
  {
    id: "profile-setup",
    title: "Set Up Your Profile",
    description: "Complete your profile to personalize your experience",
    path: "/profile",
  },
  {
    id: "resume-upload",
    title: "Upload Your Resume",
    description: "Upload your resume to get started with optimization",
    path: "/resume-optimizer",
  },
  {
    id: "resume-score",
    title: "Check Your Resume Score",
    description: "See how your resume scores and get improvement recommendations",
    path: "/resume-score",
  },
  {
    id: "job-search",
    title: "Search for Jobs",
    description: "Find jobs that match your skills and experience",
    path: "/job-search",
  },
  {
    id: "job-match",
    title: "Match with Jobs",
    description: "See how well you match with job listings",
    path: "/job-match",
  },
  {
    id: "application-tracker",
    title: "Track Your Applications",
    description: "Keep track of your job applications in one place",
    path: "/application-tracker",
  },
  {
    id: "follow-up",
    title: "Generate Follow-Ups",
    description: "Create professional follow-up emails for your applications",
    path: "/follow-up",
  },
  {
    id: "ai-assistant",
    title: "Use AI Assistant",
    description: "Get help with interview preparation and career advice",
    path: "/ai-assistant",
  },
]

// Define the context type
type OnboardingContextType = {
  isOnboardingComplete: boolean
  completedSteps: string[]
  currentStep: string | null
  showOnboarding: boolean
  completeStep: (stepId: string) => void
  startOnboarding: () => void
  dismissOnboarding: () => void
  getStepStatus: (stepId: string) => "completed" | "current" | "upcoming"
  getProgress: () => number
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

// Create the provider component
export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Initialize onboarding state from localStorage on client side
  useEffect(() => {
    const storedCompletedSteps = localStorage.getItem("onboardingCompletedSteps")
    const storedIsComplete = localStorage.getItem("onboardingComplete")

    if (storedCompletedSteps) {
      setCompletedSteps(JSON.parse(storedCompletedSteps))
    }

    if (storedIsComplete === "true") {
      setIsOnboardingComplete(true)
    } else {
      // If onboarding is not complete, determine the current step
      const nextStep = determineNextStep(storedCompletedSteps ? JSON.parse(storedCompletedSteps) : [])
      setCurrentStep(nextStep)

      // Show onboarding for new users
      if (!storedCompletedSteps && !storedIsComplete) {
        setShowOnboarding(true)
      }
    }
  }, [])

  // Determine the next step based on completed steps
  const determineNextStep = (completed: string[]): string | null => {
    if (completed.length === onboardingSteps.length) {
      return null
    }

    for (const step of onboardingSteps) {
      if (!completed.includes(step.id)) {
        return step.id
      }
    }

    return null
  }

  // Complete a step
  const completeStep = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      return
    }

    const newCompletedSteps = [...completedSteps, stepId]
    setCompletedSteps(newCompletedSteps)
    localStorage.setItem("onboardingCompletedSteps", JSON.stringify(newCompletedSteps))

    // Determine the next step
    const nextStep = determineNextStep(newCompletedSteps)
    setCurrentStep(nextStep)

    // If all steps are completed, mark onboarding as complete
    if (newCompletedSteps.length === onboardingSteps.length) {
      setIsOnboardingComplete(true)
      localStorage.setItem("onboardingComplete", "true")
    }
  }

  // Start onboarding
  const startOnboarding = () => {
    setShowOnboarding(true)
  }

  // Dismiss onboarding
  const dismissOnboarding = () => {
    setShowOnboarding(false)
  }

  // Get the status of a step
  const getStepStatus = (stepId: string): "completed" | "current" | "upcoming" => {
    if (completedSteps.includes(stepId)) {
      return "completed"
    }

    if (currentStep === stepId) {
      return "current"
    }

    return "upcoming"
  }

  // Get the overall progress
  const getProgress = (): number => {
    return Math.round((completedSteps.length / onboardingSteps.length) * 100)
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingComplete,
        completedSteps,
        currentStep,
        showOnboarding,
        completeStep,
        startOnboarding,
        dismissOnboarding,
        getStepStatus,
        getProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

// Create a hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext)

  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }

  return context
}
