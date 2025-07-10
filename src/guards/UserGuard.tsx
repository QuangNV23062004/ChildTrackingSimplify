"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { RoleEnum } from "@/enum/RoleEnum";
import { useToast } from "../components/common/ToastContext";
import Loading from "../components/common/Loading";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const checkUserAccess = () => {
      const userData = localStorage.getItem("user_data");

      if (!userData) {
        toast.showToast("Please login to access this page", "error");
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
        return;
      }

      try {
        const user = JSON.parse(userData);

        // Check if role matches Admin (case-sensitive)
        if (user.role !== RoleEnum.User) {
          toast.showToast("You are not authorized to access this page", "error");
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
    return <Loading message="Checking user..." />;
  }

  if (!allowed) {
    return notFound();
  }

  return <>{children}</>;
}
