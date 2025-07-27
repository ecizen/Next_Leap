
import { createClient } from "@/utils/supabase/client";

export async function getJobById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      job_details (
        description,
        requirements,
        responsibilities,
        skills,
        benefit
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
