import { ClerkProvider } from "@clerk/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { queryClient } from "./queryClient";
import { router } from "@/app/router";

const PUBLISHABLE_KEY =
  process.env.BUN_PUBLIC_CLERK_PUBLISHABLE_KEY ?? import.meta.env.BUN_PUBLIC_CLERK_PUBLISHABLE_KEY;

function routerPush(to: string) {
  return router.navigate({ to: to as never });
}

function routerReplace(to: string) {
  return router.navigate({ to: to as never, replace: true });
}

export function AppProviders({ children }: PropsWithChildren) {
  const app = (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key.");
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/app"
      signUpFallbackRedirectUrl="/app"
      afterSignOutUrl="/"
      routerPush={routerPush}
      routerReplace={routerReplace}
    >
      {app}
    </ClerkProvider>
  );
}
