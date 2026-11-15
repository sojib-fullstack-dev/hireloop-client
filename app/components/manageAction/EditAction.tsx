"use client"

import { PencilIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

type EditActionProps = {
  // The job title, used for the hover text and screen readers.
  label: string
  // Add your functionality here later.
  onClick?: () => void
  // Show "Edit" next to the icon (used on the mobile cards).
  showLabel?: boolean
  className?: string
}

export function EditAction({
  label,
  onClick,
  showLabel = false,
  className,
}: EditActionProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon-sm"}
      onClick={onClick}
      aria-label={`Edit ${label}`}
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
  )
}
