"use client";

import Link from "next/link";
import { memo } from "react";
import { CopyPlus } from "lucide-react";
import { FormActions } from "@/shared/components";
import { Controller, FormProvider } from "react-hook-form";
import { ExamFilterSelect } from "@/features/exams/components";
import { useCreateBulkQuestions } from "@/features/questions/hooks";
import { BulkQuestionsAnswersSection } from "@/features/questions/components";

interface ICreateBulkQuestionFormProps {
  examId: string;
}

function CreateBulkQuestionForm({ examId }: ICreateBulkQuestionFormProps) {
  const { form, mutation, onSubmit } = useCreateBulkQuestions({ examId });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ===== Form Actions ===== */}
        <div className="flex items-center justify-between gap-2 bg-white">
          <Link
            href="/exams/create-new-question"
            className="inline-flex items-center gap-2 font-geist-mono font-medium text-sm bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            <CopyPlus size={18} />
            Single Question
          </Link>
          <FormActions isPending={mutation.isPending} />
        </div>

        {/* ===== Question Information ===== */}
        <fieldset className="bg-white">
          <legend className="w-full bg-blue-600 p-3 font-geist-mono font-semibold text-white">
            Question Information
          </legend>

          <div className="space-y-4 p-4">
            {/* ===== Exam Select ===== */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="examId">
                Exam
              </label>

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
          </div>
        </fieldset>

        {/* ===== Answers Section ===== */}
        <BulkQuestionsAnswersSection />
      </form>
    </FormProvider>
  );
}

export default memo(CreateBulkQuestionForm);
