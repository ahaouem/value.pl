"use client";
const tagValue = [
  { tag: "family", value: 2 },
  { tag: "friends", value: 4 },
  { tag: "school", value: 3 },
  { tag: "work", value: -1 },
  { tag: "studying", value: 5 },
  { tag: "well spent time", value: 3 },
  { tag: "hobby", value: 1 },
  { tag: "passion", value: -2 },
  { tag: "depressed", value: -4 },
  { tag: "bad time", value: -5 },
  { tag: "tiredness", value: 0 },
  { tag: "time away from home", value: -3 },
  { tag: "fresh air", value: 2 },
  { tag: "nature", value: 3 },
];
export default function RankBlock() {
  const top = tagValue.sort((a, b) => b.value - a.value).slice(0, 3);
  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-rose-950">
        What you value the most
      </h2>
      <ul className="space-y-1">
        {top.map((val, idx) => (
          <li className="text-rose-950">
            <span className="mr-0.5 text-rose-950/50">{idx + 1}.</span>{" "}
            {val.tag}
          </li>
        ))}
      </ul>
    </>
  );
}
