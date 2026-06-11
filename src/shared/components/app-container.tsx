import { cn } from "@/shared/lib/utils/tailwind-cn";

export default function AppContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-4 md:px-6 bg-gray-50", className)}>{children}</div>
  );
}
