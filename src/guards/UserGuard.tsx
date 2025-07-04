"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { RoleEnum } from "@/enum/RoleEnum";
import { toast } from "react-toastify";

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
        toast.error("Please login to access this page");
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
        return;
      }

      try {
        const user = JSON.parse(userData);

        // Check if role matches Admin (case-sensitive)
        if (user.role !== RoleEnum.User) {
          toast.error("You are not authorized to access this page");
          setTimeout(() => {
            router.replace("/login");
          }, 3000);
          return;
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
