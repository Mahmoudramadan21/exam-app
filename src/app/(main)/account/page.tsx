import { PageBar } from "@/features/dashboard/components";
import { AppBreadcrumb } from "@/features/dashboard/layout/app-breadcrumb";
import UpdateProfileForm from "@/features/users/components/profile-form";
import { getProfile } from "@/features/users/lib/apis";
import { UserRound } from "lucide-react";
import { Metadata } from "next";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Account Settings",
  description:
    "Manage your account settings, update your profile information, email address, and phone number.",
};

export default async function AccountPage() {
  // Get user profile data
  const data = await getProfile();

  return (
    <>
      {/* ===== Breadcrumb ===== */}
      <AppBreadcrumb items={[{ label: "Account", href: "/account" }]} />

      {/* ===== Page Bar ===== */}
      <PageBar
        showBack
        icon={<UserRound className="size-7 md:size-9 lg:size-11" />}
        title="Account Settings"
      />

      {/* ===== Update Profile Form ===== */}
      <UpdateProfileForm initialData={data.payload?.user} />
    </>
  );
}
