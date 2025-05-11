"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, MapPin, Briefcase, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveSearch } from "@/actions/job-actions"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function JobSearchFilters({
  initialQuery = "",
  initialLocation = "",
  initialIndustry = "",
  initialExperience = "",
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState(initialLocation)
  const [industry, setIndustry] = useState(initialIndustry)
  const [experience, setExperience] = useState(initialExperience)
  const [notifications, setNotifications] = useState(false)
  const [jobSite, setJobSite] = useState("linkedin")

  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search parameters
    const params = new URLSearchParams()
    if (query) params.set("query", query)
    if (location) params.set("location", location)
    if (industry) params.set("industry", industry)
    if (experience) params.set("experience", experience)
    params.set("page", "1")

    startTransition(() => {
      router.push(`/job-search?${params.toString()}`)
    })

    // Open external job site in new tab
    const externalUrl = getExternalJobSiteUrl(jobSite, query, location)
    window.open(externalUrl, "_blank")
  }

  const handleSaveSearch = async () => {
    if (!query && !location && !industry && !experience) {
      toast({
        title: "Cannot save empty search",
        description: "Please enter at least one search parameter.",
        variant: "destructive",
      })
      return
    }

    try {
      await saveSearch({
        query,
        location,
        industry,
        experience,
        notifications,
      })

      toast({
        title: "Search saved",
        description: "You will receive notifications for new matching jobs.",
      })
    } catch (error) {
      console.error("Error saving search:", error)
      toast({
        title: "Error",
        description: "Failed to save search. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getExternalJobSiteUrl = (site, query, location) => {
    const encodedQuery = encodeURIComponent(query || "")
    const encodedLocation = encodeURIComponent(location || "")

    switch (site) {
      case "linkedin":
        return `https://www.linkedin.com/jobs/search/?keywords=${encodedQuery}&location=${encodedLocation}`
      case "indeed":
        return `https://www.indeed.com/jobs?q=${encodedQuery}&l=${encodedLocation}`
      case "glassdoor":
        return `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodedQuery}&locT=C&locId=0`
      default:
        return `https://www.linkedin.com/jobs/search/?keywords=${encodedQuery}&location=${encodedLocation}`
    }
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-500" />
          Search Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[#0a0e17] border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Location</span>
            </div>
            <Input
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-[#0a0e17] border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Industry</span>
            </div>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-[#0a0e17] border-gray-700">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Experience Level</span>
            </div>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger className="bg-[#0a0e17] border-gray-700">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Search On</span>
            </div>
            <Select value={jobSite} onValueChange={setJobSite}>
              <SelectTrigger className="bg-[#0a0e17] border-gray-700">
                <SelectValue placeholder="Select job site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="glassdoor">Glassdoor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? "Searching..." : "Search Jobs"}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  Save Search
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-[#111827] border-gray-700">
                <div className="space-y-4">
                  <h4 className="font-medium">Save this search</h4>
                  <p className="text-sm text-gray-400">
                    Save your search criteria to quickly access it later and optionally receive notifications for new
                    matching jobs.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                    <Label htmlFor="notifications">Receive notifications</Label>
                  </div>
                  <Button onClick={handleSaveSearch} className="w-full">
                    Save
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
