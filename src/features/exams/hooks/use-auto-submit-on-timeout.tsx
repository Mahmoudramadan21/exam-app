import { useEffect, useRef } from "react";

interface UseAutoSubmitOnTimeoutProps {
  timeLeft: number;
  onTimeout: () => Promise<void> | void;
  enabled?: boolean;
}

export function useAutoSubmitOnTimeout({
  timeLeft,
  onTimeout,
  enabled = true,
}: UseAutoSubmitOnTimeoutProps) {
  // Prevent multiple submissions when time reaches zero
  const hasSubmittedRef = useRef(false);

  // Keep latest callback reference without re-triggering effect
  const callbackRef = useRef(onTimeout);

  // Always store latest onTimeout to avoid stale closure
  useEffect(() => {
    callbackRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    // Do nothing if disabled
    if (!enabled) return;

    // Trigger once when timer expires
    if (timeLeft <= 0 && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;

      // Execute latest callback safely
      callbackRef.current();
    }
  }, [timeLeft, enabled]);
}
