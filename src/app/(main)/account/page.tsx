import { PageBar } from "@/features/dashboard/components";
import { AppBreadcrumb } from "@/features/dashboard/layout/app-breadcrumb";
import UpdateProfileForm from "@/features/users/components/profile-form";
import { AccountLayout } from "@/features/users/layout";
import { getProfile } from "@/features/users/lib/apis";
import { AppContainer } from "@/shared/components";
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

      <AppContainer>
        {/* ===== Page Bar =====*/}
        <PageBar
          showBack
          icon={<UserRound className="size-7 md:size-9 lg:size-11" />}
          title="Account Settings"
        />

        {/* ===== Update Profile Form ===== */}
        <AccountLayout>
          <UpdateProfileForm initialData={data.payload?.user} />
        </AccountLayout>
      </AppContainer>
    </>
  );
}
