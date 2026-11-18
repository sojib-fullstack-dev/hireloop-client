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

