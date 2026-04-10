"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AuthFormLayout from "@/features/auth/layout/auth-form-layout";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ===== Extract reset token from URL =====
  const token = searchParams.get("token");

  // ===== Guard: redirect if token is missing =====
  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  }, [token, router]);

  // ===== Prevent UI render until token is valid =====
  if (!token) return null;

  return (
    <AuthFormLayout title="Create a New Password">
      {/* ===== Instruction text ===== */}
      <p className="mt-3 text-gray-500">
        Create a new strong password for your account.
      </p>

      {/* ===== Reset password form ===== */}
      <ResetPasswordForm token={token} />
    </AuthFormLayout>
  );
}

export default ResetPasswordPage;
