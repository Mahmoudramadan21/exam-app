"use client";

import { memo } from "react";

import { FormError, FormField } from "@/shared/components";
import { FieldGroup } from "@/shared/components/ui";
import {ImageField, FormActions} from "@/shared/components";
import type { IDiploma } from "@/features/diplomas/lib/types/diploma";
import { useEditDiploma } from "@/features/diplomas/hooks";

interface EditDiplomaFormProps {
  diplomaId: string;
  diploma: IDiploma;
}

function EditDiplomaForm({
  diplomaId,
  diploma,
}: EditDiplomaFormProps) {
  const { form, onSubmit, mutation } = useEditDiploma({
    diplomaId,
    diploma,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ===== Form Actions ===== */}
      <FormActions isPending={mutation.isPending} />

      {/* ===== Main Form Fields ===== */}
      <FieldGroup className="mt-6 p-4 gap-4 bg-white">
        {/* ===== Form Legend ===== */}
        <legend className="w-full p-2.5 bg-blue-600 text-white text-base font-geist-mono font-semibold">
          Diploma Information
        </legend>

        {/* ===== Image ===== */}
        <ImageField
          name="image"
          control={form.control}
          defaultValue={diploma.image!}
          setValue={form.setValue}
          label="Image"
        />

        {/* ===== Title ===== */}
        <FormField
          name="title"
          control={form.control}
          label="Title"
          placeholder="Diploma Title"
        />

        {/* ===== Description ===== */}
        <FormField
          name="description"
          control={form.control}
          label="Description"
          placeholder="Diploma Description"
          variant="textarea"
        />

        {/* ===== Error ===== */}
        {mutation.isError && (
          <FormError
            message={(mutation.error as Error).message}
          />
        )}
      </FieldGroup>
    </form>
  );
}

export default memo(EditDiplomaForm);