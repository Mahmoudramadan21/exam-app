import {
  Skeleton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import { ArrowDownWideNarrow } from "lucide-react";

interface IAdminDiplomasTableSkeletonProps {
  rows?: number;
}

export default function AdminDiplomasTableSkeleton({
  rows = 8,
}: IAdminDiplomasTableSkeletonProps) {
  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-22.5">Image</TableHead>
            <TableHead className="w-42">Title</TableHead>
            <TableHead className="w-full">Description</TableHead>
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
                <Skeleton className="h-4 w-42" />
              </TableCell>

              {/* Description */}
              <TableCell>
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex justify-center">
                  <Skeleton className="h-7.5 w-7.5" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
