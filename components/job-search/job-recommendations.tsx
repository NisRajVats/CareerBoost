import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function JobRecommendations({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return null
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {jobs.map((job) => (
            <Link key={job.id} href={`/job-search/${job.id}`}>
              <div className="p-3 hover:bg-[#1a2236] rounded-md transition-colors cursor-pointer">
                <h4 className="font-medium text-sm">{job.title}</h4>
                <p className="text-gray-400 text-xs">{job.company}</p>
                <div className="flex items-center text-gray-400 text-xs mt-1">
                  <span>{job.location}</span>
                  <span className="mx-1">•</span>
                  <span>{job.matchPercentage}% Match</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
