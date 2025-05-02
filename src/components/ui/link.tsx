import * as React from "react"
import NextLink from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-100 active:bg-gray-200 dark:bg-primary-dark dark:text-white dark:hover:bg-primary/80 dark:active:bg-primary/70",
        main:
          "bg-primary-dark text-white hover:bg-primary-dark/70 active:bg-primary-dark/20 dark:bg-primary dark:text-primary-dark dark:hover:bg-primary/70 dark:active:bg-primary/90",
        secondary:
          "bg-secondary text-white hover:bg-secondary-light active:bg-secondary-dark dark:bg-secondary-dark dark:text-white dark:hover:bg-secondary/90 dark:active:bg-secondary/80",
        accent:
          "bg-accent text-white hover:bg-accent-light active:bg-accent-dark dark:bg-accent-dark dark:hover:bg-accent dark:active:bg-accent-light",
        outline:
          "border border-black text-black bg-transparent hover:bg-black/10 active:bg-black/20 dark:border-white dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20",
        ghost:
          "bg-transparent text-black hover:bg-black/10 active:bg-black/20 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20",
        link:
          "text-accent underline-offset-4 hover:underline active:opacity-80 dark:text-accent-light",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink>,
  VariantProps<typeof linkVariants> {
  asChild?: boolean;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, asChild = false, href, external = false, ...props }, ref) => {
    const Comp = asChild ? Slot : NextLink;

    const externalProps = external ? {
      target: "_blank",
      rel: "noopener noreferrer"
    } : {};

    return (
      <Comp
        dir="rtl"
        data-slot="link"
        className={cn(linkVariants({ variant, size, className }))}
        href={href}
        ref={ref}
        {...externalProps}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";

export { Link, linkVariants };
