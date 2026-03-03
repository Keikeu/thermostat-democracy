"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function CreateSuccessContent() {
  const searchParams = useSearchParams();
  const voteID = searchParams.get("id");

  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const voteLink = `${domain}/vote/${voteID}`;
  const reportLink = `${domain}/report/${voteID}`;

  const [wasCopied, setWasCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setWasCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [wasCopied]);

  if (!voteID) {
    return <h4>An unexpected error occurred. Please try again.</h4>;
  }

  return (
    <main className="flex flex-col items-center text-center gap-2 max-w-[1024]">
      <h1>The vote is live</h1>
      <p>
        Share the link with your team. You can monitor the answers as they come
        in.
      </p>

      <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
        <Input
          id="link"
          type="text"
          className="bg-(--background) h-10 sm:w-[380]"
          defaultValue={voteLink}
          readOnly
        />
        <div className="flex gap-2">
          <Button
            className="w-[72]"
            onClick={() => {
              navigator.clipboard.writeText(voteLink);
              setWasCopied(true);
            }}
          >
            {wasCopied ? "Copied!" : "Copy"}
          </Button>
          <Button variant="secondary" asChild>
            <Link href={reportLink}>View Live Results</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function CreateSuccess() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CreateSuccessContent />
    </Suspense>
  );
}
