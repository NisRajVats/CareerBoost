export type ErrorWithMessage = {
  message: string
  code?: string
  details?: Record<string, any>
}

export class AppError extends Error {
  code: string
  details?: Record<string, any>

  constructor(message: string, code = "UNKNOWN_ERROR", details?: Record<string, any>) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.details = details
  }
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

export function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) {
    return error
  }

  try {
    return new AppError(
      error instanceof Error ? error.message : "An unexpected error occurred",
      error instanceof Error ? error.name : "UNKNOWN_ERROR",
    )
  } catch {
    return new AppError("An unexpected error occurred", "UNKNOWN_ERROR")
  }
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message
}

export function logError(error: unknown, context?: Record<string, any>): void {
  const errorWithMessage = toErrorWithMessage(error)

  // In production, this would send to a logging service
  console.error({
    message: errorWithMessage.message,
    code: errorWithMessage.code,
    details: errorWithMessage.details,
    context,
    timestamp: new Date().toISOString(),
  })
}

// Add the missing handleError function
export function handleError(error: unknown, context?: Record<string, any>): ErrorWithMessage {
  logError(error, context)
  return toErrorWithMessage(error)
}
