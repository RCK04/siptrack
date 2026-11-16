import { sql } from "drizzle-orm";
import { databaseClient, db } from "../src/server/db";

const main = async () => {
  if (process.env.CONFIRM_DB_RESET !== "true") {
    throw new Error("Set CONFIRM_DB_RESET=true to reset the database.");
  }

  await db.execute(sql`
    TRUNCATE TABLE water_intakes, water_goals, users
    RESTART IDENTITY
    CASCADE;
  `);

  console.log("Database reset successfully.");
};

try {
  await main();
} finally {
  await databaseClient.end();
}
