"use client";

import { memo } from "react";
import { Check, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { IAnswer } from "@/features/questions/lib/types/question";

interface IAnswerRowProps {
  answer: IAnswer;
  removeAnswer: (id: string) => void;
  markCorrectAnswer: (id: string) => void;
}

function AnswerRow({
  answer,
  removeAnswer,
  markCorrectAnswer,
}: IAnswerRowProps) {
  return (
    <div className="flex items-center gap-3">
      {/* ===== Remove Answer Button ===== */}
      <Button
        type="button"
        variant="destructive"
        className=" p-4 bg-red-50 hover:bg-red-100 w-fit"
        onClick={() => removeAnswer(answer.id)}
      >
        <Trash2 className="text-red-500" />
      </Button>

      {/* ===== Answer Text ===== */}
      <p className="font-geist-mono text-sm text-gray-800 flex-1 text-wrap leading-relaxed">
        {answer.text}
      </p>

      {/* ===== Mark Correct Answer Button / Correct Answer Status ===== */}
      {answer.isCorrect ? (
        // Correct Answer Status
        <span
          role="status"
          className="mr-3 font-geist-mono text-sm text-emerald-500 inline-flex items-center gap-1"
        >
          <CheckCheck />
          Correct Answer
        </span>
      ) : (
        // Mark Correct Answer Button
        <Button
          type="button"
          variant="secondary"
          className="mr-3 w-fit h-10 text-sm"
          disabled={!answer.text}
          aria-label="Mark this answer as correct"
          onClick={() => {
            markCorrectAnswer(answer.id);
          }}
        >
          <Check />
          Mark Correct
        </Button>
      )}
    </div>
  );
}

export default memo(AnswerRow);
