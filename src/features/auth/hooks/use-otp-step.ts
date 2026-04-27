"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { otpStepSchema } from "@/features/auth/lib/schemas/otp-step.schema";
import { IOtpStepSchema, registerStep } from "@/features/auth/lib/types/auth";
import { Dispatch, SetStateAction } from "react";

interface UseOtpStepProps {
  email: string;
  setStep: Dispatch<SetStateAction<registerStep>>;
}

export function useOtpStep({ email, setStep }: UseOtpStepProps) {
  const [timer, setTimer] = useState<number>(60);

  // Countdown timer logic
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Initialize form
  const form = useForm<IOtpStepSchema>({
    resolver: zodResolver(otpStepSchema),
    defaultValues: { email, code: "" },
  });

  // Verify OTP
  const mutation = useMutation({
    mutationFn: async (values: IOtpStepSchema) => {
      const res = await fetch("/api/auth/register/confirm-otp-step", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // Normalize API error handling
      if (!res.ok || !data.status) {
        throw new Error(data.message || "Invalid OTP");
      }

      return data;
    },

    // Move to next step after success
    onSuccess: () => {
      setStep("userInfo");
    },
  });

  function onSubmit(values: IOtpStepSchema) {
    mutation.mutate({
      email,
      code: values.code,
    });
  }

  // Resend OTP
  async function handleRetry() {
    if (!email) return;

    const res = await fetch("/api/auth/register/send-email-step", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      throw new Error(data.message || "Failed to resend code");
    }

    // Reset timer after successful resend
    setTimer(60);
  }

  // Merge form validation + server error
  const errorMessage =
    form.formState.errors.code?.message ||
    (mutation.isError ? (mutation.error as Error).message : undefined);

  return {
    form,
    mutation,
    onSubmit,
    handleRetry,
    timer,
    errorMessage,
  };
}
