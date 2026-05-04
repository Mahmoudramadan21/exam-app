"use client";

import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui";
import { Controller } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { FormError } from "@/shared/components";
import { Dispatch, memo, SetStateAction } from "react";
import { useRegisterOtpStep } from "@/features/auth/hooks";
import { registerStep } from "@/features/auth/lib/types/auth";

interface IRegisterOtpStepProps {
  setStep: Dispatch<SetStateAction<registerStep>>;
  email: string;
}

function RegisterOtpStep({ setStep, email }: IRegisterOtpStepProps) {
  // Custom hook handles form, API calls, timer & retry logic
  const {
    form,
    timer,
    onSubmit,
    errorMessage,
    verifyOtpMutation,
    resendOtpMutation,
  } = useRegisterOtpStep({
    email,
    setStep,
  });

  return (
    <>
      {/* ===== Header Section ===== */}
      <h3 className="text-2xl text-blue-600 font-bold mt-4">Verify OTP</h3>

      {/* ===== Instructions + Edit Email ===== */}
      <p className="mt-3 mb-7 text-gray-500">
        Please enter the 6-digits code we have sent to:{" "}
        <span className="text-black">{email}. </span>
        <button
          type="button"
          className="text-blue-600 hover:underline cursor-pointer font-medium"
          onClick={() => setStep("email")} // go back to edit email step
        >
          Edit
        </button>
      </p>

      {/* ===== OTP Form ===== */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* OTP Input (controlled by react-hook-form) */}
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              className="flex justify-between items-center gap-2"
            >
              {/* Render 6 OTP slots */}
              {[...Array(6)].map((_, i) => (
                <InputOTPGroup key={i} className="flex-1">
                  <InputOTPSlot
                    index={i}
                    className=""
                    aria-invalid={!!errorMessage}
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          )}
        />

        {/* ===== Timer / Resend Section ===== */}
        {timer > 0 ? (
          <p className="mx-auto w-fit text-gray-500">
            You can request another code in: {timer}s
          </p>
        ) : (
          <p className="mx-auto w-fit text-gray-500">
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
        <FormError message={errorMessage} />

        {/* ===== Submit Action ===== */}
        <Button
          type="submit"
          theme="outlineCustom"
          ui="fullWidth"
          size="xl"
          disabled={verifyOtpMutation.isPending}
        >
          {verifyOtpMutation.isPending ? "Verifying..." : "Verify Code"}

          <ChevronRight className="h-4 w-4 shrink-0" />
        </Button>
      </form>
    </>
  );
}

export default memo(RegisterOtpStep);
