import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const moods = [
  { emoji: "😔", tooltip: "anxious" },
  { emoji: "😞", tooltip: "worried" },
  { emoji: "😕", tooltip: "uneasy" },
  { emoji: "😐", tooltip: "unsure" },
  { emoji: "😃", tooltip: "calm" },
  { emoji: "😄", tooltip: "happy" },
  { emoji: "😊", tooltip: "serene" },
];

export function MoodPicker({
  value,
  onChange,
  className,
  ...props
}: {
  value: number;
  onChange: (value: number) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex w-full flex-row justify-between", className)}
      {...props}
    >
      {moods.map((mood, idx) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => onChange(idx)}
              key={idx}
              type="button"
              className={cn(
                "transform text-2xl transition-all hover:scale-105 md:text-4xl lg:text-6xl",
                idx === value
                  ? "scale-125 hover:scale-125"
                  : "opacity-70 hover:opacity-90",
              )}
            >
              {mood.emoji}
            </TooltipTrigger>
            <TooltipContent>{mood.tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
