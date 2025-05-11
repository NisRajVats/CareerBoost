"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOnboarding, onboardingSteps } from "@/lib/contexts/onboarding-context"

interface StepCompletionProps {
  stepId: string
  nextStepId?: string
}

export function StepCompletion({ stepId, nextStepId }: StepCompletionProps) {
  const router = useRouter()
  const { completedSteps, completeStep } = useOnboarding()

  // If the step is already completed, don't show this component
  if (completedSteps.includes(stepId)) {
    return null
  }

  // Find the next step details
  const nextStepDetails = nextStepId ? onboardingSteps.find((step) => step.id === nextStepId) : null

  const handleComplete = () => {
    completeStep(stepId)

    // Navigate to the next step if provided
    if (nextStepId && nextStepDetails) {
      router.push(nextStepDetails.path)
    }
  }

  // Auto-complete the step when the component is rendered
  // This is useful for pages that are considered complete just by visiting them
  useEffect(() => {
    completeStep(stepId)
  }, [stepId, completeStep])

  return (
    <Card className="bg-green-900/20 border-green-800 mb-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-medium">Step completed!</p>
            <p className="text-sm text-gray-400">You've completed this step in your onboarding journey.</p>
          </div>
        </div>

        {nextStepDetails && (
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleComplete}>
            Next: {nextStepDetails.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
