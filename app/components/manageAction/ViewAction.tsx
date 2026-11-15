"use client"

import { useState } from "react"
import { EyeIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  formatDate,
  formatSalary,
  getJobStatus,
  type JobEntry,
} from "@/app/dashbord/recruiter/jobs/job-data"

type ViewActionProps = {
  // The job you want to show in the dialog.
  job: JobEntry
  // Show "View" next to the icon (used on the mobile cards).
  showLabel?: boolean
  className?: string
}

export function ViewAction({
  job,
  showLabel = false,
  className,
}: ViewActionProps) {
  // The dialog is open while this value is true.
  const [open, setOpen] = useState(false)
  const jobStatus = getJobStatus(job.deadline)

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size={showLabel ? "sm" : "icon-sm"}
        onClick={() => setOpen(true)}
        aria-label={`View ${job.title}`}
        title="View"
        className={cn(
          "text-zinc-500 hover:bg-white/5 hover:text-white",
          showLabel && "h-8 gap-1.5 rounded-lg px-2.5 text-xs",
          className
        )}
      >
        <EyeIcon />
        {showLabel && <span>View</span>}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88svh] overflow-y-auto bg-[#121214] text-zinc-100 ring-white/10 sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              {job.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500">
              {job.company} · {job.location}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-1.5">
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
                  jobStatus === "Active" ? "bg-emerald-400" : "bg-zinc-500"
                )}
              />
              {jobStatus}
            </span>
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

          <dl className="grid gap-3 rounded-xl border border-white/10 bg-[#0e0e10] p-3 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Salary</dt>
              <dd className="mt-0.5 text-zinc-200">{formatSalary(job)}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Location</dt>
              <dd className="mt-0.5 text-zinc-200">{job.location}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Posted</dt>
              <dd className="mt-0.5 text-zinc-200">
                {formatDate(job.postedAt)}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Deadline</dt>
              <dd className="mt-0.5 text-zinc-200">
                {formatDate(job.deadline)}
              </dd>
            </div>
          </dl>

          <div>
            <h3 className="text-xs font-medium text-zinc-400">
              Key responsibilities
            </h3>
            <p className="mt-1 text-sm whitespace-pre-line text-zinc-300">
              {job.responsibilities || "Not provided."}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-zinc-400">
              Qualifications &amp; requirements
            </h3>
            <p className="mt-1 text-sm whitespace-pre-line text-zinc-300">
              {job.qualifications || "Not provided."}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-9 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
