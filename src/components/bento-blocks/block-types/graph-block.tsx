"use client";

import { CustomTooltipProps, LineChart } from "@tremor/react";

const chartdata = [
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
    value: 5,
  },
  {
    date: new Date("2024-05-07").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 3,
  },
  {
    date: new Date("2024-05-08").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 7,
  },
  {
    date: new Date("2024-05-09").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 2,
  },
  {
    date: new Date("2024-05-10").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 5,
  },
  {
    date: new Date("2024-05-11").toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    value: 4,
  },
];

export default function GraphBlock() {
  const moods = ["😔", "😞", "😕", "😐", "😃", "😄", "😊"];
  const customTooltip = (props: CustomTooltipProps) => {
    const { payload, active } = props;
    if (!active || !payload) return null;

    return (
      <div className="flex w-10 items-center justify-center rounded-md border-none bg-white p-2 text-center">
        {payload.map((category, idx) => (
          <p key={idx} className="font-medium">
            {moods[((category?.value as number) ?? 0) - 1]}
          </p>
        ))}
      </div>
    );
  };
  const classNames = ["stroke-blue-500 fill-blue-500"];
  return (
    <LineChart
      className="m-0 h-full w-full p-0"
      data={chartdata}
      index="date"
      showLegend={false}
      categories={["value"]}
      colors={["blue"]}
      yAxisWidth={20}
      maxValue={7}
      valueFormatter={(value) => moods[value - 1] ?? ""}
      minValue={1}
      customTooltip={customTooltip}
    />
  );
}
