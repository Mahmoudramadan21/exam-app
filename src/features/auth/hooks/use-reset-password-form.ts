"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { resetPasswordSchema } from "../lib/schemas/reset-password.schema";
import { IResetPasswordSchema } from "../lib/types/auth";

interface UseResetPasswordFormProps {
  token: string;
}

export function useResetPasswordForm({ token }: UseResetPasswordFormProps) {
  const router = useRouter();

  // Form setup with validation
  const form = useForm<IResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      token,
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Reset password request
  const mutation = useMutation({
    mutationFn: async (values: IResetPasswordSchema) => {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!data.status) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    },

    // Redirect after successful reset
    onSuccess: () => {
      router.replace("/login");
    },
  });

  // Submit handler
  function onSubmit(values: IResetPasswordSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    mutation,
    onSubmit,
  };
}
