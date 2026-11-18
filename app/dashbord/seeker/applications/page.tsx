import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from "lucide-react"

import {
  type ApplicationEntry,
  type ApplicationStatus,
} from "./application-data"
import { getApplications } from "@/lib/api/applications"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// "2 hours ago" style text (Figma: Applied column)
function timeAgo(iso: string) {
  const hours = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000)

  if (hours < 1) return "Just now"
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`

  const weeks = Math.floor(days / 7)
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`
}

// Figma er status chip er colors
const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "border-white/10 bg-white/10 text-[#a0a0ab]",
  Review: "border-[#f59e0b]/30 bg-[#f59e0b]/14 text-[#f59e0b]",
  Shortlisted: "border-[#60a5fa]/30 bg-[#60a5fa]/14 text-[#60a5fa]",
  Rejected: "border-[#ef4444]/30 bg-[#ef4444]/14 text-[#ef4444]",
  Offered: "border-[#22c55e]/30 bg-[#22c55e]/14 text-[#22c55e]",
}

// Rounded pill showing one application's status
function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

// One stat box in the bento row (Total Applied / Shortlisted / ...)
function StatCard({
  label,
  value,
  valueClass = "text-[#ededef]",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141418] p-6">
      <p className="text-sm text-[#a0a0ab]">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${valueClass}`}>{value}</p>
    </div>
  )
}

// Bento stats — TODO: pore real application data theke ei number gulo ber koro
const stats = [
  { label: "Total Applied", value: "24", valueClass: "text-[#ededef]" },
  { label: "Shortlisted", value: "8", valueClass: "text-[#ededef]" },
  { label: "Interviews", value: "3", valueClass: "text-[#f59e0b]" },
  { label: "Success Rate", value: "12%", valueClass: "text-[#22c55e]" },
]

// One table row (Figma: Table Body Row)
function ApplicationRow({ app }: { app: ApplicationEntry }) {
  return (
    <tr className="border-t border-white/10">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Company logo placeholder */}
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#222228] text-sm font-semibold text-white">
            {app.companyName.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#ededef]">
              {app.jobTitle}
            </p>
            <p className="truncate text-xs text-[#a0a0ab]">
              {app.jobType} • {app.remote ? "Remote" : app.location}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-[#ededef]">{app.companyName}</td>
      <td className="px-4 py-3 text-sm text-[#a0a0ab]">
        {timeAgo(app.appliedAt)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={app.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          href={`/browse-jobs/${app.jobId}`}
          className="text-sm font-medium text-[#ededef] hover:underline"
        >
          Details
        </Link>
      </td>
    </tr>
  )
}

const SeekerApplicationsPage = async () => {
  // Login user er session paoa (server component e eta-i standard way)
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user

  // Backend theke nijer application ano (login na hole khali list)
  const rows: ApplicationEntry[] = user
    ? await getApplications(user.id).catch(() => [])
    : []

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header: title + Active/Archived + Export PDF (Figma: Header Section) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#ededef]">
            My Applications
          </h1>
          <p className="mt-1 text-sm text-[#a0a0ab]">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* TODO: Active/Archived switch er kaj apni nijei korben */}
          <div className="flex items-center rounded-lg border border-white/10 bg-[#1a1a1f] p-1">
            <button
              type="button"
              className="rounded-lg border border-white/10 px-4 py-1.5 text-sm text-[#ededef]"
            >
              Active
            </button>
            <button
              type="button"
              className="px-4 py-1.5 text-sm text-[#a0a0ab]"
            >
              Archived
            </button>
          </div>

          {/* TODO: Export PDF er kaj apni nijei korben */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#fafafa] px-4 py-2.5 text-sm font-medium text-[#0b0b0c] transition-colors hover:bg-white"
          >
            <DownloadIcon className="size-3" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats bento (Figma: Stats Overview) */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main table (Figma: Main Table Section) */}
      <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#141418]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-[#1a1a1f] text-xs font-medium tracking-wide text-[#6e6e78] uppercase">
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((app) => (
                <ApplicationRow key={app._id ?? app.jobId} app={app} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Figma: Pagination bar) — TODO: page er kaj apni nijei korben */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-[#1a1a1f] px-4 py-4 sm:flex-row">
          <p className="text-sm text-[#a0a0ab]">
            Showing 1-{rows.length} of {rows.length} applications
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-[#a0a0ab]"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-white text-sm font-medium text-black"
            >
              1
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-sm text-[#a0a0ab]"
            >
              2
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-sm text-[#a0a0ab]"
            >
              3
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-[#a0a0ab]"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeekerApplicationsPage
