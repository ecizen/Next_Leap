"use client";
import React, { useEffect, useState } from "react";
import ExploreNav from "@/app/components/organisms/explore-nav";
import FilterSide from "@/app/components/organisms/filter-side";
import JobList from "@/app/components/organisms/job-list";
import useJobs, { FilterOptions } from "@/hook/useJob";

const ExplorePage = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchText: "",
    location: "",
    jobType: "",
    salaryRange: "",
  });

  const { jobs, loading, error, observerRef } = useJobs(filters);


  return (
    <>
      <ExploreNav onSearchChange={setFilters} />
      <main className="overflow-x-hidden bg-white">
        <div className="flex">
          <div className="col-span-1 lg:w-[20vw] lg:block hidden">
            <FilterSide />
          </div>
          <div
            style={{ gridAutoRows: "239px" }}
            className="lg:w-[82vw] min-h-screen w-full bg-gray-50 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-4 px-2 py-2 lg:gap-4 gap-2"
          >
            <JobList jobs={jobs} loading={loading} error={error} />
            <div ref={observerRef} className="h-10 col-span-full" />
          </div>
        </div>
      </main>
    </>
  );
};

export default ExplorePage;
