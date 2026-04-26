import z from "zod";

export const otpStepSchema = z.object({
  email: z.email("Invalid email"),
  code: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

