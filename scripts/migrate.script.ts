import { migrate } from "drizzle-orm/postgres-js/migrator";
import { databaseClient, db } from "../src/server/db";

try {
  await migrate(db, {
    migrationsFolder: new URL("../src/server/db/drizzle/", import.meta.url).pathname,
  });
  console.log("Database migrations applied successfully.");
} catch {
  console.error("Database migration failed. Check DATABASE_URL and database availability.");
  process.exitCode = 1;
} finally {
  await databaseClient.end();
}
