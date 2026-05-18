"use client";

import { Button } from "@/shared/components/ui";
import { useRouter, usePathname } from "next/navigation";

export default function ExamResultActions() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {/* Restart the exam from the beginning */}
      <Button
        variant="secondary"
        size="xl"
        onClick={() => window.location.reload()}
      >
        Retry Exam
      </Button>

      {/* Navigate to diploma overview / exploration flow */}
      <Button
        size="xl"
        onClick={() => router.replace(path.slice(0, path.lastIndexOf("/")))}
      >
        Explore Diploma
      </Button>
    </div>
  );
}
