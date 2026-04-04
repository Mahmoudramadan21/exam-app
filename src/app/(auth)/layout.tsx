import AuthPromoPanel from "@/features/auth/layout/auth-promo-panel";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: AuthLayoutProps) {
  return (
    <main className="grid lg:grid-cols-2">
      <AuthPromoPanel />
      {children}
    </main>
  );
}
