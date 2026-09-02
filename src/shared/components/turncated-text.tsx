"use client";

import { memo, useMemo, useState } from "react";

/**
 * Props for the TruncatedText component
 */
interface TruncatedTextProps {
  text: string;
  maxChars?: number;
  className?: string;
}

/**
 * Reusable text component that automatically truncates long text
 * with a "See more / See less" toggle button for better readability.
 */
function TruncatedText({
  text,
  maxChars = 150,
  className = "",
}: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = text.length > maxChars;
  const displayedText = isExpanded
    ? text
    : shouldTruncate
    ? `${text.slice(0, maxChars)}...`
    : text;

  // Check if the text contains any Arabic characters
  const isArabic = useMemo(() => /[\u0600-\u06FF]/.test(text), [text]);

  return (
    <div className="whitespace-pre-wrap wrap-break-word">
      <p
        className={`${className} ${isArabic ? "text-right" : "text-left"}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {displayedText}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="ms-1 text-sm text-gray-800 cursor-pointer font-medium font-geist-mono hover:underline focus:outline-none focus:underline"
            aria-label={isExpanded ? "Show less text" : "Show more text"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </p>
    </div>
  );
}

export default memo(TruncatedText);
