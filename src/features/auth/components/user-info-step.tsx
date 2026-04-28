"use client";

import {
  FormField,
  PhoneFormField,
  PasswordFormField,
  FormError,
} from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import { FieldGroup } from "@/shared/components/ui/field";

import { ChevronRight } from "lucide-react";

import { useUserInfoStep } from "../hooks/use-user-info-step";
import { memo } from "react";

function UserInfoStep({ email }: { email: string }) {
  const { form, mutation, showPasswordStep, handleNextStep, onSubmit } =
    useUserInfoStep({ email });

  return (
    <>
      {/* ===== Step Header ===== */}
      <h3 className="text-2xl text-blue-600 font-bold mt-4">
        {showPasswordStep
          ? "Create a strong password"
          : "Tell us more about you"}
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        {/* ================= STEP 1: User Basic Info ================= */}
        {!showPasswordStep && (
          <>
            <FieldGroup className="gap-4 grid grid-cols-2">
              {/* First Name Field */}
              <FormField
                name="firstName"
                control={form.control}
                label="First Name"
                placeholder="Ahmed"
              />

              {/* Last Name Field */}
              <FormField
                name="lastName"
                control={form.control}
                label="Last Name"
                placeholder="Abdullah"
              />
            </FieldGroup>

            <FieldGroup className="mt-4">
              {/* Username Field */}
              <FormField
                name="username"
                control={form.control}
                label="Username"
                placeholder="user123"
              />

              {/* Phone Field */}
              <PhoneFormField
                name="phone"
                control={form.control}
                label="Phone Number"
              />
            </FieldGroup>

            {/* API Error (Step 1 context) */}
            {mutation.isError && (
              <FormError message={(mutation.error as Error).message} />
            )}

            {/* Go to Step 2 */}
            <Button
              type="button"
              variant="outline"
              className="mt-10 mb-9 w-full text-gray-800 border-blue-600 bg-blue-50 hover:bg-blue-100/60 transition-colors hover:cursor-pointer h-12 text-sm font-medium rounded-none"
              disabled={mutation.isPending}
              onClick={handleNextStep}
            >
              Next
              <ChevronRight width={16} height={16} />
            </Button>
          </>
        )}

        {/* ================= STEP 2: Password Setup ================= */}
        {showPasswordStep && (
          <>
            <FieldGroup className="mt-4">
              {/* Password Field */}
              <PasswordFormField
                name="password"
                control={form.control}
                label="Password"
                placeholder="********"
              />

              {/* Confirm Password Field */}
              <PasswordFormField
                name="confirmPassword"
                control={form.control}
                label="Confirm Password"
                placeholder="********"
              />
            </FieldGroup>

            {/* API Error (Step 2 context) */}
            {mutation.isError && (
              <FormError message={(mutation.error as Error).message} />
            )}

            {/* Final Submit */}
            <Button
              type="submit"
              variant="outline"
              className="mt-10 mb-9 w-full bg-blue-600 hover:bg-blue-500 transition-colors hover:cursor-pointer h-12 text-base rounded-none"
              disabled={mutation.isPending}
            >
              Create Account
            </Button>
          </>
        )}
      </form>
    </>
  );
}

export default memo(UserInfoStep);
