"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { updateJobAlertSettings } from "@/actions/job-alerts-actions"
import { Loader2 } from "lucide-react"

export function AlertsSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    inAppNotifications: true,
    frequency: "daily",
  })

  const handleToggleChange = (key) => (checked) => {
    setSettings((prev) => ({ ...prev, [key]: checked }))
  }

  const handleFrequencyChange = (value) => {
    setSettings((prev) => ({ ...prev, frequency: value }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      await updateJobAlertSettings(settings)
      toast({
        title: "Settings saved",
        description: "Your job alert settings have been updated.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how and when you want to receive job alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-alerts" className="font-medium">
                Email Alerts
              </Label>
              <p className="text-sm text-muted-foreground">Receive job alerts via email</p>
            </div>
            <Switch
              id="email-alerts"
              checked={settings.emailAlerts}
              onCheckedChange={handleToggleChange("emailAlerts")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive job alerts as push notifications</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={handleToggleChange("pushNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="in-app-notifications" className="font-medium">
                In-App Notifications
              </Label>
              <p className="text-sm text-muted-foreground">See job alerts in your notification center</p>
            </div>
            <Switch
              id="in-app-notifications"
              checked={settings.inAppNotifications}
              onCheckedChange={handleToggleChange("inAppNotifications")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Alert Frequency</Label>
          <RadioGroup value={settings.frequency} onValueChange={handleFrequencyChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate">Immediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily Digest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly Digest</Label>
            </div>
          </RadioGroup>
        </div>

        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
