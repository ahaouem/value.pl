"use client";
import { useState } from "react";
import DaysList from "./days-tabs/days-list";
import { MoodPicker } from "./mood-picker/mood-picker";

export default function LeftSection() {
  const [mood, setMood] = useState(4);
  return (
    <div className="h-[calc(100vh-2rem)] bg-zinc-100 p-2 md:p-4 lg:h-screen">
      <div className="w-full">
        <DaysList firstDate={new Date("2021-09-01")} />
        <MoodPicker value={mood} onChange={(value) => setMood(value)} />
      </div>
    </div>
  );
}
