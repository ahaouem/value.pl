import Journal from "@/components/journal";
import JournalForm from "@/components/journal-form/form";
import { db } from "@/server/db";
import { journalTopics, journals, streaks, topics } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { count, desc, eq, sql } from "drizzle-orm";
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
      ),
  });

  if (!yesterdaysJournal) {
    const streak = await db.query.streaks.findFirst({
      where: (model, { eq }) => eq(model.userId, userId ?? ""),
    });

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

  // const c = await db.query.journalTopics.findMany({
  //   where: (model, { eq }) => eq(model.journalId, journal?.id ?? ""),
  // });
  const d = await db
    .select({ value: topics.value })
    .from(journalTopics)
    .leftJoin(topics, eq(journalTopics.topicId, topics.id))
    .leftJoin(journals, eq(journalTopics.journalId, journals.id))
    .where(eq(journals.userId, userId ?? ""))
    .groupBy(topics.value)
    .orderBy(desc(count(journalTopics.topicId)))
    .limit(3);
  console.log(d);
  return journal ? (
    <Journal dayDesc={journal.notes} mood={journal.mood} tags={[]} />
  ) : (
    <>
      <JournalForm date={date} />
    </>
  );
}
