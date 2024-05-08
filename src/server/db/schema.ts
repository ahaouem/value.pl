import { relations } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `value_${name}`);

export const topics = createTable("topic", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  value: text("value", { length: 256 }).notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
  updated_at: text("updated_at")
    .$onUpdate(() => new Date().toDateString())
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
});

export const journalTopics = createTable("journal_topic", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  journalId: int("journalId", { mode: "number" }).notNull(),
  topicId: int("topicId", { mode: "number" }).notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
  updated_at: text("updated_at")
    .$onUpdate(() => new Date().toDateString())
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
});

export const journals = createTable("journal", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("userId", { length: 256 }).notNull(),
  date: text("date", { length: 256 }).notNull(),
  mood: int("mood", { mode: "number" }).notNull(),
  notes: text("notes", { length: 256 }).notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
  TP: text("tags", { length: 256 }).references(() => topics.value),
  TN: text("tags", { length: 256 }).references(() => topics.value),
  FP: text("tags", { length: 256 }).references(() => topics.value),
  FN: text("tags", { length: 256 }).references(() => topics.value),
  updated_at: text("updated_at")
    .$onUpdate(() => new Date().toDateString())
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
});

export const journalRelations = relations(journals, ({ many }) => ({
  tags: many(topics),
}));

export const tagRelations = relations(journalTopics, ({ many }) => ({
  journals: many(journals),
}));

export const journalTopicsRelations = relations(journalTopics, ({ one }) => ({
  journal: one(journals, {
    fields: [journalTopics.journalId],
    references: [journals.id],
  }),
  topic: one(topics, {
    fields: [journalTopics.topicId],
    references: [topics.id],
  }),
}));
