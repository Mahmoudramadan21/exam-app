import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

// Validation schema for update profile form
export const updateProfileSchema = z.object({
  // ===== Basic identity fields =====
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.email("Invalid email"),

  // ===== Phone validation =====
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => isValidPhoneNumber(val), {
      message: "Invalid phone number format",
    })
    .refine((val) => /^\+20(10|11|12|15)\d{8}$/.test(val), {
      message: "Invalid Egyptian mobile number",
    }),
});
