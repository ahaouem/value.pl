import { cn } from "@/lib/utils";
import { TabsTrigger } from "../ui/regular-tabs";

export type DayType = {
  date: string;
  dayOfWeek: string;
  dayOfMonth: number;
  disabled: boolean;
};

export function Day({ day: { disabled, date } }: { day: DayType }) {
  const today: Date = new Date();

  return (
    <TabsTrigger
      disabled={disabled}
      value={date}
      className={cn(
        "flex w-full flex-col items-center justify-between gap-0.5 max-md:p-1",
        today.toDateString() === new Date(date).toDateString() &&
          "ring-foreground/20 ring-1 data-[state=active]:ring-0",
      )}
    >
      <div className="max-sm:text-xs">
        {new Date(date).toLocaleString("en-US", { weekday: "short" })}
      </div>
      <div className="font-semibold md:text-lg">
        {new Date(date).toLocaleString("en-US", { day: "numeric" })}
      </div>
    </TabsTrigger>
  );
}
