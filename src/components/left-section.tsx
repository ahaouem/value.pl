"use client";
import DaysList from "./days-tabs/days-list";
import Form from "./journal-form/form";

export default function LeftSection() {
  return (
    <div className="bg-muted p-2 md:p-4 lg:h-screen">
      <div className="w-full">
        <DaysList firstDate={new Date("2021-09-01")} />
        <Form />
      </div>
    </div>
  );
}
