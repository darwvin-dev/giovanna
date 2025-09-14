import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table className={cn("w-full border-collapse text-sm", className)}>
      {children}
    </table>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className="" }: { children: React.ReactNode; className: string; }) {
  return (
    <tr className={`border-b last:border-0 border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "" }: { children: React.ReactNode; className?:string }) {
  return <th className={`text-left font-medium px-3 py-2 ${className}`}>{children}</th>;
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
