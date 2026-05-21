import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import { ArrowDownWideNarrow } from "lucide-react";

interface IAdminExamsTableSkeletonProps {
  rows?: number;
}

export default function AdminExamsTableSkeleton({
  rows = 8,
}: IAdminExamsTableSkeletonProps) {
  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-27">Image</TableHead>
            <TableHead className="w-136.5">Title</TableHead>
            <TableHead className="w-61">Diploma</TableHead>
            <TableHead className="w-50">No. of Questions</TableHead>

            <TableHead>
              <Button variant="default" className="pointer-events-none">
                <span>Sort</span>
                <ArrowDownWideNarrow width={18} />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              {/* Image */}
              <TableCell className="w-22.5">
                <div className="relative w-17.5 h-20">
                  <Skeleton className="size-full" />
                </div>
              </TableCell>

              {/* Title */}
              <TableCell>
                <Skeleton className="h-4 w-[90%]" />
              </TableCell>

              {/* Diploma */}
              <TableCell>
                <Skeleton className="h-4 w-[80%]" />
              </TableCell>

              {/* Questions Count */}
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex justify-center">
                  <Skeleton className="size-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
