import { categories, jobTypes } from "@/app/dashbord/recruiter/jobs/job-data"

import { FilterGroup } from "./FilterGroup"

// Filters sidebar for the Browse Jobs page (Figma: Aside - Sidebar Filters).
// The options come from the shared JobForm fields, so they always match
// what the "Post a New Job" form saves.

export function JobFilters() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141418] p-6">
      <h2 className="text-lg font-semibold text-[#ededef]">Filters</h2>

      <div className="mt-6 flex flex-col gap-6">
        <FilterGroup title="Job Type" options={jobTypes} single />
        <FilterGroup title="Category" options={categories} single />
      </div>
    </div>
  )
}
