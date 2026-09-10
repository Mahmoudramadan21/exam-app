"use client";

import {
  IEmailStepSchema,
  forgotPasswordSteps,
} from "@/features/auth/lib/types/auth";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema } from "@/features/auth/lib/schemas";
import { forgotPasswordAction } from "@/features/auth/lib/actions/forgot-password.action";

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
    mutationFn: (values: IEmailStepSchema) =>
      forgotPasswordAction(values.email),

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
