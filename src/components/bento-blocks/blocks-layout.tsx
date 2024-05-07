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
    <section className="grid h-full grid-cols-1 gap-8 bg-transparent p-10 lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-[#9779EE]">
        <SuggestionBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-[#FA6D6D]">
        <RankBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 bg-[#EAEE64]">
        <StreakBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-[#7FD9FF]">
        <GraphBlock />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-[#8AEFAC]">
        <QuoteBlock />
      </WobbleCard>
    </section>
  );
}
