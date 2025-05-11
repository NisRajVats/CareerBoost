import { User } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
      </div>
      <p className="text-muted-foreground">Manage your personal information and account settings.</p>
    </div>
  )
}
