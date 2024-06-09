"use client";
import { CustomTooltipProps, LineChart } from "@tremor/react";

const GraphBlock = ({
  moodData,
}: {
  moodData: {
    date: string;
    mood: number;
  }[];
}) => {
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
      <div className="flex items-center justify-center rounded-md border-none bg-background p-2 text-center">
        {payload.map((category, idx) => (
          <p key={idx} className="font-medium">
            {moods[(category?.value as number) ?? 0]?.tooltip}
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
      {moodData.length === 0 && (
        <div className="grid h-full w-full place-content-center">
          Add some journal entries to see your mood graph!
        </div>
      )}
      {moodData.length > 0 && (
        <LineChart
          className="![&_svg>g:has(.stroke-blue-500)]:stroke-red-500 m-0 h-full w-full p-0 [&_svg]:overflow-visible"
          data={moodData}
          index="date"
          showLegend={false}
          categories={["mood"]}
          colors={["blue"]}
          yAxisWidth={20}
          maxValue={6}
          valueFormatter={(value) => moods[value - 1]?.emoji ?? ""}
          minValue={0}
          customTooltip={customTooltip}
          showAnimation
          animationDuration={750}
        />
      )}
    </>
  );
};

export default GraphBlock;
