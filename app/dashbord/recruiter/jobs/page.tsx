"use client"

import Link from "next/link"
import { useMemo, useState, type ChangeEvent } from "react"
import {
  BriefcaseBusinessIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleSlashIcon,
  MonitorSmartphoneIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import { DeleteAction } from "@/app/components/manageAction/DeleteAction"
import { EditAction } from "@/app/components/manageAction/EditAction"
import { ViewAction } from "@/app/components/manageAction/ViewAction"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  categories,
  dummyJobs,
  getJobStatus,
  initialJobForm,
  jobTypes,
  frequencies,
  type JobEntry,
  type JobForm,
  type JobStatus,
} from "@/app/dashbord/recruiter/jobs/job-data"

type StatusFilter = "all" | JobStatus

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
function formatDate(value: string) {
  if (!value) return "No deadline"

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

function formatSalary(job: JobEntry) {
  const min = formatMoney(job.minSalary)
  const max = formatMoney(job.maxSalary)

  if (!min && !max) return "Negotiable"

  const range = min && max ? `${min} – ${max}` : min || max
  return `${range} ${job.frequency}`
}

const dialogInputClass =
  "h-10 border-white/10 bg-[#141416] text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"

const dialogSelectClass =
  "w-full [&_select]:h-10 [&_select]:border-white/10 [&_select]:bg-[#141416] [&_select]:text-sm [&_select]:text-zinc-100 [&_select]:focus-visible:border-[#7c5cfc] [&_select]:focus-visible:ring-[#7c5cfc]/30"

const dialogTextareaClass =
  "min-h-20 border-white/10 bg-[#141416] text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"

const dialogLabelClass = "text-xs font-medium text-zinc-400"

const ManageJobs = () => {
  const [jobs, setJobs] = useState(dummyJobs)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [viewingJob, setViewingJob] = useState<JobEntry | null>(null)
  const [editingJob, setEditingJob] = useState<JobEntry | null>(null)
  const [editForm, setEditForm] = useState<JobForm>(initialJobForm)

  const activeCount = jobs.filter(
    (job) => getJobStatus(job.deadline) === "Active"
  ).length
  const closedCount = jobs.length - activeCount
  const remoteCount = jobs.filter((job) => job.remote).length

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return jobs.filter((job) => {
      const matchesSearch =
        query === "" ||
        [job.title, job.company, job.location].some((value) =>
          value.toLowerCase().includes(query)
        )
      const matchesCategory = category === "all" || job.category === category
      const matchesStatus =
        status === "all" || getJobStatus(job.deadline) === status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [jobs, search, category, status])

  const hasFilters = search !== "" || category !== "all" || status !== "all"

  function clearFilters() {
    setSearch("")
    setCategory("all")
    setStatus("all")
  }

  function handleDelete(job: JobEntry) {
    const confirmed = window.confirm(
      `Delete "${job.title}"? This action cannot be undone.`
    )

    if (!confirmed) return

    setJobs((current) => current.filter((item) => item.id !== job.id))
  }

  function startEdit(job: JobEntry) {
    setEditingJob(job)
    setEditForm({ ...job })
  }

  function handleEditChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const field = event.target.name as keyof JobForm
    setEditForm({ ...editForm, [field]: event.target.value })
  }

  function saveEdit() {
    if (!editingJob) return

    setJobs((current) =>
      current.map((job) =>
        job.id === editingJob.id
          ? { ...editForm, id: job.id, postedAt: job.postedAt }
          : job
      )
    )
    setEditingJob(null)
  }

  const stats = [
    {
      label: "Total jobs",
      value: jobs.length,
      icon: BriefcaseBusinessIcon,
      iconClass: "bg-white/5 text-zinc-300",
    },
    {
      label: "Active",
      value: activeCount,
      icon: CircleCheckIcon,
      iconClass: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Closed",
      value: closedCount,
      icon: CircleSlashIcon,
      iconClass: "bg-white/5 text-zinc-400",
    },
    {
      label: "Remote",
      value: remoteCount,
      icon: MonitorSmartphoneIcon,
      iconClass: "bg-[#7c5cfc]/10 text-[#c4b5fd]",
    },
  ]

  const statusTabs: { label: string; value: StatusFilter; count: number }[] = [
    { label: "All jobs", value: "all", count: jobs.length },
    { label: "Active", value: "Active", count: activeCount },
    { label: "Closed", value: "Closed", count: closedCount },
  ]

  const viewingStatus = viewingJob ? getJobStatus(viewingJob.deadline) : null

  return (
    <div className="px-4 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Page header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Link href="/dashbord/recruiter" className="hover:text-zinc-300">
                Dashboard
              </Link>
              <ChevronRightIcon className="size-3.5" />
              <span className="text-zinc-300">Manage Jobs</span>
            </nav>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Manage Jobs
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Review, track, and update every role you have published.
            </p>
          </div>

          <Link
            href="/dashbord/recruiter/jobs/new"
            className={cn(
              buttonVariants(),
              "h-10 gap-2 rounded-xl bg-[#7c5cfc] px-4 text-sm font-medium text-white hover:bg-[#6a4bee]"
            )}
          >
            <PlusIcon />
            Create Job
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#121214] p-4"
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  stat.iconClass
                )}
              >
                <stat.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">{stat.label}</p>
                <p className="text-xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#121214] p-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter jobs by status"
            className="inline-flex w-full rounded-xl border border-white/10 bg-[#0e0e10] p-1 sm:w-auto"
          >
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                aria-pressed={status === tab.value}
                onClick={() => setStatus(tab.value)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors sm:flex-none",
                  status === tab.value
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab.label}
                <span className="ml-1.5 text-zinc-500">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
              <Input
                type="search"
                value={search}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearch(event.target.value)
                }
                placeholder="Search title, company, location"
                aria-label="Search jobs"
                className="h-10 border-white/10 bg-[#141416] pl-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"
              />
            </div>

            <NativeSelect
              value={category}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setCategory(event.target.value)
              }
              aria-label="Filter jobs by category"
              className="w-full sm:w-48 [&_select]:h-10 [&_select]:border-white/10 [&_select]:bg-[#141416] [&_select]:text-sm [&_select]:text-zinc-100 [&_select]:focus-visible:border-[#7c5cfc] [&_select]:focus-visible:ring-[#7c5cfc]/30"
            >
              <NativeSelectOption value="all">
                All categories
              </NativeSelectOption>
              {categories.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {item}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                onClick={clearFilters}
                className="h-10 rounded-xl px-3 text-xs text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>

        {filteredJobs.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-white/10 bg-[#101012] px-6 py-16 text-center">
            <BriefcaseBusinessIcon className="mx-auto size-8 text-zinc-600" />
            <p className="mt-3 text-sm font-medium text-zinc-300">
              {hasFilters ? "No jobs match your filters" : "No jobs yet"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {hasFilters
                ? "Try a different search, or clear the filters to see everything."
                : "Create your first listing to start collecting applications."}
            </p>
            {hasFilters ? (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="mt-4 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                Clear filters
              </Button>
            ) : (
              <Link
                href="/dashbord/recruiter/jobs/new"
                className={cn(
                  buttonVariants(),
                  "mt-4 h-9 gap-2 rounded-xl bg-[#7c5cfc] px-4 text-sm font-medium text-white hover:bg-[#6a4bee]"
                )}
              >
                <PlusIcon />
                Create Job
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Table (md and up) */}
            <div className="mt-3 hidden overflow-hidden rounded-2xl border border-white/10 bg-[#101012] md:block">
              <Table className="min-w-[640px]">
                <TableHeader className="bg-white/[0.03]">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="px-4 text-xs font-medium text-zinc-500">
                      Job
                    </TableHead>
                    <TableHead className="hidden px-4 text-xs font-medium text-zinc-500 lg:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden px-4 text-xs font-medium text-zinc-500 lg:table-cell">
                      Type
                    </TableHead>
                    <TableHead className="hidden px-4 text-xs font-medium text-zinc-500 xl:table-cell">
                      Salary
                    </TableHead>
                    <TableHead className="hidden px-4 text-xs font-medium text-zinc-500 xl:table-cell">
                      Posted
                    </TableHead>
                    <TableHead className="px-4 text-xs font-medium text-zinc-500">
                      Status
                    </TableHead>
                    <TableHead className="px-4 text-right text-xs font-medium text-zinc-500">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredJobs.map((job) => {
                    const jobStatus = getJobStatus(job.deadline)

                    return (
                      <TableRow
                        key={job.id}
                        className="border-white/5 hover:bg-white/[0.03]"
                      >
                        <TableCell className="px-4 py-3 whitespace-normal">
                          <p className="text-sm font-medium text-white">
                            {job.title}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {job.company} · {job.location}
                          </p>
                        </TableCell>

                        <TableCell className="hidden px-4 py-3 text-xs text-zinc-400 lg:table-cell">
                          {job.category}
                        </TableCell>

                        <TableCell className="hidden px-4 py-3 lg:table-cell">
                          <div className="flex flex-col items-start gap-1">
                            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
                              {job.jobType}
                            </span>
                            {job.remote && (
                              <span className="text-[11px] text-[#c4b5fd]">
                                Remote
                              </span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="hidden px-4 py-3 text-xs text-zinc-300 xl:table-cell">
                          {formatSalary(job)}
                        </TableCell>

                        <TableCell className="hidden px-4 py-3 text-xs text-zinc-400 xl:table-cell">
                          {formatDate(job.postedAt)}
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex flex-col items-start gap-1">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                                jobStatus === "Active"
                                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                                  : "border-white/10 bg-white/5 text-zinc-400"
                              )}
                            >
                              <span
                                className={cn(
                                  "size-1.5 rounded-full",
                                  jobStatus === "Active"
                                    ? "bg-emerald-400"
                                    : "bg-zinc-500"
                                )}
                              />
                              {jobStatus}
                            </span>
                            {job.deadline && (
                              <span className="text-[11px] text-zinc-500">
                                {jobStatus === "Active" ? "Closes" : "Closed"}{" "}
                                {formatDate(job.deadline)}
                              </span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <ViewAction
                              label={job.title}
                              onClick={() => setViewingJob(job)}
                            />
                            <EditAction
                              label={job.title}
                              onClick={() => startEdit(job)}
                            />
                            <DeleteAction
                              label={job.title}
                              onClick={() => handleDelete(job)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Cards (below md) */}
            <div className="mt-3 space-y-3 md:hidden">
              {filteredJobs.map((job) => {
                const jobStatus = getJobStatus(job.deadline)

                return (
                  <article
                    key={job.id}
                    className="rounded-2xl border border-white/10 bg-[#101012] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-white">
                          {job.title}
                        </h2>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                          jobStatus === "Active"
                            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                            : "border-white/10 bg-white/5 text-zinc-400"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            jobStatus === "Active"
                              ? "bg-emerald-400"
                              : "bg-zinc-500"
                          )}
                        />
                        {jobStatus}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
                        {job.category}
                      </span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
                        {job.jobType}
                      </span>
                      {job.remote && (
                        <span className="rounded-full border border-[#7c5cfc]/30 bg-[#7c5cfc]/10 px-2 py-0.5 text-[11px] text-[#c4b5fd]">
                          Remote
                        </span>
                      )}
                    </div>

                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                      <div>
                        <dt className="text-zinc-500">Salary</dt>
                        <dd className="mt-0.5 text-zinc-300">
                          {formatSalary(job)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-zinc-500">Deadline</dt>
                        <dd className="mt-0.5 text-zinc-300">
                          {formatDate(job.deadline)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-zinc-500">Posted</dt>
                        <dd className="mt-0.5 text-zinc-300">
                          {formatDate(job.postedAt)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-4 flex items-center justify-end gap-1">
                      <ViewAction
                        label={job.title}
                        showLabel
                        onClick={() => setViewingJob(job)}
                      />
                      <EditAction
                        label={job.title}
                        showLabel
                        onClick={() => startEdit(job)}
                      />
                      <DeleteAction
                        label={job.title}
                        showLabel
                        onClick={() => handleDelete(job)}
                      />
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}

        <p className="mt-6 pb-8 text-center text-xs text-zinc-600">
          Showing demo data. Jobs connect to the API once the backend is
          running.
        </p>
      </div>

      {/* View job dialog */}
      <Dialog
        open={viewingJob !== null}
        onOpenChange={(open) => {
          if (!open) setViewingJob(null)
        }}
      >
        <DialogContent className="max-h-[88svh] overflow-y-auto bg-[#121214] text-zinc-100 ring-white/10 sm:max-w-xl">
          {viewingJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-white">
                  {viewingJob.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">
                  {viewingJob.company} · {viewingJob.location}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                    viewingStatus === "Active"
                      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/5 text-zinc-400"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      viewingStatus === "Active"
                        ? "bg-emerald-400"
                        : "bg-zinc-500"
                    )}
                  />
                  {viewingStatus}
                </span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
                  {viewingJob.category}
                </span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
                  {viewingJob.jobType}
                </span>
                {viewingJob.remote && (
                  <span className="rounded-full border border-[#7c5cfc]/30 bg-[#7c5cfc]/10 px-2 py-0.5 text-[11px] text-[#c4b5fd]">
                    Remote
                  </span>
                )}
              </div>

              <dl className="grid gap-3 rounded-xl border border-white/10 bg-[#0e0e10] p-3 text-xs sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Salary</dt>
                  <dd className="mt-0.5 text-zinc-200">
                    {formatSalary(viewingJob)}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Location</dt>
                  <dd className="mt-0.5 text-zinc-200">
                    {viewingJob.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Posted</dt>
                  <dd className="mt-0.5 text-zinc-200">
                    {formatDate(viewingJob.postedAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Deadline</dt>
                  <dd className="mt-0.5 text-zinc-200">
                    {formatDate(viewingJob.deadline)}
                  </dd>
                </div>
              </dl>

              <div>
                <h3 className="text-xs font-medium text-zinc-400">
                  Key responsibilities
                </h3>
                <p className="mt-1 text-sm whitespace-pre-line text-zinc-300">
                  {viewingJob.responsibilities || "Not provided."}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-zinc-400">
                  Qualifications &amp; requirements
                </h3>
                <p className="mt-1 text-sm whitespace-pre-line text-zinc-300">
                  {viewingJob.qualifications || "Not provided."}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setViewingJob(null)}
                  className="h-9 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit job dialog */}
      <Dialog
        open={editingJob !== null}
        onOpenChange={(open) => {
          if (!open) setEditingJob(null)
        }}
      >
        <DialogContent className="max-h-[88svh] overflow-y-auto bg-[#121214] text-zinc-100 ring-white/10 sm:max-w-2xl">
          {editingJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-white">
                  Edit job
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-500">
                  Update the listing details. Changes are saved to this table
                  only.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  saveEdit()
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="edit-title" className={dialogLabelClass}>
                      Job title
                    </label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                      className={dialogInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-company" className={dialogLabelClass}>
                      Company
                    </label>
                    <Input
                      id="edit-company"
                      name="company"
                      value={editForm.company}
                      onChange={handleEditChange}
                      required
                      className={dialogInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-category" className={dialogLabelClass}>
                      Category
                    </label>
                    <NativeSelect
                      id="edit-category"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      className={dialogSelectClass}
                    >
                      {categories.map((item) => (
                        <NativeSelectOption key={item} value={item}>
                          {item}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-jobType" className={dialogLabelClass}>
                      Job type
                    </label>
                    <NativeSelect
                      id="edit-jobType"
                      name="jobType"
                      value={editForm.jobType}
                      onChange={handleEditChange}
                      className={dialogSelectClass}
                    >
                      {jobTypes.map((item) => (
                        <NativeSelectOption key={item} value={item}>
                          {item}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0e0e10] px-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-200">
                      Remote work allowed
                    </p>
                    <p className="text-xs text-zinc-500">
                      Candidates can work from anywhere.
                    </p>
                  </div>
                  <Switch
                    checked={editForm.remote}
                    onCheckedChange={(checked) =>
                      setEditForm({ ...editForm, remote: checked })
                    }
                    aria-label="Remote work allowed"
                    className="data-checked:bg-[#7c5cfc] data-unchecked:bg-white/20"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="edit-location" className={dialogLabelClass}>
                      Location
                    </label>
                    <Input
                      id="edit-location"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      required
                      className={dialogInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-deadline" className={dialogLabelClass}>
                      Application deadline
                    </label>
                    <Input
                      id="edit-deadline"
                      name="deadline"
                      type="date"
                      value={editForm.deadline}
                      onChange={handleEditChange}
                      className={cn(dialogInputClass, "[color-scheme:dark]")}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label
                      htmlFor="edit-minSalary"
                      className={dialogLabelClass}
                    >
                      Min salary
                    </label>
                    <Input
                      id="edit-minSalary"
                      name="minSalary"
                      value={editForm.minSalary}
                      onChange={handleEditChange}
                      inputMode="numeric"
                      className={dialogInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="edit-maxSalary"
                      className={dialogLabelClass}
                    >
                      Max salary
                    </label>
                    <Input
                      id="edit-maxSalary"
                      name="maxSalary"
                      value={editForm.maxSalary}
                      onChange={handleEditChange}
                      inputMode="numeric"
                      className={dialogInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="edit-frequency"
                      className={dialogLabelClass}
                    >
                      Frequency
                    </label>
                    <NativeSelect
                      id="edit-frequency"
                      name="frequency"
                      value={editForm.frequency}
                      onChange={handleEditChange}
                      className={dialogSelectClass}
                    >
                      {frequencies.map((item) => (
                        <NativeSelectOption key={item} value={item}>
                          {item}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="edit-responsibilities"
                    className={dialogLabelClass}
                  >
                    Key responsibilities
                  </label>
                  <Textarea
                    id="edit-responsibilities"
                    name="responsibilities"
                    value={editForm.responsibilities}
                    onChange={handleEditChange}
                    className={dialogTextareaClass}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="edit-qualifications"
                    className={dialogLabelClass}
                  >
                    Qualifications &amp; requirements
                  </label>
                  <Textarea
                    id="edit-qualifications"
                    name="qualifications"
                    value={editForm.qualifications}
                    onChange={handleEditChange}
                    className={dialogTextareaClass}
                  />
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingJob(null)}
                    className="h-9 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-9 rounded-xl bg-[#7c5cfc] px-4 text-white hover:bg-[#6a4bee]"
                  >
                    Save changes
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ManageJobs
