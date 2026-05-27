"use client";

import { Dialog, DialogContent } from "@/shared/components/ui";
import { memo, useState } from "react";
import { IUpdateEmailStep } from "@/features/users/lib/types/api";
import { ProgressSteps } from "@/shared/components";
import { UpdateEmailStep, ConfirmEmailStep } from "@/features/users/components";
import { Dispatch, SetStateAction } from "react";

interface IUpdateEmailModalProps {
  open: boolean;
  setOpenEmailModal: Dispatch<SetStateAction<boolean>>;
}

function UpdateEmailModal({ open, setOpenEmailModal }: IUpdateEmailModalProps) {
  // ===== Update email flow state (step-based wizard) =====
  const [step, setStep] = useState<IUpdateEmailStep>("email");

  const [email, setEmail] = useState<string>("");

  // ===== All available steps in the update email flow =====
  const steps: IUpdateEmailStep[] = ["email", "otp"];

  return (
    <Dialog open={open} onOpenChange={setOpenEmailModal}>
      {/* ==== Dialog Content ==== */}
      <DialogContent>
        {/* ===== Progress Steps ===== */}
        <ProgressSteps steps={steps} currentStep={step} className="px-9" />

        {/* ===== Email Step ===== */}
        {step === "email" ? (
          <UpdateEmailStep setStep={setStep} setEmail={setEmail} />
        ) : (
          // ===== OTP Step =====
          <ConfirmEmailStep
            setStep={setStep}
            email={email}
            setOpenEmailModal={setOpenEmailModal}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default memo(UpdateEmailModal);
