"use client";

import Image from "next/image";
import React from "react";
import { WobbleCard } from "./WobbleCard";
import BlockQuote from "./BlockTypes/QuoteBlock";
import RankBlock from "./BlockTypes/RankBlock";
import GraphBlock from "./BlockTypes/GraphBlock";

export default function BlocksLayout() {
  return (
    <div className="mx-auto grid h-[650px] w-full grid-cols-1 gap-4 lg:grid-cols-3">
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800">
        <BlockQuote />
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
