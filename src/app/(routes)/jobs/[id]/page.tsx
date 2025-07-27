"use client";

import { useParams } from "next/navigation";
import JobDetail from "@/app/components/template/job-detail-left";
import JobCardList from "@/app/components/organisms/job-detail-card";
import { useJobDetail } from "@/hook/useJobdetail";
import fetchAllJobsWithDetails from "@/hook/useJobSimilar";
import { useState, useEffect } from "react";
import LoadingWithDelay from "@/app/components/molecules/loading";
// Pastikan path-nya benar

const JobDetailPage = () => {
  const params = useParams();
  const jobId = params.id as string;
  const { job, loading, error } = useJobDetail(jobId);
  const { details } = fetchAllJobsWithDetails();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading && showLoading) {
    return (
      <div className="lg:hidden">
      <LoadingWithDelay />
      </div>
    )
  }
  return (
    <main className="overflow-x-hidden bg-gray-50">
      <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-6 lg:p-6 p-0">
        <article className="lg:col-span-1 order-2 lg:order-1">
          <JobCardList jobs={details} />
        </article>
        <article className="lg:col-span-2 order-1 lg:order-2">
          {loading || showLoading ? (
            <div className="lg:block hidden">
            <LoadingWithDelay />
            </div>
          ) : error || !job ? (
            <p className="p-4 text-red-500">Job not found.</p>
          ) : (
            <>
              <JobDetail {...job} />
            </>
          )}
        </article>
      </div>
    </main>
  );
};

export default JobDetailPage;
