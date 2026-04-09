import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "./features/auth/lib/schemas/login.schema";
import { loginAction } from "./features/auth/lib/actions/login.action";

export const authOptions: NextAuthOptions = {
  // ===== Custom auth pages =====
  pages: {
    signIn: "/login",
  },

  // ===== Use JWT instead of database sessions =====
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        // ===== Validate input before API call =====
        const result = loginSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) {
          throw new Error("Invalid username or password");
        }

        // ===== Call backend login API =====
        const data = await loginAction(result.data);

        // ===== Handle API failure =====
        if (!data?.status || !data.payload) {
          throw new Error(data?.message || "Invalid username or password");
        }

        // ===== Return user object to JWT callback =====
        return {
          id: data.payload.user.id,
          user: data.payload.user,
          token: data.payload.token,
        };
      },
    }),
  ],

  callbacks: {
    // =====================================================
    // JWT callback → runs on sign in + token updates
    // =====================================================
    async jwt({ token, user, trigger, session }) {
      // ===== First login: persist user in token =====
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      // ===== Session update (e.g. profile update) =====
      if (trigger === "update" && session) {
        token.user = session.user;
        token.token = session.token;
      }

      return token;
    },

    // =====================================================
    // Session callback → expose data to client
    // =====================================================
    async session({ session, token }) {
      // Map JWT → session object
      session.user = token.user;

      return session;
    },
  },
};
