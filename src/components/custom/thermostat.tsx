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
  const labels = getThermostatLabels(unit);

  const boxes = votes.map((v) => ({
    left: getThermostatRangePosition(v.comfort_range[0], unit) + "%",
    right: 100 - getThermostatRangePosition(v.comfort_range[1], unit) + "%",
  }));

  console.log(votes);

  return (
    <div className="my-12 w-full">
      {withLabels && (
        <div className="flex justify-between">
          {labels.map((label) => (
            <p key={label}>
              {label}°{unit}
            </p>
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
            style={{ left: getThermostatRangePosition(sweetSpot, unit) + "%" }}
          >
            <span className="block w-max absolute top-15 left-[50%] translate-x-[-50%] text-center">
              <b>
                {sweetSpot}°{unit}
              </b>
              <br />
              The Sweet Spot
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
