import React from "react";

import AuthPromoPanel from "@/features/auth/layout/auth-promo-panel";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Global layout for authentication pages
 * (Login / Register / Forgot Password / Reset Password)
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid lg:grid-cols-2">
      {/* ===== Left side promo / marketing panel ===== */}
      <AuthPromoPanel />

      {/* ===== Right side auth content ===== */}
      {children}
    </main>
  );
}
