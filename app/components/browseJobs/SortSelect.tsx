"use client"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

// Sort dropdown next to the result count (Figma: "Sort by: Most Recent").
// It is uncontrolled on purpose — the choice stays visual for now.
export function SortSelect() {
  function handleSort() {
    // TODO: apply the sort choice to the search query
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#6e6e78]">Sort by:</span>
      <NativeSelect
        defaultValue="most-recent"
        onChange={handleSort}
        className="[&_select]:h-9 [&_select]:rounded-lg [&_select]:border-white/10 [&_select]:bg-[#0c0c0f] [&_select]:pr-8 [&_select]:pl-3 [&_select]:text-sm [&_select]:text-[#ededef] [&_select]:focus-visible:border-[#6c5dfc] [&_select]:focus-visible:ring-[#6c5dfc]/30"
      >
        <NativeSelectOption value="most-recent">Most Recent</NativeSelectOption>
        <NativeSelectOption value="salary-high-low">
          Salary: High to Low
        </NativeSelectOption>
        <NativeSelectOption value="title-asc">Title: A to Z</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
