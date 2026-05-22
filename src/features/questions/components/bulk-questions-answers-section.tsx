"use client";

import { memo } from "react";
import { Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/components/ui";
import { FormField, FormError } from "@/shared/components";
import { IAnswer } from "@/features/questions/lib/types/question";
import { AnswerRow, AddAnswerInput } from "@/features/questions/components";
import { ICreateBulkQuestionSchema } from "@/features/questions/lib/types/api";
import { useBulkQuestions } from "@/features/questions/hooks/use-bulk-questions";
import { useQuestionAnswersManager } from "../hooks/use-question-answers-manager";

function BulkQuestionsAnswersSection() {
  const form = useFormContext<ICreateBulkQuestionSchema>();

  const {
    questions,
    activeQuestionIndex,
    setActiveQuestionIndex,
    addQuestion,
    removeQuestion,
  } = useBulkQuestions();

  const {
    answers,
    inputRef,

    answerText,
    setAnswerText,

    isAddAnswerOpen,
    canAddMore,

    openAddAnswer,
    closeAddAnswer,

    addAnswer,
    removeAnswerById,
    markCorrect,
  } = useQuestionAnswersManager({
    path: `questions.${activeQuestionIndex}.answers`,
  });

  const answersError =
    form.formState.errors.questions?.[activeQuestionIndex]?.answers?.message;

  return (
    <section className="bg-white">
      {/* ===== Questions Title ===== */}
      <h3 className="bg-blue-600 p-4 font-geist-mono font-semibold text-white">
        Questions
      </h3>

      {/* ===== Questions Tabs ===== */}
      <div className="flex border-b">
        {questions.map((question, index) => (
          <Button
            key={question.id}
            type="button"
            variant="ghost"
            role="tab"
            aria-selected={activeQuestionIndex === index}
            aria-controls={`question-${index}`}
            onClick={() => setActiveQuestionIndex(index)}
            className={`max-w-30 relative flex-1 border-r py-4 text-center group ${
              activeQuestionIndex === index ? "bg-blue-50 text-blue-600" : ""
            }`}
          >
            Q{index + 1}
            {questions.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                className="absolute top-2 right-0 size-4 text-red-500 opacity-0 group-hover:opacity-100 transition-all ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  removeQuestion(index);
                }}
              >
                <X size={30} />
              </Button>
            )}
          </Button>
        ))}

        <Button
          type="button"
          variant="ghost"
          onClick={addQuestion}
          className="max-w-12 bg-gray-200 hover:bg-gray-300/70"
        >
          <Plus />
        </Button>
      </div>

      <div className="p-4">
        {/* ===== Question Headline ===== */}
        <FormField
          control={form.control}
          name={`questions.${activeQuestionIndex}.text`}
          label="Question Headline"
          placeholder="Question headline"
        />

        {/* ===== Answers Header ===== */}
        <div className="flex items-center justify-between mt-4 bg-gray-200">
          <span className="ml-14 font-geist-mono text-sm font-medium">
            Body
          </span>

          <Button
            type="button"
            variant="default"
            disabled={!canAddMore}
            onClick={openAddAnswer}
            className="w-fit min-w-44 bg-emerald-500 hover:bg-emerald-600"
          >
            <Plus className="size-4" />
            Add Answer
          </Button>
        </div>

        {/* ===== Answer List ===== */}
        <div className="divide-y">
          {answers.map((answer: IAnswer) => (
            <AnswerRow
              key={answer.id}
              answer={answer}
              removeAnswer={removeAnswerById}
              markCorrectAnswer={markCorrect}
            />
          ))}
        </div>

        {/* ===== Add Answer Input ===== */}
        {isAddAnswerOpen && (
          <AddAnswerInput
            value={answerText}
            onChange={setAnswerText}
            onAdd={addAnswer}
            onClose={closeAddAnswer}
            canAddMore={canAddMore}
            inputRef={inputRef}
          />
        )}

        {/* ===== Answers Error ===== */}
        {answersError && <FormError message={String(answersError)} />}
      </div>
    </section>
  );
}

export default memo(BulkQuestionsAnswersSection);
