"use client";

import { useState } from "react";

import EmailStep from "@/features/auth/components/email-step";
import OtpStep from "@/features/auth/components/otp-step";
import UserInfoStep from "@/features/auth/components/user-info-step";
import ProgressSteps from "@/features/auth/components/progress-steps";
import AuthFormLayout from "@/features/auth/layout/auth-form-layout";

import { registerStep } from "@/features/auth/lib/types/auth";

function Register() {
  // ===== Registration flow state (step-based wizard) =====
  const [step, setStep] = useState<registerStep>("email");

  const [email, setEmail] = useState<string>("");

  // ===== All available steps in the registration flow =====
  const steps: registerStep[] = ["email", "otp", "userInfo", "password"];

  return (
    <div className="flex flex-col justify-center gap-3">
      {/* ===== Progress Steps ===== */}
      {step !== "email" && <ProgressSteps steps={steps} currentStep={step} />}

      {/* ===== Auth Form Layout ===== */}
      <AuthFormLayout title="Create Account">
        {/* ===== Email Step ===== */}
        {step === "email" && (
          <EmailStep setStep={setStep} setEmail={setEmail} />
        )}

        {/* ===== OTP Step ===== */}
        {step === "otp" && <OtpStep setStep={setStep} email={email} />}

        {/* ===== User Info Step ===== */}
        {step === "userInfo" && <UserInfoStep email={email} />}
      </AuthFormLayout>
    </div>
  );
}

export default Register;
