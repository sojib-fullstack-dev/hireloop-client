import type { JobEntry } from "@/app/dashbord/recruiter/jobs/job-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// What the API sends back. MongoDB uses "_id" instead of "id".
type ApiJob = Omit<JobEntry, "id" | "postedAt"> & {
  _id: string
  postedAt?: string
}

export const getJobsdata = async () => {
  const res = await fetch(`${BASE_URL}/jobs`)
  const data: ApiJob[] = await res.json()

  // The table needs "id", so we copy "_id" into it.
  return data.map((job) => ({
    ...job,
    id: job._id,
    postedAt: job.postedAt ?? "",
  }))
}

// delete job 

export const deleteJob=async(_id: string)=>{

  const res=await fetch(`${BASE_URL}/jobs/${_id}`,{
    method:'DELETE'
  });
  return res.json()
}