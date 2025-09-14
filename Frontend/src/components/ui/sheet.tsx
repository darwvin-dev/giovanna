"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type SheetContextType = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextType>({
  open: false,
  onOpenChange: () => {},
});

export function Sheet({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <SheetContext.Provider value={{ open: !!open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement;
}) {
  const { onOpenChange } = React.useContext(SheetContext);

  if (asChild) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => onOpenChange?.(true),
    });
  }

  return (
    <button
      onClick={() => onOpenChange?.(true)}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {children}
    </button>
  );
}

export function SheetContent({
  children,
  className,
  side = "right",
}: {
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right";
}) {
  const { open, onOpenChange } = React.useContext(SheetContext);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "fixed top-0 h-full w-80 bg-black text-white z-50 shadow-lg transition-transform",
          side === "left"
            ? "left-0 animate-in slide-in-from-left"
            : "right-0 animate-in slide-in-from-right",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export function SheetHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 border-b border-white/10 ${className}`}>
      {children}
    </div>
  );
}

export function SheetTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-bold">{children}</h2>;
}
