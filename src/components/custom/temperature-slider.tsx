"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { getThermostatLabels, getMin, getMax } from "@/lib/helpers";
import { Unit } from "@/lib/types";

type TemperatureSliderProps = React.ComponentProps<
  typeof SliderPrimitive.Root
> & {
  unit?: Unit;
  value?: number[];
  onValueChange: (value: number[]) => void;
  marker?: number;
};

function TemperatureSlider({
  className,
  defaultValue,
  value,
  unit = "C",
  marker,
  ...props
}: TemperatureSliderProps) {
  const min = getMin(unit);
  const max = getMax(unit);

  const isRange = React.useMemo(
    () => value !== undefined && value.length > 1,
    [value],
  );

  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  const labels = getThermostatLabels(unit);
  const numberOfTicks = max - min;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between -ml-[18px] w-[calc(100%+38px)]">
        {labels.map((label) => (
          <div key={label}>
            {label}°{unit}
          </div>
        ))}
      </div>
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={0.5}
        className="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-coral-glassy cursor-pointer relative grow overflow-hidden data-[orientation=horizontal]:h-20 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-20",
          )}
        >
          {new Array(numberOfTicks - 1).fill("").map((_, i) => (
            <div
              key={i}
              data-color="black"
              className="h-12 w-px top-4 bg-background absolute"
              style={{ left: (100 / numberOfTicks) * (i + 1) + "%" }}
            />
          ))}
          {/* {marker && (
            <div
              data-color="black"
              className="h-20 w-3 top-0 bg-coral-glassy-opaque absolute"
              style={{ left: `calc(${getPosition(marker, unit)}% - 6px)` }}
            />
          )} */}
          {isRange && (
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "bg-coral-glassy absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              )}
            />
          )}
        </SliderPrimitive.Track>
        {value && (
          <>
            {Array.from({ length: _values.length }, (_, index) => (
              <SliderPrimitive.Thumb
                key={index}
                data-slot="slider-thumb"
                data-current-value={`${isRange ? value[index] : value}°${unit}`}
                className={`after:content-[attr(data-current-value)] after:absolute after:-bottom-8 after:translate-x-[-45%] after:font-bold bg-coral-glassy-opaque cursor-pointer block w-3 h-20 shrink-0 transition-[color] focus-visible:ring-0 focus-visible:ring-coral-glassy-opaque focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50`}
              />
            ))}
          </>
        )}
      </SliderPrimitive.Root>
    </div>
  );
}

export { TemperatureSlider };
