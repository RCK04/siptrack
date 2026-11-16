import { describe, expect, test } from "bun:test";
import { createMemoryHistory, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { createClerkRouterAdapter } from "./clerk-navigation";

describe("Clerk router navigation", () => {
  for (const action of ["routerPush", "routerReplace"] as const) {
    test(`${action} preserves the OAuth callback path and redirect parameters`, async () => {
      const root = createRootRoute();
      const auth = createRoute({ getParentRoute: () => root, path: "/sign-in/$" });
      const router = createRouter({
        routeTree: root.addChildren([auth]),
        history: createMemoryHistory({ initialEntries: ["/"] }),
      });
      await router.load();
      const initialIndex = router.history.location.state.__TSR_index;
      const adapter = createClerkRouterAdapter(router);

      await adapter[action]("/sign-in/sso-callback?sign_up_fallback_redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fapp&sign_in_fallback_redirect_url=%2Fapp#complete");

      const destination = router.latestLocation;
      expect(destination.pathname).toBe("/sign-in/sso-callback");
      expect(destination.search).toEqual({
        sign_up_fallback_redirect_url: "http://localhost:3000/app",
        sign_in_fallback_redirect_url: "/app",
      });
      expect(destination.hash).toBe("complete");
      expect(router.history.location.state.__TSR_index).toBe(initialIndex + (action === "routerReplace" ? 0 : 1));
    });
  }
});
