"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export function LiveSubscription() {
  const { electionId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel(`election:${electionId}:votes`, {
      config: {
        private: true,
      },
    });

    channel
      .on("broadcast", { event: "INSERT" }, () => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [electionId, router]);

  return null;
}
