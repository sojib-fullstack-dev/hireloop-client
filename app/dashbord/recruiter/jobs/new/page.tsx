"use client"

import Link from "next/link"
import { useState, type ChangeEvent, type FormEvent } from "react"
import {
  ArrowRightIcon,
  Building2Icon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  MapPinIcon,
  MonitorSmartphoneIcon,
} from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJobs } from "@/lib/actions/jobs"

const categories = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Other",
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
const frequencies = ["per hour", "per month", "per year"]

export type JobForm = {
  title: string
  company: string
  category: string
  jobType: string
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
}

const initialForm: JobForm = {
  title: "",
  company: "",
  category: "Engineering & Tech",
  jobType: "Full-time",
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
}

// Shared styles so every input looks the same.
const inputClass =
  "h-10 border-white/10 bg-[#141416] text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"

const textareaClass =
  "min-h-24 border-white/10 bg-[#141416] text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-[#7c5cfc] focus-visible:ring-[#7c5cfc]/30"

const selectClass =
  "w-full [&_select]:h-10 [&_select]:border-white/10 [&_select]:bg-[#141416] [&_select]:text-sm [&_select]:text-zinc-100 [&_select]:focus-visible:border-[#7c5cfc] [&_select]:focus-visible:ring-[#7c5cfc]/30"

const labelClass =
  "inline-flex w-fit items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1 text-xs font-medium text-zinc-300"

const iconClass =
  "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"

const NewJobPage = () => {
  const [formData, setFormData] = useState(initialForm)
  const [remote, setRemote] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const field = event.target.name as keyof JobForm
    setFormData({ ...formData, [field]: event.target.value })
  }

 async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newJob = { ...formData, remote }
    // console.log("New job post:", newJob)

    setSubmitted(true)

    // Bring the confirmation message into view for users who submitted
    // from the bottom of the form.
    window.scrollTo({ top: 0, behavior: "smooth" })

    const result= await createJobs(newJob)
    console.log('submit data',result)

  }

  return (
    <form onSubmit={handleSubmit} className="px-4 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Link
                href="/dashbord/recruiter/jobs"
                className="hover:text-zinc-300"
              >
                Manage Jobs
              </Link>
              <ChevronRightIcon className="size-3.5" />
              <span className="text-zinc-300">Create New Listing</span>
            </nav>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
        </div>

        {submitted && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          >
            Job published. Check the browser console for the collected data.
          </div>
        )}

        {/* 1. Basic Information */}
        <section className="mt-8 space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="size-2 rounded-full bg-[#7c5cfc]" />
            1. Basic Information
          </h2>

          <div className="space-y-2">
            <label htmlFor="title" className={labelClass}>
              Job Title <span className="text-[#a78bfa]">*</span>
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
              required
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="company" className={labelClass}>
                Company Name <span className="text-[#a78bfa]">*</span>
              </label>
              <div className="relative">
                <Building2Icon className={iconClass} />
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="HireFlow Network"
                  autoComplete="organization"
                  required
                  className={cn(inputClass, "pl-9")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className={labelClass}>
                Job Category <span className="text-[#a78bfa]">*</span>
              </label>
              <NativeSelect
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectClass}
              >
                {categories.map((category) => (
                  <NativeSelectOption key={category} value={category}>
                    {category}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          <div className="space-y-2">
            <span className={labelClass}>
              Job Type <span className="text-[#a78bfa]">*</span>
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {jobTypes.map((jobType) => (
                <button
                  key={jobType}
                  type="button"
                  aria-pressed={formData.jobType === jobType}
                  onClick={() => setFormData({ ...formData, jobType: jobType })}
                  className={cn(
                    "h-10 rounded-lg border text-sm transition-colors",
                    formData.jobType === jobType
                      ? "border-[#7c5cfc] bg-[#7c5cfc]/10 text-white"
                      : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                  )}
                >
                  {jobType}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="mt-8 space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="size-2 rounded-full bg-[#7c5cfc]" />
            2. Location, Compensation &amp; Timeline
          </h2>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121214] px-3.5 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-400">
              <MonitorSmartphoneIcon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-200">
                Remote Work Allowed (Remote)
              </p>
              <p className="text-xs text-zinc-500">
                Enable worldwide or distributed candidate applications
              </p>
            </div>
            <Switch
              checked={remote}
              onCheckedChange={setRemote}
              aria-label="Remote work allowed"
              className="data-checked:bg-[#7c5cfc] data-unchecked:bg-white/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="location" className={labelClass}>
                  Job Location (location)
                </label>
                <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                  Required
                </span>
              </div>
              <div className="relative">
                <MapPinIcon className={iconClass} />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="New York, USA"
                  autoComplete="address-level2"
                  required
                  className={cn(inputClass, "pl-9")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="deadline" className={labelClass}>
                Application Deadline (deadline)
              </label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className={cn(inputClass, "[color-scheme:dark]")}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="minSalary" className={labelClass}>
                Min Salary / Rate
              </label>
              <div className="relative">
                <CircleDollarSignIcon className={iconClass} />
                <Input
                  id="minSalary"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="25"
                  inputMode="numeric"
                  aria-describedby="salary-hint"
                  className={cn(inputClass, "pl-9")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="maxSalary" className={labelClass}>
                Max Salary / Rate
              </label>
              <div className="relative">
                <CircleDollarSignIcon className={iconClass} />
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="40"
                  inputMode="numeric"
                  aria-describedby="salary-hint"
                  className={cn(inputClass, "pl-9")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="frequency" className={labelClass}>
                Frequency
              </label>
              <NativeSelect
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className={selectClass}
              >
                {frequencies.map((frequency) => (
                  <NativeSelectOption key={frequency} value={frequency}>
                    {frequency}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          <p id="salary-hint" className="text-xs text-zinc-500">
            Leave the salary fields empty if the pay is negotiable.
          </p>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="mt-8 space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="size-2 rounded-full bg-[#7c5cfc]" />
            3. Responsibilities &amp; Requirements
          </h2>

          <div className="space-y-2">
            <label htmlFor="responsibilities" className={labelClass}>
              Key Responsibilities <span className="text-[#a78bfa]">*</span>
            </label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              required
              className={cn(textareaClass, "min-h-28")}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="qualifications" className={labelClass}>
              Qualifications &amp; Requirements{" "}
              <span className="text-[#a78bfa]">*</span>
            </label>
            <Textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder={
                "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
              }
              required
              className={cn(textareaClass, "min-h-28")}
            />
          </div>
        </section>

        <div className="mt-8 flex items-center justify-end gap-2 pb-10">
          <Link
            href="/dashbord/recruiter/jobs"
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            className="h-10 gap-2 rounded-xl bg-[#7c5cfc] px-5 text-sm font-medium text-white hover:bg-[#6a4bee]"
          >
            Publish Job
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </form>
  )
}

export default NewJobPage
