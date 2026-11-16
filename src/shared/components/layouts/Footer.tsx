import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { SiteBrand } from "./SiteBrand";

type FooterProps = ComponentProps<"footer"> & {
  variant?: "bordered" | "plain";
  showBrand?: boolean;
  brandClassName?: string;
  message?: ReactNode;
};

export const Footer = ({
  variant = "bordered",
  showBrand = false,
  brandClassName,
  message = "A little more water. A little more you.",
  className,
  children,
  ...props
}: FooterProps) => (
  <footer
    className={cn(
      "flex flex-wrap items-center justify-between gap-3 text-[11px] text-flow-muted",
      variant === "bordered" && "border-t border-flow-line py-6",
      className,
    )}
    {...props}
  >
    {showBrand && <SiteBrand className={cn("text-xl", brandClassName)} />}
    {message && <span>{message}</span>}
    {children}
  </footer>
);
