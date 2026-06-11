import Link from "next/link";
import { PenLine, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { IDiploma } from "@/features/diplomas/lib/types/diploma";
import {
  ImmutableDiplomaModal,
  DeleteDiplomaModal,
} from "@/features/diplomas/components";
import { AppContainer } from "@/shared/components";

function AdminDiplomaHeader({ diploma }: { diploma: IDiploma }) {
  return (
    <AppContainer className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center px-4 py-2.5 bg-white overflow-hidden">
      {/* ===== Diploma Title ===== */}
      <h3 className="font-inter font-semibold text-lg text-black">
        {diploma.title}
      </h3>

      {/* ===== Diploma Actions ===== */}
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-2.5">
        {/* Immtable Diploma */}
        <ImmutableDiplomaModal
          diplomaId={diploma.id}
          immutable={!!diploma.immutable}
        />

        {/* Edit Diploma */}
        <Link
          href={`/diplomas/${diploma.id}/edit`}
          className="px-4 py-3 h-12 w-fit flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 transition-colors duration-200 text-white text-sm"
        >
          <PenLine size={18} />
          Edit
        </Link>

        {/* Delete Diploma */}
        <DeleteDiplomaModal
          diplomaId={diploma.id}
          trigger={
            <Button variant="destructive">
              <Trash2 size={18} />
              Delete
            </Button>
          }
        />
      </div>
    </AppContainer>
  );
}

export default AdminDiplomaHeader;
