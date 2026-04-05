"use client";

import FormField from "@/shared/components/form-field";
import PasswordFormField from "@/shared/components/password-form-field";
import PhoneFormField from "@/shared/components/phone-form-field";
import { Button } from "@/shared/components/ui/button";
import { FieldGroup } from "@/shared/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { IUserInfoSchema, registerStep } from "../lib/types/auth";
import { userInfoSchema } from "../lib/schemas/user-info-step.schema";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import FormError from "@/shared/components/form-error";

interface IUserInfoStep {
  email: string;
}

function UserInfoStep({ email }: IUserInfoStep) {
  const [showPasswordStep, setShowPasswordStep] = useState(false);

  const form = useForm<IUserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      email,
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: async (values: IUserInfoSchema) => {
      const res = await fetch("/api/auth/register/user-info-step", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Invalid OTP");
      }

      return data;
    },
    onSuccess: () => (window.location.href = "/login"),
  });

  function onSubmit(values: IUserInfoSchema) {
    if (!showPasswordStep) return;

    mutation.mutate({
      ...values,
      email,
    });
  }

  return (
    <>
      <h3 className="text-2xl text-blue-600 font-bold">
        {showPasswordStep
          ? "Create a strong password"
          : "Tell us more about you"}
      </h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        {/* ================= STEP 1 ================= */}
        {!showPasswordStep && (
          <>
            <FieldGroup className="gap-4 grid grid-cols-2">
              <FormField
                name="firstName"
                control={form.control}
                label="First Name"
                placeholder="Ahmed"
              />

              <FormField
                name="lastName"
                control={form.control}
                label="Last Name"
                placeholder="Abdullah"
              />
            </FieldGroup>

            <FieldGroup className="mt-4">
              <FormField
                name="username"
                control={form.control}
                label="Username"
                placeholder="user123"
              />

              <PhoneFormField
                name="phone"
                control={form.control}
                label="Phone Number"
              />
            </FieldGroup>

            {/* Error Message */}
            {mutation.isError && (
              <FormError message={(mutation.error as Error).message} />
            )}

            <Button
              type="button"
              variant="outline"
              className="mt-10 mb-9 w-full text-gray-800 border-blue-600 bg-blue-50 hover:bg-blue-100/60 transition-colors hover:cursor-pointer h-12 text-sm font-medium rounded-none"
              disabled={mutation.isPending}
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();

                const valid = await form.trigger([
                  "firstName",
                  "lastName",
                  "username",
                  "phone",
                ]);

                if (valid) setShowPasswordStep(true);
              }}
            >
              Next
              <ChevronRight
                width={16}
                height={16}
                className="shrink-0 w-4 h-4"
              />
            </Button>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {showPasswordStep && (
          <>
            <FieldGroup className="mt-4">
              <PasswordFormField
                name="password"
                control={form.control}
                label="Password"
                placeholder="********"
              />

              <PasswordFormField
                name="confirmPassword"
                control={form.control}
                label="Confirm Password"
                placeholder="********"
              />
            </FieldGroup>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => setShowPasswordStep(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Back
            </button>

            {/* Error Message */}
            {mutation.isError && (
              <FormError message={(mutation.error as Error).message} />
            )}

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

export default UserInfoStep;
