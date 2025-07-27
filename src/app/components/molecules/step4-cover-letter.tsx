"use client";

import { UseFormReturn } from "react-hook-form";
import { ApplyFormData } from "@/types/job";

const Step3CoverLetter = ({ form }: { form: UseFormReturn<ApplyFormData> }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Cover Letter</label>
      <textarea
        {...register("coverLetter", { required: "Cover letter is required" })}
        rows={6}
        className="w-full border rounded p-2"
        placeholder="Write your cover letter here..."
      />
      {errors.coverLetter && <p className="text-red-500 text-xs">{errors.coverLetter.message}</p>}
    </div>
  );
};

export default Step3CoverLetter;
