import { SignUp } from "@clerk/react";
import { AuthPageShell } from "../components/layouts/AuthPageShell";

export const SignUpPage = () => {
  return (
    <AuthPageShell
      title="Create your account"
      description="Start by setting your daily goal and logging your hydration throughout the day."
    >
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/app"
      />
    </AuthPageShell>
  );
}
