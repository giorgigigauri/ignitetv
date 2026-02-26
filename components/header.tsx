"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  shows?: { name: string; href: string }[];
}

export default function Header({ shows = [] }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navLinkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return isActive
      ? "border border-white/50 rounded-full px-3 py-0.5 text-foreground text-sm transition-colors hover:border-white/80"
      : "text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 transition-colors text-sm";
  };

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4 pt-8 pb-4 md:px-8 border-b"
      style={{ background: "linear-gradient(to right, #0a0808 0%, #1c0e04 40%, #150b03 70%, #0a0808 100%)", borderColor: "rgba(126, 90, 60, 0.5)" }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex-shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
          <Image
            src="/ignitetelevision-logo.png"
            alt="Ignite Television"
            width={100}
            height={45}
          />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
        <Link href="/" className={navLinkClass("/")}>
          Home
        </Link>
        <Link href="/news" className={navLinkClass("/news")}>
          News
        </Link>

        <Link href="/shows" className={navLinkClass("/shows")}>
          Shows
        </Link>

        <Link href="/about" className={navLinkClass("/about")}>
          About Us
        </Link>
        <Link href="/advertise" className={navLinkClass("/advertise")}>
          Advertise
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        ref={mobileButtonRef}
        type="button"
        className="md:hidden text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`absolute top-full left-0 right-0 bg-secondary border-b border-primary/30 md:hidden transition-all duration-200 overflow-hidden ${
          mobileOpen ? "max-h-96 py-4 px-4 opacity-100" : "max-h-0 py-0 px-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-3" role="navigation" aria-label="Mobile navigation">
          <Link
            href="/"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors text-sm py-1"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/news"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors text-sm py-1"
            onClick={() => setMobileOpen(false)}
          >
            News
          </Link>
          <Link
            href="/shows"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors text-sm py-1"
            onClick={() => setMobileOpen(false)}
          >
            Shows
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors text-sm py-1"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/advertise"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors text-sm py-1"
            onClick={() => setMobileOpen(false)}
          >
            Advertise
          </Link>
        </nav>
      </div>
    </header>
  );
}
