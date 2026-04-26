import { IApiResponse } from "@/shared/lib/types/api";
import { IUser } from "./user";

export type ILoginSchema = z.infer<typeof loginSchema>;

export interface ILoginPayload {
  user: IUser;
  token: string;
}

export type ILoginResponse = IApiResponse<ILoginPayload>;

export type registerStep = "email" | "otp" | "userInfo" | "password";