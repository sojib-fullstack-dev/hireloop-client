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
  id: string
  postedAt: string
}

export type JobStatus = "Active" | "Closed"

// Jobs close automatically once their deadline has passed.
export function getJobStatus(deadline: string): JobStatus {
  if (!deadline) return "Active"

  const today = new Date().toISOString().slice(0, 10)

  return deadline < today ? "Closed" : "Active"
}

export const dummyJobs: JobEntry[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Northstar Labs",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remote: true,
    location: "Berlin, Germany",
    deadline: "2026-12-12",
    minSalary: "70",
    maxSalary: "95",
    frequency: "per hour",
    responsibilities:
      "Lead the frontend architecture for our analytics dashboard and mentor three engineers.",
    qualifications:
      "5+ years with React and TypeScript, strong accessibility background.",
    postedAt: "2026-11-02",
  },
  {
    id: "job-2",
    title: "Product Designer",
    company: "HireFlow Network",
    category: "Design",
    jobType: "Contract",
    remote: true,
    location: "Remote",
    deadline: "2026-11-28",
    minSalary: "45",
    maxSalary: "60",
    frequency: "per hour",
    responsibilities:
      "Own end-to-end product design for the hiring workspace, from research to handoff.",
    qualifications:
      "Portfolio with shipped SaaS products and strong Figma skills.",
    postedAt: "2026-11-06",
  },
  {
    id: "job-3",
    title: "DevOps Engineer",
    company: "Cloudspire",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remote: false,
    location: "Austin, USA",
    deadline: "2027-01-09",
    minSalary: "110000",
    maxSalary: "135000",
    frequency: "per year",
    responsibilities:
      "Maintain CI/CD pipelines, Kubernetes clusters, and infrastructure as code.",
    qualifications:
      "3+ years with AWS, Terraform, and container orchestration.",
    postedAt: "2026-11-09",
  },
  {
    id: "job-4",
    title: "Marketing Manager",
    company: "Brightside Media",
    category: "Marketing",
    jobType: "Part-time",
    remote: false,
    location: "London, UK",
    deadline: "2026-10-20",
    minSalary: "30",
    maxSalary: "40",
    frequency: "per hour",
    responsibilities:
      "Plan campaign calendars and coordinate freelance content creators.",
    qualifications: "4+ years in B2B marketing with measurable growth results.",
    postedAt: "2026-09-12",
  },
  {
    id: "job-5",
    title: "Data Analyst Intern",
    company: "Quantify",
    category: "Engineering & Tech",
    jobType: "Internship",
    remote: false,
    location: "Toronto, Canada",
    deadline: "2026-12-30",
    minSalary: "20",
    maxSalary: "25",
    frequency: "per hour",
    responsibilities:
      "Clean datasets and build weekly reporting dashboards for the growth team.",
    qualifications:
      "Currently studying statistics or computer science; SQL basics required.",
    postedAt: "2026-11-10",
  },
  {
    id: "job-6",
    title: "Backend Engineer (Node.js)",
    company: "Vertex Systems",
    category: "Engineering & Tech",
    jobType: "Full-time",
    remote: true,
    location: "Remote",
    deadline: "2026-09-30",
    minSalary: "55",
    maxSalary: "75",
    frequency: "per hour",
    responsibilities:
      "Design REST and event-driven services for our payments platform.",
    qualifications:
      "Strong Node.js, MongoDB, and distributed systems experience.",
    postedAt: "2026-08-15",
  },
  {
    id: "job-7",
    title: "Sales Executive",
    company: "Peakline",
    category: "Sales",
    jobType: "Full-time",
    remote: false,
    location: "Dubai, UAE",
    deadline: "2026-11-25",
    minSalary: "",
    maxSalary: "",
    frequency: "per month",
    responsibilities:
      "Own the full sales cycle for mid-market accounts across the Gulf region.",
    qualifications: "2+ years closing SaaS deals; Arabic is a plus.",
    postedAt: "2026-11-01",
  },
  {
    id: "job-8",
    title: "Finance Associate",
    company: "Ledgerly",
    category: "Finance",
    jobType: "Part-time",
    remote: true,
    location: "Singapore",
    deadline: "2027-02-14",
    minSalary: "35",
    maxSalary: "45",
    frequency: "per hour",
    responsibilities:
      "Support monthly close, invoicing, and reconciliation for the APAC team.",
    qualifications: "Accounting degree and 2 years of relevant experience.",
    postedAt: "2026-11-11",
  },
  {
    id: "job-9",
    title: "Content Strategist",
    company: "Storycraft",
    category: "Marketing",
    jobType: "Contract",
    remote: true,
    location: "Remote",
    deadline: "2026-10-05",
    minSalary: "40",
    maxSalary: "55",
    frequency: "per hour",
    responsibilities:
      "Shape the editorial calendar and write long-form product stories.",
    qualifications: "Excellent writing samples and SEO fundamentals.",
    postedAt: "2026-09-01",
  },
]
