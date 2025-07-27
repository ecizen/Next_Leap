"use client";

import AccordionFilter from "./acording-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const locations = [
  { value: "any", label: "Any" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "Onsite" },
  { value: "hybrid", label: "Hybrid" },
];

const LocationAccordion = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <AccordionFilter title="Location">
      <div className="flex flex-col gap-3">
        {locations.map((item) => (
          <label key={item.value} className="flex items-center gap-2 text-sm">
            <Checkbox
              className="data-[state=checked]:bg-purple-700 data-[state=checked]:border-0"
              checked={selected.includes(item.value)}
              onCheckedChange={() => toggle(item.value)}
            />
            <span className="text-xs">{item.label}</span>
          </label>
        ))}
      </div>
    </AccordionFilter>
  );
};

export default LocationAccordion;
