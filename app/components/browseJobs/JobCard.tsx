import type { ReactNode } from "react"
import {
  ClockIcon,
  MapPinIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react"

import {
  formatSalary,
  type JobEntry,
} from "@/app/dashbord/recruiter/jobs/job-data"

// Small dark chip used for salary / job type / workplace (Figma: job card tags).
function Chip({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <span className="inline-flex h-[30px] items-center gap-1.5 rounded-lg bg-[#1a1a1f] px-3 text-sm text-[#ededef]">
      <Icon className="size-3.5 text-[#e5e2e3]" />
      {children}
    </span>
  )
}

// One job row in the Browse Jobs list (Figma: Article - Job Card).
export function JobCard({ job }: { job: JobEntry }) {
  return (
    <article className="flex gap-5 rounded-xl border border-white/10 bg-[#141418] p-6">
      {/* Logo box — we don't have logo images yet, so show the first letter */}
      <div className="hidden size-16 shrink-0 items-center justify-center rounded-lg bg-[#222228] sm:flex">
        <span className="text-xl font-semibold text-[#a0a0ab]">
          {job.company.charAt(0).toUpperCase() || "?"}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-[#ededef]">{job.title}</h3>
        <p className="mt-1 text-sm text-[#6e6e78]">
          {job.company}
          {job.location ? ` • ${job.location}` : ""}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip icon={WalletIcon}>{formatSalary(job)}</Chip>
          <Chip icon={ClockIcon}>{job.jobType}</Chip>
          {job.remote && <Chip icon={MapPinIcon}>Remote</Chip>}
        </div>
      </div>
    </article>
  )
}
