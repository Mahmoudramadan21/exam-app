import { memo, useMemo } from "react";

interface IExamHeaderProps {
  title: string;
  currentIndex: number;
  total: number;
  progress: number;
  timeLeft: number;
  angle: number;
  formatTime: (t: number) => string;
}

function ExamHeader({
  title,
  currentIndex,
  total,
  progress,
  timeLeft,
  angle,
  formatTime,
}: IExamHeaderProps) {
  // Circular timer background based on remaining time
  const gradientStyle = useMemo(
    () => ({
      background: `conic-gradient(from 90deg, #2563EB ${angle}deg, #DBEAFE ${angle}deg)`,
    }),
    [angle],
  );

  return (
    <header className="flex justify-between gap-6">
      {/* ==== Left Section: exam info ==== */}
      <div className="flex flex-col gap-1.5 grow pe-6 border-r border-gray-200">
        {/* Title + Question counter */}
        <div className="flex justify-between">
          <h3 className="text-base font-geist-mono font-semibold text-gray-800">
            {title}
          </h3>

          {/* Current question index (1-based for UX clarity) */}
          <span className="text-sm text-gray-500">
            Question{" "}
            <strong className="text-blue-600">{currentIndex + 1}</strong> of{" "}
            {total}
          </span>
        </div>

        {/* Progress bar: shows overall completion */}
        <div
          className="w-full h-4 bg-blue-50 overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Exam progress"
        >
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ==== Right Section: timer ==== */}
      <div
        className="relative w-16 h-16 rounded-full flex items-center justify-center shrink-0"
        style={gradientStyle}
        role="timer"
        aria-label={`Time left ${formatTime(timeLeft)}`}
      >
        <div className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-xs font-geist-mono">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </header>
  );
}

export default memo(ExamHeader);
