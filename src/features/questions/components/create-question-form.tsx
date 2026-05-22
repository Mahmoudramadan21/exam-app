"use client";

import Link from "next/link";
import { memo } from "react";
import { CopyPlus } from "lucide-react";
import { FormField, FormActions } from "@/shared/components";
import { Controller, FormProvider } from "react-hook-form";
import { QuestionAnswersSection } from "@/features/questions/components";
import { ExamFilterSelect } from "@/features/exams/components";
import { useCreateQuestion } from "@/features/questions/hooks";

interface ICreateQuestionFormProps {
  examId: string;
}

function CreateQuestionForm({ examId }: ICreateQuestionFormProps) {
  const { form, mutation, onSubmit } = useCreateQuestion({ examId });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ===== Form Actions ===== */}
        <div className="flex items-center justify-between gap-2 bg-white">
          <Link
            href={`?mode=bulk&examId=${examId}`}
            aria-label="Switch to bulk question creation mode"
            className="inline-flex items-center gap-2 font-geist-mono font-medium text-sm bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            Bulk Add Mode
            <CopyPlus size={18} />
          </Link>
          <FormActions isPending={mutation.isPending} />
        </div>

        {/* ===== Question Information ===== */}
        <fieldset className="bg-white">
          <legend className="w-full bg-blue-600 p-3 font-semibold text-white">
            Question Information
          </legend>

          <div className="space-y-4 p-4">
            {/* ===== Exam Select ===== */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam</label>

              <Controller
                control={form.control}
                name="examId"
                render={({ field }) => (
                  <ExamFilterSelect
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.examId?.message}
                  />
                )}
              />
            </div>
            {/* ===== Question Headline (Single Mode) ===== */}
            <FormField
              control={form.control}
              name="text"
              label="Question Headline"
              placeholder="Question headline"
            />
          </div>
        </fieldset>

        {/* ===== Question Answers (Single Mode) ===== */}
        <QuestionAnswersSection />
      </form>
    </FormProvider>
  );
}

export default memo(CreateQuestionForm);
