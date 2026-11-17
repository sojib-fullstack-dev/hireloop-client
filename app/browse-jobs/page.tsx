import { getJobsdata } from "@/lib/api/job"
import { JobCard } from "@/app/components/browseJobs/JobCard"
import { JobFilters } from "@/app/components/browseJobs/JobFilters"
import { SearchBar } from "@/app/components/browseJobs/SearchBar"
import { SortSelect } from "@/app/components/browseJobs/SortSelect"

type BrowseJobsPagesProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const BrowseJobsPages = async ({ searchParams }: BrowseJobsPagesProps) => {
  // The current search/filters live in the URL, e.g. ?q=design&jobType=Full-time
  const search = await searchParams
  const searchUrl = new URLSearchParams(search as Record<string, string>)
  const query = searchUrl.toString()

  // Fetch jobs from the API with the current query
  const jobs = await getJobsdata(query)

  return (
    <main className="min-h-screen bg-[#08080a] pb-16 text-[#ededef]">
      <div className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <h1 className="sr-only">Browse Jobs</h1>

        {/* Search bar (Figma: Section - Search & Quick Filters) */}
        <section className="rounded-xl border border-white/10 bg-[#141418] p-6">
          <SearchBar />
        </section>

        {/* Filters sidebar + job list */}
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="w-full lg:w-[296px] lg:shrink-0">
            <JobFilters />
          </aside>

          <section className="min-w-0 flex-1">
            {/* Result count + sort */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">
                Found {jobs.length} Professional Jobs
              </h2>
              <SortSelect />
            </div>

            {/* Job list */}
            {jobs.length > 0 ? (
              <div className="mt-6 flex flex-col gap-3">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-xl border border-white/10 bg-[#141418] p-6 text-sm text-[#a0a0ab]">
                No jobs found. Try a different search or filter.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobsPages
