import { describe, expect, test } from "bun:test";
import { api } from "../app";
import { createHealthRoutes } from "./health";

describe("GET /api/health", () => {
  test("returns the service health status", async () => {
    const response = await api.request("/api/health");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      status: "ok",
      service: "siptrack",
    });
  });
});

describe("GET /ready", () => {
  test("reports a ready database after a successful probe", async () => {
    const routes = createHealthRoutes(async () => undefined);
    const response = await routes.request("/ready");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok", service: "siptrack", database: "ready" });
  });

  test("returns 503 without exposing connection details when the database is unavailable", async () => {
    const routes = createHealthRoutes(async () => { throw new Error("private connection details"); });
    const response = await routes.request("/ready");
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "unavailable", service: "siptrack", database: "unavailable" });
  });
});
