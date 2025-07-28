import { UseFormReturn } from "react-hook-form";
import { ApplyFormData } from "@/types/job";
import {

  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UploadCloud, LinkIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<ApplyFormData>;
}

export default function Step2CVPortfolio({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="w-full shadow-none border rounded-2xl bg-muted/30">
      <CardHeader className="px-4">
        <CardTitle className="text-sm font-semibold">
          2. Upload CV & Portofolio
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Unggah file CV dan beri link portofolio jika ada.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-4">
        <div className="space-y-1.5">
          <Label htmlFor="resume" className="text-sm flex items-center gap-2">
          Resume
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="resume"
            type="file"
            {...register("resume", {
              required: "CV wajib diunggah",
            })}
            className="file:bg-blue-600 shadow-none file:text-white h-10 file:px-3 file:py-auto file:rounded-md file:border-0 hover:file:bg-blue-700 transition text-sm"
          />
          {errors.resume && (
            <p className="text-xs text-red-500">{errors.resume.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="portfolio" className="text-sm flex items-center gap-2">
            Link Portofolio (opsional)
          </Label>
          <Input
            id="portfolio"
            type="url"
            placeholder="https://yourportfolio.com"
            {...register("portfolio")}
            className="text-sm shadow-none h-10"
          />
        </div>
      </CardContent>
    </Card>
  );
}
