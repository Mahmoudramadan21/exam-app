"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useCountdownTimer } from "@/shared/hooks/use-countdown-timer";

import { otpStepSchema } from "@/features/auth/lib/schemas/otp-step.schema";
import { IOtpStepSchema } from "@/features/auth/lib/types/auth";
import { useRouter } from "next/navigation";
import { IUpdateEmailStep } from "../lib/types/user";

interface UseConfirmEmailOtpStepProps {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<IUpdateEmailStep>>;
  setOpenEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useConfirmEmailOtpStep({
  email,
  setStep,
  setOpenEmailModal,
}: UseConfirmEmailOtpStepProps) {
  const router = useRouter();

  const { timer, resetTimer } = useCountdownTimer();

  // Initialize form
  const form = useForm<IOtpStepSchema>({
    resolver: zodResolver(otpStepSchema),
    defaultValues: {
      email,
      code: "",
    },
  });

  // Verify email confirmation OTP
  const verifyOtpMutation = useMutation({
    mutationFn: async ({ code }: Pick<IOtpStepSchema, "code">) => {
      const res = await fetch("/api/users/confirm-email", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // Normalize API errors
      if (!res.ok || !data.status) {
        throw new Error(data.message || "Invalid OTP");
      }

      return data;
    },

    // Refresh profile after success
    onSuccess: () => {
      router.refresh();
      setOpenEmailModal(false);
      setStep("email");
    },
  });

  // Resend confirmation email
  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/users/update-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      // Normalize API errors
      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      return data;
    },

    // Restart timer after resend success
    onSuccess: () => {
      resetTimer();
    },
  });

  // Handle form submit
  function onSubmit(values: IOtpStepSchema) {
    verifyOtpMutation.mutate({
      code: values.code,
    });
  }

  // Merge form validation + server error
  const validationErrors = form.formState.errors.code?.message;

  const verifyError =
    form.formState.errors.code?.message ||
    (verifyOtpMutation.isError
      ? (verifyOtpMutation.error as Error).message
      : undefined);

  const resendError = resendOtpMutation.isError
    ? (resendOtpMutation.error as Error).message
    : undefined;

  const errorMessage = validationErrors || verifyError || resendError;

  return {
    form,
    timer,
    onSubmit,
    errorMessage,
    verifyOtpMutation,
    resendOtpMutation,
  };
}
