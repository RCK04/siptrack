import { relations } from "drizzle-orm";
import { date, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const timestamps = () => ({
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  ...timestamps(),
});

export const waterGoals = pgTable("water_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dailyTargetMl: integer("daily_target_ml").notNull(),
  startsOn: date("starts_on").notNull(),
  endsOn: date("ends_on"),
  ...timestamps(),
});

export const waterIntakes = pgTable("water_intakes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amountMl: integer("amount_ml").notNull(),
  consumedAt: timestamp("consumed_at", { withTimezone: true }).notNull(),
  note: text("note"),
  ...timestamps(),
});

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(waterGoals),
  intakes: many(waterIntakes),
}));

export const waterGoalsRelations = relations(waterGoals, ({ one }) => ({
  user: one(users, {
    fields: [waterGoals.userId],
    references: [users.id],
  }),
}));

export const waterIntakesRelations = relations(waterIntakes, ({ one }) => ({
  user: one(users, {
    fields: [waterIntakes.userId],
    references: [users.id],
  }),
}));
