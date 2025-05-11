import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobMatchHeader } from "@/components/job-match/job-match-header"
import { MatchList } from "@/components/job-match/match-list"
import { SkillsGapAnalysis } from "@/components/job-match/skills-gap-analysis"
import { ResumeAdjustments } from "@/components/job-match/resume-adjustments"
import { CoverLetterGenerator } from "@/components/job-match/cover-letter-generator"
import { getJobMatches, getSkillsGapAnalysis } from "@/actions/job-match-actions"

export default async function JobMatchPage() {
  // Fetch data for the page
  const matches = await getJobMatches()
  const analysis = await getSkillsGapAnalysis()

  return (
    <div className="container mx-auto py-6">
      <JobMatchHeader />

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList>
          <TabsTrigger value="matches">Job Matches</TabsTrigger>
          <TabsTrigger value="skills">Skills Gap</TabsTrigger>
          <TabsTrigger value="tailor">Tailor Resume</TabsTrigger>
          <TabsTrigger value="cover">Cover Letter</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-6">
          <MatchList matches={matches} />
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <SkillsGapAnalysis analysis={analysis} />
        </TabsContent>

        <TabsContent value="tailor" className="space-y-6">
          <ResumeAdjustments />
        </TabsContent>

        <TabsContent value="cover" className="space-y-6">
          <CoverLetterGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
