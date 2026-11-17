import type { JobForm } from "@/app/dashbord/recruiter/jobs/job-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const createJobs = async (data: JobForm) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      postedAt: new Date().toISOString(),
    }),
  })
  return res.json()
}
