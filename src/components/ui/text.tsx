import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ElementType,
  ComponentPropsWithoutRef,
} from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "muted" | "destructive" | "success" | "info"

const variantClasses: Record<Variant, string> = {
  default: "text-primary dark:text-primary-light",
  muted: "text-muted dark:text-muted-light",
  destructive: "text-destructive dark:text-destructive-light",
  success: "text-success dark:text-success-light",
  info: "text-info dark:text-info-light",
}

// Paragraph Component
type ParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  variant?: Variant
}

export const Paragraph = ({
  children,
  className = "",
  variant,
  ...props
}: ParagraphProps) => {
  return (
    <p
      dir="rtl"
      className={cn(variant ? variantClasses[variant] : "", className)}
      {...props}
    >
      {children}
    </p>
  )
}

// Heading Component
type HeadingProps<T extends ElementType> = {
  as?: T
  className?: string
  children: React.ReactNode
  variant?: Variant
} & ComponentPropsWithoutRef<T>

export const Heading = <T extends ElementType = "h1">({
  as,
  className = "",
  children,
  variant,
  ...props
}: HeadingProps<T>) => {
  const Tag = as || "h1"

  return (
    <Tag
      dir="rtl"
      className={cn("font-bold", variant ? variantClasses[variant] : "", className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
