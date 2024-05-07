import clsx from "clsx";
import { TabsTrigger } from "../ui/Tabs";

export default function DateBlock({
  date,
  isActive,
}: {
  date: Date;
  isActive: boolean;
}) {
  const today: Date = new Date();

  return (
    <TabsTrigger
      disabled={date > today}
      value={date.toISOString()}
      className={clsx(
        "flex h-14 w-20 flex-col items-center justify-between",
        isActive && "bg-blue-500 text-white",
        date > today && "cursor-not-allowed opacity-50",
        date <= today && "cursor-pointer",
      )}
    >
      <div className="text-lg">
        {date.toLocaleString("en-US", { day: "numeric" })}
      </div>
      <div>{date.toLocaleString("en-US", { weekday: "short" })}</div>
    </TabsTrigger>
  );
}
