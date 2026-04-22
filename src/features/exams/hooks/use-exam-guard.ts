import { useEffect, useRef } from "react";

interface UseExamGuardProps {
  onForceSubmit: () => void;
  enabled?: boolean;
}

export function useExamGuard({
  onForceSubmit,
  enabled = true,
}: UseExamGuardProps) {
  const isActiveRef = useRef(enabled);
  const hasSubmittedRef = useRef(false);

  const safeSubmit = () => {
    if (!isActiveRef.current || hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    onForceSubmit();
  };

  useEffect(() => {
    if (!enabled) return;

    isActiveRef.current = true;

    /**
     * =========================
     * BEFORE UNLOAD
     * =========================
     */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isActiveRef.current) return;

      e.preventDefault();
      e.returnValue = "";
    };

    /**
     * =========================
     * TAB SWITCH
     * =========================
     */
    const handleVisibility = () => {
      if (document.hidden) {
        safeSubmit();
      }
    };

    /**
     * =========================
     * WINDOW BLUR (ALT+TAB / APP SWITCH)
     * =========================
     */
    const handleBlur = () => {
      safeSubmit();
    };

    /**
     * =========================
     * DEVTOOLS DETECTION (bonus)
     * =========================
     */
    const detectDevTools = () => {
      const threshold = 160;

      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        safeSubmit();
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 1000);

    /**
     * =========================
     * BLOCK BACK BUTTON
     * =========================
     */
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    /**
     * =========================
     * BLOCK LINKS
     * =========================
     */
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");

      if (target && target.href) {
        e.preventDefault();

        const confirmLeave = window.confirm(
          "Leaving the exam will submit it. Continue?",
        );

        if (confirmLeave) {
          safeSubmit();
          window.location.href = target.href;
        }
      }
    };

    // init
    window.history.pushState(null, "", window.location.href);

    // listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);

    return () => {
      isActiveRef.current = false;

      clearInterval(devToolsInterval);

      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, [enabled, onForceSubmit]);
}
