"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, User, Paperclip, Trash, Copy, Upload } from "lucide-react"
import { generateAIResponse, saveConversation } from "@/actions/ai-actions"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome to ResumeGenius AI! I can analyze your resume, match it to job descriptions, suggest improvements, and answer your resume questions. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Pass context about resume and job description if available
      const context = {
        hasResume: !!resumeFile,
        resumeFilename: resumeFile?.name || "",
        hasJobDescription: !!jobDescription.trim(),
      }

      const response = await generateAIResponse(input, context)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Save conversation after each message
      await saveConversation([...messages, userMessage, assistantMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setResumeFile(file)

    // Create a user message about the upload
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `I've uploaded my resume: ${file.name}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // In a real implementation, we would analyze the resume here
      const response = await generateAIResponse("analyze_resume", {
        hasResume: true,
        resumeFilename: file.name,
        isResumeUpload: true,
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error analyzing resume:", error)
      toast({
        title: "Error",
        description: "Failed to analyze your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobDescriptionSubmit = async () => {
    if (!jobDescription.trim()) return

    // Create a user message about the job description
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `I want to match my resume to this job description: ${jobDescription}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setJobDescription("")

    try {
      // In a real implementation, we would match the resume to the job description here
      const response = await generateAIResponse("match_job", {
        hasResume: !!resumeFile,
        resumeFilename: resumeFile?.name || "",
        hasJobDescription: true,
        jobDescription,
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error matching job description:", error)
      toast({
        title: "Error",
        description: "Failed to match your resume to the job description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Welcome to ResumeGenius AI! I can analyze your resume, match it to job descriptions, suggest improvements, and answer your resume questions. How can I help you today?",
        timestamp: new Date(),
      },
    ])
    setResumeFile(null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    })
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>ResumeGenius AI Assistant</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="job">Job Match</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <CardContent className="flex-1 overflow-auto space-y-4 pr-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 group">
                <div
                  className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border ${
                    message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
                >
                  {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div
                    className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-muted" : "bg-background border"}`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="border-t bg-background pt-3">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Textarea
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] max-h-[120px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon" onClick={triggerFileUpload} disabled={isLoading}>
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </Button>
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </CardFooter>
        </TabsContent>

        <TabsContent value="resume" className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-center max-w-md">
              <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your resume to get personalized analysis and improvement suggestions.
              </p>

              {resumeFile ? (
                <div className="p-4 border rounded-md w-full">
                  <p className="font-medium">{resumeFile.name}</p>
                  <p className="text-sm text-muted-foreground">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={triggerFileUpload}>
                      Replace
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setResumeFile(null)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={triggerFileUpload}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload your resume</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
              )}
            </div>

            {resumeFile && (
              <div className="w-full max-w-md">
                <Button
                  className="w-full"
                  onClick={() => {
                    setActiveTab("chat")
                    const message = "Please analyze my resume for improvements."
                    setInput(message)
                    setTimeout(() => {
                      const event = new Event("submit", { cancelable: true })
                      document.querySelector("form")?.dispatchEvent(event)
                    }, 100)
                  }}
                >
                  Analyze My Resume
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="job" className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col gap-4">
            <div>
              <Label htmlFor="job-description" className="text-base font-medium">
                Job Description
              </Label>
              <p className="text-sm text-muted-foreground mb-2">Paste a job description to match against your resume</p>
              <Textarea
                id="job-description"
                placeholder="Paste job description here..."
                className="min-h-[200px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <Button onClick={handleJobDescriptionSubmit} disabled={!jobDescription.trim() || !resumeFile || isLoading}>
              Match to My Resume
            </Button>

            {!resumeFile && (
              <div className="p-4 bg-muted rounded-md text-sm">
                <p className="font-medium">No resume uploaded</p>
                <p className="text-muted-foreground mt-1">
                  Please upload your resume in the Resume tab first to enable job matching.
                </p>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
