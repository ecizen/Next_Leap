"use client";

import AccordionFilter from "./acording-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const experienceLevels = [
  { value: "any", label: "Any" },
  { value: "entry", label: "Entry Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" },
];

const ExperienceLevelAccordion = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <AccordionFilter title="Experience Level">
      <div className="flex flex-col gap-3">
        {experienceLevels.map((item) => (
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

export default ExperienceLevelAccordion;
