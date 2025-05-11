"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Video, VideoOff, MicOff, Play, Pause, SkipForward } from "lucide-react"

export function MockInterviewSimulator() {
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const mockQuestions = [
    "Tell me about yourself and your experience.",
    "What are your greatest strengths and weaknesses?",
    "Why are you interested in this position?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "Where do you see yourself in 5 years?",
  ]

  const startInterview = () => {
    setInterviewStarted(true)
    setCurrentQuestion(0)
    setIsPaused(false)
  }

  const endInterview = () => {
    setInterviewStarted(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      endInterview()
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Interview Simulator</CardTitle>
        <CardDescription>Practice with a simulated interview experience</CardDescription>
      </CardHeader>
      <CardContent>
        {!interviewStarted ? (
          <div className="space-y-4">
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Role</label>
                  <Select defaultValue="software-engineer">
                    <SelectTrigger>
                      <SelectValue placeholder="Select job role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="ux-designer">UX Designer</SelectItem>
                      <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <Select defaultValue="mid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interview Duration</label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="technical" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Technical Focus</label>
                  <Select defaultValue="frontend">
                    <SelectTrigger>
                      <SelectValue placeholder="Select technical focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Development</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                      <SelectItem value="fullstack">Full Stack Development</SelectItem>
                      <SelectItem value="data">Data Engineering</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="behavioral" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Focus Areas</label>
                  <Select defaultValue="teamwork">
                    <SelectTrigger>
                      <SelectValue placeholder="Select focus area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teamwork">Teamwork</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="conflict">Conflict Resolution</SelectItem>
                      <SelectItem value="challenges">Overcoming Challenges</SelectItem>
                      <SelectItem value="failure">Handling Failure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant={videoEnabled ? "default" : "outline"}
                  size="icon"
                  onClick={() => setVideoEnabled(!videoEnabled)}
                >
                  {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant={audioEnabled ? "default" : "outline"}
                  size="icon"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={startInterview}>Start Interview</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              {videoEnabled ? (
                <div className="text-center">
                  <p className="text-white mb-4">Camera preview would appear here</p>
                  <div className="bg-gray-800 p-4 rounded-lg max-w-md mx-auto">
                    <h3 className="text-white text-lg font-medium mb-2">Question {currentQuestion + 1}:</h3>
                    <p className="text-white">{mockQuestions[currentQuestion]}</p>
                  </div>
                </div>
              ) : (
                <VideoOff className="h-12 w-12 text-gray-500" />
              )}
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" onClick={togglePause}>
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={nextQuestion}>
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button variant="destructive" onClick={endInterview}>
                End Interview
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {interviewStarted && (
        <CardFooter className="border-t pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            ></div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
