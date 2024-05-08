import { relations } from "drizzle-orm";
import { journal, journal_tag } from "./schema";

export const journalRelations = relations(journal, ({ many }) => ({
    tags: many(journal_tag),
}));
