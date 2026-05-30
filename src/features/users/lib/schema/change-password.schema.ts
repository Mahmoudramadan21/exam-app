import { z } from "zod";

//  Validation schema for change password form
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    confirmPassword: z.string(),
  })

  // ===== Cross-field validation =====
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
