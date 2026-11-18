// My Applications page er jonno application er data shape + dummy rows.
// Figma er table onujayi field gula decide kora hoyeche.
// Pore real data API theke ashbe — tokhon ei dummy list replace hobe.

// Application er ekta status (Figma: Status column er chips)
export type ApplicationStatus =
  "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered"

// Ekta job application e ki ki field database e save hobe
// (backend: POST /applications, collection: application)
export type ApplicationEntry = {
  _id?: string // database theke asle (Mongo insert id)
  jobId: string // kon job e apply korechi
  jobTitle: string
  companyName: string
  jobType: string // Full-time, Contract...
  remote: boolean // true hole "Remote", false hole city dekhabe
  location: string
  userId: string // seeker er user id
  email: string // seeker er email
  status: ApplicationStatus // notun application e hamesha "Applied"
  appliedAt: string // apply korar ISO date/time
}

// Dummy data — job gulo real backend er, application gulo fake.
// TODO: pore getApplications() diye ekhane real data load koro.
export const dummyApplications: ApplicationEntry[] = [
  {
    jobId: "6af93e7110bccf41001fb0a5",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Northstar Labs",
    jobType: "Full-time",
    remote: true,
    location: "Berlin, Germany",
    userId: "demo-user",
    email: "demo@hireloop.dev",
    status: "Applied",
    appliedAt: "2026-11-18T11:00:00",
  },
  {
    jobId: "6af93e7110bccf41001fb0a6",
    jobTitle: "Product Designer",
    companyName: "HireFlow Network",
    jobType: "Contract",
    remote: true,
    location: "Remote",
    userId: "demo-user",
    email: "demo@hireloop.dev",
    status: "Review",
    appliedAt: "2026-11-17T09:00:00",
  },
  {
    jobId: "6af93e7110bccf41001fb0a7",
    jobTitle: "DevOps Engineer",
    companyName: "Cloudspire",
    jobType: "Full-time",
    remote: false,
    location: "Austin, USA",
    userId: "demo-user",
    email: "demo@hireloop.dev",
    status: "Shortlisted",
    appliedAt: "2026-11-14T09:00:00",
  },
  {
    jobId: "6af9daf58773db82c08a13eb",
    jobTitle: "Accountant",
    companyName: "FinancePoint",
    jobType: "Full-time",
    remote: false,
    location: "Dubai, UAE",
    userId: "demo-user",
    email: "demo@hireloop.dev",
    status: "Rejected",
    appliedAt: "2026-11-11T09:00:00",
  },
  {
    jobId: "6af9daf58773db82c08a13e5",
    jobTitle: "Customer Support Specialist",
    companyName: "HelpDesk Pro",
    jobType: "Full-time",
    remote: false,
    location: "Toronto, Canada",
    userId: "demo-user",
    email: "demo@hireloop.dev",
    status: "Offered",
    appliedAt: "2026-11-04T09:00:00",
  },
]
