import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getNextAuthToken() {
  const cookieStore = await cookies();

  const cookieNames = [
    process.env.NEXTAUTH_SESSION_COOKIE,
    "__Secure-next-auth.session-token",
    "next-auth.session-token",
  ].filter((name): name is string => Boolean(name));

  const sessionToken = cookieNames
    .map((name) => cookieStore.get(name)?.value)
    .find(Boolean);

  if (!sessionToken) {
    return null;
  }

  try {
    return await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
  } catch {
    return null;
  }
}