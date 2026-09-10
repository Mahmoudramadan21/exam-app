"use client";

import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema } from "@/features/auth/lib/schemas";
import { IEmailStepSchema, registerStep } from "@/features/auth/lib/types/auth";
import { sendEmailStepAction } from "@/features/auth/lib/actions/register.action";

interface IUseRegisterEmailStepProps {
  setStep: Dispatch<SetStateAction<registerStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

export function useRegisterEmailStep({
  setStep,
  setEmail,
}: IUseRegisterEmailStepProps) {
  // Initialize form with validation
  const form = useForm<IEmailStepSchema>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: { email: "" },
  });

  // API call to send email (OTP step)
  const mutation = useMutation({
    mutationFn: (values: IEmailStepSchema) => sendEmailStepAction(values.email),

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
