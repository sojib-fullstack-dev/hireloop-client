import type { ApplicationEntry } from "@/app/dashbord/seeker/applications/application-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Ekta notun application database e save koro (backend: POST /applications)
export async function applyJobs(data: ApplicationEntry) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
