"use client"
import { CustomTooltipProps, LineChart } from "@tremor/react";
import { useEffect, useState } from "react";

const GraphBlock = () => {
  const [journalData, setJournalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/journal');
        const data = await response.json();
        setJournalData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      data={journalData}
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
};

export default GraphBlock;
