"use client";

import { Election, Unit } from "@/lib/types";
import { createContext, useState } from "react";
import Start from "./steps/start";
import QuestionOne from "./steps/question-one";
import QuestionTwo from "./steps/question-two";
import QuestionThree from "./steps/question-three";
import Honeypot from "@/components/custom/honeypot";
import { submitVote } from "@/app/actions/submitVote";
import { getMax, getMin } from "@/lib/helpers";

export const UnitContext = createContext<{ unit: Unit }>({ unit: "C" });

export default function VoteClient({ election }: { election: Election }) {
  const [idealTemp, setIdealTemp] = useState<number[]>();
  const [comfortRange, setComfortRange] = useState<number[]>([
    getMin(election.unit) + 5,
    getMax(election.unit) - 5,
  ]);
  const [currentTemp, setCurrentTemp] = useState<number[]>();

  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <main className="max-w-[880] w-full">
      <form action={submitVote}>
        {step === 0 && <Start election={election} onNext={next} />}
        {step === 1 && (
          <QuestionOne
            election={election}
            value={idealTemp}
            onChange={setIdealTemp}
            onNext={next}
          />
        )}
        {step === 2 && (
          <QuestionTwo
            election={election}
            value={comfortRange}
            onChange={setComfortRange}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <QuestionThree
            election={election}
            value={currentTemp}
            onChange={setCurrentTemp}
            onBack={back}
          />
        )}

        <input type="hidden" name="ideal_temp" value={idealTemp?.[0] ?? ""} />
        <input
          type="hidden"
          name="comfort_range"
          value={comfortRange?.join(",") ?? ""}
        />
        <input
          type="hidden"
          name="current_temp"
          value={currentTemp?.[0] ?? ""}
        />
        <input
          type="hidden"
          name="election_id"
          value={election.public_id ?? ""}
        />

        <Honeypot />
      </form>
    </main>
  );
}
