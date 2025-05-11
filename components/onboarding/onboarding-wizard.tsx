"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useOnboarding, onboardingSteps } from "@/lib/contexts/onboarding-context"

export function OnboardingWizard() {
  const router = useRouter()
  const { showOnboarding, dismissOnboarding, currentStep, completedSteps, completeStep, getProgress } = useOnboarding()

  const [isVisible, setIsVisible] = useState(false)

  // Control visibility with animation
  useEffect(() => {
    if (showOnboarding) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [showOnboarding])

  if (!showOnboarding && !isVisible) {
    return null
  }

  // Find the current step details
  const currentStepDetails = currentStep ? onboardingSteps.find((step) => step.id === currentStep) : null

  // If all steps are completed, show completion message
  const allCompleted = completedSteps.length === onboardingSteps.length

  const handleNext = () => {
    if (currentStep && currentStepDetails) {
      router.push(currentStepDetails.path)
      dismissOnboarding()
    }
  }

  const handleSkip = () => {
    if (currentStep) {
      completeStep(currentStep)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Card className="w-full max-w-md bg-[#111827] border-gray-800">
        <CardHeader className="relative pb-2">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={dismissOnboarding}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <CardTitle>{allCompleted ? "Onboarding Complete!" : "Getting Started"}</CardTitle>
          <div className="mt-2">
            <Progress value={getProgress()} className="h-2" />
            <p className="text-xs text-gray-400 mt-1">{getProgress()}% Complete</p>
          </div>
        </CardHeader>
        <CardContent>
          {allCompleted ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">You've completed all the steps!</h3>
              <p className="text-gray-400">
                You're all set to make the most of our platform. Explore all features to optimize your job search.
              </p>
            </div>
          ) : currentStepDetails ? (
            <div className="py-4">
              <h3 className="text-lg font-medium mb-2">{currentStepDetails.title}</h3>
              <p className="text-gray-400 mb-4">{currentStepDetails.description}</p>
              <div className="space-y-2">
                {onboardingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        completedSteps.includes(step.id)
                          ? "bg-green-900/20 text-green-500"
                          : step.id === currentStep
                            ? "bg-blue-900/20 text-blue-500"
                            : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${step.id === currentStep ? "font-medium" : "text-gray-400"}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="flex justify-between">
          {allCompleted ? (
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={dismissOnboarding}>
              Continue to Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={handleSkip}>
                Skip for now
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
