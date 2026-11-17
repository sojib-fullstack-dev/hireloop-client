"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"

type FilterGroupProps = {
  title: string
  options: string[]
  // "single" hole ekbar e ekta option select kora jabe (radio er moto)
  single?: boolean
}

// One checkbox group inside the Filters sidebar (e.g. "Job Type").
// The selection is kept in local state only — applying it to the
// search query will be added later.
export function FilterGroup({ title, options, single }: FilterGroupProps) {
  const [selected, setSelected] = useState<string[]>([])

  function toggleOption(option: string) {
    if (single) {
      // Single select: notun option ta ekta-i selected thakbe
      setSelected([option])
    } else {
      // Multi select: notun hole add, age theke thakle sorao
      setSelected((current) =>
        current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option]
      )
    }
    // TODO: apply the selected options to the search query
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#ededef]">{title}</h3>

      <div className="mt-4 flex flex-col gap-1">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-3 py-1.5">
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={() => toggleOption(option)}
              aria-label={option}
              className="border-[#2a2a31] bg-[#1a1a1f] dark:bg-[#1a1a1f] data-checked:border-white data-checked:bg-white data-checked:text-black dark:data-checked:border-white dark:data-checked:bg-white dark:data-checked:text-black"
            />
            <span
              className="cursor-pointer text-sm text-[#a0a0ab]"
              onClick={() => toggleOption(option)}
            >
              {option}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
