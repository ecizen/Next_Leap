import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { JobFromDb } from "@/types/job";

export interface FilterOptions {
  searchText: string;
  location: string;
  jobType: string;
  salaryRange: string;
}

const useJobs = (filters: FilterOptions) => {
  const supabase = createClient();
  const [jobs, setJobs] = useState<JobFromDb[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  // Normalisasi filter untuk cache key
  const normalizeFilters = (filters: FilterOptions) => ({
    searchText: filters.searchText.trim().toLowerCase(),
    location: filters.location.trim().toLowerCase(),
    jobType: filters.jobType,
    salaryRange: filters.salaryRange,
  });

  const getCacheKey = (page: number) =>
    `jobs-${page}-${JSON.stringify(normalizeFilters(filters))}`;

  const fetchJobs = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(page);
      const cached = sessionStorage.getItem(cacheKey);

      console.time(`fetch-page-${page}`);

      if (cached) {
        console.log(`✔️ Load from cache: ${cacheKey}`);
        const parsed = JSON.parse(cached) as JobFromDb[];
        setJobs((prev) => (page === 0 ? parsed : [...prev, ...parsed]));
        setLoading(false);
        console.timeEnd(`fetch-page-${page}`);
        return;
      }

      console.log(`⏳ Fetching from Supabase: ${cacheKey}`);

      let query = supabase.from("jobs").select("*");

      const { searchText, location, jobType, salaryRange } =
        normalizeFilters(filters);

      if (searchText) {
        query = query.ilike("job_title", `%${searchText}%`);
      }

      if (location) {
        query = query.or(
          `city.ilike.%${location}%,country.ilike.%${location}%`
        );
      }

      if (jobType) {
        const types = jobType.split(",");
        query = query.overlaps("tags", types);
      }

      if (salaryRange) {
        const [min, max] = salaryRange.split("-").map(Number);
        if (!isNaN(min)) query = query.gte("salary_min", min);
        if (!isNaN(max)) query = query.lte("salary_max", max);
      }

      const from = page * limit;
      const to = from + limit - 1;

      const { data, error } = await query
        .order("id", { ascending: false })
        .range(from, to);

      if (error) {
        setError(error.message);
        setLoading(false);
        console.timeEnd(`fetch-page-${page}`);
        return;
      }

      if (data.length < limit) {
        setHasMore(false);
      }

      // Simpan ke sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      console.log(`💾 Cache stored: ${cacheKey}`);

      setJobs((prev) => (page === 0 ? data : [...prev, ...data]));
      setLoading(false);
      console.timeEnd(`fetch-page-${page}`);
      await query.range(from, to);
    },
    [filters, supabase]
  );

  // Reset saat filters berubah
  useEffect(() => {
    setJobs([]);
    setPage(0);
    setHasMore(true);
  }, [filters]);

  // Fetch data berdasarkan page
  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setTimeout(() => setPage((prev) => prev + 1), 150); // delay aman
        }
      },
      { rootMargin: "100px" }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading]);

  return { jobs, loading, error, observerRef };
};

export default useJobs;
