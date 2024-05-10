"use client";

export default function RankBlock({
  rankData,
}: {
  rankData: {
    value: string | null;
  }[];
}) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16.933333 21.1666675"
        className="absolute -bottom-4 right-2 size-16 rotate-12 fill-rose-400/25 dark:fill-rose-400/10 lg:-right-4 lg:-top-12 lg:size-24"
      >
        <g>
          <path
            d="m 8.4646014,2.6955846 a 0.85947485,0.85947485 0 0 0 -0.739376,0.418783 l -2.860994,4.818117 -3.460215,-2.839173 A 0.85947485,0.85947485 0 0 0 0.02093841,5.9468266 L 1.7397154,13.568868 a 0.85947485,0.85947485 0 0 0 0.837569,0.66888 H 14.351919 a 0.85947485,0.85947485 0 0 0 0.840086,-0.66888 l 1.719617,-7.6220414 a 0.85947485,0.85947485 0 0 0 -1.386435,-0.853515 l -3.45686,2.839173 -2.8643486,-4.818117 a 0.85947485,0.85947485 0 0 0 -0.739377,-0.418783 z"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <h2 className="mb-4 text-xl font-bold text-rose-950 dark:text-rose-100">
        What do you value the most
      </h2>
      <ul className="space-y-1">
        {rankData.length === 0 ? (
          <div className="grid h-full w-full place-content-center text-rose-950 dark:text-rose-300">
            Add some journal entries to see your mood graph!
          </div>
        ) : null}
        {rankData.map((topic, idx) => (
          <li
            key={idx}
            className="text-rose-950 first:text-lg last:text-sm dark:text-rose-300"
          >
            <span className="mr-1 text-rose-950/50 dark:text-rose-300/50">
              {idx + 1}.
            </span>
            {topic.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
