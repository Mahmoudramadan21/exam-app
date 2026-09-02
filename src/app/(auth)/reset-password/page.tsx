import { redirect } from "next/navigation";
import { AuthFormLayout } from "@/features/auth/layout";
import { ResetPasswordForm } from "@/features/auth/components";
import { Metadata } from "next";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

// Metadata
export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Create a new password for your account and regain access securely.",
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const token = (await searchParams).token;

  // Security guard: ensure token exists before rendering page
  if (!token) {
    redirect("/forgot-password");
  }

  return (
    <AuthFormLayout title="Create a New Password">
      {/* Helper text for user guidance */}
      <p className="mt-3 text-gray-500">
        Create a new strong password for your account.
      </p>

      {/* Reset password form with secure token */}
      <ResetPasswordForm token={token} />
    </AuthFormLayout>
  );
}
