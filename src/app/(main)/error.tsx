"use client";

import Image from "next/image";
import { BackButton } from "@/shared/components";
import { Button } from "@/shared/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* ===== Illustration ===== */}
        <div className="relative w-full max-w-sm aspect-square">
          <Image
            src="/illustrations/error.svg"
            alt="Something went wrong"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ===== Content ===== */}
        <div className="mt-2 flex flex-col items-center">
          <span className="text-sm font-medium uppercase tracking-wider text-red-600">
            Error
          </span>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 font-inter">
            Something Went Wrong
          </h1>

          <p className="mt-5 max-w-xl text-sm md:text-base leading-7 text-gray-600">
            {error.message}
          </p>
        </div>

        {/* ===== Actions ===== */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Button onClick={() => reset()} className="px-6 py-3 w-fit">
            Try Again
          </Button>

          <BackButton />
        </div>
      </div>
    </section>
  );
}
