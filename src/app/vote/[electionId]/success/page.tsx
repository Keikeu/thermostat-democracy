import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Success({
  params,
}: {
  params: Promise<{ electionId: string }>;
}) {
  const { electionId } = await params;

  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <h1>Your vote has been counted</h1>
      <p>
        Thank you for participating in Thermostat Democracy.
        <br />
        We are calculating the temperature that minimizes overall discomfort.
        <br />
        You may see the results as they come in.
      </p>
      <Button size="lg" asChild className="mt-6">
        <Link href={`/report/${electionId}`}>View results</Link>
      </Button>
    </div>
  );
}
