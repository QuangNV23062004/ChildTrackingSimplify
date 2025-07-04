"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { RoleEnum } from "@/enum/RoleEnum";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAccess = () => {
      const userData = localStorage.getItem("user_data");

      if (!userData) {
        router.replace("/login");
        return;
      }

      try {
        const user = JSON.parse(userData);

        // Check if role matches Admin (case-sensitive)
        if (user.role !== RoleEnum.Admin) {
          notFound();
        } else {
          setAllowed(true);
        }
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUserAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!allowed) {
    return notFound();
  }

  return <>{children}</>;
}
