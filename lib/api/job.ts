import type { JobEntry } from "@/app/dashbord/recruiter/jobs/job-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// The API may not send every field, so postedAt is optional here.
type ApiJob = Omit<JobEntry, "postedAt"> & {
  postedAt?: string
  createdAt?: string
  created_at?: string
}

//get jobs
export const getJobsdata = async (query: string = "") => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  const data: ApiJob[] = await res.json()

  return data.map((job) => ({
    ...job,
    postedAt: job.postedAt || job.createdAt || job.created_at || "",
  }))
}

// Get one job by id.
// Backend e ekhon GET /jobs/:id nei — tai sob job niye search korchi.
// Backend e oi route add korle sudhu fetch(`${BASE_URL}/jobs/${_id}`) kore diben.
export const getJobById = async (_id: string) => {
  const jobs = await getJobsdata()
  return jobs.find((job) => job._id === _id) ?? null
}

// delete job

export const deleteJob = async (_id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${_id}`, {
    method: "DELETE",
  })
  return res.json()
}
