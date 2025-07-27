import AccordionFilter from "./acording-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const jobTypes = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
];

const JobTypeAccordion = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <AccordionFilter title="Job Type" >
      <div className="flex flex-col gap-3">
        {jobTypes.map((item) => (
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

export default JobTypeAccordion;
