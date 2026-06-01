import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/shared/lib/utils/tailwind-cn"

const buttonVariants = cva(
  "group/button h-11.5 inline-flex gap-2.5 hover:cursor-pointer shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm text-white font-mono font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-blue-600 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-blue-600 hover:bg-blue-700",
        outline:
          "border-border text-gray-800 bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:text-gray-400 text-gray-800",
        ghost:
          "hover:bg-muted text-gray-800 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "w-full h-12 gap-1.5 px-4 rounded-none has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xl: "w-full h-12 gap-1.5 px-4 rounded-none has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 my-5 md:mt-10 md:mb-9 h-12",
        icon: "size-8",
        "icon-xs":
          "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7",
        "icon-lg": "size-9",
      },
        ui: {
        default: "",
        fullWidth: "w-full rounded-none transition-colors hover:cursor-pointer",
        halfWidth: "w-1/2 rounded-none transition-colors hover:cursor-pointer",
        fitContent: "w-fit px-4 h-12 rounded-none transition-colors hover:cursor-pointer",
      },

      theme: {
        default: "",
        primary: "bg-blue-600 hover:bg-blue-500 text-sm",
        secondary: "bg-gray-200 hover:bg-gray-300 disabled:text-gray-400 text-gray-800 text-base",
        outlineCustom:
          "text-gray-800 border-blue-600 bg-blue-50 hover:bg-blue-100/60 text-sm font-medium",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
      ui: "default",
      theme: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ui,
  theme,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, ui, theme, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
