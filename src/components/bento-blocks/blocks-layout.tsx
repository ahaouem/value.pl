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
import { journals } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function BlocksLayout() {
  const { userId } = auth();
  const moodData = await db
    .select({ date: journals.date, mood: journals.mood })
    .from(journals)
    .where(eq(journals.userId, userId ?? ""));

  return (
    <section className="grid h-full grid-cols-1 gap-4 bg-transparent lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-violet-200">
        <SuggestionBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-rose-200">
        <RankBlock />
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
