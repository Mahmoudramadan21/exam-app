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
    <section className="min-h-[75vh] h-full flex items-center justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="w-full max-w-80 sm:max-w-95 md:max-w-110 lg:max-w-125">
          <Image
            src="/illustrations/error.svg"
            alt="Something went wrong"
            width={500}
            height={400}
            priority
            sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 440px, 500px"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content */}
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

        {/* Actions */}
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
