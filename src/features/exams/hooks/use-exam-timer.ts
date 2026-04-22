import { useEffect, useMemo, useState } from "react";

export function useExamTimer(durationInMinutes: number) {
  // Total exam duration in seconds
  const totalTime = durationInMinutes * 60;

  // Remaining time countdown state
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // Countdown logic: decrease time every second
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on re-render / unmount
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Progress ratio (0 → 1) based on remaining time
  const timeProgress = useMemo(() => {
    return timeLeft / totalTime;
  }, [timeLeft, totalTime]);

  // Convert progress into circular angle (0 → 360deg)
  const angle = useMemo(() => {
    return timeProgress * 360;
  }, [timeProgress]);

  // Format seconds into MM:SS display
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return {
    timeLeft,
    totalTime,
    timeProgress,
    angle,
    formatTime,
  };
}
