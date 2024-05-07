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
    <button
      onClick={() => {
        console.log(top);
      }}
    >
      test
    </button>
  );
}
