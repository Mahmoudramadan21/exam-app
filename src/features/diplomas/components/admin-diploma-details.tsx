import Image from "next/image";
import { IDiploma } from "@/features/diplomas/lib/types/diploma";

function AdminDiplomaDetails({ diploma }: { diploma: IDiploma }) {
  return (
    <article
      aria-labelledby="diploma-title"
      className="flex flex-col bg-white p-4 gap-4 font-geist-mono"
    >
      {/* ==== Diploma Image ==== */}
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Image</span>
        <div className="relative w-50 h-50 md:w-75 md:h-75">
          <Image
            src={diploma.image || ""}
            alt={diploma.title || ""}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ==== Diploma Details ==== */}
      <dl className="flex flex-col gap-4">
        {/* Diploma Title */}
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-400">Title</dt>
          <dd id="diploma-title" className="text-sm text-black">
            {diploma.title}
          </dd>
        </div>

        {/* Diploma Description */}
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-gray-400">Description</dt>
          <dd className="text-sm leading-6 text-gray-800">
            {diploma.description}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default AdminDiplomaDetails;
