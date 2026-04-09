"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

import {
  IEmailStepSchema,
  forgotPasswordSteps,
} from "@/features/auth/lib/types/auth";
import { emailStepSchema } from "@/features/auth/lib/schemas/email-step.schema";

interface UseForgotPasswordFormProps {
  setStep: Dispatch<SetStateAction<forgotPasswordSteps>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

export function useForgotPasswordForm({
  setStep,
  setEmail,
}: UseForgotPasswordFormProps) {
  // Form setup with validation schema
  const form = useForm<IEmailStepSchema>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: { email: "" },
  });

  // Send forgot password request
  const mutation = useMutation({
    mutationFn: async (values: IEmailStepSchema) => {
      const data = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      // Normalize API error handling
      if (!data.status) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    },

    // Move to next step after successful request
    onSuccess: () => {
      setStep("successSentCode");
    },
  });

  // Submit handler
  function onSubmit(values: IEmailStepSchema) {
    setEmail(values.email);
    mutation.mutate(values);
  }

  return {
    form,
    mutation,
    onSubmit,
  };
}
