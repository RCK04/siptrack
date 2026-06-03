import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Progress({
  className,
  value = 0,
  max = 100,
  indicatorClassName,
  ...props
}: React.ComponentProps<"div"> & {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-water-400 to-teal-400 transition-all duration-300 ease-out",
          indicatorClassName,
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export { Progress };
