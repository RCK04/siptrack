import { Droplet, Waves } from "lucide-react";
import type { ReactNode } from "react";

import Header from "@/shared/components/layouts/Header";
import { Footer } from "@/shared/components/layouts/Footer";
import { PageShell } from "@/shared/components/layouts/PageShell";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Intakes } from "./Intakes";

const intakeItems = [
  { volume: 500, time: "09:30" },
  { volume: 250, time: "11:10" },
  { volume: 650, time: "14:45" },
];

export const WaterIntakeDashboard = ({ account }: { account?: ReactNode }) => {
  return (
    <PageShell>
      <Header section="Your daily hydration">{account}</Header>
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1480px] flex-1 px-6 pt-10 pb-14 focus:outline-none md:px-10 lg:px-16 lg:pt-14">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-medium"><Waves size={17} aria-hidden="true" />One sip at a time.</p>
            <h1 className="font-display text-[34px] leading-[1.12] font-medium md:text-[42px]">Find your daily flow.</h1>
            <p className="mt-3 text-sm text-flow-muted">Your water, your pace. A little progress every day.</p>
          </div>
          <span className="rounded-full border border-flow-line px-3 py-1.5 text-[11px] text-flow-muted">Sample data</span>
        </div>

        <Intakes />

        <div className="mt-10 grid gap-10 border-t border-flow-line pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <section aria-labelledby="daily-log-title">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h2 id="daily-log-title" className="font-display text-2xl font-medium">Daily log</h2>
                <p className="mt-2 text-[13px] text-flow-muted">Every glass is a little step toward your goal.</p>
              </div>
              <span className="rounded-full bg-flow-surface px-3 py-1 text-xs font-medium">70%</span>
            </div>

            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-[56px] leading-none font-medium tabular-nums">1.40<span className="ml-1 text-2xl">L</span></p>
              <p className="text-xs text-flow-muted">of 2.00 L today</p>
            </div>
            <Progress value={1400} max={2000} aria-label="Daily water intake" className="h-2 bg-flow-track" indicatorClassName="bg-none bg-flow-ink" />
            <div className="mt-3 flex justify-between text-[11px] text-flow-muted"><span>Every sip adds up</span><span>600 ml to go</span></div>

            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              <Button className="h-11 rounded-full bg-flow-ink px-2 font-body text-xs font-medium text-flow-paper shadow-none hover:bg-teal-700 hover:shadow-none sm:text-sm"><Droplet aria-hidden="true" />+250 ml</Button>
              <Button variant="outline" className="h-11 rounded-full border border-flow-line bg-transparent px-2 font-body text-xs font-medium text-flow-ink shadow-none hover:bg-flow-hover hover:text-flow-ink sm:text-sm">+500 ml</Button>
              <Button variant="outline" className="h-11 rounded-full border border-flow-line bg-transparent px-2 font-body text-xs font-medium text-flow-ink shadow-none hover:bg-flow-hover hover:text-flow-ink sm:text-sm">Custom</Button>
            </div>
          </section>

          <section aria-labelledby="entries-title" className="border-t border-flow-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <h2 id="entries-title" className="font-display text-2xl font-medium">Latest entries</h2>
            <p className="mt-2 text-[13px] text-flow-muted">The little sips that make up your day.</p>
            <ul className="mt-5 divide-y divide-flow-line">
              {intakeItems.map(item => (
                <li key={`${item.volume}-${item.time}`} className="flex items-center gap-4 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-flow-surface"><Droplet size={19} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="font-display text-lg font-medium tabular-nums">{item.volume} <span className="text-sm font-normal">ml</span></span>
                  <time className="ml-auto text-xs text-flow-muted tabular-nums">{item.time}</time>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <div className="mx-auto w-full max-w-[1480px] px-6 md:px-10 lg:px-16">
        <Footer>
          <span>Small sips. Better days.</span>
        </Footer>
      </div>
    </PageShell>
  );
};
