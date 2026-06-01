import { cn } from "@/shared/lib/utils/tailwind-cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse bg-gray-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
