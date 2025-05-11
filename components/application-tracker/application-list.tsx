"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

export function ApplicationList({ applications = [], totalApplications = 0, currentPage = 1, totalPages = 1 }) {
  const router = useRouter()

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

  const handleViewApplication = (id) => {
    router.push(`/application-tracker/${id}`)
  }

  const handlePagination = (page) => {
    const url = new URL(window.location.href)
    url.searchParams.set("page", page.toString())
    router.push(url.pathname + url.search)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>
          Showing {applications.length} of {totalApplications} applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No applications found</p>
            <Button className="mt-4">Add Your First Application</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleViewApplication(application.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{application.jobTitle}</h3>
                  <Badge variant="outline" className={getStatusColor(application.status)}>
                    {getStatusText(application.status)}
                  </Badge>
                </div>
                <p className="text-sm">{application.company}</p>
                <p className="text-sm text-muted-foreground">{application.location}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {application.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Applied {formatDistanceToNow(new Date(application.appliedDate), { addSuffix: true })}</span>
                  <span>
                    Last updated {formatDistanceToNow(new Date(application.lastUpdated), { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePagination(currentPage - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePagination(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePagination(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
