"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type ChangeEvent } from "react"
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
import { AlertDialogDestructive } from "@/app/components/manageAction/DeleteAction"
import { EditAction } from "@/app/components/manageAction/EditAction"
import { ViewAction } from "@/app/components/manageAction/ViewAction"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  categories,
  formatDate,
  formatSalary,
  getJobStatus,
  type JobEntry,
  type JobStatus,
} from "@/app/dashbord/recruiter/jobs/job-data"
import { getJobsdata } from "@/lib/api/job"

type StatusFilter = "all" | JobStatus

const ManageJobs = () => {
  const [jobs, setJobs] = useState<JobEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState<StatusFilter>("all")

  // API theke jobs niye table e boshai.
  useEffect(() => {
    getJobsdata()
      .then(setJobs)
      .catch((err) => console.log("Failed to load jobs:", err))
      .finally(() => setLoading(false))
  }, [])

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

  function removeJob(job: JobEntry) {
    setJobs((current) => current.filter((item) => item._id !== job._id))
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

        {!loading && jobs.length > 0 && (
          <p className="mt-4 text-xs text-zinc-500">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        )}

        {loading ? (
          <div className="mt-3 rounded-2xl border border-white/10 bg-[#101012] px-6 py-16 text-center text-sm text-zinc-500">
            Loading jobs…
          </div>
        ) : filteredJobs.length === 0 ? (
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
                        key={job._id}
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
                            <ViewAction job={job} />
                            <EditAction job={job} />
                            <AlertDialogDestructive
                              job={job}
                              onDeleted={removeJob}
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
                    key={job._id}
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
                      <ViewAction job={job} showLabel />
                      <EditAction job={job} showLabel />
                      <AlertDialogDestructive job={job} onDeleted={removeJob} />
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ManageJobs
