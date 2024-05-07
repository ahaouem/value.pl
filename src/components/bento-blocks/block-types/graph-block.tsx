"use client";

import { LineChart } from "@tremor/react";

const chartdata = [
  {
    date: "2024-05-05",
    value: 9,
  },
  {
    date: "2024-05-06",
    value: 10,
  },
  {
    date: "2024-05-07",
    value: 8,
  },
  {
    date: "2024-05-08",
    value: 7,
  },
  {
    date: "2024-05-09",
    value: 6,
  },
  {
    date: "2024-05-10",
    value: 5,
  },
  {
    date: "2024-05-11",
    value: 4,
  },
];

export default function GraphBlock() {
  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;

    return (
      <div className="flex w-10 items-center justify-center rounded-md border-none bg-white p-2 text-center">
        {payload.map((category, idx) => (
          <p key={idx} className="font-medium">
            {category.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <LineChart
      className="m-0 h-full w-full p-0"
      data={chartdata}
      index="date"
      categories={["value"]}
      colors={["blue"]}
      yAxisWidth={20}
      maxValue={10}
      minValue={1}
      customTooltip={customTooltip}
    />
  );
}
