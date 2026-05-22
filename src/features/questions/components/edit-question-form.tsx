"use client";

import { memo } from "react";
import { FormActions, FormField } from "@/shared/components";
import { Controller, FormProvider } from "react-hook-form";
import { QuestionAnswersSection } from "@/features/questions/components";
import { ExamFilterSelect } from "@/features/exams/components";
import { useEditQuestion } from "@/features/questions/hooks";
import { IQuestion } from "@/features/questions/lib/types/question";

interface IEditQuestionFormProps {
  question: IQuestion;
}

function EditQuestionForm({ question }: IEditQuestionFormProps) {
  const { form, mutation, onSubmit } = useEditQuestion({
    question,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormActions isPending={mutation.isPending} />

        <fieldset className="bg-white">
          <legend className="w-full bg-blue-600 p-3 text-white">
            Question Information
          </legend>

          <div className="space-y-4 p-4">
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

            <FormField
              control={form.control}
              name="text"
              label="Question Headline"
              placeholder="Question headline"
            />
          </div>
        </fieldset>

        <QuestionAnswersSection />
      </form>
    </FormProvider>
  );
}

export default memo(EditQuestionForm);
