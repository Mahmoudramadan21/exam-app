import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./features/auth/lib/schemas/login.schema";
import { login } from "./features/auth/lib/apis/auth.api";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

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
        const result = loginSchema.safeParse({
          username: credentials?.username,
          password: credentials?.password,
        });

        if (!result.success) throw new Error("Invalid username or password");

        const data = await login(result.data);

        if (!data || !data.status || !data.payload) {
          throw new Error(data?.message || "Invalid username or password");
        }

        return {
          id: data.payload.user.id,
          user: data.payload.user,
          token: data.payload.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user, trigger, session }) {
      // first login
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      // if update user data
      if (trigger === "update" && session) {
        token.user = session.user;
        token.token = session.token;
      }

      return token;
    },

    session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};
