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
  const mood = ["😔", "😞", "😕", "😐", "😃", "😄", "😊"];
  return (
    <div
      className={cn("flex w-full flex-row justify-evenly", className)}
      {...props}
    >
      {mood.map((mood, idx) => (
        <button
          onClick={() => onChange(idx)}
          key={idx}
          className={cn(
            "transform p-4 text-7xl opacity-70 transition-all hover:scale-110 hover:opacity-90",
            idx === value && "scale-150 opacity-100 hover:scale-150",
          )}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
