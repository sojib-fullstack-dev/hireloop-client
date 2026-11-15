"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { PencilIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import {
  categories,
  frequencies,
  jobTypes,
  type JobEntry,
  type JobForm,
} from "@/app/dashbord/recruiter/jobs/job-data"

type EditActionProps = {
  // The job you want to edit.
  job: JobEntry
  // Called with the updated job when the form is saved.
  onSave: (job: JobEntry) => void
  // Show "Edit" next to the icon (used on the mobile cards).
  showLabel?: boolean
  className?: string
}

const inputClass =
  "h-10 border-white/10 bg-[#141416] text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"

const selectClass =
  "w-full [&_select]:h-10 [&_select]:border-white/10 [&_select]:bg-[#141416] [&_select]:text-sm [&_select]:text-zinc-100 [&_select]:focus-visible:border-[#7c5cfc] [&_select]:focus-visible:ring-[#7c5cfc]/30"

const textareaClass =
  "min-h-20 border-white/10 bg-[#141416] text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"

const labelClass = "text-xs font-medium text-zinc-400"

export function EditAction({
  job,
  onSave,
  showLabel = false,
  className,
}: EditActionProps) {
  // The dialog is open while this value is true.
  const [open, setOpen] = useState(false)

  // All form fields in one state object.
  const [form, setForm] = useState<JobForm>({ ...job })

  // Reset the form with the latest job values every time it opens.
  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) setForm({ ...job })
    setOpen(nextOpen)
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const field = event.target.name as keyof JobForm
    setForm({ ...form, [field]: event.target.value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Keep the original id and posted date, replace everything else.
    onSave({ ...form, id: job.id, postedAt: job.postedAt })
    setOpen(false)
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size={showLabel ? "sm" : "icon-sm"}
        onClick={() => handleOpenChange(true)}
        aria-label={`Edit ${job.title}`}
        title="Edit"
        className={cn(
          "text-zinc-500 hover:bg-white/5 hover:text-white",
          showLabel && "h-8 gap-1.5 rounded-lg px-2.5 text-xs",
          className
        )}
      >
        <PencilIcon />
        {showLabel && <span>Edit</span>}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[88svh] overflow-y-auto bg-[#121214] text-zinc-100 ring-white/10 sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Edit job
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500">
              Update the listing details. Changes are saved to this table only.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor={`edit-title-${job.id}`} className={labelClass}>
                  Job title
                </label>
                <Input
                  id={`edit-title-${job.id}`}
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edit-company-${job.id}`}
                  className={labelClass}
                >
                  Company
                </label>
                <Input
                  id={`edit-company-${job.id}`}
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edit-category-${job.id}`}
                  className={labelClass}
                >
                  Category
                </label>
                <NativeSelect
                  id={`edit-category-${job.id}`}
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {categories.map((item) => (
                    <NativeSelectOption key={item} value={item}>
                      {item}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edit-jobType-${job.id}`}
                  className={labelClass}
                >
                  Job type
                </label>
                <NativeSelect
                  id={`edit-jobType-${job.id}`}
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  className={selectClass}
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
                checked={form.remote}
                onCheckedChange={(checked) =>
                  setForm({ ...form, remote: checked })
                }
                aria-label="Remote work allowed"
                className="data-checked:bg-[#7c5cfc] data-unchecked:bg-white/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor={`edit-location-${job.id}`}
                  className={labelClass}
                >
                  Location
                </label>
                <Input
                  id={`edit-location-${job.id}`}
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edit-deadline-${job.id}`}
                  className={labelClass}
                >
                  Application deadline
                </label>
                <Input
                  id={`edit-deadline-${job.id}`}
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                  className={cn(inputClass, "[color-scheme:dark]")}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor={`edit-minSalary-${job.id}`}
                  className={labelClass}
                >
                  Min salary
                </label>
                <Input
                  id={`edit-minSalary-${job.id}`}
                  name="minSalary"
                  value={form.minSalary}
                  onChange={handleChange}
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edit-maxSalary-${job.id}`}
                  className={labelClass}
                >
                  Max salary
                </label>
                <Input
                  id={`edit-maxSalary-${job.id}`}
                  name="maxSalary"
                  value={form.maxSalary}
                  onChange={handleChange}
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`edit-frequency-${job.id}`}
                  className={labelClass}
                >
                  Frequency
                </label>
                <NativeSelect
                  id={`edit-frequency-${job.id}`}
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                  className={selectClass}
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
                htmlFor={`edit-responsibilities-${job.id}`}
                className={labelClass}
              >
                Key responsibilities
              </label>
              <Textarea
                id={`edit-responsibilities-${job.id}`}
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleChange}
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`edit-qualifications-${job.id}`}
                className={labelClass}
              >
                Qualifications &amp; requirements
              </label>
              <Textarea
                id={`edit-qualifications-${job.id}`}
                name="qualifications"
                value={form.qualifications}
                onChange={handleChange}
                className={textareaClass}
              />
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-white/10 pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
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
        </DialogContent>
      </Dialog>
    </>
  )
}
