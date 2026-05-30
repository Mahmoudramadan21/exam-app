import { z } from "zod";
import { IApiResponse } from "@/shared/lib/types/api";
import { IUser } from "@/features/auth/lib/types/user";
import { updateProfileSchema } from "@/features/users/lib/schema/update-profile.schema";
import { changePasswordSchema } from "@/features/users/lib/schema/change-password.schema";

//  Update Profile Types
export type IUpdateProfileSchema = z.infer<typeof updateProfileSchema>;

//  User Payload Types
export interface IUserPayload {
  user: IUser;
}

//  Profile Response Types
export type IProfileResponse = IApiResponse<IUserPayload>;

//  Update Email Types
export type IUpdateEmailStep = "email" | "otp";

//  Update Password Types
export type IChangePasswordSchema = z.infer<typeof changePasswordSchema>;
