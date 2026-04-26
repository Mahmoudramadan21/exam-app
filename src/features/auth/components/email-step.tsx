import FormField from "@/shared/components/form-field";
import FormError from "@/shared/components/form-error";
import { Button } from "@/shared/components/ui/button";
import { FieldError } from "@/shared/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Dispatch, memo, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IEmailStepSchema, registerStep } from "../lib/types/auth";
import {
  emailStepSchema,
} from "../lib/schemas/email-step.schema";

interface IEmailStep {
  setStep: Dispatch<SetStateAction<registerStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

function EmailStep({ setStep, setEmail }: IEmailStep) {
  const form = useForm<IEmailStepSchema>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: IEmailStepSchema) => {
      const data = await fetch("/api/auth/register/send-email-step", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: () => setStep("otp"),
  });

  function onSubmit(values: IEmailStepSchema) {
    setEmail(values.email);
    mutation.mutate(values);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          label="Email"
          placeholder="user@example.com"
        />

        {mutation.isError && (
          <FormError message={(mutation.error as Error).message} />
        )}

        {/* Next Button */}
        <Button
          type="submit"
          variant="outline"
          className="mt-10 mb-9 w-full text-gray-800 border-blue-600 bg-blue-50 hover:bg-blue-100/60 transition-colors hover:cursor-pointer h-12 text-sm font-medium rounded-none"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Loading..." : "Next"}
          <ChevronRight width={16} height={16} className="shrink-0 w-4 h-4" />
        </Button>
      </form>

      <div className="w-fit mx-auto text-sm text-muted-foreground font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default memo(EmailStep);
