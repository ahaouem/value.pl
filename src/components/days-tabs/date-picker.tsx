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
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="ml-2 flex w-fit items-center gap-x-2 font-semibold max-sm:my-2 max-sm:justify-center sm:mb-2 sm:text-lg">
          <span>
            {months[0]}
            {months[0] !== months[1] ? ` - ${months[1]}` : ""}
            {value ? `, ${value.getFullYear()}` : ""}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-4 w-auto p-0">
        <Calendar
          required
          disabled={disabled}
          mode="single"
          selected={value}
          onSelect={(value) => {
            value?.setDate(value?.getDate() + 1);
            onChange?.(value ?? new Date());
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
