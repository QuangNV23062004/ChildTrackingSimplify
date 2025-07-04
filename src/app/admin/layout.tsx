import SideBar from "@/components/admin/layout/SideBar";
import AdminGuard from "@/guards/AdminGuard";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1">{children}</main>
      </div>
    </AdminGuard>
  );
}
