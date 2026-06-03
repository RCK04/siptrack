import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { SignInPage } from "@/features/auth/login/SignInPage";
import { SignUpPage } from "@/features/auth/register/SignUpPage";
import HomePage from "@/features/home/HomePage";
import { WaterIntakePage } from "@/features/water-intake/WaterIntakePage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-in/$",
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up/$",
  component: SignUpPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: WaterIntakePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
  appRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
