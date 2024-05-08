import Journal from "@/components/journal";
import JournalForm from "@/components/journal-form";
import { db } from "@/server/db";
import {
  journalTopics,
  journals,
  streaks,
  topics as topicsTable,
} from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, count, eq } from "drizzle-orm";
type Journal = {
  date: string;
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  mood: number;
  notes: string;
  TP: string | null;
  TN: string | null;
  FP: string | null;
  FN: string | null;
};
export default async function HomePage({
  searchParams: { date },
}: {
  searchParams: { date?: string | null };
}) {
  if (!date) return null;
  const { userId } = auth();
  const journal = await db.query.journals.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.date, date), eq(model.userId, userId ?? "")),
  });
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdaysJournal = await db.query.journals.findFirst({
    where: (model, { eq, and }) =>
      and(
        eq(model.date, yesterday.toDateString()),
        eq(model.userId, userId ?? ""),
        eq(model.created_at, yesterday.toDateString()),
      ),
  });
  const todaysJournal = await db.query.journals.findFirst({
    where: (model, { eq, and }) =>
      and(
        eq(model.date, new Date().toDateString()),
        eq(model.userId, userId ?? ""),
        eq(model.created_at, new Date().toDateString()),
      ),
  });

  const streak = await db.query.streaks.findFirst({
    where: (model, { eq }) => eq(model.userId, userId ?? ""),
  });
  if (!yesterdaysJournal && !todaysJournal) {
    if (streak) {
      await db
        .update(streaks)
        .set({
          value: 0,
        })
        .where(eq(streaks.userId, userId ?? ""));
    } else {
      await db.insert(streaks).values({
        userId: userId ?? "",
        value: 0,
      });
    }
  }
  if (!yesterdaysJournal && todaysJournal) {
    if (streak) {
      await db
        .update(streaks)
        .set({
          value: 1,
        })
        .where(eq(streaks.userId, userId ?? ""));
    } else {
      await db.insert(streaks).values({
        userId: userId ?? "",
        value: 1,
      });
    }
  }

  const topicsList = await db
    .select({ value: topicsTable.value, count: count(journalTopics.topicId) })
    .from(journalTopics)
    .leftJoin(topicsTable, eq(journalTopics.topicId, topicsTable.id))
    .leftJoin(journals, eq(journalTopics.journalId, journals.id))
    .where(
      and(
        eq(journals.userId, userId ?? ""),
        eq(journals.id, journal?.id ?? ""),
      ),
    );

  return journal ? (
    <Journal
      data={{
        ...journal,
        topics: topicsList.map((t) => t.value).filter(Boolean) as string[],
      }}
    />
  ) : (
    <>
      <JournalForm date={date} />
    </>
  );
}
