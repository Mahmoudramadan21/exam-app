import { redirect } from "next/navigation";

import AuthFormLayout from "@/features/auth/layout/auth-form-layout";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";

interface ResetPasswordPageProps {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = params;

  // ===== Guard: prevent access without token =====
  if (!token) redirect("/forgot-password");

  return (
    <AuthFormLayout title="Create a New Password">
      {/* ===== Instruction text ===== */}
      <p className="mt-3 text-gray-500">
        Create a new strong password for your account.
      </p>

      {/* ===== Reset password form with token ===== */}
      <ResetPasswordForm token={token} />
    </AuthFormLayout>
  );
}
