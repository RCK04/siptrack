import { SignIn } from "@clerk/react";
import { AuthPageShell } from "../components/layouts/AuthPageShell";
import { authAppearance } from "../auth-appearance";

export const SignInPage = () => {
  return (
    <AuthPageShell
      title="Sign in to your account"
      description="Welcome back. Pick up where your last sip left off."
    >
      <SignIn
        appearance={authAppearance}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/app"
        withSignUp
        transferable
        oauthFlow="redirect"
        fallback={<p role="status">Loading sign in...</p>}
      />
    </AuthPageShell>
  );
}
