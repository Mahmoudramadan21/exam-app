"use client";

import { FormField, FormError } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";

import { ChevronRight } from "lucide-react";
import { memo } from "react";

import { useForgotPasswordForm } from "@/features/auth/hooks/use-forgot-password-form";
import { forgotPasswordSteps } from "@/features/auth/lib/types/auth";

interface IForgotPasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<forgotPasswordSteps>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function ForgotPasswordForm({ setStep, setEmail }: IForgotPasswordFormProps) {
  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useForgotPasswordForm({
    setStep,
    setEmail,
  });

  return (
    <>
      {/* ===== Forgot Password Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        {/* Email Input */}
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
        <Button
          type="submit"
          className="mt-10 mb-9 w-full bg-blue-600 hover:bg-blue-500 transition-colors hover:cursor-pointer h-12 text-base rounded-none"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading..." : "Next"}
          <ChevronRight width={16} height={16} className="shrink-0 w-4 h-4" />
        </Button>
      </form>
    </>
  );
}

export default memo(ForgotPasswordForm);
