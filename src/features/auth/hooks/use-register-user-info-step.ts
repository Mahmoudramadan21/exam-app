"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoStepSchema } from "@/features/auth/lib/schemas";
import { IUserInfoStepSchema } from "@/features/auth/lib/types/auth";
import { userInfoStepAction } from "@/features/auth/lib/actions/register.action";
import {
  REGISTER_STEP_ONE_FIELDS,
  REGISTER_STEP_TWO_FIELDS,
} from "@/features/auth/lib/constants/register-form.constant";

interface IUseRegisterUserInfoStepProps {
  email: string;
}

export function useRegisterUserInfoStep({
  email,
}: IUseRegisterUserInfoStepProps) {
  // Controls step navigation (basic info -> password)
  const [showPasswordStep, setShowPasswordStep] = useState(false);

  // Form setup with validation schema
  const form = useForm<IUserInfoStepSchema>({
    resolver: zodResolver(userInfoStepSchema),
    defaultValues: {
      email,
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit user registration
  const mutation = useMutation({
    mutationFn: (values: IUserInfoStepSchema) => userInfoStepAction(values),

    // Redirect after success
    onSuccess: () => {
      window.location.href = "/login";
    },

    onError: (error: Error) => {
      const message = error.message;

      // Step 1 error
      if (
        REGISTER_STEP_ONE_FIELDS.some((field) =>
          message.toLowerCase().includes(field.toLowerCase()),
        )
      ) {
        setShowPasswordStep(false);

        // Example: username error
        if (message.toLowerCase().includes("username")) {
          form.setError("username", {
            type: "server",
            message,
          });
        }

        return;
      }

      // Step 2 error
      if (
        REGISTER_STEP_TWO_FIELDS.some((field) =>
          message.toLowerCase().includes(field.toLowerCase()),
        )
      ) {
        setShowPasswordStep(true);

        if (message.toLowerCase().includes("password")) {
          form.setError("password", {
            type: "server",
            message,
          });
        }

        return;
      }
    },
  });

  // Step 1 -> Step 2 validation (no submit yet)
  async function handleNextStep() {
    const valid = await form.trigger([
      "firstName",
      "lastName",
      "username",
      "phone",
    ]);

    if (valid) setShowPasswordStep(true);
  }

  // Final submit (Step 2 only)
  function onSubmit(values: IUserInfoStepSchema) {
    if (!showPasswordStep) return;

    mutation.mutate({
      ...values,
      email,
    });
  }

  return {
    form,
    mutation,
    showPasswordStep,
    setShowPasswordStep,
    handleNextStep,
    onSubmit,
  };
}
