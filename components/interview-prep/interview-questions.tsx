"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Bookmark, BookmarkCheck } from "lucide-react"

type Question = {
  id: string
  category: string
  question: string
  answer?: string
  difficulty: "easy" | "medium" | "hard"
}

type InterviewQuestionsProps = {
  questions: {
    behavioral: Question[]
    technical: Question[]
    roleSpecific: Question[]
  }
}

export function InterviewQuestions({ questions }: InterviewQuestionsProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({})
  const [savedQuestions, setSavedQuestions] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("behavioral")

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleSaved = (id: string) => {
    setSavedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const renderQuestions = (questionList: Question[]) => {
    return (
      <div className="space-y-4">
        {questionList.map((q) => (
          <div key={q.id} className="border rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-start p-4 cursor-pointer hover:bg-muted/50"
              onClick={() => toggleQuestion(q.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(q.difficulty)}`}>
                    {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                  </span>
                </div>
                <h3 className="font-medium">{q.question}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSaved(q.id)
                  }}
                >
                  {savedQuestions[q.id] ? (
                    <BookmarkCheck className="h-5 w-5 text-primary" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
                {expandedQuestions[q.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
            {expandedQuestions[q.id] && q.answer && (
              <div className="p-4 border-t bg-muted/30">
                <p className="text-sm">{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Questions</CardTitle>
        <CardDescription>Common interview questions with sample answers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="behavioral" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="roleSpecific">Role-Specific</TabsTrigger>
          </TabsList>
          <TabsContent value="behavioral">{renderQuestions(questions.behavioral)}</TabsContent>
          <TabsContent value="technical">{renderQuestions(questions.technical)}</TabsContent>
          <TabsContent value="roleSpecific">{renderQuestions(questions.roleSpecific)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
