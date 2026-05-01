"use client";

import { useState } from "react";

import EmailStep from "@/features/auth/components/email-step";
import RegisterOtpStep from "@/features/auth/components/register-otp-step";
import UserInfoStep from "@/features/auth/components/user-info-step";
import ProgressSteps from "@/features/auth/components/progress-steps";
import AuthFormLayout from "@/features/auth/layout/auth-form-layout";

import { registerStep } from "@/features/auth/lib/types/auth";

export default function Register() {
  // ===== Registration flow state (step-based wizard) =====
  const [step, setStep] = useState<registerStep>("email");

  const [email, setEmail] = useState<string>("");

  // ===== All available steps in the registration flow =====
  const steps: registerStep[] = ["email", "otp", "userInfo", "password"];

  return (
    <div className="flex flex-col justify-center gap-3">
      {/* ===== Progress Steps ===== */}
      {step !== "email" && (
        <ProgressSteps
          steps={steps}
          currentStep={step}
          className="px-20 xl:px-38"
        />
      )}

      {/* ===== Auth Form Layout ===== */}
      <AuthFormLayout title="Create Account">
        {/* ===== Email Step ===== */}
        {step === "email" && (
          <EmailStep setStep={setStep} setEmail={setEmail} />
        )}

        {/* ===== OTP Step ===== */}
        {step === "otp" && <RegisterOtpStep setStep={setStep} email={email} />}

        {/* ===== User Info Step ===== */}
        {step === "userInfo" && <UserInfoStep email={email} />}
      </AuthFormLayout>
    </div>
  );
}
