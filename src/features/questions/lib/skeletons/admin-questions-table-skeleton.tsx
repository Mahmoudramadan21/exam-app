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
import { ArrowDownWideNarrow, Plus } from "lucide-react";

interface IAdminQuestionsTableSkeletonProps {
  rows?: number;
}

export default function AdminQuestionsTableSkeleton({
  rows = 8,
}: IAdminQuestionsTableSkeletonProps) {
  return (
    <section className="flex flex-col" aria-labelledby="questions-title">
      <div className="flex justify-between items-center gap-2 p-2.5 bg-blue-600">
        <h4 id="questions-title" className="text-base text-white font-semibold">
          Exam Questions
        </h4>

        <Button
          variant="default"
          className="w-fit h-fit text-base text-white pointer-events-none"
        >
          <Plus size={18} />
          Add Question
        </Button>
      </div>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-300 text-gray-800">Title</TableHead>

              <TableHead className="w-35 bg-gray-300 text-gray-800">
                <Button
                  variant="default"
                  className="bg-gray-300 text-gray-800 pointer-events-none"
                >
                  <span>Sort</span>
                  <ArrowDownWideNarrow width={18} />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[90%]" />
                </TableCell>

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
    </section>
  );
}
