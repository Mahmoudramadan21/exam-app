import { IApiResponse } from "@/shared/lib/types/api";
import { IUser } from "./user";
import { z } from "zod";

import { loginSchema } from "../schemas/login.schema";
import { emailStepSchema } from "../schemas/email-step.schema";
import { otpStepSchema } from "../schemas/otp-step.schema";
import { userInfoSchema } from "../schemas/user-info-step.schema";
import { resetPasswordSchema } from "../schemas/reset-password.schema";

/**
 * =========================
 * Auth Form Schemas (inferred types)
 * =========================
 */

export type ILoginSchema = z.infer<typeof loginSchema>;
export type IEmailStepSchema = z.infer<typeof emailStepSchema>;
export type IOtpStepSchema = z.infer<typeof otpStepSchema>;
export type IUserInfoSchema = z.infer<typeof userInfoSchema>;
export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

/**
 * =========================
 * API Response Types
 * =========================
 */

export interface ILoginPayload {
  user: IUser;
  token: string;
}

export type ILoginResponse = IApiResponse<ILoginPayload>;

/**
 * =========================
 * Auth Flow States
 * =========================
 */

// Registration multi-step flow
export type registerStep = "email" | "otp" | "userInfo" | "password";

// Forgot password flow
export type forgotPasswordSteps = "email" | "successSentCode";
