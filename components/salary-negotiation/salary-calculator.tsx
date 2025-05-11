import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function SalaryCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Calculator</CardTitle>
        <CardDescription>
          Calculate your target salary range based on your skills, experience, and market data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <Input id="job-title" placeholder="e.g. Software Engineer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. San Francisco, CA" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Select defaultValue="3-5">
            <SelectTrigger id="experience">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-8">6-8 years</SelectItem>
              <SelectItem value="9-12">9-12 years</SelectItem>
              <SelectItem value="13+">13+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select defaultValue="tech">
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="skills-level">Skills Level</Label>
            <span className="text-sm text-muted-foreground">Advanced</span>
          </div>
          <Slider defaultValue={[75]} max={100} step={1} />
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-center">
            <h3 className="text-lg font-medium">Recommended Salary Range</h3>
            <p className="text-3xl font-bold text-primary mt-2">$120,000 - $145,000</p>
            <p className="text-sm text-muted-foreground mt-1">Based on current market data</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Calculate</Button>
      </CardFooter>
    </Card>
  )
}
