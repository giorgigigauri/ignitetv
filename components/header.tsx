"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

interface HeaderProps {
  shows?: { name: string; href: string }[];
}

export default function Header({ shows = [] }: HeaderProps) {
  const showsList = shows;
  const [showsOpen, setShowsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowsOpen(false);
      }
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

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Delayed close for dropdown so mouse can travel from trigger to menu
  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowsOpen(false);
    }, 150);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 bg-background border-b border-primary/30">
      {/* Logo */}
      <Link
        href="/"
        className="flex-shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
          <Image
            src="/ignitetelevision-logo.png"
            alt="Ignite Television"
            width={56}
            height={25}
          />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
        <Link
          href="/"
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 transition-colors text-sm"
        >
          Home
        </Link>
        <Link
          href="/news"
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 transition-colors text-sm"
        >
          News
        </Link>

        {/* Shows dropdown */}
        <div
          ref={dropdownRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            className="flex items-center gap-1 text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 transition-colors text-sm"
            onClick={() => setShowsOpen((prev) => !prev)}
            aria-expanded={showsOpen}
            aria-haspopup="true"
          >
            Shows
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${showsOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`absolute right-0 top-full pt-1 z-50 transition-all duration-200 ${
              showsOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            <div
              className="w-52 bg-secondary border border-primary/40 rounded-sm py-2 shadow-xl shadow-background/50"
              role="menu"
            >
              {showsList.map((show) => (
                <Link
                  key={show.name}
                  href={show.href}
                  role="menuitem"
                  tabIndex={showsOpen ? 0 : -1}
                  className="block px-4 py-1.5 text-sm text-foreground hover:text-primary hover:bg-muted/60 focus-visible:text-primary focus-visible:bg-muted/60 focus-visible:outline-none transition-colors"
                  onClick={() => setShowsOpen(false)}
                >
                  - {show.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/about"
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 transition-colors text-sm"
        >
          About Us
        </Link>
        <Link
          href="/advertise"
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 transition-colors text-sm"
        >
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
          <div>
            <button
              type="button"
              className="flex items-center gap-1 text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors text-sm py-1"
              onClick={() => setShowsOpen(!showsOpen)}
              aria-expanded={showsOpen}
            >
              Shows
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${showsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`pl-4 flex flex-col gap-1 overflow-hidden transition-all duration-200 ${
                showsOpen ? "max-h-60 mt-2 opacity-100" : "max-h-0 mt-0 opacity-0"
              }`}
            >
              {showsList.map((show) => (
                <Link
                  key={show.name}
                  href={show.href}
                  className="text-sm text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors py-0.5"
                  onClick={() => setMobileOpen(false)}
                  tabIndex={mobileOpen && showsOpen ? 0 : -1}
                >
                  - {show.name}
                </Link>
              ))}
            </div>
          </div>
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
