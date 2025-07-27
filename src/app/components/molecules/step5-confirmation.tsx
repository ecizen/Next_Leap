"use client";

import { UseFormReturn } from "react-hook-form";
import { ApplyFormData } from "@/types/job";

const Step5Confirmation = ({
  form,
  errors,
}: {
  form: UseFormReturn<ApplyFormData>;
  errors: Record<string, any>;
}) => {
  const { register } = form;

  return (
    <div>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
        <input
          {...register("agree", { required: "You must agree before submitting" })}
          type="checkbox"
          className="form-checkbox"
        />
        <span>I agree that the data provided is accurate and may be saved for future applications.</span>
      </label>
      {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree.message}</p>}
    </div>
  );
};

export default Step5Confirmation;
