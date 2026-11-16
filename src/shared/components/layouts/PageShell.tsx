import type { PropsWithChildren } from "react";

import { SkipLink } from "./SkipLink";

export const PageShell = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-svh flex-col bg-background font-body text-foreground [&_h1]:tracking-normal [&_h2]:tracking-normal [&_h3]:tracking-normal">
      <SkipLink />
      {children}
    </div>
  );
};
