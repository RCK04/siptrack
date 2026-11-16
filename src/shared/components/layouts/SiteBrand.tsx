import { Link } from "@tanstack/react-router";
import { Droplet } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export const SiteBrand = ({ className }: { className?: string }) => (
  <Link
    to="/"
    aria-label="Siptrack home"
    className={cn(
      "inline-flex w-fit shrink-0 items-center gap-[7px] font-display text-2xl leading-none font-semibold text-flow-ink hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flow-ink",
      className,
    )}
  >
    <Droplet className="h-6 w-[21px] stroke-[1.8]" aria-hidden="true" />
    siptrack
  </Link>
);
