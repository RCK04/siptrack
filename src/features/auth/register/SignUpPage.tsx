import { SignUp } from "@clerk/react";
import { AuthPageShell } from "../components/layouts/AuthPageShell";
import { authAppearance } from "../auth-appearance";

export const SignUpPage = () => {
  return (
    <AuthPageShell
      title="Create your account"
      description="A fresh start for your daily water habit. Make it yours."
    >
      <SignUp
        appearance={authAppearance}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/app"
        oauthFlow="redirect"
        fallback={<p role="status">Loading sign up...</p>}
      />
    </AuthPageShell>
  );
}
