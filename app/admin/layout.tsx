import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/20">
            <AdminSidebar />
            <main className="lg:pl-64 min-h-screen">
                <div className="container mx-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
