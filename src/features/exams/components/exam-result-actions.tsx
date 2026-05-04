import { Button } from "@/shared/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function ExamResultActions() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="flex gap-4 mt-6">
      {/* Restart the exam from the beginning */}
      <Button
        theme="secondary"
        ui="halfWidth"
        onClick={() => window.location.reload()}
      >
        Retry Exam
      </Button>

      {/* Navigate to diploma overview / exploration flow */}
      <Button
        theme="primary"
        ui="halfWidth"
        onClick={() => router.replace(path.slice(0, path.lastIndexOf("/")))}
      >
        Explore Diploma
      </Button>
    </div>
  );
}
