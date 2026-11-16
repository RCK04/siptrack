import { eq } from "drizzle-orm";
import { databaseClient, db } from "../src/server/db";
import { users, waterGoals, waterIntakes } from "../src/server/db/schema";

const seedUser = {
  clerkUserId: "seed_user_siptrack",
};

const now = new Date();

const main = async () => {
  const [user] = await db
    .insert(users)
    .values(seedUser)
    .onConflictDoUpdate({
      target: users.clerkUserId,
      set: {
        updatedAt: now,
      },
    })
    .returning();

  if (!user) {
    throw new Error("Could not create seed user.");
  }

  await db.delete(waterGoals).where(eq(waterGoals.userId, user.id));
  await db.delete(waterIntakes).where(eq(waterIntakes.userId, user.id));

  await db.insert(waterGoals).values({
    userId: user.id,
    dailyTargetMl: 2000,
    startsOn: now.toISOString().slice(0, 10),
  });

  await db.insert(waterIntakes).values([
    {
      userId: user.id,
      amountMl: 500,
      consumedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8),
      note: "Morning glass of water",
    },
    {
      userId: user.id,
      amountMl: 700,
      consumedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13),
      note: "Lunch refill",
    },
    {
      userId: user.id,
      amountMl: 300,
      consumedAt: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18),
      note: "Evening intake",
    },
  ]);

  console.log("Database seeded successfully.");
};

try {
  await main();
} finally {
  await databaseClient.end();
}
