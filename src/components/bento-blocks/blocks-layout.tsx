import React from "react";
import { WobbleCard } from "./wobble-card";
import {
  GraphBlock,
  QuoteBlock,
  RankBlock,
  StreakBlock,
  SuggestionBlock,
} from "./block-types";

export default function BlocksLayout() {
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

      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-sky-200">
        <GraphBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-green-200">
        <QuoteBlock />
      </WobbleCard>
    </section>
  );
}
