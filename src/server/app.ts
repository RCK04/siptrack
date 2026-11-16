import { Hono } from "hono";
import { healthRoutes } from "./routes/health";

export const createApi = () => {
  const app = new Hono().basePath("/api");

  app.route("/health", healthRoutes);

  return app;
};

export const api = createApi();
