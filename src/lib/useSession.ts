"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, []);

  return session;
}
