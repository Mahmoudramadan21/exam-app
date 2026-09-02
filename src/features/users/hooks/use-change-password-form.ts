"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  IChangePasswordSchema,
  IProfileResponse,
} from "@/features/users/lib/types/api";
import { changePasswordSchema } from "../lib/schema/change-password.schema";
import { toast } from "sonner";

export function useChangePasswordForm() {
  // Form setup
  const form = useForm<IChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update profile mutation
  const mutation = useMutation({
    mutationFn: async (values: IChangePasswordSchema) => {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }),
      });

      const data: IProfileResponse = await res.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message, {
        position: "bottom-right",
      });

      form.reset();
    },
  });

  function onSubmit(values: IChangePasswordSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
