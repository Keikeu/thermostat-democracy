"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { ChartLegend } from "./legend";
import { useSharedChartElements } from "./shared";

const chartConfig = {
  estimatedCount: {
    label: "Temperature Estimation",
    color: "var(--coral-glassy-opaque)",
  },
} satisfies ChartConfig;

export function ChartCalibration({
  data,
  currentTemp,
  sweetSpot,
}: {
  data: { temperature: number; estimatedCount: number }[];
  currentTemp: number;
  sweetSpot: number;
}) {
  const sharedElements = useSharedChartElements({
    dataKey: "estimatedCount",
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
        className="min-h-[200px] h-[280px] -ml-14 -mr-6 md:w-full md:m-0 md:pt-4 md:pr-4 !aspect-auto"
      >
        <BarChart accessibilityLayer data={data}>
          {sharedElements}
          <Bar dataKey="estimatedCount" fill="var(--color-estimatedCount)" />
        </BarChart>
      </ChartContainer>
      <ChartLegend />
    </div>
  );
}
