'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from './AdminSidebar'

interface AdminLayoutProps {
    children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-secondary/30 p-8">
                {children}
            </main>
        </div>
    )
}
