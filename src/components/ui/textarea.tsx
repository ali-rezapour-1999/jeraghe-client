import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-gray-400 placeholder:text-muted-foreground focus-visible:border-r-primary-dark/20 focus-visible:bg-primary-light/5 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-40 w-full rounded-lg border bg-transparent p-5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
