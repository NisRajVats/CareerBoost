"use client"

import { AlertCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorAlertProps {
  title?: string
  message: string
  onDismiss?: () => void
}

export function ErrorAlert({ title = "Error", message, onDismiss }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-50">
      <AlertCircle className="h-4 w-4" />
      <div className="flex-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {onDismiss && (
        <Button variant="ghost" size="icon" onClick={onDismiss} className="text-red-50">
          <XCircle className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  )
}
