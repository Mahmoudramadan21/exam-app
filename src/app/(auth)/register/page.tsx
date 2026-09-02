import type { Metadata } from "next";
import RegisterPageClient from "./register-page-client";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a new account to access your exams, courses, and personalized dashboard.",
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
