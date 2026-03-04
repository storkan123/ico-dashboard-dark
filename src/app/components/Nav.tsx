"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Active Work Orders" },
  { href: "/history", label: "History" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-border-primary backdrop-blur-sm"
      style={{ background: "var(--bg-nav)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "var(--accent-blue)",
                  color: "#ffffff",
                }}
              >
                ICO
              </div>
              <span
                className="text-lg font-semibold hidden sm:block"
                style={{ color: "var(--text-primary)" }}
              >
                ICO Real Estate Group
              </span>
            </Link>
            <div className="flex gap-1">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/" || pathname.startsWith("/work-order")
                    : pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      background: isActive
                        ? "var(--stage-triaged-bg)"
                        : "transparent",
                      color: isActive
                        ? "var(--accent-blue)"
                        : "var(--text-muted)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm" style={{ color: "var(--text-dim)" }}>
              Live
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
