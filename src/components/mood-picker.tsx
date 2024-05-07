import { cn } from "@/lib/utils";

export function MoodPicker({
  value,
  onChange,
  className,
  ...props
}: {
  value: number;
  onChange: (value: number) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  const moods = ["😔", "😞", "😕", "😐", "😃", "😄", "😊"];
  return (
    <div
      className={cn("flex w-full flex-row justify-between", className)}
      {...props}
    >
      {moods.map((mood, idx) => (
        <button
          onClick={() => onChange(idx)}
          key={idx}
          className={cn(
            "transform text-2xl transition-all hover:scale-105 md:text-4xl lg:text-6xl",
            idx === value
              ? "scale-125 hover:scale-125"
              : "opacity-70 hover:opacity-90",
          )}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
