"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollerProps {
  children: ReactNode;
}

export default function HorizontalScroller({
  children,
}: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-10"
      >
        {children}
      </div>

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-2 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/3 -translate-y-1/2 z-20 w-8 h-8 bg-background/90 border border-primary/40 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none transition-all duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll left"
        tabIndex={canScrollLeft ? 0 : -1}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/3 -translate-y-1/2 z-20 w-8 h-8 bg-background/90 border border-primary/40 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none transition-all duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll right"
        tabIndex={canScrollRight ? 0 : -1}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
