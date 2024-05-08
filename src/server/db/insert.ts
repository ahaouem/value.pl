import { journal, journal_tag } from "./schema";
import { db } from ".";

const insertJournal = async () => {
  await db.insert(journal).values([
    {
      id: 1,
      userId: 1,
      date: "2024-05-07",
      mood: 3,
      notes: "Hello",
      tags: [],
      created_at: "2024-05-07",
      updated_at: "2024-05-07",
    },
  ]);
};

const insertJournaTags = async () => {
  await db.insert(journal_tag).values([
    {
      value: "happy",
      created_at: "2024-05-07",
      updated_at: "2024-05-07",
    },
  ]);
};

export const insertExampleData = async () => {
  await insertJournal();
  await insertJournaTags();
};

insertExampleData().catch(console.error);
