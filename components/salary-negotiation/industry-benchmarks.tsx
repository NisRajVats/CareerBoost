"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Mock data for industry benchmarks
const industryData = {
  technology: {
    "Software Engineer": {
      entry: { min: 70000, median: 85000, max: 100000 },
      mid: { min: 90000, median: 120000, max: 150000 },
      senior: { min: 130000, median: 160000, max: 200000 },
    },
    "Product Manager": {
      entry: { min: 80000, median: 95000, max: 110000 },
      mid: { min: 100000, median: 130000, max: 160000 },
      senior: { min: 140000, median: 180000, max: 220000 },
    },
    "Data Scientist": {
      entry: { min: 85000, median: 100000, max: 115000 },
      mid: { min: 110000, median: 135000, max: 160000 },
      senior: { min: 145000, median: 175000, max: 210000 },
    },
  },
  finance: {
    "Financial Analyst": {
      entry: { min: 65000, median: 75000, max: 90000 },
      mid: { min: 85000, median: 100000, max: 120000 },
      senior: { min: 110000, median: 140000, max: 170000 },
    },
    "Investment Banker": {
      entry: { min: 85000, median: 100000, max: 120000 },
      mid: { min: 120000, median: 150000, max: 200000 },
      senior: { min: 200000, median: 300000, max: 500000 },
    },
  },
  healthcare: {
    "Registered Nurse": {
      entry: { min: 60000, median: 70000, max: 85000 },
      mid: { min: 75000, median: 90000, max: 105000 },
      senior: { min: 95000, median: 110000, max: 130000 },
    },
    "Physician Assistant": {
      entry: { min: 90000, median: 105000, max: 120000 },
      mid: { min: 110000, median: 125000, max: 140000 },
      senior: { min: 130000, median: 145000, max: 160000 },
    },
  },
}

export function IndustryBenchmarks() {
  const [industry, setIndustry] = useState("technology")
  const [role, setRole] = useState("Software Engineer")
  const [level, setLevel] = useState("mid")

  const currentData = industryData[industry]?.[role]?.[level] || { min: 0, median: 0, max: 0 }

  const formatSalary = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Industry Benchmarks</CardTitle>
        <CardDescription>Compare salary ranges across industries and roles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(industryData[industry] || {}).map((jobRole) => (
                  <SelectItem key={jobRole} value={jobRole}>
                    {jobRole}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="font-medium mb-3">Salary Range</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Minimum</p>
                <p className="text-lg font-semibold">{formatSalary(currentData.min)}</p>
              </div>
              <div className="border-x">
                <p className="text-sm text-muted-foreground">Median</p>
                <p className="text-lg font-semibold">{formatSalary(currentData.median)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maximum</p>
                <p className="text-lg font-semibold">{formatSalary(currentData.max)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
