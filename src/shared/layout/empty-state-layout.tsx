import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/shared/components";

interface IEmptyStateLayoutProps {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  imageAlt: string;
  showBackBtn?: boolean;
}

export default function EmptyStateLayout({
  title,
  description,
  primaryHref,
  primaryLabel,
  imageAlt,
  showBackBtn = true,
}: IEmptyStateLayoutProps) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="w-full max-w-80 sm:max-w-95 md:max-w-110 lg:max-w-125">
          <Image
            src="/illustrations/empty-state.svg"
            alt={imageAlt}
            width={500}
            height={400}
            priority
            sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, (max-width: 1024px) 440px, 500px"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div className="mt-2 flex flex-col items-center">
          {/* Title */}
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 font-inter">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm md:text-base leading-7 text-gray-600">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          {/* Primary Action */}
          {primaryHref && primaryLabel && (
            <Link
              href={primaryHref}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium"
            >
              {primaryLabel}
            </Link>
          )}

          {/* Back Button */}
          {showBackBtn && <BackButton />}
        </div>
      </div>
    </section>
  );
}
