"use client";

import EmailStep from "@/features/auth/components/email-step";
import OtpStep from "@/features/auth/components/otp-step";
import ProgressSteps from "@/features/auth/components/progress-steps";
import UserInfoStep from "@/features/auth/components/user-info-step";
import AuthFormLayout from "@/features/auth/layout/auth-form-layout";
import { registerStep } from "@/features/auth/lib/types/auth";
import { useState } from "react";

function Register() {
  const [step, setStep] = useState<registerStep>("email");
  const [email, setEmail] = useState<string>("");

  const steps: registerStep[] = ["email", "otp", "userInfo", "password"];

  return (
    <div className="flex flex-col justify-center gap-3">
      {step !== "email" && <ProgressSteps steps={steps} currentStep={step} />}
      <AuthFormLayout title="Create Account">
        {step === "email" && (
          <EmailStep setStep={setStep} setEmail={setEmail} />
        )}
        {step === "otp" && <OtpStep setStep={setStep} email={email} />}
        {step === "userInfo" && <UserInfoStep email={email} />}
      </AuthFormLayout>
    </div>
  );
}

export default Register;
