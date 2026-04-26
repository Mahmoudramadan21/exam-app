import { FormField, FormError } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Dispatch, memo, SetStateAction } from "react";

import { registerStep } from "../lib/types/auth";
import { useEmailStep } from "../hooks/use-email-step";

interface IEmailStep {
  setStep: Dispatch<SetStateAction<registerStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

function EmailStep({ setStep, setEmail }: IEmailStep) {
  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useEmailStep({
    setStep,
    setEmail,
  });

  return (
    <>
      {/* ===== Email Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
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

        {/* ===== Submit Action ===== */}
        <Button theme="outlineCustom" disabled={mutation.isPending}>
          {mutation.isPending ? "Loading..." : "Next"}
          <ChevronRight width={16} height={16} className="shrink-0 w-4 h-4" />
        </Button>
      </form>

      {/* ===== Secondary Action (Login Redirect) ===== */}
      <div className="w-fit mx-auto text-sm text-muted-foreground font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default memo(EmailStep);
