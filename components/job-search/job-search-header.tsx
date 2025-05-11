import { Search } from "lucide-react"

export function JobSearchHeader() {
  return (
    <div className="border-b border-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Search className="h-5 w-5 text-blue-500" />
          <h1 className="text-2xl font-bold">Job Search</h1>
        </div>
        <p className="text-gray-400">
          Find your next opportunity from thousands of job listings across multiple job boards
        </p>
      </div>
    </div>
  )
}
