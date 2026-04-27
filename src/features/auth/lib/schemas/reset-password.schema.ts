import { z } from "zod";

/**
 * Validation schema for reset password flow
 * Ensures valid token + strong password + matching confirmation
 */
export const resetPasswordSchema = z
  .object({
    // Reset token from URL (required for security)
    token: z.string().min(1, "Invalid or missing token"),

    // New password constraints
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),

    // Confirmation field (must match new password)
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })

  // Cross-field validation: ensure passwords match
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
