import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  message?: string
  size?: "sm" | "md" | "lg"
  fullPage?: boolean
}

export function LoadingState({ message = "Loading...", size = "md", fullPage = false }: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const content = (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500 mb-2`} />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )

  if (fullPage) {
    return <div className="flex items-center justify-center h-full min-h-[200px]">{content}</div>
  }

  return content
}
