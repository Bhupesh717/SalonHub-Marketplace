"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Users, School, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();
    const { user, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const userRole =
        typeof window !== "undefined" ? localStorage.getItem("roleName") : null;
    const userEmail =
        typeof window !== "undefined" ? localStorage.getItem("user_email") : null;
    const handleLogout = async () => {
        try {
            await logout();
            toast({
                title: "Logged out",
                description: "Logout successful",
            });
            router.push("/admin/login");
        } catch (error) {
            // Optional: Handle logout errors (e.g., network issues)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Logout failed. Please try again.",
            });
        }
    };
    const navigation = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            show: true,
        },
        {
            name: "User Management",
            href: "/admin/users",
            icon: Users,
            show: userRole === "Admin",
        },
        {
            name: "Schools",
            href: "/admin/schools",
            icon: School,
            show: userRole === "Admin",
        },
    ].filter((item) => item.show);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold">EduPanel</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {userRole === "Admin" ? "Administrator" : "School Portal"}
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-black hover:text-gray-500",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-secondary"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="mb-4 p-3 bg-secondary rounded-lg">
                    <p className="text-sm font-medium truncate">
                        {user?.name || userEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {userRole === "Admin" ? "Admin Account" : "School Account"}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden fixed top-4 right-4 z-50"
                    >
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-[280px] border-r bg-background">
                <SidebarContent />
            </aside>
        </>
    );
}
