import React from "react";
import { WobbleCard } from "./wobble-card";
import {
  GraphBlock,
  QuoteBlock,
  RankBlock,
  StreakBlock,
  SuggestionBlock,
} from "./block-types";
import { db } from "@/server/db";
import { journalTopics, journals, topics } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, count } from "drizzle-orm";

export default async function BlocksLayout() {
  const { userId } = auth();
  const moodData = await db
    .select({ date: journals.date, mood: journals.mood })
    .from(journals)
    .where(eq(journals.userId, userId ?? ""));

  const rankData = await db
    .select({ value: topics.value })
    .from(journalTopics)
    .leftJoin(topics, eq(journalTopics.topicId, topics.id))
    .leftJoin(journals, eq(journalTopics.journalId, journals.id))
    .where(eq(journals.userId, userId ?? ""))
    .groupBy(topics.value)
    .orderBy(desc(count(journalTopics.topicId)))
    .limit(3);

  return (
    <section className="grid h-full grid-cols-1 gap-4 bg-transparent lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-violet-200">
        <SuggestionBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-rose-200">
        <RankBlock rankData={rankData} />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-amber-200">
        <StreakBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-sky-200 min-h-[12rem]">
        <GraphBlock moodData={moodData} />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-green-200">
        <QuoteBlock />
      </WobbleCard>
    </section>
  );
}
