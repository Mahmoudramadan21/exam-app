import { IUserInfoStepSchema } from "@/features/auth/lib/types/auth";

export const REGISTER_STEP_ONE_FIELDS = [
  "firstName",
  "lastName",
  "username",
  "phone",
] as const satisfies readonly (keyof IUserInfoStepSchema)[];

export const REGISTER_STEP_TWO_FIELDS = [
  "password",
  "confirmPassword",
] as const satisfies readonly (keyof IUserInfoStepSchema)[];
