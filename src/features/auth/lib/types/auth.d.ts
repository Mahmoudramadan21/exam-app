import { IApiResponse } from "@/shared/lib/types/api";
import { IUser } from "./user";

export type ILoginSchema = z.infer<typeof loginSchema>;

export type IEmailStepSchema = z.infer<typeof emailStepSchema>;

export type IOtpStepSchema = z.infer<typeof otpStepSchema>;

export type IUserInfoSchema = z.infer<typeof userInfoSchema>;

export interface ILoginPayload {
  user: IUser;
  token: string;
}

export type ILoginResponse = IApiResponse<ILoginPayload>;

export type registerStep = "email" | "otp" | "userInfo" | "password";
