"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { useSharedChartElements } from "./shared";
import { ChartLegend } from "./legend";

const chartConfig = {
  comfortableCount: {
    label: "Ideal Temperature",
    color: "var(--coral-glassy-opaque)",
  },
} satisfies ChartConfig;

export function ChartIdealTemp({
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
        Distribution of ideal temperature
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
