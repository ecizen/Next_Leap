import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { JobDetailType } from "@/types/job";

export function useJobDetail(jobId?: string | string[]) {
  const [job, setJob] = useState<JobDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!jobId) {
      console.warn("Job ID tidak tersedia.");
      return;
    }

    const fetchJob = async () => {
      setLoading(true);

      const cacheKey = `job-${jobId}`;
      const cached = sessionStorage.getItem(cacheKey);

      // ✅ Cek apakah ada cache
      if (cached) {
        console.log(`✔️ Menggunakan data dari cache: ${cacheKey}`);
        setJob(JSON.parse(cached));
        setLoading(false);
        return;
      }

      console.log(`⏳ Fetching data dari Supabase untuk jobId: ${jobId}`);
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*, job_details(*)")
          .eq("id", jobId)
          .single();

        if (error) throw error;

        setJob(data);
        setError(null);

        // ✅ Simpan hasil ke cache
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        console.log(`💾 Menyimpan ke cache: ${cacheKey}`);
      } catch (err: any) {
        console.error(`❌ Gagal fetch job ${jobId}:`, err);
        setError(err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { job, loading, error };
}
