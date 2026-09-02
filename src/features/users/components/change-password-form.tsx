"use client";

import { memo } from "react";
import { FormError, PasswordFormField } from "@/shared/components";
import { FieldGroup, Button } from "@/shared/components/ui";
import { useChangePasswordForm } from "@/features/users/hooks";

function ChangePasswordForm() {
  // Handles form state, validation, and login mutation
  const { form, onSubmit, mutation } = useChangePasswordForm();

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full p-6 bg-white"
      >
        {/* ===== Form Fields ===== */}
        <FieldGroup className="gap-4">
          {/* Username input */}
          <PasswordFormField
            name="currentPassword"
            control={form.control}
            label="Current Password"
            placeholder="********"
            autoComplete="new-password"
          />

          {/* Password input */}
          <PasswordFormField
            name="newPassword"
            control={form.control}
            label="New Password"
            placeholder="********"
          />
          {/* Password input */}
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
        <Button size="xl" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating Password..." : "Update Password"}
        </Button>
      </form>
    </>
  );
}

export default memo(ChangePasswordForm);
