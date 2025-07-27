"use client";
import { Filter } from "lucide-react";
import ExperienceLevelAccordion from "../molecules/accordion-level";
import LocationAccordion from "../molecules/accordion-location";
import JobTypeAccordion from "../molecules/acordion-jobtyp";

const FilterSide = () => {
  return (
    <aside className="w-full px-4 py-4 border-r border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <div className="p-1 rounded-full border border-gray-100">
            <Filter className="" size={18} />
          </div>
          <span className="text-xs font-semibold">Filters</span>
        </div>
        <button className="text-xs text-purple-600 px-2 h-8 font-medium hover:shadow-xs transition-all ease-in-out duration-300 cursor-pointer rounded-full border border-gray-100">Clear All</button>
      </div>
      <div className="flex flex-col gap-y-2 mt-4">
        <JobTypeAccordion />
        <LocationAccordion />
        <ExperienceLevelAccordion />
      </div>
    </aside>
  );
};
export default FilterSide;
