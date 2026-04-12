import { z } from "zod";

/**
 * Validation schema for login form
 * Ensures secure username + strong password rules
 */
export const loginSchema = z.object({
  // Username must be at least 2 characters
  username: z.string().min(2, "Username must be at least 2 characters"),

  // Password must be strong (min 8 chars + complexity rules)
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
});
