import { getElection } from "@/app/actions/getElection";
import VoteClient from "./vote-client";

export default async function VotePage({
  params,
}: Readonly<{
  params: Promise<{ electionId: string }>;
}>) {
  const { electionId } = await params;
  const election = await getElection(electionId);

  return <VoteClient election={election} />;
}
