"use client";

import { memo } from "react";
import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { Controller } from "react-hook-form";
import { FormError } from "@/shared/components";
import { useConfirmEmailOtpStep } from "@/features/users/hooks";
import { IUpdateEmailStep } from "@/features/users/lib/types/api";

interface ConfirmEmailStepProps {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<IUpdateEmailStep>>;
  setOpenEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmEmailStep({
  email,
  setStep,
  setOpenEmailModal,
}: ConfirmEmailStepProps) {
  // Handles: Form state, OTP verification, Resend confirmation code, Countdown timer
  const {
    form,
    timer,
    onSubmit,
    errorMessage,
    verifyOtpMutation,
    resendOtpMutation,
  } = useConfirmEmailOtpStep({ email, setStep, setOpenEmailModal });

  return (
    <>
      {/* ===== OTP Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="px-4 md:px-9 flex flex-col items-center gap-2.5">
          <DialogHeader className="self-start">
            <DialogTitle>Change Email</DialogTitle>

            <h3 className="font-inter font-bold text-lg md:text-xl lg:text-2xl text-blue-600 mt-4.5">
              Enter your OTP
            </h3>
          </DialogHeader>

          {/* ===== Instructions + Edit Email ===== */}
          <DialogDescription className="max-w-120 self-start">
            Please enter the 6-digits code we have sent to:{" "}
            <span className="text-black">{email}.</span>{" "}
            <button
              type="button"
              onClick={() => setStep("email")}
              className="cursor-pointer font-medium text-blue-600 hover:underline"
            >
              Edit
            </button>
          </DialogDescription>

          {/* OTP input controlled by react-hook-form */}
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                {/* Render OTP slots */}
                {[...Array(6)].map((_, index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot index={index} className="my-6" />
                  </InputOTPGroup>
                ))}
              </InputOTP>
            )}
          />

          {/* ===== Timer / Resend Section ===== */}
          {timer > 0 ? (
            <p className="w-fit text-gray-500">
              You can request another code in: {timer}s
            </p>
          ) : (
            <p className="w-fit text-gray-500">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                className="cursor-pointer text-blue-600"
                onClick={() => resendOtpMutation.mutate()}
                disabled={resendOtpMutation.isPending}
              >
                {resendOtpMutation.isPending ? "Resending..." : "Resend Code"}
              </button>
            </p>
          )}

          {/* ===== Error Feedback ===== */}
          <FormError message={errorMessage} className="" />
        </div>

        {/* ===== Submit Action ===== */}
        <DialogFooter>
          <Button disabled={verifyOtpMutation.isPending}>
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

export default memo(ConfirmEmailStep);
