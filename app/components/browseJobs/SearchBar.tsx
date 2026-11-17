"use client"

import {type FormEvent } from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Top search box from the Figma design.
// The submit handler is empty on purpose — the search query
// will be added to the URL later.
export function SearchBar() {
    const router = useRouter()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
         const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const search=data.searchField
    
         const params = new URLSearchParams()
        params.set('search', search as string);
        router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-3 sm:flex-row sm:gap-6"
    >
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-[#8e9192]" />
        <Input
          name="searchField"
          type="search"
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-[58px] rounded-lg border-white/10 bg-[#1a1a1f] pr-4 pl-11 text-base text-[#ededef] placeholder:text-[#a0a0ab] focus-visible:border-[#6c5dfc] focus-visible:ring-[#6c5dfc]/30"
        />
      </div>
      <Button
        type="submit"
        className="h-[58px] shrink-0 rounded-lg bg-white px-6 text-base font-semibold text-[#2f3131] hover:bg-[#e5e2e3] sm:w-[144px]"
      >
        Search Jobs
      </Button>
    </form>
  )
}
