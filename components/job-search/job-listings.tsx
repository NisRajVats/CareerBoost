"use client"

import { useState } from "react"
import Link from "next/link"
import { Bookmark, Building, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { bookmarkJob } from "@/actions/job-actions"

export function JobListings({ jobs, totalJobs, currentPage }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {totalJobs} {totalJobs === 1 ? "Job" : "Jobs"} Found
        </h2>
        <div className="flex items-center gap-2">
          <select className="bg-[#0a0e17] border border-gray-700 rounded-md px-2 py-1 text-sm">
            <option>Most Relevant</option>
            <option>Newest</option>
            <option>Highest Salary</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <Card className="bg-[#111827] border-gray-800">
            <CardContent className="p-6 text-center">
              <p className="text-gray-400">No jobs found. Try adjusting your search filters.</p>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>

      {totalJobs > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination totalJobs={totalJobs} currentPage={currentPage} />
        </div>
      )}
    </div>
  )
}

function JobCard({ job }) {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false)
  const [isApplying, setIsApplying] = useState(false)

  const handleBookmark = async () => {
    try {
      await bookmarkJob(job.id, !isBookmarked)
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error bookmarking job:", error)
    }
  }

  const handleApply = async () => {
    setIsApplying(true)
    // In a real implementation, this would handle the application process
    setTimeout(() => {
      alert(`Applied to ${job.title} at ${job.company}!`)
      setIsApplying(false)
    }, 1000)
  }

  return (
    <Card className="bg-[#111827] border-gray-800 hover:border-gray-700 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex-1">
            <Link href={`/job-search/${job.id}`} className="hover:underline">
              <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
            </Link>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <Building className="h-4 w-4 mr-1" />
              <span className="mr-3">{job.company}</span>
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>
            <div className="flex items-center text-gray-400 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span>{job.postedAt}</span>
              {job.salary && (
                <>
                  <span className="mx-2">•</span>
                  <span>{job.salary}</span>
                </>
              )}
            </div>
          </div>
          <div className="ml-4 flex flex-col items-end justify-between">
            <Button
              variant="ghost"
              size="icon"
              className={isBookmarked ? "text-yellow-500" : "text-gray-400"}
              onClick={handleBookmark}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs" asChild>
                <Link href={`/job-search/${job.id}`}>Details</Link>
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-xs"
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? "Applying..." : "Apply"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Pagination({ totalJobs, currentPage }) {
  const totalPages = Math.ceil(totalJobs / 10)
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/job-search?page=${Math.max(1, currentPage - 1)}`}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 ? "text-gray-500 cursor-not-allowed" : "bg-[#0a0e17] hover:bg-gray-800"
        }`}
      >
        Prev
      </Link>

      {startPage > 1 && (
        <>
          <Link href="/job-search?page=1" className="px-3 py-1 rounded-md bg-[#0a0e17] hover:bg-gray-800">
            1
          </Link>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`/job-search?page=${page}`}
          className={`px-3 py-1 rounded-md ${
            page === currentPage ? "bg-blue-600 text-white" : "bg-[#0a0e17] hover:bg-gray-800"
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Link href={`/job-search?page=${totalPages}`} className="px-3 py-1 rounded-md bg-[#0a0e17] hover:bg-gray-800">
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={`/job-search?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : "bg-[#0a0e17] hover:bg-gray-800"
        }`}
      >
        Next
      </Link>
    </div>
  )
}
