import { CircleX } from "lucide-react";
import { memo } from "react";

interface FormErrorProps {
  message?: string;
  className?: string;
}

function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      className={`border border-red-600 bg-red-50 py-2.5 text-center text-red-500 text-sm mt-10 relative ${className}`}
    >
      {message}
      <CircleX className="bg-white absolute -top-2.5 right-1/2 -translate-x-1/2 w-5 h-5" />
    </p>
  );
}

export default memo(FormError);
