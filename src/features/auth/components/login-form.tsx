"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn v4 components
import { Button } from "@/shared/components/ui/button";
import { FieldGroup } from "@/shared/components/ui/field";
import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginSchema } from "../lib/schemas/login.schema";
import FormField from "@/shared/components/form-field";
import PasswordFormField from "@/shared/components/password-form-field";
import FormError from "@/shared/components/form-error";
import { ILoginSchema } from "../lib/types/auth";

function LoginForm() {
  const router = useRouter();

  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // React Query mutation
  const mutation = useMutation({
    mutationFn: async (values: ILoginSchema) => {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error(res?.error || "Invalid credentials");
      }

      return res;
    },

    onSuccess: () => {
      router.replace("/");
    },
  });

  async function onSubmit(values: ILoginSchema) {
    mutation.mutate(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup className="gap-4">
        {/* Username */}
        <FormField
          name="username"
          control={form.control}
          label="Username"
          placeholder="user123"
        />

        {/* Password */}
        <PasswordFormField
          name="password"
          control={form.control}
          label="Password"
          placeholder="********"
          hasForgotPassword
        />
      </FieldGroup>

      {/* Error Message */}
      {mutation.isError && (
        <FormError message={(mutation.error as Error).message} />
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="mt-10 mb-9 w-full bg-blue-600 hover:bg-blue-500 transition-colors hover:cursor-pointer h-12 text-base rounded-none"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
