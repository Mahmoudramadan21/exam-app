"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { loginSchema } from "@/features/auth/lib/schemas/login.schema";
import { ILoginSchema } from "@/features/auth/lib/types/auth";

export function useLoginForm() {
  // Initialize form with validation schema
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle login request
  const mutation = useMutation({
    mutationFn: async (values: ILoginSchema) => {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false, // prevent auto redirect to control it manually
      });

      // Throw error to be caught by React Query
      if (!res?.ok) {
        throw new Error(res?.error || "Invalid credentials");
      }

      return res;
    },

    // Redirect after successful login
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  // Submit handler that triggers mutation
  function onSubmit(values: ILoginSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
