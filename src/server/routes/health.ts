import { Hono } from "hono";

async function checkDatabase() {
  const { databaseClient } = await import("../db");
  await databaseClient`SELECT 1 FROM public.users, public.water_goals, public.water_intakes LIMIT 0`;
}

export function createHealthRoutes(checkReadiness: () => Promise<unknown> = checkDatabase) {
  return new Hono()
    .get("/", c => c.json({ status: "ok", service: "siptrack" }))
    .get("/ready", async c => {
      try {
        await checkReadiness();
        return c.json({ status: "ok", service: "siptrack", database: "ready" });
      } catch {
        return c.json({ status: "unavailable", service: "siptrack", database: "unavailable" }, 503);
      }
    });
}

export const healthRoutes = createHealthRoutes();
