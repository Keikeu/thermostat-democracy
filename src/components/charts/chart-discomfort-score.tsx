"use client";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useState } from "react";
import { Bar, BarChart, Cell, ReferenceLine } from "recharts";
import { Slider } from "@/components/ui/slider";
import { getMax, getMin } from "@/lib/helpers";
import { Unit } from "@/lib/types";
import { ChartLegend } from "./legend";
import { useSharedChartElements } from "./shared";
import { Separator } from "../ui/separator";

const chartConfig = {
  discomfortScore: {
    label: "Sweet Spot",
    color: "var(--coral-glassy-opaque)",
  },
} satisfies ChartConfig;

export function ChartDiscomfortScore({
  data,
  numberOfVotes,
  unit,
  currentTemp,
  sweetSpot,
}: {
  data: {
    temperature: number;
    comfortableCount: number;
    discomfortScore: number;
  }[];
  numberOfVotes: number;
  unit: Unit;
  currentTemp: number;
  sweetSpot: number;
}) {
  const [activeValue, setActiveValue] = useState(currentTemp);
  const sharedElements = useSharedChartElements({
    dataKey: "discomfortScore",
    sweetSpot: sweetSpot,
    currentTemp: currentTemp,
  });

  const min = getMin(unit);
  const max = getMax(unit);

  const datapoint = data.find((d) => d.temperature === activeValue);
  const discomfortScore = datapoint?.discomfortScore;
  const howManyComfortable = datapoint?.comfortableCount ?? 0;
  const howManyComfortablePercentage = Math.round(
    (howManyComfortable * 100) / numberOfVotes,
  );

  return (
    <div className="flex flex-col gap-8 mt-8 bg-background p-8">
      <span className="text-sm uppercase text-brown">
        What is the discomfort score at each temperature?
      </span>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold tabular-nums w-24">
          {activeValue}°{unit}
        </span>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            Discomfort Score
          </span>
          <span className="font-medium">{discomfortScore}</span>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            Who is comfortable
          </span>
          <span className="font-medium">
            {howManyComfortable}{" "}
            {howManyComfortable === 1 ? "person" : "people"}
            <span className="text-muted-foreground ml-1">
              ({howManyComfortablePercentage}%)
            </span>
          </span>
        </div>
      </div>
      <div className="ml-16 mr-6">
        <Slider
          min={min}
          max={max}
          step={0.5}
          value={[activeValue]}
          onValueChange={(val) => setActiveValue(val[0])}
        />
      </div>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] h-[280px] pt-4 pr-4 w-full"
      >
        <BarChart
          accessibilityLayer
          data={data}
          onClick={(e) => {
            const temperature = e.activePayload?.[0].payload.temperature;
            if (temperature) setActiveValue(temperature);
          }}
        >
          {sharedElements}
          <ReferenceLine
            x={activeValue}
            stroke="var(--coral)"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <Bar dataKey="discomfortScore" fill="var(--color-discomfortScore)">
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.temperature === activeValue
                    ? "var(--coral)"
                    : "var(--coral-glassy-opaque)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
      <ChartLegend />
    </div>
  );
}
