"use client"

import { useState } from "react"
import { Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { bookmarkJob } from "@/actions/job-actions"

export function JobActions({ job }) {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false)

  const handleBookmark = async () => {
    try {
      await bookmarkJob(job.id, !isBookmarked)
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error bookmarking job:", error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={isBookmarked ? "text-yellow-500" : "text-gray-400"}
        onClick={handleBookmark}
      >
        <Bookmark className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-400" onClick={handleShare}>
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  )
}
