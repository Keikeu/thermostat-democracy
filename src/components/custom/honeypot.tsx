import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Honeypot() {
  return (
    <Field className="hidden pointer-events-none absolute left-[-99999px]">
      <FieldLabel htmlFor="input-company">Company</FieldLabel>
      <Input
        id="input-company"
        name="company"
        type="text"
        placeholder="Company Inc."
        //
        autoComplete="false"
        aria-hidden="true"
        tabIndex={-1}
      />
    </Field>
  );
}
