import LoginForm from "@/features/auth/components/login-form";
import AuthFormLayout from "@/features/auth/layout/auth-form-layout";
import { CircleX } from "lucide-react";
import Link from "next/link";

function Login() {
  return (
    <AuthFormLayout title="Login">
      <LoginForm />

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

export default Login;
