import { Link } from "@tanstack/react-router";

import logo from "@/shared/assets/brand/siptrack-horizontal-color.svg";
import { cn } from "@/shared/lib/utils";

export const SiteBrand = ({ className }: { className?: string }) => (
  <Link
    to="/"
    aria-label="Siptrack home"
    className={cn(
      "inline-flex h-8 w-[110px] shrink-0 items-center justify-center overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flow-ink md:h-10 md:w-[130px]",
      className,
    )}
  >
    <img src={logo} alt="" width={740} height={290} className="block w-full max-w-none shrink-0" />
  </Link>
);
