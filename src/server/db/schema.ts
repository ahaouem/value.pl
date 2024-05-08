import { relations } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import cuid from "cuid";

export const createTable = sqliteTableCreator((name) => `value_${name}`);

export const topics = createTable("topic", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => cuid()),
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
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => cuid()),
  journalId: text("journalId").notNull(),
  topicId: text("topicId").notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
  updated_at: text("updated_at")
    .$onUpdate(() => new Date().toDateString())
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
});

export const journals = createTable("journal", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => cuid()),
  userId: text("userId", { length: 256 }).notNull(),
  date: text("date", { length: 256 }).notNull(),
  mood: int("mood", { mode: "number" }).notNull(),
  notes: text("notes", { length: 256 }).notNull(),
  created_at: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
  updated_at: text("updated_at")
    .$onUpdate(() => new Date().toDateString())
    .notNull()
    .$defaultFn(() => new Date().toDateString()),
});

export const journalRelations = relations(journals, ({ many }) => ({
  topics: many(topics, { relationName: "journalTopics" }),
}));

export const tagRelations = relations(journalTopics, ({ many }) => ({
  journals: many(journals, { relationName: "journalTopics" }),
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
