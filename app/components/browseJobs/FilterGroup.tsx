"use client"

import { useState, type ChangeEvent } from "react"

import { Checkbox } from "@/components/ui/checkbox"

type FilterGroupProps = {
  title: string
  name: string
  options: string[]
  single?: boolean

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

// One checkbox group inside the Filters sidebar (e.g. "Job Type").
// The selection is kept in local state only — applying it to the
// search query will be added later.
export function FilterGroup({
  title,
  name,
  options,
  single,
  onChange,
}: FilterGroupProps) {
  const [selected, setSelected] = useState<string[]>([])

  function toggleOption(option: string) {
    let next: string[]

    if (single) {
      // Single select: age theke select ache → unselect, na hole → select
      next = selected.includes(option) ? [] : [option]
    } else if (selected.includes(option)) {
      next = selected.filter((item) => item !== option)
    } else {
      next = [...selected, option]
    }

    setSelected(next)

    onChange?.({
      target: { name, value: option, checked: next.includes(option) },
    } as ChangeEvent<HTMLInputElement>)
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#ededef]">{title}</h3>

      <div className="mt-4 flex flex-col gap-1">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-3 py-1.5">
            <Checkbox
              name={name}
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
