"use client";

import { FormError, FormField } from "@/shared/components";
import { FieldGroup } from "@/shared/components/ui";
import { memo } from "react";
import {ImageField, FormActions} from "@/shared/components/";
import { useCreateDiploma } from "@/features/diplomas/hooks";

function CreateDiplomaForm() {
  // Handles form state, validation, and login mutation
  const { form, onSubmit, mutation } = useCreateDiploma();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ===== Form Actions ===== */}
      <FormActions isPending={mutation.isPending} />

      {/* ===== Main Form Fields ===== */}
      <FieldGroup className="mt-6 p-4 gap-4 bg-white">
        {/* ===== Legend ===== */}
        <legend className="w-full p-2.5 bg-blue-600 text-white text-base font-geist-mono font-semibold">
          Diploma Information
        </legend>

        {/* ===== Image Input ===== */}
        <ImageField
          name="image"
          control={form.control}
          setValue={form.setValue}
          label="Image"
        />

        {/* ===== Title Input ===== */}
        <FormField
          name="title"
          control={form.control}
          label="Title"
          placeholder="Diploma Title"
        />

        {/* ===== Description Input ===== */}
        <FormField
          name="description"
          control={form.control}
          label="Description"
          placeholder="Diploma Description"
          variant="textarea"
        />

        {/* ===== Error Feedback ===== */}
        {mutation.isError && (
          <FormError message={(mutation.error as Error).message} />
        )}
      </FieldGroup>
    </form>
  );
}

export default memo(CreateDiplomaForm);
