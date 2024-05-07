import { cn } from "@/lib/utils";
import { TabsTrigger } from "../ui/regular-tabs";

export type DayType = {
  date: string;
  dayOfWeek: string;
  dayOfMonth: number;
  disabled: boolean;
};

export function Day({ date, disabled }: { date: Date; disabled: boolean }) {
  const today: Date = new Date();

  return (
    <TabsTrigger
      disabled={disabled}
      value={date.toISOString().slice(0, 10)}
      className={cn(
        "flex h-14 w-20 flex-col items-center justify-between",
        today.toDateString() === date.toDateString() &&
          "ring-1 ring-zinc-300 data-[state=active]:ring-0",
      )}
    >
      <div className="text-lg">
        {date.toLocaleString("en-US", { day: "numeric" })}
      </div>
      <div>{date.toLocaleString("en-US", { weekday: "short" })}</div>
    </TabsTrigger>
  );
}
