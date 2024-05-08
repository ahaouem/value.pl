import { moods } from "./mood-picker";

export default function Journal({
  data,
}: {
  data: {
    userId: string;
    date: string;
    id: string;
    created_at: string;
    updated_at: string;
    mood: number;
    notes: string;
    topics: string[];
  };
}) {
  const mood = moods?.[data?.mood ?? 0];
  return (
    <div className="mt-3.5 flex flex-col items-center justify-center space-y-12 p-2 py-16 text-center sm:p-8">
      <p className="mx-auto gap-2 text-2xl text-muted-foreground">
        On this day, you felt{" "}
        <span className="font-semibold italic text-foreground">
          {mood?.tooltip}
        </span>
        <span className="leading-2 text-4xl- px-2">{mood?.emoji}</span>
      </p>
      <div className="space-y-6">
        <p className="text-2xl text-muted-foreground">
          And here's what you wrote:
        </p>
        <p className="max-w-lg text-lg italic">{data?.notes}</p>
      </div>
      {data?.topics?.length > 0 && (
        <p className="text-sm">Valuing {data?.topics?.join(", ")}</p>
      )}
    </div>
  );
}
