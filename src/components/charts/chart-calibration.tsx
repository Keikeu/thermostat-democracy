"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { ChartLegend } from "./legend";
import { useSharedChartElements } from "./shared";

const chartConfig = {
  comfortableCount: {
    label: "Temperature Estimation",
    color: "var(--coral-glassy-opaque)",
  },
} satisfies ChartConfig;

export function ChartCalibration({
  data,
  currentTemp,
  sweetSpot,
}: {
  data: { temperature: number; comfortableCount: number }[];
  currentTemp: number;
  sweetSpot: number;
}) {
  const sharedElements = useSharedChartElements({
    sweetSpot: sweetSpot,
    currentTemp: currentTemp,
  });

  return (
    <div className="flex flex-col gap-8 mt-8 bg-background p-8">
      <span className="text-sm uppercase text-brown">
        Current temperature estimation
      </span>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] h-[280px] pt-4 pr-4 w-full"
      >
        <BarChart accessibilityLayer data={data}>
          {sharedElements}
          <Bar
            dataKey="comfortableCount"
            fill="var(--color-comfortableCount)"
          />
        </BarChart>
      </ChartContainer>
      <ChartLegend />
    </div>
  );
}
