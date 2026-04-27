import DiplomaList from "@/features/diplomas/components/diploma-list";
import DiplomaListSkeleton from "@/features/diplomas/lib/skeletons/diploma-list-skeleton";
import { Suspense } from "react";
import { Metadata } from "next";
import { PageBar } from "@/features/dashboard/components";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Diplomas",
  description: "List of all diplomas",
};

export default function Page() {
  return (
    <>
      <PageBar
        showBack
        icon={<GraduationCap className="size-11" />}
        title="Diplomas"
      />

      <Suspense fallback={<DiplomaListSkeleton />}>
        <DiplomaList />
      </Suspense>
    </>
  );
}
