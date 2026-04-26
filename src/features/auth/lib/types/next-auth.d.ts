import { User } from "next-auth";
import { IUser } from "./user";

declare module "next-auth" {
  interface User {
    user: IUser;
    token: string;
  }

  type Session = IUser; 
}

declare module "next-auth/jwt" {
  type JWT = User;
}
