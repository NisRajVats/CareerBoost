import { JobSearchHeader } from "@/components/job-search/job-search-header"
import { JobSearchFilters } from "@/components/job-search/job-search-filters"
import { JobListings } from "@/components/job-search/job-listings"
import { JobRecommendations } from "@/components/job-search/job-recommendations"
import { SavedSearches } from "@/components/job-search/saved-searches"
import { StepCompletion } from "@/components/onboarding/step-completion"
import { getJobs, getRecommendedJobs, getSavedSearches } from "@/actions/job-actions"

export default async function JobSearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Extract search parameters
  const query = searchParams.query as string | undefined
  const location = searchParams.location as string | undefined
  const industry = searchParams.industry as string | undefined
  const experience = searchParams.experience as string | undefined
  const page = Number.parseInt((searchParams.page as string) || "1")

  // Fetch jobs based on search parameters
  const { jobs, totalJobs } = await getJobs({
    query,
    location,
    industry,
    experience,
    page,
  })

  // Fetch recommended jobs
  const recommendedJobs = await getRecommendedJobs()

  // Fetch saved searches
  const savedSearches = await getSavedSearches()

  return (
    <div className="flex flex-col h-full">
      <JobSearchHeader />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <StepCompletion stepId="job-search" nextStepId="job-match" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <JobSearchFilters
                initialQuery={query}
                initialLocation={location}
                initialIndustry={industry}
                initialExperience={experience}
              />
              <SavedSearches savedSearches={savedSearches} />
              <JobRecommendations jobs={recommendedJobs} />
            </div>
            <div className="lg:col-span-2">
              <JobListings jobs={jobs} totalJobs={totalJobs} currentPage={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
