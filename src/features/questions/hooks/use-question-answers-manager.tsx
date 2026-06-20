"use client";

import { useMemo, useRef, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { IAnswer } from "../lib/types/question";

const DEFAULT_MAX = 4;

type Props = {
  path: string;
  max?: number;
};

export function useQuestionAnswersManager({ path, max = DEFAULT_MAX }: Props) {
  // Form context and refs
  const form = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // State for managing answers
  const [answerText, setAnswerText] = useState("");
  const [isAddAnswerOpen, setIsAddAnswerOpen] = useState(true);

  // Single source of truth (RHF)
  const { append, remove, update } = useFieldArray({
    control: form.control,
    name: path,
  });

  const answers: IAnswer[] = useWatch({
    control: form.control,
    name: path,
  });

  const canAddMore = answers.length < max;

  // UI helpers
  const focusInput = () => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const openAddAnswer = () => {
    if (!canAddMore) return;
    setIsAddAnswerOpen(true);
    focusInput();
  };

  const closeAddAnswer = () => {
    setAnswerText("");
    setIsAddAnswerOpen(false);
  };

  // Actions
  const addAnswer = () => {
    const trimmed = answerText.trim();
    if (!trimmed || !canAddMore) return;

    append({
      id: crypto.randomUUID(),
      text: trimmed,
      isCorrect: false,
    });

    setAnswerText("");
    focusInput();
  };

  const removeAnswerById = (id: string) => {
    const index = answers.findIndex((a) => a.id === id);
    if (index === -1) return;

    const removed = answers[index];

    remove(index);

    // if correct removed → fallback
    if (removed?.isCorrect) {
      requestAnimationFrame(() => {
        const next = answers.filter((_, i) => i !== index);

        if (next.length > 0) {
          update(0, {
            ...next[0],
            isCorrect: true,
          });
        }
      });
    }
  };

  const markCorrect = (id: string) => {
    const index = answers.findIndex((a) => a.id === id);

    if (index === -1) return;

    answers.forEach((a, i) => {
      update(i, {
        ...a,
        isCorrect: i === index,
      });
    });
  };

  return {
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
  };
}
