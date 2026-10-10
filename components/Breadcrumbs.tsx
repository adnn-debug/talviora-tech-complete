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
      className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-4"
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[#6F1737] dark:hover:text-[#C58F98] transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Platform</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            {isLast ? (
              <span className="font-semibold text-[#6F1737] dark:text-[#F0C4CC]">
                {formatSegment(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition"
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
