// Shared job shape + options for the recruiter job pages.
// The "Post a New Job" form, the createJobs action, and the Manage Jobs
// table all use this file so the stored data and the table stay in sync.

export const categories = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Other",
]

export const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
export const frequencies = ["per hour", "per month", "per year"]

export type JobForm = {
  title: string
  company: string
  category: string
  jobType: string
  remote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
}

export const initialJobForm: JobForm = {
  title: "",
  company: "",
  category: "Engineering & Tech",
  jobType: "Full-time",
  remote: true,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
}

// A saved job keeps the form fields plus an id and the date it was posted.
export type JobEntry = JobForm & {
  _id: string
  postedAt: string
}

export type JobStatus = "Active" | "Closed"

// Jobs close automatically once their deadline has passed.
export function getJobStatus(deadline: string): JobStatus {
  if (!deadline) return "Active"

  const today = new Date().toISOString().slice(0, 10)

  return deadline < today ? "Closed" : "Active"
}

// ---- Small text helpers used by the job pages ----

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

// Format an ISO date (yyyy-mm-dd) without relying on the user's locale,
// so the server and the browser always render the same text.
export function formatDate(value: string) {
  if (!value) return "—"

  const [year, month, day] = value.split("-")
  const monthName = monthNames[Number(month) - 1]

  if (!year || !monthName || !day) return value

  return `${monthName} ${Number(day)}, ${year}`
}

function formatMoney(value: string) {
  if (!value) return ""

  const amount = Number(value)
  if (Number.isNaN(amount)) return value

  return `$${amount.toLocaleString("en-US")}`
}

export function formatSalary(job: JobEntry) {
  const min = formatMoney(job.minSalary)
  const max = formatMoney(job.maxSalary)

  if (!min && !max) return "Negotiable"

  const range = min && max ? `${min} – ${max}` : min || max
  return `${range} ${job.frequency}`
}
