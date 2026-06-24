import { Link } from "@tanstack/react-router";
import { Show, UserButton } from "@clerk/react";

import { Button } from "@/shared/components/ui/button";

export const NavigationMenu = () => {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <Button asChild variant="ghost">
          <Link to="/sign-in/$">Sign in</Link>
        </Button>
        <Button asChild>
          <Link to="/sign-up/$">Create account</Link>
        </Button>
      </Show>
      <Show when="signed-in">
        <Button asChild variant="secondary">
          <Link to="/app">Dashboard</Link>
        </Button>
        <UserButton />
      </Show>
    </div>
  );
};
