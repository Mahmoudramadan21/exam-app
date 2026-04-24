import { memo } from "react";
import { IQuestion } from "@/features/questions/lib/types/question";

interface Props {
  question: IQuestion;
  selectedAnswerId?: string;
  onSelect: (questionId: string, answerId: string) => void;
}

function ExamQuestion({ question, selectedAnswerId, onSelect }: Props) {
  return (
    <section className="my-10">
      {/* Question container */}
      <fieldset className="border-0">
        {/* Question text (acts as legend for accessibility grouping) */}
        <legend className="text-2xl font-geist-mono text-blue-600 font-semibold">
          {question.text}
        </legend>

        {/* Answers list (radio group) */}
        <div className="space-y-3 mt-4" role="radiogroup">
          {question.answers.map((answer) => {
            const isSelected = selectedAnswerId === answer.id;
            const inputId = `${question.id}-${answer.id}`;

            return (
              <label
                key={answer.id}
                htmlFor={inputId}
                className={`flex items-center gap-3 p-4 text-sm cursor-pointer transition
                ${
                  isSelected
                    ? "bg-blue-100/70"
                    : "even:bg-gray-100 bg-gray-50 hover:bg-gray-50"
                }`}
              >
                {/* Radio input triggers answer selection */}
                <input
                  id={inputId}
                  type="radio"
                  name={question.id}
                  checked={isSelected}
                  onChange={() => onSelect(question.id, answer.id)}
                />

                {/* Answer text */}
                <span>{answer.text}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}

export default memo(ExamQuestion);
