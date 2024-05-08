"use client";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function DatePicker({
  months,
  onChange,
  value,
  disabled,
}: {
  months: [string, string];
  onChange?: (date: Date) => void;
  value?: Date;
  disabled?: CalendarProps["disabled"];
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="ml-2 flex w-fit items-center gap-x-2 font-semibold max-sm:my-2 max-sm:justify-center sm:mb-2 sm:text-lg">
          {today.toDateString() === value?.toDateString() ? (
            <span>Today</span>
          ) : yesterday.toDateString() === value?.toDateString() ? (
            <span>Yesterday</span>
          ) : (
            <span>
              {months[0]}
              {months[0] !== months[1] ? ` - ${months[1]}` : ""}
              {value ? `, ${value.getFullYear()}` : ""}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="ml-4 w-[calc(100vw-2rem)] p-0 sm:w-auto">
        <Calendar
          required
          disabled={disabled}
          mode="single"
          selected={value}
          onSelect={(value) => {
            onChange?.(value ?? new Date());
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
