import { cn } from "@/lib/utils";

export function MoodPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const mood = ["😔", "😞", "😕", "😐", "😃", "😄", "😊"];
  return (
    <div className="flex w-full flex-row">
      {mood.map((mood, idx) => (
        <button
          onClick={() => onChange(idx)}
          className={cn(
            "transform p-4 text-4xl opacity-70 transition-all hover:scale-110 hover:opacity-90",
            idx === value && "scale-150 opacity-100 hover:scale-150",
          )}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
