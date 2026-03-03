"use client";

import { getMax, getMin } from "@/lib/helpers";
import { Unit } from "@/lib/types";

export function ChartComfortRange({
  data,
  unit,
}: {
  data: { min: number; ideal: number; max: number }[];
  unit: Unit;
}) {
  const min = getMin(unit);
  const max = getMax(unit);

  return (
    <div className="flex flex-col gap-8 mt-8 bg-background p-8">
      <span className="text-sm uppercase text-muted-foreground">
        All ranges at a glance
      </span>

      <div className="flex flex-col gap-2.5">
        {data.map((row, i) => {
          const low = row.min;
          const high = row.max;
          const ideal = row.ideal;

          const lowPercentage = ((low - min) / (max - min)) * 100;
          const widthPercentage = ((high - low) / (max - min)) * 100;
          const dotPercentage = ((ideal - min) / (max - min)) * 100;

          return (
            <div key={i} className="flex items-center gap-3">
              <div className="relative flex-1 h-2 bg-foreground/10 rounded-full">
                <div
                  className="absolute h-full bg-coral/50 rounded-full"
                  style={{
                    left: `${lowPercentage}%`,
                    width: `${widthPercentage}%`,
                  }}
                />
                <div
                  className="absolute w-2.5 h-2.5 bg-foreground/70 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2"
                  style={{ left: `${dotPercentage}%` }}
                />
              </div>

              <div className="flex gap-1 text-sm shrink-0 text-center">
                <div className="w-8">{min}°</div>
                <div>-</div>
                <div className="w-8">{ideal}°</div>
                <div>-</div>
                <div className="w-8">{max}°</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
