"use client";

import Image from "next/image";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/shared/components/ui";
import { BackButton } from "@/shared/components";

export default function UnauthorizedPage() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* ===== Illustration ===== */}
        <div className="relative w-full max-w-sm aspect-square">
          <Image
            src="/illustrations/unauthorized.svg"
            alt="Unauthorized access"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ===== Content ===== */}
        <div className="mt-2 flex flex-col items-center">
          <span className="text-sm font-medium uppercase tracking-wider text-yellow-600">
            Unauthorized
          </span>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 font-inter">
            Access Denied
          </h1>

          <p className="mt-5 max-w-xl text-sm md:text-base leading-7 text-gray-600">
            You don’t have permission to access this page. Please login again
            with a valid account.
          </p>
        </div>

        {/* ===== Actions ===== */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="px-6 py-3 w-fit"
          >
            Go to Login
          </Button>

          <BackButton />
        </div>
      </div>
    </section>
  );
}
