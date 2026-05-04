import { useRef, useCallback } from "react";

import { IExam } from "@/features/exams/lib/types/exam";
import { IQuestion } from "@/features/questions/lib/types/question";

import {
  useExamTimer,
  useExamAnswers,
  useExamNavigation,
  useExamSubmission,
  useExamActions,
  useExamGuard,
} from "@/features/exams/hooks";
import { useAutoSubmitOnTimeout } from "./use-auto-submit-on-timeout";
import { formatExamAnswers } from "../lib/utils/format-answers.util";

export function useExamController(exam: IExam, examQuestions: IQuestion[]) {
  // Track exam start time for submission
  const startedAt = useRef(new Date()).current;

  // Handles countdown and time visualization
  const timer = useExamTimer(exam.duration);

  // Stores and manages user answers per question
  const answersState = useExamAnswers();

  // Controls current question index and progress
  const navigation = useExamNavigation(examQuestions);

  // Handles exam submission lifecycle (loading, success, error)
  const submission = useExamSubmission({
    examId: exam.id,
    startedAt,
  });

  // Decides whether to go next or submit exam
  const actions = useExamActions({
    answers: answersState.answers,
    examQuestionsLength: examQuestions.length,
    currentIndex: navigation.currentIndex,
    isSubmitting: submission.isSubmitting,
    submitExam: submission.submitExam,
    next: navigation.next,
  });

  // Prevent multiple forced submissions (e.g. tab close / time انتهاء)
  const isForcedRef = useRef(false);

  const handleForceSubmit = useCallback(() => {
    if (isForcedRef.current) return;
    isForcedRef.current = true;

    submission.submitExam(formatExamAnswers(answersState.answers));
  }, [submission.submitExam, answersState.answers]);

  // Auto submit when time expires
  useAutoSubmitOnTimeout({
    timeLeft: timer.timeLeft,
    onTimeout: handleForceSubmit,
    enabled: !submission.isSuccess && !submission.isSubmitting,
  });

  // Attach guard for unexpected exits or timeout
  // useExamGuard({
  //   onForceSubmit: handleForceSubmit,
  //   enabled: !submission.isSuccess && !submission.isSubmitting,
  // });

  // Current active question
  const currentQuestion = navigation.currentQuestion;

  return {
    examTitle: exam.title,
    totalQuestions: examQuestions.length,

    timer,

    answers: answersState.answers,
    selectAnswer: answersState.selectAnswer,
    isAnswered: answersState.isAnswered,

    currentIndex: navigation.currentIndex,
    currentQuestion,
    progress: navigation.progress,
    next: navigation.next,
    prev: navigation.prev,

    submitExam: submission.submitExam,
    isSubmitting: submission.isSubmitting,
    isSuccess: submission.isSuccess,
    result: submission.data,
    error: submission.error,

    handleNextOrSubmit: actions.handleNextOrSubmit,
  };
}
