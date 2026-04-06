"use client";

import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import AuthFormLayout from "@/features/auth/layout/auth-form-layout";
import { cn } from "@/shared/lib/utils/tailwind-cn";
import Link from "next/link";
import { useState } from "react";

export type forgotPasswordSteps = "email" | "successSentCode";

function ForgotPassword() {
  const [step, setStep] = useState<forgotPasswordSteps>("email");
  const [email, setEmail] = useState("");

  return (
    <AuthFormLayout title="Forgot Password">
      <p className="mt-3 mb-7 text-gray-500">
        Don’t worry, we will help you recover your account.
      </p>
      {step === "email" && (
        <ForgotPasswordForm setStep={setStep} setEmail={setEmail} />
      )}

      {step === "successSentCode" && (
        <div className="mt-6 mb-9 ">
          <p className="text-gray-800">
            We have sent a password reset link to:{" "}
            <span className="text-blue-600">{email}. </span>
          </p>

          <p className="my-5 text-gray-800">
            Please check your inbox and follow the instructions to reset your
            password.
          </p>

          <p className="text-gray-500">
            If you don’t see the email within a few minutes, check your spam or
            junk folder.
          </p>
        </div>
      )}

      <div
        className={cn(
          "text-sm text-muted-foreground font-medium",
          step === "successSentCode" ? "" : "w-fit mx-auto",
        )}
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Create yours
        </Link>
      </div>
    </AuthFormLayout>
  );
}

export default ForgotPassword;
