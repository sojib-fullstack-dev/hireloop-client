"use client"

import { Trash2Icon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

type DeleteActionProps = {
  // The job title, used for the hover text and screen readers.
  label: string
  // Add your functionality here later.
  onClick?: () => void
  // Show "Delete" next to the icon (used on the mobile cards).
  showLabel?: boolean
  className?: string
}

export function DeleteAction({
  label,
  onClick,
  showLabel = false,
  className,
}: DeleteActionProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon-sm"}
      onClick={onClick}
      aria-label={`Delete ${label}`}
      title="Delete"
      className={cn(
        "text-zinc-500 hover:bg-rose-500/10 hover:text-rose-300",
        showLabel && "h-8 gap-1.5 rounded-lg px-2.5 text-xs",
        className
      )}
    >
      <Trash2Icon />
      {showLabel && <span>Delete</span>}
    </Button>
  )
}
