import { SignIn } from "@clerk/react";
import { AuthPageShell } from "../components/layouts/AuthPageShell";

export const SignInPage = () => {
  return (
    <AuthPageShell
      title="Sign in to your account"
      description="Access your dashboard to log water intake, track your daily goal, and view your history."
    >
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/app"
      />
    </AuthPageShell>
  );
}
