"use client";

import Logo from "@/components/common/Header/Logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  UserIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { label: "Blogs", href: "/admin/blogs", icon: DocumentTextIcon },
  {
    label: "Consultations",
    href: "/admin/consultations",
    icon: ChatBubbleLeftRightIcon,
  },
  { label: "Requests", href: "/admin/requests", icon: UserIcon },
  { label: "Users", href: "/admin/users", icon: UsersIcon },
];

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setUser({ name: parsed.name, email: parsed.email });
        } catch {}
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  return (
    <div className="w-1/6 h-screen bg-gray-100 flex flex-col items-center justify-between py-6">
      <div className="w-full flex flex-col items-center">
        <Logo />
        {/* User section */}
        {user && (
          <div className="flex flex-col items-center mt-6 mb-2 w-full px-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mb-1 shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-base font-semibold text-gray-800">
              {user.name}
            </div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        )}
        <div className="flex flex-col items-start justify-start gap-2 w-full px-4 py-5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 text-sm font-medium px-3 py-3 w-[90%] rounded-md transition-colors duration-200 border border-gray-200 mb-1
                  ${
                    isActive
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="mx-2">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Logout button at the bottom */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-[90%] mb-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200 border border-transparent"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}
