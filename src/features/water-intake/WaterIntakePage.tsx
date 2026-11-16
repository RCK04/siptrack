import { UserButton, Show } from "@clerk/react";
import { Navigate } from "@tanstack/react-router";
import { WaterIntakeDashboard } from "./components/WaterIntakeDashboard";

export const WaterIntakePage = () => {
  return (
    <>
      <Show when="signed-out">
        <Navigate to="/sign-in/$" params={{ _splat: "" }} search={{ redirect_url: "/app" }} />
      </Show>

      <Show when="signed-in">
        <WaterIntakeDashboard account={<UserButton />} />
      </Show>
    </>
  );
};
