import ReactQueryProvider from "./react-query.provider";
import { TanStackDevtools } from "@tanstack/react-devtools";
import NextAuthProvider from "./next-auth.provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <TanStackDevtools config={{ defaultOpen: false }} />
        <TooltipProvider>{children}</TooltipProvider>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
