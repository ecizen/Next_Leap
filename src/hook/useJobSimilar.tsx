import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { JobCardPropsDetail } from "@/types/job";

const useAllJobsWithDetails = () => {
  const supabase = createClient();

  const [details, setDetails] = useState<JobCardPropsDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*, job_details(*)");

      if (error) throw error;

      setDetails(data || []);
    } catch (err: any) {
      setError(err.message);
      setDetails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return { details, loading, error };
};

export default useAllJobsWithDetails;
