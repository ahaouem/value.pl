"use client";

export default function RankBlock({
  rankData,
}: {
  rankData: {
    value: string | null;
  }[];
}) {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-rose-950">
        What do you value the most
      </h2>
      <ul className="space-y-1">
        {rankData.length === 0 ? (
          <div className="grid h-full w-full place-content-center">
            Add some journal entries to see your mood graph!
          </div>
        ) : null}
        {rankData.map((topic, idx) => (
          <li key={idx} className="text-rose-950 first:text-lg last:text-sm">
            <span className="mr-0.5 text-rose-950/50">{idx + 1}.</span>{" "}
            {topic.value}
          </li>
        ))}
      </ul>
    </>
  );
}
