"use client";

import { CustomTooltipProps, LineChart } from "@tremor/react";

const chartdata = [
  {
    date: new Date("2024-05-02").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 7,
  },
  {
    date: new Date("2024-05-03").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 5,
  },
  {
    date: new Date("2024-05-04").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 3,
  },
  {
    date: new Date("2024-05-05").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 7,
  },
  {
    date: new Date("2024-05-06").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 2,
  },
  {
    date: new Date("2024-05-07").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 5,
  },
  {
    date: new Date("2024-05-08").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 4,
  },
];

export default function GraphBlock() {
  const moods = [
    { emoji: "😔", tooltip: "anxious" },
    { emoji: "😞", tooltip: "worried" },
    { emoji: "😕", tooltip: "uneasy" },
    { emoji: "😐", tooltip: "unsure" },
    { emoji: "😃", tooltip: "calm" },
    { emoji: "😄", tooltip: "happy" },
    { emoji: "😊", tooltip: "serene" },
  ];
  const customTooltip = (props: CustomTooltipProps) => {
    const { payload, active } = props;
    if (!active || !payload) return null;

    return (
      <div className="flex items-center justify-center rounded-md border-none bg-white p-2 text-center">
        {payload.map((category, idx) => (
          <p key={idx} className="font-medium">
            {moods[((category?.value as number) ?? 0) - 1]?.tooltip}
          </p>
        ))}
      </div>
    );
  };
  const classNames = ["stroke-blue-500 fill-blue-500"];
  return (
    <LineChart
      className="m-0 h-full w-full p-0 [&_svg]:overflow-visible"
      data={chartdata}
      index="date"
      showLegend={false}
      categories={["value"]}
      colors={["blue"]}
      yAxisWidth={20}
      maxValue={7}
      valueFormatter={(value) => moods[value - 1]?.emoji ?? ""}
      minValue={1}
      customTooltip={customTooltip}
    />
  );
}
