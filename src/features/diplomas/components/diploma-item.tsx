import Image from "next/image";
import { IDiploma } from "@/features/diplomas/lib/types/diploma";
import Link from "next/link";

export default function DiplomaItem({
  diploma,
  priority,
}: {
  diploma: IDiploma;
  priority: boolean;
}) {
  return (
    <article className="group relative overflow-hidden h-112">
      {/* ==== Diploma Link ==== */}
      <Link
        href={`/diplomas/${diploma.id}`}
        aria-label={`View ${diploma.title} diploma details`}
      >
        {/* ===== Background Image ===== */}
        <Image
          src={diploma.image || "/placeholder.jpg"}
          alt={`${diploma.title} diploma cover`}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 455px"
        />
        {/* ===== Overlay Content ===== */}
        <div className="w-[calc(100%-1.25rem)] absolute inset-s-2.5 bottom-2.5 p-4 bg-[#155DFCBF] backdrop-blur-md text-white">
          {/* Title */}
          <h3 className="text-xl font-semibold mb-1">{diploma.title}</h3>

          {/* Expandable Description */}
          <div className="relative">
            <p
              className="
                text-sm opacity-90
                overflow-hidden
                transition-[max-height] duration-500 ease-in-out
                max-h-10.5
                group-hover:max-h-40 group-focus-within:max-h-40
        "
            >
              {diploma.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
