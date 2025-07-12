import Link from "next/link";
import React from "react";

export default function MobileMenu({
  mobileOpen,
  setMobileOpen,
  navLinks,
  handleMobileDropdownToggle,
  mobileDropdownOpen,
  setMobileDropdownOpen,
  user,
}: {
  mobileOpen: boolean;
  setMobileOpen: () => void;
  navLinks: {
    label: string;
    href: string;
    dropdown?: { label: string; href: string }[];
  }[];
  handleMobileDropdownToggle: () => void;
  mobileDropdownOpen: boolean;
  setMobileDropdownOpen: () => void;
  user: { name: string; email: string; role: string } | null;
}) {
  return (
    <>
      {mobileOpen && (
        <div className="md:hidden mt-2 bg-white rounded-lg shadow-lg py-4 px-4 flex flex-col gap-2 animate-fade-in-down">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 w-full font-medium text-gray-700 hover:text-blue-600 transition"
                  onClick={handleMobileDropdownToggle}
                >
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
                      d={
                        mobileDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
                      }
                    />
                  </svg>
                </button>
                {mobileDropdownOpen && (
                  <div className="mt-2 w-full bg-white rounded-md shadow-lg py-2 z-50">
                    {link.dropdown?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        onClick={() => {
                          setMobileOpen();
                          setMobileDropdownOpen();
                        }}
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
                href={link.href}
                className="font-medium text-gray-700 hover:text-blue-600 transition block px-2 py-2"
                onClick={() => setMobileOpen()}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="flex flex-col gap-2 mt-2">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded font-medium border border-blue-500 text-blue-500 hover:bg-blue-50 transition text-center"
                  onClick={() => setMobileOpen()}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded font-medium bg-blue-500 text-black hover:bg-blue-600 transition text-center"
                  onClick={() => setMobileOpen()}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-black font-bold text-lg shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-black-700">{user.name}</span>
                </div>
                <Link href="/profile/consultations" className="px-4 py-2 rounded font-medium bg-blue-500 text-black hover:bg-blue-600 transition text-center cursor-pointer" onClick={() => setMobileOpen()}>
                  Consultations
                </Link>
                <Link href="/profile/requests" className="px-4 py-2 rounded font-medium bg-blue-500 text-black hover:bg-blue-600 transition text-center cursor-pointer" onClick={() => setMobileOpen()}>
                  Requests
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
