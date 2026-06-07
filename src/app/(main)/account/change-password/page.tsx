import { UserRound } from "lucide-react";
import { Metadata } from "next";
import { PageBar } from "@/features/dashboard/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { ChangePasswordForm } from "@/features/users/components";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Securely update your account password and manage your login credentials.",
};

export default async function ChangePasswordPage() {
  return (
    <>
      {/* ===== Breadcrumb ===== */}
      <AppBreadcrumb
        items={[
          { label: "Account", href: "/account" },
          { label: "Change Password", href: "/account/change-password" },
        ]}
      />

      {/* ===== Page Bar ===== */}
      <PageBar
        showBack
        icon={<UserRound className="size-7 md:size-9 lg:size-11" />}
        title="Account Settings"
      />

      {/* ===== Change Password Form ===== */}
      <ChangePasswordForm />
    </>
  );
}
