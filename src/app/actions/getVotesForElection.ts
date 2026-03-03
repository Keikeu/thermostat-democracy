"use server";

import { Vote } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getVotesForElection = cache(
  async (electionId: string): Promise<Vote[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("votes")
      .select("*")
      .eq("election_id", electionId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
);
