"use client";

import { UseFormReturn } from "react-hook-form";
import { ApplyFormData } from "@/types/job";

const Step4ReasonSalary = ({ form }: { form: UseFormReturn<ApplyFormData> }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Why do you want this job?</label>
        <textarea
          {...register("reason", { required: "Reason is required" })}
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Explain your motivation"
        />
        {errors.reason && <p className="text-red-500 text-xs">{errors.reason.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Expected Salary (IDR)</label>
        <input
          {...register("salary", {
            required: "Salary expectation is required",
            valueAsNumber: true,
            min: { value: 1000000, message: "Minimum salary is 1,000,000" },
          })}
          type="number"
          className="w-full border rounded px-3 py-2"
          placeholder="e.g. 5000000"
        />
        {errors.salary && <p className="text-red-500 text-xs">{errors.salary.message}</p>}
      </div>
    </div>
  );
};

export default Step4ReasonSalary;
