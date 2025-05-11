"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/lib/store"
import { getLatestResumeScore, getScoreHistory } from "@/actions/score-actions"
import { getErrorMessage } from "@/lib/error-handling"

export function useResumeData() {
  const { setResumeScore, setResumeHistory, setLoading, setError, currentResumeId } = useStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    async function loadResumeData() {
      if (isInitialized) return

      setLoading(true)
      try {
        // Load the latest resume score
        const latestScore = await getLatestResumeScore()
        if (latestScore) {
          setResumeScore("latest", latestScore)
        }

        // Load score history
        const history = await getScoreHistory()
        setResumeHistory(history)

        setIsInitialized(true)
      } catch (error) {
        setError(getErrorMessage(error))
      } finally {
        setLoading(false)
      }
    }

    loadResumeData()
  }, [setResumeScore, setResumeHistory, setLoading, setError, isInitialized])

  return { isInitialized }
}
