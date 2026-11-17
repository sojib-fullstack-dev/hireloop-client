"use client"

import { categories, jobTypes } from "@/app/dashbord/recruiter/jobs/job-data"

import { FilterGroup } from "./FilterGroup"
import { useRouter } from "next/navigation"

// Filters sidebar for the Browse Jobs page (Figma: Aside - Sidebar Filters).
// The options come from the shared JobForm fields, so they always match
// what the "Post a New Job" form saves.

export function JobFilters() {
  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target

    const params = new URLSearchParams(window.location.search)
    // Select hole param set koro, unselect hole param ta sorao
    if (checked) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
    // console.log(name, value)
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#141418] p-6">
      <h2 className="text-lg font-semibold text-[#ededef]">Filters</h2>

      <div className="mt-6 flex flex-col gap-6">
        <FilterGroup
          name="jobType"
          title="Job Type"
          options={jobTypes}
          single
          onChange={handleInputChange}
        />
        <FilterGroup
          name="category"
          title="Category"
          options={categories}
          single
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
