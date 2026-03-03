import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemperatureSlider } from "@/components/custom/temperature-slider";
import { Election } from "@/lib/types";

export default function QuestionOne({
  election,
  value,
  onChange,
  onNext,
}: {
  election: Election;
  value?: number[];
  onChange: (value: number[]) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Badge variant="secondary">
        <b>1/3</b> - Ideal Scenario
      </Badge>
      <div className="h-[140px]">
        <h1>What is your ideal office temperature?</h1>
        <p className="mt-2">
          {/* Ideal means you can wear your <i>preferred</i> office clothes
                (which can be different from what you usually wear) without
                sweating or having to put on more layers. <br /> */}
          It’s the temperature you would choose if you controlled the thermostat
          for the whole day.
        </p>
      </div>
      <TemperatureSlider
        className="my-10"
        unit={election.unit}
        value={value}
        onValueChange={onChange}
      />
      <Button
        size="lg"
        className="md:mt-6 self-end"
        disabled={!value}
        onClick={onNext}
      >
        Continue
      </Button>
    </div>
  );
}
