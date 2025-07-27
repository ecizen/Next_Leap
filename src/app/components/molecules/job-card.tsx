import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { JobFromDb, mapJobFromDb } from "@/types/job";
import {
  Bookmark01Icon,
  DollarCircleIcon,
  Location06Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React, { memo } from "react";

interface SalaryRange {
  type: "range";
  min: number;
  max: number;
}

interface SalaryFixed {
  type: "fixed";
  amount: number;
}

type Salary = SalaryRange | SalaryFixed;

interface JobCardProps {
  job: JobFromDb;
}

const JobCard: React.FC<JobCardProps> = memo(({ job }) => {
  const {
    id,
    company_name,
    company_image,
    job_title,
    tags,
    work_type,
    work_mode,
    experience_min,
    experience_max,
    salary,
    city,
    country,
    total_application,
    postedAt,
  } = mapJobFromDb(job);

  const formatSalary = (salary: Salary): string => {
    if (salary.type === "fixed") return `$${salary.amount.toLocaleString()}`;
    if (salary.type === "range")
      return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    return "Not specified";
  };

  return (
    <Link href={`/jobs/${id}`} passHref className="block hover:no-underline">
      <Card
        key={id}
        className="p-2 shadow-none gap-2 h-[239px] rounded-lg max-h-max overflow-y-hidden"
      >
        <CardHeader className="p-0 flex items-start justify-between border-b [.border-b]:pb-4 border-b-gray-100">
          <div className="flex items-center space-x-2">
            <Avatar className="rounded-md border w-10 h-10 overflow-hidden">
              <AvatarImage
                className="rounded-md object-cover w-full h-full"
                src={company_image}
                alt={company_name}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <Label className="text-xs text-gray-500">{company_name}</Label>
              <h1 className="text-sm font-semibold">{job_title}</h1>
            </div>
          </div>
          <Button className="shadow-none border border-white bg-white hover:bg-transparent hover:border-gray-100 hover:shadow-xs cursor-pointer transition-all ease-in-out duration-300">
            <HugeiconsIcon
              icon={Bookmark01Icon}
              size={20}
              className="text-purple-600 ease-in-out duration-300 transition-all"
              fill="#7c3aed"
            />
          </Button>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="flex items-center space-x-2 flex-wrap">
            <span
            
              className="text-xs bg-gray-50 text-purple-600 rounded-full px-4 py-1"
            >
              {work_type}
            </span>

            <span
              
              className="text-xs bg-gray-50 text-purple-600 rounded-full px-4 py-1"
            >
              {experience_min} - {experience_max} years
            </span>

            <span
              
              className="text-xs bg-gray-50 text-purple-600 rounded-full px-4 py-1"
            >
              {work_mode}
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <HugeiconsIcon
                icon={DollarCircleIcon}
                className="text-white w-5 h-5"
                fill="#60a5fa"
              />
              <span className="text-[11px] uppercase text-gray-500">
                USD {formatSalary(salary)}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <HugeiconsIcon
                icon={Location06Icon}
                className="w-5 h-5 text-red-400"
              />
              <span className="text-[11px] text-gray-500">
                {city}, {country}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <HugeiconsIcon
                icon={UserGroup02Icon}
                className="w-5 h-5 text-green-800"
                fill="green"
              />
              <span className="text-[11px] text-gray-500">
                {total_application} Applicants
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0 flex items-center justify-between">
          <Button className="hover:bg-purple-600 bg-white hover:border-white border border-gray-200 text-purple-600 hover:text-white transition-colors ease-in-out duration-300 text-xs px-4 h-7 shadow-none rounded-full">
            Apply Now
          </Button>
          <span className="text-[11px] text-gray-600">Posted {postedAt}</span>
        </CardFooter>
      </Card>
    </Link>
  );
});

export default JobCard;
