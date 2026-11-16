import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "../env";
import * as schema from "./schema";

export const databaseClient = postgres(serverEnv.databaseUrl(), {
  max: 10,
  connect_timeout: 5,
  idle_timeout: 20,
});

export const db = drizzle(databaseClient, { schema });

export type Database = typeof db;
