"use client";

import { UseFormReturn } from "react-hook-form";
import { ApplyFormData } from "@/types/job";
import { cn } from "@/lib/utils";
import { Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const InputWrapper = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    {children}
  </div>
);

const Step1PersonalInfo = ({ form }: { form: UseFormReturn<ApplyFormData> }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<User size={18} />}>
          <Input
            {...register("name", { required: "Name is required" })}
            className={cn(
              "w-full pl-10 pr-4 py-2 h-10 rounded-sm border bg-white text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
              errors.name ? "border-red-500" : "border-gray-300"
            )}
            type="text"
            placeholder="e.g. John Doe"
          />
        </InputWrapper>
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<Mail size={18} />}>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={cn(
              "w-full pl-10 pr-4 py-2 h-10 shadow-none rounded-sm border bg-white text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
              errors.email ? "border-red-500" : "border-gray-300"
            )}
            type="email"
            placeholder="e.g. john@example.com"
          />
        </InputWrapper>
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<Phone size={18} />}>
          <Input
            {...register("phone", { required: "Phone number is required" })}
            className={cn(
              "w-full pl-10 pr-4 py-2 border bg-white text-sm h-10 shadow-none rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
              errors.phone ? "border-red-500" : "border-gray-300"
            )}
            type="tel"
            placeholder="e.g. +62 812 3456 7890"
          />
        </InputWrapper>
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
