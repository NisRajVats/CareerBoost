import type { Metadata } from "next"
import { SalaryNegotiationHeader } from "@/components/salary-negotiation/salary-negotiation-header"
import { SalaryCalculator } from "@/components/salary-negotiation/salary-calculator"
import { NegotiationTips } from "@/components/salary-negotiation/negotiation-tips"
import { IndustryBenchmarks } from "@/components/salary-negotiation/industry-benchmarks"
import { NegotiationScripts } from "@/components/salary-negotiation/negotiation-scripts"

export const metadata: Metadata = {
  title: "Salary Negotiation | AI Resume Dashboard",
  description: "Tools and resources to help you negotiate the best salary",
}

export default function SalaryNegotiationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SalaryNegotiationHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 space-y-6">
          <SalaryCalculator />
          <NegotiationScripts />
        </div>
        <div className="space-y-6">
          <IndustryBenchmarks />
          <NegotiationTips />
        </div>
      </div>
    </div>
  )
}
