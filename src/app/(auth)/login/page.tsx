import Link from "next/link";
import { AuthFormLayout } from "@/features/auth/layout";
import { LoginForm } from "@/features/auth/components";

export default function Login() {
  return (
    <AuthFormLayout title="Login">
      {/* ===== Login Form ===== */}
      <LoginForm />

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
