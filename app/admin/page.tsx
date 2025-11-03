"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Avoid redirect loop if already on /admin/login
    if (pathname === "/admin/login") {
      return;
    }

    if (isAuthenticated) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Your SVG logo/spinner */}
      <img src="/loader.svg" alt="Loading icon" className="w-24 h-24 mb-2" />

      {/* Loading text */}
      <div className="text-lg text-gray-700">Redirecting...</div>
    </div>
  );
}
