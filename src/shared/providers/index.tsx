import ReactQueryProvider from "./react-query.provider";
import { TanStackDevtools } from "@tanstack/react-devtools";
import NextAuthProvider from "./next-auth.provider";

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                <TanStackDevtools config={{defaultOpen: false}} />
                {children}
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}