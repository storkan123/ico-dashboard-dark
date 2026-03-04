"use client";

import { useState } from "react";

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  isEmpty = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isEmpty?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-lg border glass-card"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-card)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          {isEmpty && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-dim)",
              }}
            >
              Pending
            </span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
            style={{ color: "var(--text-muted)" }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {open && (
        <div
          className="px-4 pb-4 border-t"
          style={{ borderColor: "var(--border-primary)" }}
        >
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}
