"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function NegotiationScripts() {
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The script has been copied to your clipboard.",
        })
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually.",
          variant: "destructive",
        })
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Negotiation Scripts</CardTitle>
        <CardDescription>Ready-to-use scripts for different negotiation scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="initial">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="initial">Initial Offer</TabsTrigger>
            <TabsTrigger value="counter">Counter Offer</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="initial" className="space-y-4">
            <div className="bg-muted p-4 rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(initialOfferScript)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <p className="whitespace-pre-line">{initialOfferScript}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <h4 className="font-medium mb-2">When to use:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>After receiving an initial offer</li>
                <li>When you need time to consider the offer</li>
                <li>To express enthusiasm while setting up for negotiation</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="counter" className="space-y-4">
            <div className="bg-muted p-4 rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(counterOfferScript)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <p className="whitespace-pre-line">{counterOfferScript}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <h4 className="font-medium mb-2">When to use:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>When making a specific counter offer</li>
                <li>After researching market rates</li>
                <li>When you have competing offers</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4">
            <div className="bg-muted p-4 rounded-md relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(benefitsScript)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <p className="whitespace-pre-line">{benefitsScript}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <h4 className="font-medium mb-2">When to use:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>When negotiating non-salary benefits</li>
                <li>If salary is fixed but benefits are flexible</li>
                <li>To improve overall compensation package</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const initialOfferScript = `Thank you for the offer. I'm excited about the possibility of joining [Company Name] and contributing to [specific project or team].

I appreciate you sharing the details of the compensation package. I'd like to take some time to review everything thoroughly. When would you need my decision by?

In the meantime, I'd love to learn more about [specific aspect of the role or company] to help me better understand the opportunity.`

const counterOfferScript = `Thank you again for the offer to join [Company Name]. After carefully considering the responsibilities and impact of this role, and researching industry standards for similar positions, I was hoping we could discuss the compensation package.

Based on my experience with [relevant skills/experience] and the value I can bring to the team, I was hoping for a base salary closer to [your target salary]. My research shows this is in line with market rates for someone with my background and the responsibilities of this position.

I'm excited about contributing to [specific company goals] and am confident I can make an immediate impact. Would you be open to discussing this adjustment to the offer?`

const benefitsScript = `I appreciate the salary offer and am excited about the role. I'd like to discuss some aspects of the overall benefits package to ensure it aligns with my needs.

Specifically, I'm interested in discussing:
- [Flexible working arrangements/remote work options]
- [Additional PTO/vacation days]
- [Professional development budget]
- [Health insurance coverage]
- [Equity or stock options]

These elements are important to me for [brief explanation of why]. Would you be open to discussing adjustments to these aspects of the package?`
