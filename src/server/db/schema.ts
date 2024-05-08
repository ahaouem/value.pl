// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `value_${name}`);

export const journal_tag = createTable("journal_tag", {
  value: text("value", { length: 256 }).primaryKey(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").$onUpdate(() => new Date().toDateString()),
});

export const journal = createTable("journal", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("userId", { length: 256 }),
  date: text("date", { length: 256 }),
  mood: int("mood", { mode: "number" }),
  notes: text("notes", { length: 256 }),
  tags: text("tags", { length: 256 }).references(() => journal_tag.value),
  TP: text("tags", { length: 256 }).references(() => journal_tag.value),
  TN: text("tags", { length: 256 }).references(() => journal_tag.value),
  FP: text("tags", { length: 256 }).references(() => journal_tag.value),
  FN: text("tags", { length: 256 }).references(() => journal_tag.value),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").$onUpdate(() => new Date().toDateString()),
});
