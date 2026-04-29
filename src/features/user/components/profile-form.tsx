"use client";

import { FormField, FormError, PhoneFormField } from "@/shared/components";
import { Button } from "@/shared/components/ui/button";
import { FieldGroup } from "@/shared/components/ui/field";
import useUpdateProfileForm from "@/features/user/hooks/use-update-profile-form";
import ChangeEmailModal from "./update-email-modal";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { IUser } from "@/features/auth/lib/types/user";
import DeleteAccountModal from "./delete-account-modal";

interface IProfileFormProps {
  initialData?: IUser;
}

function ProfileForm({ initialData }: IProfileFormProps) {
  // Handles form state, validation, and login mutation
  const { form, onSubmit, mutation } = useUpdateProfileForm({
    initialData,
  });

  // ===== Update Email Modal State =====
  const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState<boolean>(
    false,
  );

  return (
    <section>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-6">
        {/* ===== Form Fields ===== */}
        <FieldGroup className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {/* First Name Field */}
          <FormField
            name="firstName"
            control={form.control}
            label="First Name"
            placeholder="Ahmed"
          />

          {/* Last Name Field */}
          <FormField
            name="lastName"
            control={form.control}
            label="Last Name"
            placeholder="Abdullah"
          />
        </FieldGroup>

        <FieldGroup className="mt-4">
          {/* Username Field */}
          <FormField
            name="username"
            control={form.control}
            label="Username"
            placeholder="user123"
            disabled
          />

          {/* Email Field with Edit Button */}
          <FormField
            name="email"
            control={form.control}
            label={
              <>
                {/* Email label + dialog trigger */}
                Email
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer"
                  onClick={() => setIsUpdateEmailModalOpen(true)}
                >
                  <PencilLine size={16} /> Change
                </button>
              </>
            }
            placeholder={form.getValues("email")}
            disabled
          />

          {/* Phone Field */}
          <PhoneFormField
            name="phone"
            control={form.control}
            label="Phone Number"
          />
        </FieldGroup>

        {/* ===== Error Feedback ===== */}
        {mutation.isError && (
          <FormError message={(mutation.error as Error).message} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* ===== Delete Account ===== */}
          <DeleteAccountModal />

          {/* ===== Submit Action ===== */}
          <Button
            type="submit"
            theme="primary"
            ui="fullWidth"
            size="xl"
            className="my-0 md:my-auto"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Updating profile..." : "Update Profile"}
          </Button>
        </div>
      </form>

      {/* ===== Edit Email Modal ===== */}
      <ChangeEmailModal
        open={isUpdateEmailModalOpen}
        setOpenEmailModal={setIsUpdateEmailModalOpen}
      />
    </section>
  );
}

export default ProfileForm;
