import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json(
      { verified: false, error: error.message },
      { status: 401 }
    );
  }

  // Cek email_verified (atau email_confirmed_at tergantung versi Supabase)
  const isVerified = user?.email_confirmed_at != null;

  return NextResponse.json({ verified: isVerified });
}
