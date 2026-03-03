import {
  calculateSweetSpot,
  getThermostatLabels,
  getThermostatRangePosition,
} from "@/lib/helpers";
import { Unit, Vote } from "@/lib/types";

export default function Thermostat({
  votes,
  unit,
  withLabels = false,
}: {
  votes: Vote[];
  unit: Unit;
  withLabels?: boolean;
}) {
  const sweetSpot = calculateSweetSpot(votes, unit);
  const labels = getThermostatLabels();

  const boxes = votes.map((v) => ({
    left: getThermostatRangePosition(v.comfort_range[0]) + "%",
    right: 100 - getThermostatRangePosition(v.comfort_range[1]) + "%",
  }));

  return (
    <div className="my-12 w-full">
      {withLabels && (
        <div className="flex justify-between">
          {labels.map((label) => (
            <p key={label}>{label}°C</p>
          ))}
        </div>
      )}
      <div className="bg-coral-glassy w-full h-20 relative">
        {boxes.map((box, i) => (
          <div
            key={i}
            className="bg-coral-glassy h-20 absolute"
            style={{
              left: box.left,
              right: box.right,
            }}
          />
        ))}
        {withLabels && (
          <div
            className="absolute bg-white size-5 rounded-full top-[50%] translate-y-[-50%] after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:w-1 after:h-10 after:bg-white"
            style={{ left: getThermostatRangePosition(sweetSpot) + "%" }}
          >
            <span className="block w-max absolute top-15 left-[50%] translate-x-[-50%] font-bold">
              {sweetSpot}°{unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
