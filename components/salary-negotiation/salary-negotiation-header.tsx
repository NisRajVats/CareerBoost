import { DollarSign } from "lucide-react"

export function SalaryNegotiationHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <DollarSign className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Salary Negotiation</h1>
      </div>
      <p className="text-muted-foreground">
        Tools and resources to help you negotiate the best compensation package for your skills and experience.
      </p>
    </div>
  )
}
