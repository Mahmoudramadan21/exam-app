import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const userInfoSchema = z
  .object({
    email: z.email("Invalid email"),
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid phone number format",
      })
      .refine((val) => /^\+20(10|11|12|15)\d{8}$/.test(val), {
        message: "Invalid Egyptian mobile number",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
