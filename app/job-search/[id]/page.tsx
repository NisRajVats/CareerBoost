import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building, MapPin, Clock, Briefcase, GraduationCap, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { JobSearchHeader } from "@/components/job-search/job-search-header"
import { CompanyInfo } from "@/components/job-search/company-info"
import { SimilarJobs } from "@/components/job-search/similar-jobs"
import { getJobById, getSimilarJobs, getCompanyInfo } from "@/actions/job-actions"
import { JobActions } from "@/components/job-search/job-actions"

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    const job = await getJobById(id)

    if (!job) {
      notFound()
    }

    const similarJobs = await getSimilarJobs(id)
    const companyInfo = await getCompanyInfo(job.company)

    return (
      <div className="flex flex-col h-full">
        <JobSearchHeader />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Link href="/job-search" className="flex items-center text-blue-500 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to search results
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-[#111827] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                        <div className="flex items-center text-gray-400 mb-4">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="mr-3">{job.company}</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <JobActions job={job} />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium">Posted</div>
                          <div className="text-gray-400">{job.postedAt}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium">Job Type</div>
                          <div className="text-gray-400">{job.jobType}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium">Experience</div>
                          <div className="text-gray-400">{job.experienceLevel}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                        <div
                          className="text-gray-300 space-y-4"
                          dangerouslySetInnerHTML={{ __html: job.fullDescription }}
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold mb-2">Benefits</h2>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                      <Button variant="outline">Save Job</Button>
                      {job.externalUrl && (
                        <Button variant="outline" asChild>
                          <a
                            href={job.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            View on {job.source}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <CompanyInfo company={companyInfo} />
                <SimilarJobs jobs={similarJobs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching job details:", error)
    notFound()
  }
}
