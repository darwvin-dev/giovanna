"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  open,
  align = "start",
  className,
}: {
  children: React.ReactNode;
  open: boolean;
  align?: "start" | "end";
  className?: string;
}) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute mt-2 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 z-50",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-2 text-sm font-medium">{children}</div>;
}

export function DropdownMenuItem({
  children,
  onClick,
  className=""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator() {
  return <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />;
}
