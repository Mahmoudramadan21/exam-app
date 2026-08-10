import Link from "next/link";
import { AuthFormLayout } from "@/features/auth/layout";
import { LoginForm } from "@/features/auth/components";

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export default async function Login({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  const callbackUrl = params.callbackUrl || "/";

  return (
    <AuthFormLayout title="Login">
      {/* ===== Login Form ===== */}
      <LoginForm callbackUrl={callbackUrl} />

      {/* ===== Footer Link ===== */}
      <div className="w-fit mx-auto text-sm text-muted-foreground font-medium">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Create yours
        </Link>
      </div>
    </AuthFormLayout>
  );
}
