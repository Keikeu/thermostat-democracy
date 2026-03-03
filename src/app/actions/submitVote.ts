"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function submitVote(formData: FormData) {
  const electionId = formData.get("election_id") as string;
  const idealTemp = formData.get("ideal_temp") as string;
  const comfortRange = (formData.get("comfort_range") as string).split(",");
  const currentTemp = formData.get("current_temp") as string;

  // Honeypot check
  const honeypot = formData.get("company");
  if (honeypot) {
    redirect(`/vote/${electionId}/success`);
  }

  const supabase = await createClient();

  const { error } = await supabase.from("votes").insert({
    election_id: electionId,
    ideal_temp: parseFloat(idealTemp),
    comfort_range: comfortRange.map((el) => parseFloat(el)),
    current_temp: parseFloat(currentTemp),
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/vote/${electionId}/success`);
}
