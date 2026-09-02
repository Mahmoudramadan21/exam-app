"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Dispatch, SetStateAction } from "react";
import { IUpdateEmailStep } from "../lib/types/api";
import { IEmailStepSchema } from "@/features/auth/lib/types/auth";
import { emailStepSchema } from "@/features/auth/lib/schemas/email-step.schema";

interface UseUpdateEmailStepProps {
  setStep: Dispatch<SetStateAction<IUpdateEmailStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

export function useUpdateEmailStep({
  setStep,
  setEmail,
}: UseUpdateEmailStepProps) {
  // Initialize form with validation
  const form = useForm<IEmailStepSchema>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: { email: "" },
  });

  // API call to send email (OTP step)
  const mutation = useMutation({
    mutationFn: async (values: IEmailStepSchema) => {
      const data = await fetch("/api/users/update-email", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      // Throw error to let React Query handle it
      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    // Move to next step on success
    onSuccess: () => {
      setStep("otp");
    },
  });

  // Submit handler
  function onSubmit(values: IEmailStepSchema) {
    setEmail(values.email); // store email for next steps
    mutation.mutate(values);
  }

  return {
    form,
    mutation,
    onSubmit,
  };
}
