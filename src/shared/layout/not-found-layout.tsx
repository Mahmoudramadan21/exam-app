import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/shared/components";

interface INotFoundLayoutProps {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  imageAlt: string;
}

export default function NotFoundLayout({
  title,
  description,
  primaryHref = "/diplomas",
  primaryLabel = "Go Back",
  imageAlt,
}: INotFoundLayoutProps) {
  return (
    <section className="min-h-[75vh] h-full flex items-center justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* ===== Illustration ===== */}
        <div className="w-full max-w-80 sm:max-w-95 md:max-w-110 lg:max-w-125">
          <Image
            src="/illustrations/not-found.svg"
            alt={imageAlt}
            width={500}
            height={400}
            priority
            sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 440px, 500px"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* ===== Content ===== */}
        <div className="mt-2 flex flex-col items-center">
          <span className="text-sm font-medium uppercase tracking-wider text-blue-600">
            404 Error
          </span>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 font-inter">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-sm md:text-base leading-7 text-gray-600">
            {description}
          </p>
        </div>

        {/* ===== Actions ===== */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href={primaryHref}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium"
          >
            {primaryLabel}
          </Link>

          <BackButton />
        </div>
      </div>
    </section>
  );
}
