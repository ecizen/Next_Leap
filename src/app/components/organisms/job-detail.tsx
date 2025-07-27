import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  Bookmark,
  Briefcase,
  BriefcaseBusiness,
  DollarSign,
  Hotel,
  Layers,
  Map,
  MapPin,
  Plane,
  Share,
  TimerIcon,
} from "lucide-react";
import InfoBox from "../molecules/infobox";
import { JobDetailType } from "@/types/job";

interface DetailJobProps {
  job_details: JobDetailType["job_details"];
}
interface DetailJobProps {
  job_details: JobDetailType["job_details"];
}

const DetailJob = ({ job_details }: DetailJobProps) => {
  return (
    <>
      {job_details &&
        job_details.map((job) => (
          <div key={job.id} className="space-y-6">
            <Card className="p-6 bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold"><span className="border-b-3 pb-2 border-purple-600">About</span>This Job</h2>
               
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed">{job.description}</p>
                <p className="text-xs leading-relaxed mt-2">{job.description}</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold">Responsibilities</h2>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {job.responsibilities?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

         
            <Card className="p-6 bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold">Qualifications</h2>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {job.requirements?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold">Skills</h2>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, idx) => (
                    <li
                      key={idx}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
    </>
  );
};
export default DetailJob;
