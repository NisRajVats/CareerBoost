"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJobAlert } from "@/actions/job-alerts-actions"

export function NewAlertForm() {
  const [name, setName] = useState("")
  const [keywords, setKeywords] = useState("")
  const [locations, setLocations] = useState("")
  const [minSalary, setMinSalary] = useState("80000")
  const [maxSalary, setMaxSalary] = useState("150000")
  const [jobType, setJobType] = useState("Full-time")
  const [frequency, setFrequency] = useState("daily")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await createJobAlert({
        name,
        keywords: keywords.split(",").map((k) => k.trim()),
        locations: locations.split(",").map((l) => l.trim()),
        salary: {
          min: Number.parseInt(minSalary),
          max: Number.parseInt(maxSalary),
        },
        jobType: [jobType],
        frequency,
      })
      setSuccess(true)
      // Optionally reset form
      // setName("")
      // setKeywords("")
      // setLocations("")
    } catch (error) {
      console.error("Failed to create job alert:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Alert</CardTitle>
        <CardDescription>Set up notifications for new job opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alert-name">Alert Name</Label>
            <Input
              id="alert-name"
              placeholder="e.g., Frontend Developer Jobs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="e.g., React, Frontend, JavaScript"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Separate keywords with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locations">Locations</Label>
            <Input
              id="locations"
              placeholder="e.g., San Francisco, Remote"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Separate locations with commas</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-salary">Min Salary ($)</Label>
              <Input id="min-salary" type="number" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-salary">Max Salary ($)</Label>
              <Input id="max-salary" type="number" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-type">Job Type</Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="job-type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Alert Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {success && <div className="bg-green-50 text-green-700 p-3 rounded-md">Job alert created successfully!</div>}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Alert"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
