import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemperatureSlider } from "@/components/custom/temperature-slider";
import { Election } from "@/lib/types";

export default function QuestionTwo({
  election,
  value,
  onChange,
  onNext,
  onBack,
}: {
  election: Election;
  value?: number[];
  onChange: (value: number[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Badge variant="secondary">
        <b>2/3</b> - Comfort range
      </Badge>
      <div className="h-[140px]">
        <h1>What temperature range are you comfortable in?</h1>
        <p className="mt-2">
          The lowest and highest temperature you can work in without feeling
          uncomfortable.
        </p>
      </div>
      <TemperatureSlider
        className="my-10"
        unit={election.unit}
        value={value}
        onValueChange={onChange}
      />
      <div className="flex justify-between md:mt-6">
        <Button
          size="lg"
          variant="secondary"
          className="md:mt-6 self-end"
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          size="lg"
          className="md:mt-6 self-end"
          disabled={!value}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
