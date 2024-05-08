import { connectToDatabase } from "./database";
import { tags, gratitudes, gratitudeTags } from "./schema";
import { db } from ".";

const insertTags = async (db) => {
  await db.insertInto(tags).values([
    { id: 0, tag_title: "friends" },
    { id: 1, tag_title: "family" },
  ]);
};

const insertGratitude = async (db) => {
  await db.insertInto(gratitudes).values([
    {
      user_id: 1,
      date: "2024-05-08",
      mood_value: 5,
      content: "test",
    },
  ]);
};

const insertGratitudeTags = async (db) => {
  await db.insertInto(gratitudeTags).values([
    { gratitude_id: 1, tag_id: 0 }, // Links to "friends"
    { gratitude_id: 1, tag_id: 1 }, // Links to "family"
  ]);
};

export const insertExampleData = async () => {
  const db = await connectToDatabase();

  await insertTags(db);
  await insertGratitude(db);
  await insertGratitudeTags(db);
};

insertExampleData().catch(console.error);
