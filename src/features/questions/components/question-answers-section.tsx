"use client";

import { memo } from "react";
import { Plus } from "lucide-react";
import { FormError } from "@/shared/components";
import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/components/ui";
import { IAnswer } from "@/features/questions/lib/types/question";
import { useQuestionAnswersManager } from "@/features/questions/hooks";
import { AddAnswerInput, AnswerRow } from "@/features/questions/components";

function QuestionAnswersSection() {
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
    path: "answers",
  });

  const form = useFormContext();

  const answersError =
    form.formState.errors.answers?.message ??
    form.formState.errors.answers?.root?.message;

  return (
    <fieldset className="bg-white">
      {/* ===== Question Answers Header ===== */}
      <legend className="w-full bg-blue-600 p-3 font-semibold text-white">
        Question Answers
      </legend>

      {/* ===== Question Answers Body ===== */}
      <div className="flex items-center justify-between gap-2.5 bg-gray-200">
        <span className="ml-14 font-geist-mono text-sm font-medium text-gray-800">
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

      {/* ===== Question Answers List ===== */}
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

      {/* ===== Answers Error Message ===== */}
      {form.formState.errors.answers?.message && (
        <FormError message={answersError as string} />
      )}
    </fieldset>
  );
}

export default memo(QuestionAnswersSection);
