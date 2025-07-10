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
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
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
  { label: "Home", href: "/admin", icon: HomeIcon },
];

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-blue-500 text-black rounded-md shadow-lg"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:transform-none
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          w-64 lg:w-1/6 h-screen bg-gray-100 flex flex-col items-center justify-between py-6 shadow-lg lg:shadow-none`}
      >
        <div className="w-full flex flex-col items-center">
          <Logo />
          {/* User section */}
          {user && (
            <div className="flex flex-col items-center mt-6 mb-2 w-full px-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-black font-bold text-xl mb-1 shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-base font-semibold text-gray-800 text-center">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 text-center">
                {user.email}
              </div>
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
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 text-sm font-medium px-3 py-3 w-full rounded-md transition-colors duration-200 border border-gray-200 mb-1
                    ${
                      isActive
                        ? "bg-blue-500 text-black border-blue-500"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout button */}
        <div className="w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm font-medium px-3 py-3 w-full rounded-md transition-colors duration-200 border border-red-200 bg-white text-red-600 hover:bg-red-50"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
