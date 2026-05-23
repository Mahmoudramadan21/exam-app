"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ICreateBulkQuestionSchema } from "../lib/types/api";

export function useBulkQuestions() {
  const form = useFormContext<ICreateBulkQuestionSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  function addQuestion() {
    append({
      id: crypto.randomUUID(),
      text: "",
      answers: [],
    });

    setActiveQuestionIndex(fields.length);
  }

  function removeQuestion(index: number) {
    remove(index);

    setActiveQuestionIndex((current) => {
      if (current > index) return current - 1;

      if (current === index) {
        return Math.max(0, current - 1);
      }

      return current;
    });
  }

  return {
    questions: fields,
    activeQuestionIndex,
    setActiveQuestionIndex,
    addQuestion,
    removeQuestion,
  };
}
