"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/welcome") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);

  const formatSegment = (seg: string) => {
    return seg
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs text-[var(--color-burgundy)] mb-4"
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[var(--color-flowering-chestnut)] transition text-[var(--color-burgundy)] font-medium"
      >
        <Home className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
        <span>Platform</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-[var(--color-dusty-rose)]" />
            {isLast ? (
              <span className="font-bold text-[var(--color-burgundy)]">
                {formatSegment(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-[var(--color-flowering-chestnut)] transition text-[var(--color-burgundy)]/80 font-medium"
              >
                {formatSegment(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
