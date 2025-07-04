import Link from "next/link";
import React from "react";

export default function DesktopNav({
  navLinks,
  setDesktopDropdownOpen,
  desktopDropdownOpen,
  handleMouseEnter,
  handleMouseLeave,
}: {
  navLinks: {
    label: string;
    href: string;
    dropdown?: { label: string; href: string }[];
  }[];
  setDesktopDropdownOpen: (label: string | null) => void;
  desktopDropdownOpen: string | null;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}) {
  return (
    <div className="hidden md:flex items-center gap-6">
      {navLinks.map((link) =>
        link.dropdown ? (
          <div
            key={link.label}
            className="relative"
            onMouseEnter={() => setDesktopDropdownOpen(link.label)}
            onMouseLeave={() => setDesktopDropdownOpen(null)}
          >
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-600 transition">
              {link.label}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {desktopDropdownOpen === link.label && (
              <div
                className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {link.dropdown?.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.label}
            href={link.href || ""}
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}
