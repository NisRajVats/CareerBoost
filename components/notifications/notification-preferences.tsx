"use client"

import { useNotifications } from "@/lib/contexts/notification-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationPreferences() {
  const { preferences, updatePreference } = useNotifications()

  const getNotificationTypeName = (type: string) => {
    switch (type) {
      case "application":
        return "Application Updates"
      case "interview":
        return "Interview Reminders"
      case "resume":
        return "Resume Updates"
      case "job":
        return "Job Matches"
      default:
        return "System Notifications"
    }
  }

  const getNotificationTypeDescription = (type: string) => {
    switch (type) {
      case "application":
        return "Updates about your job applications status changes"
      case "interview":
        return "Reminders about upcoming interviews and preparation"
      case "resume":
        return "Updates about your resume score and optimization suggestions"
      case "job":
        return "New job matches and recommendations based on your profile"
      default:
        return "System-wide notifications and announcements"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose which notifications you want to receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {preferences.map((pref) => (
          <div key={pref.type} className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`${pref.type}-toggle`} className="font-medium">
                {getNotificationTypeName(pref.type)}
              </Label>
              <Switch
                id={`${pref.type}-toggle`}
                checked={pref.enabled}
                onCheckedChange={(checked) => updatePreference(pref.type, checked)}
              />
            </div>
            <p className="text-sm text-muted-foreground">{getNotificationTypeDescription(pref.type)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
