"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { RoleEnum } from "@/enum/RoleEnum";

export default function DoctorGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (!userData) {
      router.replace("/login");
      return;
    }
    try {
      const user = JSON.parse(userData);
      if (user.role !== RoleEnum.Doctor) {
        notFound();
      } else {
        setAllowed(true);
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  if (!allowed) {
    return notFound();
  }

  return <>{children}</>;
}
