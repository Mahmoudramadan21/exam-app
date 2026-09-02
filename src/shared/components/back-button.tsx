"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui";

/*
  This component is used to navigate back to the previous page.
*/
export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="px-6 py-3 w-fit"
    >
      <ArrowLeft className="size-4" />
      Go Back
    </Button>
  );
}
