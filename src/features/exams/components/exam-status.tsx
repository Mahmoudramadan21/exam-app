import { memo } from "react";

interface IExamStatusProps {
  error?: Error | null;
  isSuccess: boolean;
}

function ExamStatus({ error, isSuccess }: IExamStatusProps) {
  // Render nothing when there is no status to show
  if (!error && !isSuccess) return null;

  return (
    <div className="mt-4 space-y-2" aria-live="polite">
      {/* Error state: shows submission failure message */}
      {error && (
        <p role="alert" className="text-red-500 text-sm">
          {error.message}
        </p>
      )}

      {/* Success state: shows confirmation after exam submission */}
      {isSuccess && (
        <p role="status" className="text-green-600 text-sm">
          Exam submitted successfully
        </p>
      )}
    </div>
  );
}

export default memo(ExamStatus);
