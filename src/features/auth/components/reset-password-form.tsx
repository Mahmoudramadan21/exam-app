"use client";

import { memo } from "react";
import { Button, FieldGroup } from "@/shared/components/ui";
import { FormError, PasswordFormField } from "@/shared/components";
import { useResetPasswordForm } from "@/features/auth/hooks";

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
        <Button type="submit" size="xl" disabled={mutation.isPending}>
          {mutation.isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </>
  );
}

export default memo(ResetPasswordForm);
