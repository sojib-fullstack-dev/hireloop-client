import Image from "next/image"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

import globe from "@/app/images/globe.png"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[780px] overflow-hidden bg-[#050507] px-4 pt-12 text-white sm:px-6 sm:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.12),transparent_38%)]"
      />
      <Image
        src={globe}
        alt=""
        priority
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 left-1/2 z-[-1] w-[min(1100px,145vw)] max-w-none -translate-x-1/2 sm:-top-72 md:-top-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-[#050507] via-[#050507]/25 via-35% to-[#050507]/5"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[10px] tracking-[0.12em] text-white/55 shadow-[0_0_24px_rgba(255,255,255,0.06)] sm:text-xs">
          <BriefcaseBusiness aria-hidden="true" className="size-3.5 text-[#ff9d55]" />
          <span className="font-semibold text-white">50,000+</span>
          <span>NEW JOBS THIS MONTH</span>
        </div>

        <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl md:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form
          action="/jobs"
          className="mt-7 flex w-full max-w-[700px] flex-col gap-2 rounded-2xl border border-white/10 bg-[#151517]/95 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.4)] sm:flex-row sm:items-center sm:rounded-xl"
          role="search"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5">
            <Search aria-hidden="true" className="size-4 shrink-0 text-white/65" />
            <span className="sr-only">Job title, skill, or company</span>
            <input
              name="q"
              type="search"
              placeholder="Job title, skill or company"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </label>

          <span aria-hidden="true" className="hidden h-6 w-px bg-white/10 sm:block" />

          <label className="flex min-w-0 flex-1 items-center gap-2.5 border-t border-white/10 px-2.5 sm:border-t-0">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-white/65" />
            <span className="sr-only">Location</span>
            <input
              name="location"
              type="search"
              placeholder="Location or Remote"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </label>

          <button
            type="submit"
            aria-label="Search jobs"
            className="flex h-11 shrink-0 items-center justify-center rounded-lg bg-[#6657f5] px-4 text-white transition-colors hover:bg-[#786bff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#958aff] sm:size-11 sm:px-0"
          >
            <Search aria-hidden="true" className="size-5" />
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="mr-1 text-white/45">Trending Position</span>
          {trendingPositions.map((position) => (
            <a
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-white/75 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#958aff]"
            >
              {position}
            </a>
          ))}
        </div>
      </div>

      <p className="absolute top-[68%] left-1/2 z-10 w-[min(90%,560px)] -translate-x-1/2 text-center text-2xl font-medium leading-tight tracking-[-0.03em] text-white/90 sm:top-[70%] sm:text-3xl">
        Assisting over 15,000 job seekers
        <br />
        find their dream positions.
      </p>
    </section>
  )
}
