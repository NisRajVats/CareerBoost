import { Building, Users, Globe, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CompanyInfo({ company }) {
  if (!company) return null

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-500" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          {company.logo ? (
            <img
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              className="w-12 h-12 rounded-md mr-3 bg-white p-1"
            />
          ) : (
            <div className="w-12 h-12 rounded-md mr-3 bg-blue-900/20 flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-500" />
            </div>
          )}
          <div>
            <h3 className="font-medium">{company.name}</h3>
            <p className="text-gray-400 text-sm">{company.industry}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <span>{company.size} employees</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{company.headquarters}</span>
          </div>
          {company.website && (
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 text-gray-400 mr-2" />
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {company.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-300 mb-4 line-clamp-4">{company.description}</p>

        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={`/companies/${company.id}`} className="flex items-center justify-center">
            View Company Profile
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
