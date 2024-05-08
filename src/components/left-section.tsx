"use client";
import DaysList from "./days-tabs/days-list";
import Journal from "./journal";
import Form from "./journal-form/form";

export default function LeftSection() {
  const today = new Date();
  return (
    <div className="bg-muted p-2 md:p-4 lg:h-screen">
      <div className="w-full">
        <DaysList firstDate={today} />
        {/* <Form /> */}
        <Journal dayDesc="test" mood={3} tags={["tag1"]} />
      </div>
    </div>
  );
}
