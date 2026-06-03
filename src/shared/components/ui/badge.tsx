import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-3 py-1 font-display text-xs font-semibold whitespace-nowrap transition-[color,box-shadow] [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-water-100 text-water-700",
        secondary: "border-transparent bg-teal-100 text-teal-700",
        success: "border-transparent bg-mint-100 text-mint-700",
        warning: "border-transparent bg-yellow-100 text-yellow-700",
        destructive: "border-transparent bg-red-100 text-red-700",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
