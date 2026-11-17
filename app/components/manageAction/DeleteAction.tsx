"use client"

import { useState } from "react"
import { Trash2Icon } from "lucide-react"
import { toast } from "react-toastify"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { JobEntry } from "@/app/dashbord/recruiter/jobs/job-data"
import { deleteJob } from "@/lib/api/job"

type AlertDialogDestructiveProps = {
  job: JobEntry
  // Page ke bolbe row ta table theke soraite
  onDeleted: (job: JobEntry) => void
}

export function AlertDialogDestructive({
  job,
  onDeleted,
}: AlertDialogDestructiveProps) {
  const [open, setOpen] = useState(false)

  async function handleDelete() {
    try {
      const res = await deleteJob(job._id)

      if (!res.deletedCount) {
        toast.error("Delete failed")
        return
      }

      setOpen(false)
      toast.success("Delete Success")
      onDeleted(job)
    } catch (err) {
      console.log("Failed to delete job:", err)
      toast.error("Something went wrong")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" aria-label={`Delete ${job.title}`}>
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this jobs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
