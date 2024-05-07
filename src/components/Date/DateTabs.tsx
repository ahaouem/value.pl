"use client";

import { Tabs, TabsContent, TabsList } from "@/components/ui/Tabs";
import DateBlock from "./DateBlock";
import { useState } from "react";

export default function DateTabs() {
  const [currentDateTab, setCurrentDateTab] = useState(new Date());

  const date_mocks = [
    "2024-05-05",
    "2024-05-06",
    "2024-05-07",
    "2024-05-08",
    "2024-05-09",
    "2024-05-10",
    "2024-05-11",
  ];

  return (
    <Tabs className="w-[500px]">
      <TabsList className="flex h-auto w-full items-center justify-between gap-x-2">
        {/* todo: add current DateTab */}
        {date_mocks.map((date) => (
          <DateBlock
            key={date}
            date={new Date(date)}
            isActive={currentDateTab.toISOString() === date}
          />
        ))}
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
