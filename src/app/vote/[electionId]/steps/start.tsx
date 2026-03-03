import { Button } from "@/components/ui/button";
import { Election } from "@/lib/types";

export default function Start({
  election,
  onNext,
}: {
  election: Election;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <h1>
        Cast the vote for <strong className="font-bold">{election.name}</strong>
      </h1>
      <p>
        Help us set the office thermostat fairly. <br />
        This vote is anonymous and takes about 30 seconds.
      </p>
      <Button size="lg" className="mt-6" onClick={onNext}>
        Start
      </Button>
    </div>
  );
}
