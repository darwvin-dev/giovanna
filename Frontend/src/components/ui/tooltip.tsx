"use client";

import * as React from "react";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <span className="relative group cursor-help">{children}</span>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute hidden group-hover:block -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
      {children}
    </span>
  );
}
