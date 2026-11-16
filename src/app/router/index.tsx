import { createRootRoute, createRoute, createRouter, lazyRouteComponent, Outlet } from "@tanstack/react-router";
import HomePage from "@/features/home/HomePage";

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
  component: lazyRouteComponent(() => import("@/features/auth/login/SignInPage"), "SignInPage"),
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up/$",
  component: lazyRouteComponent(() => import("@/features/auth/register/SignUpPage"), "SignUpPage"),
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: lazyRouteComponent(() => import("@/features/water-intake/WaterIntakePage"), "WaterIntakePage"),
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
