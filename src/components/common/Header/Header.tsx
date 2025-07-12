"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import AuthButtons from "./AuthButtons";
import MobileHamburger from "./MobileHamburger";
import MobileMenu from "./MobileMenu";

const navLinks: {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}[] = [
  // {
  //    label: "Home",
  //    dropdown: [
  //      {
  //        label: "Home",
  //        href: "/",
  //      },
  //    ],
  // },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(
    null
  );
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          // Ensure user object has name, email, and role
          if (parsed && parsed.name && parsed.email && parsed.role) {
            setUser({ name: parsed.name, email: parsed.email, role: parsed.role });
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, []);

  // Handle desktop dropdown mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDesktopDropdownOpen("true");
  };

  // Handle desktop dropdown mouse leave
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(null);
    }, 200); // 200ms delay to allow moving to dropdown
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Site Name */}
          <Logo />

          {/* Desktop Nav */}
          <DesktopNav
            navLinks={navLinks}
            setDesktopDropdownOpen={setDesktopDropdownOpen}
            desktopDropdownOpen={desktopDropdownOpen}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />

          {/* Auth Buttons (Desktop) */}
          <AuthButtons user={user} />

          {/* Mobile Hamburger */}
          <MobileHamburger
            mobileOpen={mobileOpen}
            setMobileOpen={() => setMobileOpen(!mobileOpen)}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          mobileOpen={mobileOpen}
          setMobileOpen={() => setMobileOpen(!mobileOpen)}
          navLinks={navLinks}
          handleMobileDropdownToggle={() =>
            setMobileDropdownOpen(!mobileDropdownOpen)
          }
          mobileDropdownOpen={mobileDropdownOpen}
          setMobileDropdownOpen={() =>
            setMobileDropdownOpen(!mobileDropdownOpen)
          }
          user={user}
        />
      </nav>
    </header>
  );
};

export default Header;
