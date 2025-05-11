"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { updateApplicationStatus, deleteApplication } from "@/actions/application-actions"

export function ApplicationDetail({ application }) {
  const router = useRouter()
  const [status, setStatus] = useState(application.status)
  const [loading, setLoading] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "screening":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "interview":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "offer":
        return "bg-green-50 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200"
      case "withdrawn":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const handleStatusChange = async (newStatus) => {
    setLoading(true)
    try {
      await updateApplicationStatus(application.id, newStatus)
      setStatus(newStatus)
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this application?")) return

    setLoading(true)
    try {
      await deleteApplication(application.id)
      router.push("/application-tracker")
    } catch (error) {
      console.error("Failed to delete application:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-b">
      <div className="container max-w-7xl mx-auto py-4 px-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/application-tracker")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{application.jobTitle}</h1>
            <p className="text-lg">{application.company}</p>
            <p className="text-m\
