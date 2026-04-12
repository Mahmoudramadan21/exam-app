import { USER_ROLES } from "../constants/user.constant";

/**
 * Derived type from USER_ROLES constant
 * Ensures role stays in sync with allowed values
 */
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Core user entity model used across the app
 */
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

  role: UserRole;

  createdAt?: string;
  updatedAt: string;
}
