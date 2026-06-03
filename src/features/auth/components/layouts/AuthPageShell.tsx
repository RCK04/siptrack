import Header from "@/shared/components/layouts/Header";
import { Link } from "@tanstack/react-router";
import { DropletIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

type AuthPageShellProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export function AuthPageShell({
  title,
  description,
  children,
}: AuthPageShellProps) {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-8">
        <section className="grid flex-1 items-center gap-8 py-8 md:grid-cols-[1fr_auto]">
          <div className="animate-slide-up max-w-md">
            <p className="mb-3 font-display text-sm font-semibold text-primary">
              Siptrack Auth
            </p>
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </div>

          <div
            className="flex animate-slide-up justify-center"
            style={{ animationDelay: "0.1s" }}
          >
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
