"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, BellOff, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { deleteSavedSearch, toggleSavedSearchNotifications } from "@/actions/job-actions"

export function SavedSearches({ savedSearches }) {
  if (!savedSearches || savedSearches.length === 0) {
    return null
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle>Saved Searches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {savedSearches.map((search) => (
            <SavedSearchItem key={search.id} search={search} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SavedSearchItem({ search }) {
  const [notifications, setNotifications] = useState(search.notifications)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleNotifications = async () => {
    try {
      await toggleSavedSearchNotifications(search.id, !notifications)
      setNotifications(!notifications)
    } catch (error) {
      console.error("Error toggling notifications:", error)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this saved search?")) {
      setIsDeleting(true)
      try {
        await deleteSavedSearch(search.id)
        // The component will be removed by the parent when the server action completes
      } catch (error) {
        console.error("Error deleting saved search:", error)
        setIsDeleting(false)
      }
    }
  }

  // Build the search URL
  const searchParams = new URLSearchParams()
  if (search.query) searchParams.set("query", search.query)
  if (search.location) searchParams.set("location", search.location)
  if (search.industry) searchParams.set("industry", search.industry)
  if (search.experience) searchParams.set("experience", search.experience)

  return (
    <div className={`p-3 rounded-md ${isDeleting ? "opacity-50" : "hover:bg-[#1a2236]"} transition-colors`}>
      <div className="flex justify-between items-start">
        <Link href={`/job-search?${searchParams.toString()}`} className="flex-1">
          <h4 className="font-medium text-sm line-clamp-1">
            {search.query || "All Jobs"}
            {search.location && ` in ${search.location}`}
          </h4>
          <p className="text-gray-400 text-xs mt-1">
            {[
              search.industry && `Industry: ${search.industry}`,
              search.experience && `Experience: ${search.experience}`,
            ]
              .filter(Boolean)
              .join(" • ")}
          </p>
        </Link>
        <div className="flex items-center ml-2">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${notifications ? "text-blue-500" : "text-gray-400"}`}
            onClick={handleToggleNotifications}
            disabled={isDeleting}
          >
            {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
