import FormField from "@/shared/components/form-field";
import FormError from "@/shared/components/form-error";
import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { otpStepSchema } from "@/features/auth/lib/schemas/otp-step.schema";
import { IOtpStepSchema, registerStep } from "@/features/auth/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, CircleX } from "lucide-react";
import Link from "next/link";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { number } from "zod";

interface IOTPStepProps {
  setStep: Dispatch<SetStateAction<registerStep>>;
  email: string;
}

function OTPStep({ setStep, email }: IOTPStepProps) {
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const form = useForm<IOtpStepSchema>({
    resolver: zodResolver(otpStepSchema),
    defaultValues: { email, code: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: IOtpStepSchema) => {
      const res = await fetch("/api/auth/register/confirm-otp-step", {
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
    onSuccess: () => setStep("userInfo"),
  });

  function onSubmit(values: IOtpStepSchema) {
    mutation.mutate({
      email,
      code: values.code,
    });
  }

  async function handleRetry() {
    if (!email) return;

    const res = await fetch("/api/auth/register/send-email-step", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      throw new Error(data.message || "Failed to resend code");
    }

    setTimer(60);
  }

  const errorMessage =
    form.formState.errors.code?.message ||
    (mutation.isError ? (mutation.error as Error).message : undefined);

  return (
    <>
      <h3 className="text-2xl text-blue-600 font-bold">Verify OTP</h3>
      <p className="mt-3 mb-7 text-gray-500">
        Please enter the 6-digits code we have sent to:{" "}
        <span className="text-black">{email}. </span>
        <button
          type="button"
          className="text-blue-600 hover:underline cursor-pointer font-medium"
          onClick={() => setStep("email")}
        >
          Edit
        </button>
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

        {timer !== 0 && (
          <p className="text-gray-500 w-fit mx-auto">
            You can Request another code in: {timer}s
          </p>
        )}

        {timer === 0 && (
          <p className="text-gray-500 w-fit mx-auto">
            Didn't receive a code?{" "}
            <button
              type="button"
              className="text-blue-600 cursor-pointer"
              onClick={handleRetry}
              disabled={mutation.isPending}
            >
              Resend Code
            </button>
          </p>
        )}

        {/* {console.log(form?.formState.errors.code.message)} */}
        {/* {console.log(mutation.error?.message)} */}

        {/* Error Message */}
        <FormError message={errorMessage} />

        {/* Next Button */}
        <Button
          type="submit"
          variant="outline"
          className="mt-10 mb-9 w-full text-gray-800 border-blue-600 bg-blue-50 hover:bg-blue-100/60 transition-colors hover:cursor-pointer h-12 text-sm font-medium rounded-none"
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
