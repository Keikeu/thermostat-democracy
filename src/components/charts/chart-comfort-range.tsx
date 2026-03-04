"use client";

import { getPositionForValueInRange } from "@/lib/helpers";
import { Unit } from "@/lib/types";
import { ChartLegend } from "./legend";

export function ChartComfortRange({
  data,
  unit,
  currentTemp,
  sweetSpot,
}: {
  data: { min: number; ideal: number; max: number }[];
  unit: Unit;
  currentTemp: number;
  sweetSpot: number;
}) {
  return (
    <div className="flex flex-col gap-8 mt-8 bg-background p-8">
      <span className="text-sm uppercase text-brown">
        All ranges at a glance
      </span>

      <div className="flex items-center gap-3">
        <div className="relative flex flex-col gap-2.5 w-full">
          <div
            className="absolute h-full w-px border-r-2 border-dashed border-chart-1"
            style={{
              left: `${getPositionForValueInRange(currentTemp, unit)}%`,
            }}
          />
          <div
            className="absolute h-full w-px border-r-2 border-dashed border-chart-2"
            style={{ left: `${getPositionForValueInRange(sweetSpot, unit)}%` }}
          />
          {data.map((row, i) => {
            const lowPercentage = getPositionForValueInRange(row.min, unit);
            const highPercentage = getPositionForValueInRange(row.max, unit);
            const dotPercentage = getPositionForValueInRange(row.ideal, unit);

            return (
              <div key={i} className="flex items-center gap-3 h-4">
                <div className="relative flex-1 h-2 bg-foreground/10">
                  <div
                    className="absolute h-full bg-coral/50"
                    style={{
                      left: `${lowPercentage}%`,
                      right: `${100 - highPercentage}%`,
                    }}
                  />
                  <div
                    className="absolute w-2.5 h-2.5 bg-foreground/70 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
                    style={{ left: `${dotPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5 -mt-1">
          {data.map((row, i) => (
            <div key={i} className="flex h-4 gap-1 text-sm text-center">
              <div className="w-8">{row.min}°</div>
              <div>-</div>
              <div className="w-8">{row.ideal}°</div>
              <div>-</div>
              <div className="w-8">{row.max}°</div>
            </div>
          ))}
        </div>
      </div>

      <ChartLegend />
    </div>
  );
}
