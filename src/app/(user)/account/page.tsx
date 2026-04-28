import { PageBar } from "@/features/dashboard/components";
import UpdateProfileForm from "@/features/user/components/profile-form";
import { getProfileAction } from "@/features/user/lib/actions/get-profile";
import { UserRound } from "lucide-react";

export default async function AccountPage() {
  const data = await getProfileAction();

  return (
    <>
      <PageBar
        showBack
        icon={<UserRound className="size-7 md:size-9 lg:size-11" />}
        title="Account Settings"
      />
      <UpdateProfileForm initialData={data.payload?.user} />;
    </>
  );
}
