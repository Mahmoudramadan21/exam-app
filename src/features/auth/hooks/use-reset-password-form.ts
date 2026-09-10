"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/features/auth/lib/schemas";
import { IResetPasswordSchema } from "@/features/auth/lib/types/auth";
import { resetPasswordAction } from "@/features/auth/lib/actions/reset-password.action";

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
    mutationFn: (values: IResetPasswordSchema) =>
      resetPasswordAction({
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }),

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
