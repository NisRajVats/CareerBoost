import { ClipboardList } from "lucide-react"
import { AddApplicationForm } from "./add-application-form"

export function ApplicationHeader() {
  return (
    <div className="border-b">
      <div className="container max-w-7xl mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Application Tracker</h1>
            </div>
            <p className="text-muted-foreground">Track and manage your job applications from submission to offer.</p>
          </div>
          <div className="flex gap-2">
            <AddApplicationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
