import { getCurrentUser } from "@/actions/user-actions"
import { ProfileForm } from "@/components/profile/profile-form"
import { ProfileHeader } from "@/components/profile/profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  return (
    <div className="container mx-auto py-6">
      <ProfileHeader />

      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm user={user} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the application.</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked={user?.preferences?.darkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity.
                    </p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked={user?.preferences?.emailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Job Alerts</h4>
                    <p className="text-sm text-muted-foreground">Receive alerts for new job matches.</p>
                  </div>
                  <Switch id="job-alerts" defaultChecked={user?.preferences?.jobAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Application Updates</h4>
                    <p className="text-sm text-muted-foreground">Receive updates on your job applications.</p>
                  </div>
                  <Switch id="application-updates" defaultChecked={user?.preferences?.applicationUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Resume Score Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when your resume score changes.
                    </p>
                  </div>
                  <Switch id="resume-score-updates" defaultChecked={user?.preferences?.resumeScoreUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Marketing Communications</h4>
                    <p className="text-sm text-muted-foreground">Receive marketing emails and newsletters.</p>
                  </div>
                  <Switch id="marketing-communications" defaultChecked={user?.preferences?.marketingCommunications} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
