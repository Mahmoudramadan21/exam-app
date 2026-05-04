"use client";

import { useLoginForm } from "@/features/auth/hooks";
import { Button, FieldGroup } from "@/shared/components/ui";
import { FormField, FormError, PasswordFormField } from "@/shared/components";

function LoginForm() {
  // Handles form state, validation, and login mutation
  const { form, onSubmit, mutation } = useLoginForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
      {/* ===== Form Fields ===== */}
      <FieldGroup className="gap-4">
        {/* Username input */}
        <FormField
          name="username"
          control={form.control}
          label="Username"
          placeholder="user123"
        />

        {/* Password input */}
        <PasswordFormField
          name="password"
          control={form.control}
          label="Password"
          placeholder="********"
          hasForgotPassword
        />
      </FieldGroup>

      {/* ===== Error Feedback ===== */}
      {mutation.isError && (
        <FormError message={(mutation.error as Error).message} />
      )}

      {/* ===== Submit Action ===== */}
      <Button type="submit" size="xl" disabled={mutation.isPending}>
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginForm;
