import { databaseClient } from "../src/server/db";

try {
  const [connection] = await databaseClient`
    SELECT current_database() AS database, current_schema() AS schema,
      to_regclass('public.users') IS NOT NULL AS users,
      to_regclass('public.water_goals') IS NOT NULL AS water_goals,
      to_regclass('public.water_intakes') IS NOT NULL AS water_intakes
  `;
  console.table([connection]);

  if (!connection?.users || !connection.water_goals || !connection.water_intakes) {
    throw new Error("Required tables are missing. Run bun run db:migrate.");
  }

  if (process.argv.includes("--users")) {
    const users = await databaseClient`SELECT * FROM public.users ORDER BY created_at DESC`;
    console.table(users);
    console.log(`${users.length} local users. Clerk users appear here only after server-side synchronization is implemented.`);
  } else {
    const [counts] = await databaseClient`
      SELECT (SELECT count(*) FROM public.users) AS users,
        (SELECT count(*) FROM public.water_goals) AS water_goals,
        (SELECT count(*) FROM public.water_intakes) AS water_intakes
    `;
    console.table([counts]);
    console.log("Database connection and required tables are ready.");
  }
} catch (error) {
  console.error(error instanceof Error && error.message.startsWith("Required tables")
    ? error.message
    : "Database check failed. Check DATABASE_URL, the host port, and whether PostgreSQL is running.");
  process.exitCode = 1;
} finally {
  await databaseClient.end();
}
