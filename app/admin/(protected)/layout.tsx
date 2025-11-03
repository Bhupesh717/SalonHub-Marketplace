"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore"; // Adjust path
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Skip checks for login page itself
        if (pathname === "/admin/login") {
            return;
        }

        if (isMounted && !authLoading && !user) {
            router.replace("/admin/login");
        }
    }, [user, authLoading, isMounted, pathname, router]);

    if (!isMounted || authLoading) {
        return (
            // <div className="flex items-center justify-center min-h-screen">
            //     <div className="text-lg">Loading...

            //     </div>
            // </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    {/* Your SVG logo/spinner */}
                    <img
                        src="/loader.svg"
                        alt="Loading icon"
                        className="w-24 h-24 mb-2"
                    />

                    {/* Loading text */}
                    <div className="text-lg text-gray-700">
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    if (!user && pathname !== "/admin/login") {
        return null; // Redirect will handle
    }

    return <AdminLayout>{children}</AdminLayout>;
}
