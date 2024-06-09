import { db } from "@/server/db";
import { journalTopics, journals, topics } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { asc, count, desc, eq, not } from "drizzle-orm";
import {
  GraphBlock,
  QuoteBlock,
  RankBlock,
  StreakBlock,
  SuggestionBlock,
} from "./block-types";
import { WobbleCard } from "./wobble-card";

export default async function BlocksLayout() {
  const { userId } = auth();
  const moodData = await db
    .select({ date: journals.date, mood: journals.mood })
    .from(journals)
    .where(eq(journals.userId, userId ?? ""));

  const rankData = await db
    .selectDistinct({ value: topics.value })
    .from(journalTopics)
    .leftJoin(topics, eq(journalTopics.topicId, topics.id))
    .leftJoin(journals, eq(journalTopics.journalId, journals.id))
    .where(eq(journals.userId, userId ?? ""))
    .groupBy(topics.value)
    .having(not(eq(count(topics.value), 0)))
    .orderBy(desc(count(topics.value)))
    .limit(3);

  const isTodayStreak = !!(await db.query.journals.findFirst({
    where: (model, { eq, and }) =>
      and(
        eq(model.date, new Date().toDateString()),
        eq(model.userId, userId ?? ""),
        eq(model.created_at, new Date().toDateString()),
      ),
  }));

  return (
    <section className="grid h-full grid-cols-1 gap-4 bg-transparent lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-violet-200 dark:bg-violet-950">
        <SuggestionBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-rose-200 dark:bg-rose-950">
        <RankBlock rankData={rankData} />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-amber-200 dark:bg-amber-950">
        <StreakBlock isTodayStreak={isTodayStreak} />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-sky-200 min-h-[12rem] dark:bg-sky-950">
        <GraphBlock moodData={moodData} />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-green-200 dark:bg-green-950">
        <QuoteBlock />
      </WobbleCard>
    </section>
  );
}
