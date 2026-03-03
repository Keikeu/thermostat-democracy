"use client";

import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Honeypot from "@/components/custom/honeypot";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { monthNameMap } from "@/lib/helpers";
import { createElection } from "../actions/createElection";
import { SubmitButton } from "@/components/custom/submit-button";
import { Unit } from "@/lib/types";

export default function Create() {
  const [selectedUnit, setSelectedUnit] = useState<Unit>("C");

  const currentMonth = monthNameMap[new Date().getMonth() + 1];

  return (
    <div>
      <main className="flex flex-col items-center text-center max-w-[1024]">
        <h1>Start a thermostat vote</h1>
        <p className="mt-4">
          The vote is anonymous, takes 30 seconds to fill out and is completely
          free.
        </p>

        <Form action={createElection} className="mt-10">
          <Field className="gap-1">
            <FieldLabel htmlFor="input-name">Vote name</FieldLabel>
            <Input
              id="input-name"
              name="vote_name"
              type="text"
              className="bg-background"
              placeholder={`${currentMonth} Office Temperature`}
              required
            />
          </Field>

          <Field className="gap-1 mt-6">
            <FieldLabel htmlFor="input-temperature">
              Temperature unit
            </FieldLabel>
            <Select
              value={selectedUnit}
              onValueChange={(value: Unit) => setSelectedUnit(value)}
            >
              <SelectTrigger className="-mr-px bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="C">Celsius</SelectItem>
                  <SelectItem value="F">Fahrenheit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <input type="hidden" name="unit" value={selectedUnit} />
          </Field>

          <Field className="gap-1 mt-6">
            <FieldLabel htmlFor="input-temperature">
              Current office temperature
            </FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput
                id="input-temperature"
                name="temperature"
                type="number"
                step={0.5}
                placeholder=""
                required
              />
              <InputGroupAddon align="inline-end">
                °{selectedUnit}
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription className="text-right text-sm text-current/75">
              Used to check subjective perception of temperature
            </FieldDescription>
          </Field>

          <Honeypot />

          <SubmitButton className="mt-8 min-w-46">Open the vote</SubmitButton>
        </Form>
      </main>
    </div>
  );
}
