import { BookOpen } from "lucide-react"

export function UserGuideHeader() {
  return (
    <div className="border-b border-gray-800 bg-[#111827]">
      <div className="container py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <h1 className="text-xl font-bold">User Guide</h1>
        </div>
        <p className="text-sm text-gray-400 mt-1">Learn how to make the most of the AI Resume Dashboard features</p>
      </div>
    </div>
  )
}
