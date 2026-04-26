import { USER_ROLES } from "../constants/user.constant";

export type userRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export interface IUser {
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: userRole;

  createAt?: string;
  updatedAt: string;
}
