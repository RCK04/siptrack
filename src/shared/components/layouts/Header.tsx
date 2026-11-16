import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { SiteBrand } from "./SiteBrand";

type HeaderProps = ComponentProps<"header"> & {
  variant?: "floating" | "plain";
  section?: string;
  navigation?: ReactNode;
  brandClassName?: string;
  actionsClassName?: string;
};

const Header = ({
  variant = "floating",
  section,
  navigation,
  brandClassName,
  actionsClassName,
  className,
  children,
  ...props
}: HeaderProps) => (
  <header
    className={cn(
      "items-center gap-4",
      variant === "floating"
        ? "mx-auto mt-3.5 grid min-h-14 w-[calc(100%-2rem)] max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] rounded-2xl border border-white/60 bg-white/50 px-4 py-3 backdrop-blur-xl md:mt-[22px] md:min-h-16 md:w-[calc(100%-3rem)] md:px-6 lg:w-[calc(100%-6rem)]"
        : "flex justify-between",
      variant === "floating" && (navigation || section) && "sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
      className,
    )}
    {...props}
  >
    <SiteBrand className={brandClassName} />
    {navigation ??
      (section && (
        <span className="hidden text-center text-xs font-medium text-flow-muted sm:block">
          {section}
        </span>
      ))}
    {children && (
      <div className={cn("flex min-w-0 items-center justify-end gap-3 text-xs", actionsClassName)}>
        {children}
      </div>
    )}
  </header>
);

export default Header;
