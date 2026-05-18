"use client";

import { memo } from "react";
import { Controller } from "react-hook-form";
import {
  FormError,
  FormField,
  ImageField,
  FormActions,
} from "@/shared/components";
import { FieldGroup } from "@/shared/components/ui";
import { DiplomaFilterSelect } from "@/features/diplomas/components";
import { useCreateExam } from "@/features/exams/hooks";

function CreateExamForm() {
  // Handles form state, validation, and login mutation
  const { form, onSubmit, mutation } = useCreateExam();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white">
      <FormActions isPending={mutation.isPending} />

      <h3 className="p-2.5 bg-blue-600 text-white text-base font-geist-mono font-semibold">
        Exam Information
      </h3>

      <FieldGroup className="p-4 gap-4">
        {/* ===== Title Input ===== */}
        <FormField
          name="title"
          control={form.control}
          label="Title"
          placeholder="Exam Title"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Diploma</label>
          <Controller
            control={form.control}
            name="diplomaId"
            render={({ field }) => (
              <DiplomaFilterSelect
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.diplomaId?.message}
              />
            )}
          />
        </div>

        {/* ===== Image Input ===== */}
        <ImageField
          name="image"
          control={form.control}
          setValue={form.setValue}
          label="Image"
        />

        {/* ===== Description Input ===== */}
        <FormField
          name="description"
          control={form.control}
          label="Description"
          placeholder="Exam Description"
          variant="textarea"
        />

        {/* ===== Duration Input ===== */}
        <FormField
          name="duration"
          control={form.control}
          label="Duration (min)"
          placeholder="Duration in minutes"
          type="number"
          min={1}
        />

        {/* ===== Error Feedback ===== */}
        {mutation.isError && (
          <FormError message={(mutation.error as Error).message} />
        )}
      </FieldGroup>
    </form>
  );
}

export default memo(CreateExamForm);
