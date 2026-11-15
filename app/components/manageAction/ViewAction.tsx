"use client"

import { EyeIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

type ViewActionProps = {
  // The job title, used for the hover text and screen readers.
  label: string
  // Add your functionality here later.
  onClick?: () => void
  // Show "View" next to the icon (used on the mobile cards).
  showLabel?: boolean
  className?: string
}

export function ViewAction({
  label,
  onClick,
  showLabel = false,
  className,
}: ViewActionProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon-sm"}
      onClick={onClick}
      aria-label={`View ${label}`}
      title="View"
      className={cn(
        "text-zinc-500 hover:bg-white/5 hover:text-white",
        showLabel && "h-8 gap-1.5 rounded-lg px-2.5 text-xs",
        className
      )}
    >
      <EyeIcon />
      {showLabel && <span>View</span>}
    </Button>
  )
}
