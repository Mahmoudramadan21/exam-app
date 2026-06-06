"use client";

import { useState } from "react";
import { ProgressSteps } from "@/shared/components";
import { AuthFormLayout } from "@/features/auth/layout";
import { registerStep } from "@/features/auth/lib/types/auth";
import {
  RegisterEmailStep,
  RegisterOtpStep,
  RegisterUserInfoStep,
} from "@/features/auth/components";

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
          <RegisterEmailStep setStep={setStep} setEmail={setEmail} />
        )}

        {/* ===== OTP Step ===== */}
        {step === "otp" && <RegisterOtpStep setStep={setStep} email={email} />}

        {/* ===== User Info Step ===== */}
        {step === "userInfo" && <RegisterUserInfoStep email={email} />}
      </AuthFormLayout>
    </div>
  );
}
