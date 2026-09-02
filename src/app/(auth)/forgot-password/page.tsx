import type { Metadata } from "next";
import ForgotPasswordPageClient from "./forgot-password-page-client";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Recover your account by requesting a secure password reset link.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordPageClient />;
}
