"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Building, Globe, Users, TrendingUp } from "lucide-react"

type Company = {
  id: string
  name: string
  logo: string
  industry: string
  size: string
  founded: string
  headquarters: string
  website: string
  description: string
  culture: string
  interviewProcess: string[]
  commonQuestions: string[]
}

type CompanyResearchProps = {
  companies: Company[]
}

export function CompanyResearch({ companies }: CompanyResearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Research</CardTitle>
        <CardDescription>Research companies before your interview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {selectedCompany ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedCompany(null)} className="mb-2">
                ← Back to companies
              </Button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedCompany.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCompany.industry}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCompany.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>Founded {selectedCompany.founded}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCompany.headquarters}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">About</h4>
                <p className="text-sm">{selectedCompany.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Company Culture</h4>
                <p className="text-sm">{selectedCompany.culture}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Interview Process</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  {selectedCompany.interviewProcess.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-1">Common Interview Questions</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedCompany.commonQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{company.name}</h3>
                      <p className="text-xs text-muted-foreground">{company.industry}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No companies found</div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
