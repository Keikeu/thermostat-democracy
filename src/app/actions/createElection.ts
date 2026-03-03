"use server";

import { Unit } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createElection(formData: FormData) {
  // Honeypot check - if filled, silently reject
  const honeypot = formData.get("company");
  if (honeypot) {
    redirect("/create/success"); // fake success
  }

  const name = formData.get("vote_name") as string;
  const unit = formData.get("unit") as Unit;
  const temperature = formData.get("temperature") as string;

  if (!name || !temperature || !unit) {
    throw new Error("Missing required fields");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("elections")
    .insert({
      name,
      temperature: parseFloat(temperature),
      unit,
    })
    .select("public_id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/create/success?id=${data.public_id}`);
}
