import { FormField } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useUpdateEmailStep } from "../hooks/use-update-email-step";
import { memo } from "react";
import { IUpdateEmailStep } from "@/features/user/lib/types/user";
import FormError from "@/shared/components/form-error";

interface IUpdateEmailStepProps {
  setStep: React.Dispatch<React.SetStateAction<IUpdateEmailStep>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function UpdateEmailStep({ setStep, setEmail }: IUpdateEmailStepProps) {
  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useUpdateEmailStep({
    setStep,
    setEmail,
  });

  return (
    <>
      {/* ===== Email Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="px-4 md:px-9">
          <DialogHeader className="">
            <DialogTitle>Change Email</DialogTitle>

            <DialogDescription className="font-inter font-bold text-lg md:text-xl lg:text-2xl text-blue-600 mt-4.5 mb-7.5">
              Enter your Email
            </DialogDescription>
          </DialogHeader>
          {/* Email input */}
          <FormField
            name="email"
            control={form.control}
            label="Email"
            placeholder="user@example.com"
          />

          {/* ===== Error Feedback ===== */}
          {mutation.isError && (
            <FormError message={(mutation.error as Error).message} />
          )}
        </div>

        <DialogFooter>
          {/* ===== Submit Action ===== */}
          <Button
            ui="fullWidth"
            theme="primary"
            size="xl"
            disabled={mutation.isPending}
            className="my-0"
          >
            {mutation.isPending ? "Loading..." : "Next"}
            <ChevronRight size={16} />
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

export default memo(UpdateEmailStep);
