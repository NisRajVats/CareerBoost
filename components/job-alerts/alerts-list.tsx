"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { updateJobAlert, deleteJobAlert } from "@/actions/job-alerts-actions"
import { formatDistanceToNow } from "date-fns"

export function AlertsList({ alerts = [] }) {
  const [loading, setLoading] = useState(false)

  const handleToggleAlert = async (id, active) => {
    setLoading(true)
    try {
      await updateJobAlert(id, { active: !active })
    } catch (error) {
      console.error("Failed to toggle alert:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAlert = async (id) => {
    if (!confirm("Are you sure you want to delete this alert?")) return

    setLoading(true)
    try {
      await deleteJobAlert(id)
    } catch (error) {
      console.error("Failed to delete alert:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Alerts</CardTitle>
        <CardDescription>Manage your saved job alert preferences</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No job alerts created yet</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{alert.name}</h3>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.active}
                      onCheckedChange={() => handleToggleAlert(alert.id, alert.active)}
                      disabled={loading}
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)} disabled={loading}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" disabled={loading}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {alert.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Locations:</span> {alert.locations.join(", ")}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Salary:</span> ${alert.salary.min.toLocaleString()} - $
                    {alert.salary.max.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Job Type:</span> {alert.jobType.join(", ")}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Frequency: {alert.frequency}</span>
                  <span>
                    Last sent:{" "}
                    {alert.lastSent ? formatDistanceToNow(new Date(alert.lastSent), { addSuffix: true }) : "Never"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
