import { FormError } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";

import { ChevronRight } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import { Controller } from "react-hook-form";

import { registerStep } from "@/features/auth/lib/types/auth";
import { useOtpStep } from "@/features/auth/hooks/use-otp-step";

interface IOTPStepProps {
  setStep: Dispatch<SetStateAction<registerStep>>;
  email: string;
}

function OTPStep({ setStep, email }: IOTPStepProps) {
  // Custom hook handles form, API calls, timer & retry logic
  const {
    form,
    mutation,
    onSubmit,
    handleRetry,
    timer,
    errorMessage,
  } = useOtpStep({ email, setStep });

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
                    className="mb-6 w-10 h-10 mx-auto text-center rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 first:rounded-none last:rounded-none"
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          )}
        />

        {/* ===== Timer / Resend Section ===== */}
        {timer !== 0 ? (
          <p className="text-gray-500 w-fit mx-auto">
            You can Request another code in: {timer}s
          </p>
        ) : (
          <p className="text-gray-500 w-fit mx-auto">
            Didn't receive a code?{" "}
            <button
              type="button"
              className="text-blue-600 cursor-pointer"
              onClick={handleRetry} // resend OTP
              disabled={mutation.isPending}
            >
              Resend Code
            </button>
          </p>
        )}

        {/* ===== Error Feedback ===== */}
        <FormError message={errorMessage} />

        {/* ===== Submit Action ===== */}
        <Button
          type="submit"
          theme="outlineCustom"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Verifying..." : "Verify Code"}
          <ChevronRight width={16} height={16} className="shrink-0 w-4 h-4" />
        </Button>
      </form>
    </>
  );
}

export default memo(OTPStep);
