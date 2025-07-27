import { JobDetailType } from "@/types/job";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Briefcase, Layers2, Sparkle, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DrawerForm from "../molecules/drawer-form";
import DrawerAppy from "../organisms/drawer-appy";

const JobDetail = ({
  id,
  job_title,
  company_name,
  company_image,
  city,
  country,
  tags,
  experience_max,
  experience_min,
  work_mode,
  work_type,
  salary,
  job_details,
}: JobDetailType) => {
  const detail = job_details?.[0];
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-4 ">
      <Card className="lg:py-4 px-4  bg-white shadow-none border-0 border-gray-200">
        <CardHeader className="p-0 lg:relative bg-white z-20  w-full py-6 lg:top-0  top-13.5  fixed  border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 sm:gap-y-0">
          <div className="flex items-center space-x-2">
            <Avatar className="border border-gray-100 bg-purple-50 rounded-md p-1 w-12 h-12">
              <AvatarImage src={company_image || "/default-company.png"} />
              <AvatarFallback>
                {company_name?.charAt(0).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-x-2">
                <h1 className="text-xl font-semibold">{job_title}</h1>
                <Sparkle size={16} className="text-purple-600" />
              </div>
              <div className="flex items-center gap-x-4 mt-1 flex-wrap text-xs text-gray-500">
                <div className="flex items-center gap-x-1">
                  <Timer size={16} className="text-purple-600" />
                  <span>{work_type}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <Layers2 size={16} className="text-purple-600" />
                  <span>
                    {experience_min} - {experience_max} years
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <Briefcase size={16} className="text-purple-600" />
                  <span>{work_mode}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-x-2  sm:space-x-2 lg:flex grid grid-cols-2 w-full sm:w-auto justify-end">
            <DrawerAppy jobId={id}/>
            <Button className="bg-white border  hover:border-purple-600 hover:bg-white border-gray-100 shadow-none text-xs px-3 h-9 w-full sm:w-auto text-purple-600 transition-colors ease-in-out">
              Saved
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col gap-y-4 z-10 lg:pt-0 pt-[150px]">
          {detail?.description && (
            <div>
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold">Job Overview</span>
                <Sparkle size={16} className="text-purple-600" />
              </div>
              <p className="text-xs text-gray-600 mt-2">{detail.description}</p>
            </div>
          )}
          {Array.isArray(detail?.responsibilities) &&
            detail.responsibilities.length > 0 && (
              <div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-semibold">
                    What will you do
                  </span>
                  <Sparkle size={16} className="text-purple-600" />
                </div>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
                  {detail.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          {Array.isArray(detail?.requirements) &&
            detail.requirements.length > 0 && (
              <div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-semibold">
                    Your qualification
                  </span>
                  <Sparkle size={16} className="text-purple-600" />
                </div>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
                  {detail.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          {Array.isArray(detail?.skills) && detail.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold">
                  {" "}
                  Skills that make you shine Na
                </span>
                <Sparkle size={16} className="text-purple-600" />
              </div>
              <div className="text-s text-gray-600 mt-2 space-x-2">
                {detail.skills.map((item, i) => (
                  <Badge
                    key={i}
                    className="bg-[#FFE7FF] text-purple-600 border border-purple-600"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(detail?.benefit) && detail.benefit.length > 0 && (
            <div>
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold">Benefit</span>
                <Sparkle size={16} className="text-purple-600" />
              </div>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
                {detail.benefit.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-gray-100 p-0">
          {detail?.description && (
            <div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-x-2">
                  <span className="text-sm font-semibold">
                    About {company_name}
                  </span>
                  <Sparkle size={16} className="text-purple-600" />
                </div>
                <Button className="bg-white border-gray-100 border px-2 h-7 text-xs shadow-none text-purple-600">
                  Follow
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{detail.description}</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export default JobDetail;
