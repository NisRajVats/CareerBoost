import { NotificationPreferences } from "@/components/notifications/notification-preferences"
import { NotificationAnalytics } from "@/components/notifications/notification-analytics"

export default function NotificationSettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <NotificationPreferences />
        <NotificationAnalytics />
      </div>
    </div>
  )
}
