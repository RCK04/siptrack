import { PageShell } from "@/shared/components/layouts/PageShell";
import { Footer } from "@/shared/components/layouts/Footer";
import Header from "@/shared/components/layouts/Header";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Waves } from "lucide-react";
import type { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/utils";

type AuthPageShellProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export const AuthPageShell = ({
  title,
  description,
  children,
}: AuthPageShellProps) => {
  const pathname = useLocation({ select: location => location.pathname });
  const isEntry = /^\/sign-(in|up)\/?$/.test(pathname);

  return (
    <PageShell>
      <div className="grid min-h-svh lg:grid-cols-[45%_55%]">
        <div className="flex min-w-0 flex-col px-6 pt-7 pb-6 sm:px-12 sm:pt-9 lg:px-10 xl:px-14">
          <Header variant="plain">
            <Link to="/" aria-label="Back to home" title="Back to home" className="grid size-9 place-items-center rounded-full border border-flow-line text-flow-muted transition-colors hover:bg-white hover:text-flow-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flow-ink">
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </Header>

          <main id="main-content" tabIndex={-1} aria-labelledby="auth-title" className="mx-auto my-auto w-full max-w-[360px] py-12 focus:outline-none sm:py-14 lg:py-12">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-medium text-flow-muted"><span className="size-1.5 rounded-full bg-teal-700" />Your daily hydration</p>
            <h1 id="auth-title" className="font-display text-[32px] leading-[1.12] font-medium sm:text-4xl">{title}</h1>
            <p className="mt-3 mb-8 text-sm leading-relaxed text-flow-muted">{description}</p>
            <div className={cn("w-full min-w-0 [&_.cl-rootBox]:w-full [&_.cl-cardBox]:w-full", isEntry && "[&_.cl-header]:hidden!")}>{children}</div>
          </main>

          <Footer variant="plain" message="One sip at a time." className="gap-2 text-[10px]" />
        </div>

        <aside aria-labelledby="auth-story-title" className="hidden min-w-0 flex-col justify-between gap-14 bg-flow-ink px-12 py-10 text-flow-paper lg:flex xl:px-16 xl:py-12">
          <div className="flex items-center justify-between gap-4 border-b border-flow-paper/20 pb-6">
            <span className="text-xs font-medium">A LITTLE MORE YOU</span>
            <Waves size={22} strokeWidth={1.5} aria-hidden="true" />
          </div>

          <div className="my-auto max-w-[520px]">
            <p className="mb-6 text-xs text-flow-soft">Your goal. Your rhythm.</p>
            <h2 id="auth-story-title" className="font-display text-[52px] leading-[1.08] font-medium xl:text-[64px]">Small sips.<br /><span className="text-flow-highlight">Better days.</span></h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-flow-soft">A glass, a bottle, a refill. Make room for a little more water, and build a habit that feels like you.</p>
            <div className="mt-12 grid grid-cols-3 gap-5 border-t border-flow-paper/20 pt-6">
              {[
                { number: "01", label: "Set your goal" },
                { number: "02", label: "Log a sip" },
                { number: "03", label: "Find your flow" },
              ].map(step => (
                <div key={step.number}>
                  <span className="text-[10px] text-flow-highlight">{step.number}</span>
                  <p className="mt-2 text-xs leading-relaxed text-flow-paper">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-flow-paper/20 pt-6 text-[11px] text-flow-soft">
            <span>A little more water. A little more you.</span>
            <Link to="/" className="inline-flex items-center gap-2 text-flow-paper hover:text-white hover:underline hover:underline-offset-4">Meet Siptrack <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
};
