"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download, FileText, Check, X, AlertCircle, Loader2 } from "lucide-react"
import { optimizeResume } from "@/actions/resume-actions"
import { toast } from "@/components/ui/use-toast"

export function ResumeAnalysis({ id, analysis }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationComplete, setOptimizationComplete] = useState(false)

  const handleExport = (format) => {
    // In a real implementation, this would generate and download the file
    toast({
      title: `Exporting as ${format}...`,
      description: "Your resume will be downloaded shortly.",
    })
  }

  const handleOptimize = async () => {
    setIsOptimizing(true)
    try {
      const result = await optimizeResume(id)
      setOptimizationComplete(true)
      toast({
        title: "Resume optimized successfully",
        description: `Your resume score improved from ${result.improvementMetrics.overallScore.before} to ${result.improvementMetrics.overallScore.after}.`,
      })
    } catch (error) {
      console.error("Error optimizing resume:", error)
      toast({
        title: "Optimization failed",
        description: "There was an error optimizing your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Resume Analysis Results</h2>
          <p className="text-gray-400">AI-powered insights and recommendations for your resume</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("docx")}>
            <Download className="mr-2 h-4 w-4" />
            Export as DOCX
          </Button>
          <Button
            onClick={handleOptimize}
            disabled={isOptimizing || optimizationComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : optimizationComplete ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Optimized
              </>
            ) : (
              "Optimize Resume"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreCard title="Overall Score" score={analysis.scores.overall} />
        <ScoreCard title="ATS Compatibility" score={analysis.scores.atsCompatibility} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="format">Format</TabsTrigger>
          <TabsTrigger value="comparison">Before/After</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalysisCard
              title="Strengths"
              items={analysis.strengths}
              icon={<Check className="h-4 w-4 text-green-500" />}
            />
            <AnalysisCard
              title="Weaknesses"
              items={analysis.weaknesses}
              icon={<X className="h-4 w-4 text-red-500" />}
            />
          </div>
          <AnalysisCard
            title="Suggested Improvements"
            items={analysis.improvementSuggestions.map((suggestion) => suggestion.suggested)}
            icon={<AlertCircle className="h-4 w-4 text-blue-500" />}
          />
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KeywordCard title="Present Keywords" keywords={analysis.keywordAnalysis.present} type="present" />
            <KeywordCard title="Missing Keywords" keywords={analysis.keywordAnalysis.missing} type="missing" />
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalysisCard
              title="Action Verbs"
              items={[
                `You used ${analysis.contentAnalysis.actionVerbs.unique} unique action verbs`,
                ...analysis.contentAnalysis.actionVerbs.suggestions,
              ]}
            />
            <AnalysisCard
              title="Achievements"
              items={[
                `${analysis.contentAnalysis.achievements.quantified} of ${analysis.contentAnalysis.achievements.count} achievements are quantified`,
                ...analysis.contentAnalysis.achievements.suggestions,
              ]}
            />
          </div>
          <AnalysisCard title="Specificity" items={analysis.contentAnalysis.specificity.suggestions} />
        </TabsContent>

        <TabsContent value="format" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalysisCard title="Readability" items={analysis.formatAnalysis.readability.suggestions} />
            <AnalysisCard title="Structure" items={analysis.formatAnalysis.structure.suggestions} />
          </div>
          <AnalysisCard title="ATS Compatibility" items={analysis.atsAnalysis.suggestions} />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-400" />
                  Original Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#0a0e17] p-4 rounded-md whitespace-pre-wrap font-mono text-sm h-[500px] overflow-y-auto">
                  {analysis.originalText || "Original text not available"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Optimized Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#0a0e17] p-4 rounded-md whitespace-pre-wrap font-mono text-sm h-[500px] overflow-y-auto">
                  {optimizationComplete
                    ? analysis.optimizedText || "Optimization complete. View your improved resume."
                    : "Click the 'Optimize Resume' button to generate an optimized version of your resume."}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ScoreCard({ title, score }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{title}</h3>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/100</span>
        </div>
        <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
      </CardContent>
    </Card>
  )
}

function AnalysisCard({ title, items, icon = null }) {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2">
              {icon && <span className="mt-1 flex-shrink-0">{icon}</span>}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function KeywordCard({ title, keywords, type }) {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-sm ${
                type === "present" ? "bg-green-900/20 text-green-500" : "bg-red-900/20 text-red-500"
              }`}
            >
              {keyword}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
