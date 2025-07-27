"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapIcon, Search, X } from "lucide-react";
import debounce from "lodash.debounce";
import SearchInput from "../atoms/search-input";
import LocationInput from "../atoms/location-input";
import JobTypeSelect from "../atoms/job-type-select";
import SalaryRangeSelect from "../atoms/salary-range-select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SearchNavProps {
  onSearchChange: (filters: {
    searchText: string;
    location: string;
    jobType: string;
    salaryRange: string;
  }) => void;
}

export interface SearchNavRef {
  triggerSearch: () => void;
}

const jobTypeOptions = [
  { value: "all", label: "All job types" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "Contract", label: "Contract" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "temporary", label: "Temporary" },
  { value: "volunteer", label: "Volunteer" },
];

const salaryRangeOptions = [
  { value: "all", label: "All salary ranges" },
  { value: "300-2000", label: "$300 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-20000", label: "$10,000 - $20,000" },
  { value: "20000-50000", label: "$20,000 - $50,000" },
  { value: "50000-100000", label: "$50,000 - $100,000" },
  { value: "100000-250000", label: "$100,000 - $250,000" },
  { value: "250000-1000000", label: "Above $250,000" },
];
const SearchNav = forwardRef<SearchNavRef, SearchNavProps>(
  ({ onSearchChange }, ref: React.Ref<SearchNavRef>) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // NEW
    const [searchText, setSearchText] = useState(
      searchParams.get("searchText") || ""
    );
    const [location, setLocation] = useState(
      searchParams.get("location") || ""
    );
    const [jobType, setJobType] = useState(searchParams.get("jobType") || "");
    const [salaryRange, setSalaryRange] = useState(
      searchParams.get("salaryRange") || ""
    );

    const debouncedSearchChange = useCallback(
      debounce((filters: any) => {
        onSearchChange(filters);
        const params = new URLSearchParams();
        if (filters.searchText) params.set("searchText", filters.searchText);
        if (filters.location) params.set("location", filters.location);
        if (filters.jobType) params.set("jobType", filters.jobType);
        if (filters.salaryRange) params.set("salaryRange", filters.salaryRange);
        router.replace(`?${params.toString()}`, { scroll: false });
      }, 300),
      [onSearchChange, router]
    );

    const triggerSearch = () => {
      debouncedSearchChange({ searchText, location, jobType, salaryRange });
    };

    useImperativeHandle(ref, () => ({ triggerSearch }));

    const clearSearch = () => setSearchText("");

    return (
      <>
        
        <div className="w-full lg:grid grid-cols-4 gap-6 hidden md:grid">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            onEnter={triggerSearch}
            onClear={clearSearch}
          />
          <LocationInput
            value={location}
            onChange={setLocation}
            onEnter={triggerSearch}
          />
          <JobTypeSelect value={jobType} onChange={setJobType} />
          <SalaryRangeSelect value={salaryRange} onChange={setSalaryRange} />
        </div>
        {/* Mobile Layout */}
        <div className="w-full flex items-center gap-4  md:hidden">
          <div className="flex-1 relative">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            onEnter={triggerSearch}
            onClear={clearSearch}
            />
            </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className=" text-sm py-2 bg-purple-600 text-white rounded-md">
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
                <DialogDescription>
                  Filter your job search by location, type, and salary.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <LocationInput
                  value={location}
                  onChange={setLocation}
                  onEnter={triggerSearch}
                />
                <JobTypeSelect value={jobType} onChange={setJobType} />
                <SalaryRangeSelect
                  value={salaryRange}
                  onChange={setSalaryRange}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => {
                    setLocation("");
                    setJobType("");
                    setSalaryRange("");
                  }}
                >
                  Reset
                </button>
                <DialogTrigger asChild>
                  <button
                    onClick={() => triggerSearch()}
                    className="bg-purple-600 text-white px-4 py-2 text-sm rounded"
                  >
                    Apply
                  </button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
);
export default SearchNav;
