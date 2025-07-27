import { Skeleton } from "@/components/ui/skeleton";
import JobCard from "../molecules/job-card";
import React from "react";
import { JobFromDb } from "@/types/job";
import LoadingWithDelay from "../molecules/loading";

interface jobListProps {
  jobs: JobFromDb[];
  loading: boolean;
  error: string | null;
}

const JobList: React.FC<jobListProps> = ({ loading, error, jobs }) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg p-4 space-y-4 shadow-sm h-[239px]"
          >
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </>
    );
  }

  
    if (jobs.length === 0) {
      return<LoadingWithDelay/>
    }
  if (error) {
    return <p className="p-4 text-red-500">Job not found.</p>;
  }

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};

export default React.memo(JobList);
