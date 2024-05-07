"use client";
import React from "react";
import { WobbleCard } from "./wobble-card";
import QuoteBlock from "./block-types/quote-block";
import RankBlock from "./block-types/rank-block";
import GraphBlock from "./block-types/graph-block";

export default function BlocksLayout() {
  return (
    <div className="mx-auto grid h-[650px] w-full grid-cols-1 gap-4 lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800">
        <QuoteBlock />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <RankBlock />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900">
        <GraphBlock />
      </WobbleCard>
    </div>
  );
}
