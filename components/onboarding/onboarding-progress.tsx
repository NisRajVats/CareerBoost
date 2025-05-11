"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useOnboarding, onboardingSteps } from "@/lib/contexts/onboarding-context"
import Link from "next/link"

export function OnboardingProgress() {
  const { completedSteps, currentStep, getProgress, startOnboarding } = useOnboarding()

  // If all steps are completed, don't show this component
  if (completedSteps.length === onboardingSteps.length) {
    return null
  }

  // Find the current step details
  const currentStepDetails = currentStep ? onboardingSteps.find((step) => step.id === currentStep) : null

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your progress</span>
              <span className="text-sm text-gray-400">{getProgress()}% complete</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          {currentStepDetails && (
            <div className="bg-[#1a2236] rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">Next step:</h3>
              <p className="text-lg font-semibold mb-2">{currentStepDetails.title}</p>
              <p className="text-sm text-gray-400 mb-4">{currentStepDetails.description}</p>
              <div className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={startOnboarding}>
                  View all steps
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href={currentStepDetails.path}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {onboardingSteps.slice(0, 4).map((step) => (
              <div key={step.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full ${
                        step.id === currentStep ? "bg-blue-900/20 border border-blue-500" : "bg-gray-800"
                      }`}
                    />
                  )}
                  <span className={completedSteps.includes(step.id) ? "text-gray-400" : ""}>{step.title}</span>
                </div>
                {!completedSteps.includes(step.id) && step.id !== currentStep && (
                  <Button variant="ghost" size="sm" className="h-6 text-xs" asChild>
                    <Link href={step.path}>Start</Link>
                  </Button>
                )}
              </div>
            ))}

            {onboardingSteps.length > 4 && (
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={startOnboarding}>
                View all {onboardingSteps.length} steps
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
