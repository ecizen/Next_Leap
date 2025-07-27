"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { JobCardPropsDetail } from "@/types/job";
import { Star, CheckCircle } from "lucide-react";
import { Redirect } from "next";
import { redirect } from "next/navigation";

interface JobCardListProps {
  jobs: JobCardPropsDetail[];
}

const JobCardList = ({ jobs }: JobCardListProps) => {
  const handleJobClick = (jobId: string) => {
    redirect(`/jobs/${jobId}`);
  };
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <Card
          key={job.id}
          onClick={() => handleJobClick(job.id)}
          className="p-4 bg-white hover:shadow-md cursor-pointer shadow-none border hover:border-purple-600 duration-500 border-white transition-all ease-in-out rounded-xl"
        >
          <CardContent className="p-0">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12 rounded-md bg-purple-50">
                <AvatarImage src={job.company_image} alt={job.company_name} />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-xs flex items-center gap-1">
                  {job.job_title}
                  <span className="text-blue-600 font-bold">+</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {job.job_details?.[0]?.description ||
                    "No description available."}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-gray-600 mt-2">
                  <Star size={12} className="text-yellow-400" />
                  4.3 Trusted
                  <span className="mx-1">•</span>8 Applicants
                  <span className="mx-1">•</span>
                  <CheckCircle size={12} className="text-blue-500" />
                  Company Verified
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobCardList;
