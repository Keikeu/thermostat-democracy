"use server";

import { Election } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getElection = cache(
  async (electionId: string): Promise<Election> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("elections")
      .select("*")
      .eq("public_id", electionId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
);
