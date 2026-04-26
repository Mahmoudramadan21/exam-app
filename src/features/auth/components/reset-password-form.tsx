"use client";

import { memo } from "react";

import { FormError, PasswordFormField } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import { FieldGroup } from "@/shared/components/ui/field";
import { useResetPasswordForm } from "@/features/auth/hooks/use-reset-password-form";

function ResetPasswordForm({ token }: { token: string }) {
  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useResetPasswordForm({ token });

  return (
    <>
      {/* ===== Reset Password Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9">
        {/* Password Fields Group */}
        <FieldGroup className="gap-4">
          <PasswordFormField
            name="newPassword"
            control={form.control}
            label="New Password"
            placeholder="********"
          />

          <PasswordFormField
            name="confirmPassword"
            control={form.control}
            label="Confirm New Password"
            placeholder="********"
          />
        </FieldGroup>

        {/* ===== Error Feedback ===== */}
        {mutation.isError && (
          <FormError message={(mutation.error as Error).message} />
        )}

        {/* ===== Submit Action ===== */}
        <Button type="submit" theme="primary" disabled={mutation.isPending}>
          {mutation.isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </>
  );
}

export default memo(ResetPasswordForm);
