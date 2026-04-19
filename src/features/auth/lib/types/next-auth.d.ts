import { IUser } from "./user";

/**
 * NextAuth module augmentation
 * Extends default auth types with custom app user structure
 */

declare module "next-auth" {
  /**
   * Extended User object returned from auth callbacks
   */
  interface User {
    user: IUser;
    token: string;
  }

  /**
   * Session shape used across the app
   */
  interface Session {
    user: IUser;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT payload structure
   * Mirrors extended User type
   */
  type JWT = {
    user: IUser;
    token: string;
  };
}
