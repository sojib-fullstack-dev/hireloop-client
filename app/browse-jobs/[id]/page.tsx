import Link from "next/link"
import {
  BanknoteIcon,
  BookmarkIcon,
  CalendarIcon,
  CircleCheckIcon,
  ClockIcon,
  MapPinIcon,
  type LucideIcon,
} from "lucide-react"

import { getJobById } from "@/lib/api/job"
import {
  formatDate,
  formatSalary,
  type JobEntry,
} from "@/app/dashbord/recruiter/jobs/job-data"


function splitLines(text: string | undefined) {
  return (text ?? "")
    .split("\n")
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean)
}


function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141418] p-6">
      <Icon className="size-5 text-[#c4c7c8]" />
      <p className="mt-3 text-xs font-medium tracking-wide text-[#a0a0ab] uppercase">
        {label}
      </p>
      <p className="text-lg font-medium text-[#ededef]">{value}</p>
    </div>
  )
}

// White dot + text — Figma er Responsibilities / Requirements list
function BulletList({ text }: { text?: string }) {
  const lines = splitLines(text)

  if (lines.length === 0) {
    return <p className="mt-6 text-base text-[#a0a0ab]">Not provided yet.</p>
  }

  return (
    <ul className="mt-6 space-y-3">
      {lines.map((line) => (
        <li
          key={line}
          className="flex gap-6 text-base leading-6 text-[#a0a0ab]"
        >
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

type JobDetailsPageProps = {
  params: Promise<{ id: string }>
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params


  const job: JobEntry | null = await getJobById(id).catch(() => null)

  if (!job) {
    return (
      <main className="min-h-screen bg-[#08080a] pb-16 text-[#ededef]">
        <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <p className="rounded-xl border border-white/10 bg-[#141418] p-8 text-center text-sm text-[#a0a0ab]">
            Job not found.{" "}
            <Link
              href="/browse-jobs"
              className="font-medium text-[#6c5dfc] hover:underline"
            >
              Back to Browse Jobs
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#08080a] pb-16 text-[#ededef]">
      <div className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <h1 className="sr-only">Job Details</h1>

        {/* Header: logo, title, company + Apply buttons (Figma: Header Section) */}
        <section className="relative overflow-hidden rounded-xl border border-white/10 bg-[#141418] p-6 sm:p-8">
          <div className="pointer-events-none absolute -top-24 right-10 size-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1f] text-2xl font-semibold text-[#a0a0ab]">
                {job.company.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {job.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-[#a0a0ab]">{job.company}</span>
                  <span className="size-1 rounded-full bg-[#8e9192]" />
                  <span className="flex items-center gap-1.5 text-[#22c55e]">
                    <CircleCheckIcon className="size-4" />
                    Verified Employer
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* TODO: bookmark button er kaj apni nijei korben */}
              <button
                type="button"
                aria-label="Save job"
                className="flex size-12 items-center justify-center rounded-lg border border-white/10 bg-[#222228] text-[#e5e2e3] transition-colors hover:bg-[#2a2a31]"
              >
                <BookmarkIcon className="size-4" />
              </button>
              {/* TODO: apply flow apni nijei korben */}
              <button
                type="button"
                className="h-12 rounded-lg bg-[#fafafa] px-5 text-base font-medium text-[#0b0b0c] transition-colors hover:bg-white"
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* Left content + right sidebar */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            {/* Bento info cards (Figma: Bento Info Grid) */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <InfoCard
                icon={BanknoteIcon}
                label="Salary Range"
                value={formatSalary(job)}
              />
              <InfoCard
                icon={MapPinIcon}
                label="Location"
                value={job.location || (job.remote ? "Remote" : "On-site")}
              />
              <InfoCard icon={ClockIcon} label="Job Type" value={job.jobType} />
              <InfoCard
                icon={CalendarIcon}
                label="Deadline"
                value={formatDate(job.deadline)}
              />
            </div>

            {/* Content sections (Figma: Content Sections) */}
            <div className="mt-6 rounded-xl border border-white/10 bg-[#141418] p-6 sm:p-8">
              <section>
                <h3 className="text-xl font-semibold">Responsibilities</h3>
                <BulletList text={job.responsibilities} />
              </section>

              <section className="mt-6 border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold">Requirements</h3>
                <BulletList text={job.qualifications} />
              </section>

            </div>
          </div>

          {/* Right sidebar (Figma: Aside - Sidebar) */}
          <aside className="w-full rounded-xl border border-white/10 bg-[#141418] p-6 lg:w-[397px] lg:shrink-0">
            <h3 className="text-xl font-semibold">Company Overview</h3>

            {/* Cover image placeholder — real image hole ekhane <img> */}
            <div className="mt-6 flex h-[204px] items-center justify-center rounded-lg bg-gradient-to-br from-[#6c5dfc]/40 via-[#1a1a1f] to-[#141418]">
              <span className="text-5xl font-bold text-white/80">
                {job.company.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-medium tracking-wide text-[#a0a0ab] uppercase">
                  Size
                </span>
                <span className="text-sm text-[#ededef]">
                  250 - 500 Employees
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-medium tracking-wide text-[#a0a0ab] uppercase">
                  Industry
                </span>
                <span className="text-sm text-[#ededef]">{job.category}</span>
              </div>
            </div>

            {/* TODO: company website er link */}
            <button
              type="button"
              className="mt-6 h-11 w-full rounded-[10px] border border-white/10 bg-white/[0.04] text-sm font-medium text-[#ededef] transition-colors hover:bg-white/[0.08]"
            >
              Visit Website
            </button>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default JobDetailsPage
