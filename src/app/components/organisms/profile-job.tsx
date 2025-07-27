import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { JobDetailType } from "@/types/job";
import { Bookmark, Briefcase, BriefcaseBusiness, DollarSign, Hotel, Layers, Map, MapPin, Plane, Share, TimerIcon } from "lucide-react";
import InfoBox from "../molecules/infobox";

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

const ProfileJob = ({
  id,
  job_title,
  company_name,
  company_image,
  city,
  country,
  salary,
  tags,
  work_type,
  work_mode,
  experience_min,
  experience_max,
}: JobDetailType) => {
  const formatSalary = (salary: Salary): string => {
    if (salary.type === "fixed") return `$${salary.amount.toLocaleString()}`;
    if (salary.type === "range")
      return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    return "Not specified";
  };
  return (
  <Card className="relative w-full p-4 lg:p-6 bg-white overflow-hidden group">
  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-500 transition-all duration-500 ease-in-out group-hover:w-1.5 rounded-r-sm" />

  <CardHeader className="lg:px-6 px-4 space-y-4 border-b border-gray-100">
    <h1 className="text-xl md:text-2xl font-semibold">{job_title}</h1>
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
      <Avatar className="rounded-md border w-14 h-14 p-2">
        <AvatarImage className="rounded-md object-cover" src={company_image} alt={company_name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <Label className="text-md font-semibold">{company_name}</Label>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Map className="text-purple-600" size={16} />
            {city}, {country}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <TimerIcon className="text-purple-600" size={16} />
            {work_type}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Briefcase className="text-purple-600" size={16} />
            Junior
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Hotel className="text-purple-600" size={16} />
            {work_mode}
          </div>
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:px-6 px-4">
    <InfoBox icon={DollarSign} title="Salary" content="100k" />
    <InfoBox icon={Layers} title="Level" content={`${experience_min} - ${experience_max} years`} />
    <InfoBox icon={BriefcaseBusiness} title="Type" content={work_type} />
    <InfoBox icon={MapPin} title="Location" content={work_mode} />
  </CardContent>

  <CardFooter className="flex flex-col sm:flex-row gap-3 mt-6">
    <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90">
      <Plane size={16} />
      <span className="ml-2 text-sm font-semibold">Apply Now</span>
    </Button>
    <Button className="w-full sm:w-auto bg-white border border-gray-100 text-neutral-700 hover:opacity-90">
      <Bookmark size={16} />
      <span className="ml-2 text-sm font-semibold">Saved Job</span>
    </Button>
    <Button className="w-full sm:w-auto bg-white border border-gray-100 text-neutral-700 hover:opacity-90">
      <Share size={16} />
      <span className="ml-2 text-sm font-semibold">Share</span>
    </Button>
  </CardFooter>
</Card>

  );
};
export default ProfileJob;
