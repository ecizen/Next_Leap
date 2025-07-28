"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

import { ApplyFormData } from "@/types/job";
import Step1PersonalInfo from "../molecules/step1-personal";
import Step2CVPortfolio from "../molecules/step2-cv";
import Step3CoverLetter from "../molecules/step4-cover-letter";
import Step4ReasonSalary from "../molecules/step4-salary";
import Step5Confirmation from "../molecules/step5-confirmation";
import { createClient } from "@/utils/supabase/client";

const DrawerApply = ({ jobId }: { jobId: string }) => {
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
 
  const form = useForm<ApplyFormData>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resume: undefined,
      portfolio: "",
      coverLetter: "",
      reason: "",
      salary: undefined,
      agree: false,
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = form;

  const fieldsPerStep: Record<number, (keyof ApplyFormData)[]> = {
    1: ["name", "email", "phone"],
    2: ["resume", "portfolio"],
    3: ["coverLetter"],
    4: ["reason", "salary"],
    5: ["agree"],
  };

  const onNext = async () => {
    const valid = await trigger(fieldsPerStep[step]);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const onSubmit = async (data: ApplyFormData) => {
    const valid = await trigger();
    if (!valid) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setErrorMsg("Kamu harus login untuk melamar.");
      setIsSubmitting(false);
      return;
    }

    const userId = session.user.id;
    const file = data.resume?.[0];
    let resumeUrl = "";

    if (file) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(`user-${userId}/${file.name}`, file);

      if (uploadError) {
        setErrorMsg("Gagal upload CV: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }

      resumeUrl = supabase.storage.from("resumes").getPublicUrl(uploadData.path)
        .data.publicUrl;
    }

    const { error } = await supabase.from("applications").insert([
      {
        user_id: userId,
        job_id: jobId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        resume: resumeUrl,
        portfolio: data.portfolio,
        cover_letter: data.coverLetter,
        reason: data.reason,
        salary: data.salary,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      setErrorMsg("Gagal mengirim lamaran: " + error.message);
    } else {
      setSuccessMsg("Lamaran berhasil dikirim!");
      reset();
      setStep(1);
      setTimeout(() => {
        setIsOpen(false); // auto-close drawer
        setSuccessMsg("");
      }, 1500);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto">
          Apply Now
        </Button>
      </DrawerTrigger>
      <DrawerContent className="lg:h-[100vh] h-auto transition-all duration-300">
        <DrawerHeader className="px-4">
          <DrawerTitle className="text-xl">Apply for this job</DrawerTitle>
          <DrawerDescription className="text-xs mt-1">
            Data akan disimpan di profil untuk lamaran selanjutnya
          </DrawerDescription>
          <div className="mt-4 relative">
            <Progress value={(step / totalSteps) * 100} />
            <span className="text-xs absolute top-1 right-2 text-gray-500 font-semibold">
              {step}/{totalSteps}
            </span>
          </div>
        </DrawerHeader>

        <div className="px-4 space-y-2 mt-2">
          {successMsg && (
            <Alert className="bg-green-50 border-green-200">
              <Info className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-700">Sukses</AlertTitle>
              <AlertDescription>{successMsg}</AlertDescription>
            </Alert>
          )}
          {errorMsg && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal</AlertTitle>
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4 mt-4">
          {step === 1 && <Step1PersonalInfo form={form} />}
          {step === 2 && <Step2CVPortfolio form={form} />}
          {step === 3 && <Step3CoverLetter form={form} />}
          {step === 4 && <Step4ReasonSalary form={form} />}
          {step === 5 && <Step5Confirmation form={form} errors={errors} />}

          <DrawerFooter className="grid grid-cols-2 gap-2 pb-6">
            {step > 1 ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setStep((s) => s - 1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setStep((s) => s - 1);
                }}
                className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-center text-gray-700 hover:bg-gray-100"
              >
                Kembali
              </div>
            ) : (
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            )}

            {step < totalSteps ? (
              <div
                role="button"
                tabIndex={0}
                onClick={onNext}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onNext();
                }}
                className="cursor-pointer rounded border border-purple-600 px-4 py-2 text-center text-purple-600 hover:bg-purple-50"
              >
                Lanjut
              </div>
            ) : (
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!watch("agree") || isSubmitting}
              >
                {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
              </Button>
            )}
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerApply;
