"use client";

import { memo } from "react";
import type { IExam } from "@/features/exams/lib/types/exam";
import { Controller } from "react-hook-form";
import { useEditExam } from "@/features/exams/hooks";
import { DiplomaFilterSelect } from "@/features/diplomas/components";
import { FormError, FormField, ImageField, FormActions } from "@/shared/components";
import { FieldGroup } from "@/shared/components/ui";

// Component Props
interface IEditExamFormProps {
  exam: IExam;
}

function EditExamForm({
  exam,
}: IEditExamFormProps) {
  const { form, onSubmit, mutation } = useEditExam({
    exam,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormActions isPending={mutation.isPending} />

      <FieldGroup className="mt-6 p-4 gap-4 bg-white">
        <legend className="w-full p-2.5 bg-blue-600 text-white text-base font-geist-mono font-semibold">
          Exam Information
        </legend>

        {/* ===== Image ===== */}
        <ImageField
          name="image"
          control={form.control}
          defaultValue={exam.image!}
          setValue={form.setValue}
          label="Image"
        />

        {/* ===== Diploma Filter Select ===== */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Diploma</label>
          <Controller
            control={form.control}
            name="diplomaId"
            render={({ field }) => (
              <DiplomaFilterSelect
                value={field.value}
                selectedTitle={exam.diploma.title}
                onChange={field.onChange}
                error={form.formState.errors.diplomaId?.message}
              />
            )}
          />
        </div>

        {/* ===== Title ===== */}
        <FormField
          name="title"
          control={form.control}
          label="Title"
          placeholder="Exam Title"
        />

        {/* ===== Description ===== */}
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

export default memo(EditExamForm);