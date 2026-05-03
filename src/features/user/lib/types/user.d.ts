import { z } from "zod";
import { updateProfileSchema } from "@/features/user/lib/schema/update-profile.schema";
import { IApiResponse } from "@/shared/lib/types/api";
import { IUser } from "@/features/auth/lib/types/user";

export type IUpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export interface IUserPayload {
  user: IUser;
}

export type IProfileResponse = IApiResponse<IUserPayload>;

export type IUpdateEmailStep = "email" | "otp";
