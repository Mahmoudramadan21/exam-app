import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IExamNavigationProps {
  onPrev: () => void;
  onNextOrSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
  isDisabled: boolean;
  isSubmitting: boolean;
  isAnswered?: boolean;
}

export default function ExamNavigation({
  onPrev,
  onNextOrSubmit,
  isFirst,
  isLast,
  isDisabled,
  isSubmitting,
}: IExamNavigationProps) {
  return (
    <div className="flex justify-between gap-4">
      {/* Navigate to previous question */}
      <Button
        theme="secondary"
        ui="halfWidth"
        onClick={onPrev}
        disabled={isFirst || isDisabled}
      >
        <ChevronLeft size={18} />
        Previous
      </Button>

      {/* 
        Primary action:
        - Next question if not last
        - Submit exam if last question
        - Shows loading state while submitting
      */}
      <Button
        theme="primary"
        ui="halfWidth"
        onClick={onNextOrSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Submitting..."
        ) : isLast ? (
          "Finish"
        ) : (
          <>
            Next
            <ChevronRight size={18} />
          </>
        )}
      </Button>
    </div>
  );
}
