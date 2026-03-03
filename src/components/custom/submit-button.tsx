"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SubmitButton({
  className,
  children,
  variant = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?:
    | "link"
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={className}
      disabled={pending}
      variant={variant}
      {...props}
    >
      {pending && <Spinner data-icon="inline-start" />}
      {children}
    </Button>
  );
}
