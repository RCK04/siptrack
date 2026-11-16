type ClerkNavigator = {
  navigate: (options: { href: string; replace?: boolean }) => unknown;
};

export function createClerkRouterAdapter(router: ClerkNavigator) {
  return {
    routerPush: (href: string) => router.navigate({ href }),
    routerReplace: (href: string) => router.navigate({ href, replace: true }),
  };
}
