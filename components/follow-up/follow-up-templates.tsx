"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Plus } from "lucide-react"

export function FollowUpTemplates({ templates = [] }) {
  const handleCopyTemplate = (template) => {
    navigator.clipboard.writeText(template.body)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Templates</CardTitle>
          <CardDescription>Pre-written templates for common follow-ups</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{template.name}</h4>
                <Button variant="ghost" size="sm" onClick={() => handleCopyTemplate(template)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{template.subject}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                {template.body.length > 100 ? `${template.body.substring(0, 100)}...` : template.body}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
