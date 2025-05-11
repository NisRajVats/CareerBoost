import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function NegotiationTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Negotiation Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Research thoroughly</h3>
            <p className="text-sm text-muted-foreground">Know the market rate for your position and location</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Consider the full package</h3>
            <p className="text-sm text-muted-foreground">Evaluate benefits, bonuses, equity, and work-life balance</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Practice your pitch</h3>
            <p className="text-sm text-muted-foreground">
              Rehearse your value proposition and negotiation talking points
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Be confident but flexible</h3>
            <p className="text-sm text-muted-foreground">Know your worth but be open to creative solutions</p>
          </div>
        </div>
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Get it in writing</h3>
            <p className="text-sm text-muted-foreground">Always request the final offer in writing before accepting</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
