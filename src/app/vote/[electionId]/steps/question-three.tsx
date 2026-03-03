import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemperatureSlider } from "@/components/custom/temperature-slider";
import { Election } from "@/lib/types";
import { SubmitButton } from "@/components/custom/submit-button";

export default function QuestionThree({
  election,
  value,
  onChange,
  onBack,
}: {
  election: Election;
  value?: number[];
  onChange: (value: number[]) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Badge variant="secondary">
        <b>3/3</b> - Calibration
      </Badge>
      <div className="min-h-[140px]">
        <h1>What temperature do you think it is in the office right now?</h1>
        <p className="mt-2">
          Take your best guess without checking the thermostat.
        </p>
      </div>
      <TemperatureSlider
        className="my-10"
        unit={election.unit}
        value={value}
        onValueChange={onChange}
      />

      <div className="flex justify-between md:mt-6 flex-wrap gap-3">
        <Button size="lg" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <div className="flex gap-3 flex-wrap">
          <SubmitButton variant="secondary">
            I am out of the office now, skip
          </SubmitButton>

          <SubmitButton>Submit</SubmitButton>
        </div>
      </div>
    </div>
  );
}
