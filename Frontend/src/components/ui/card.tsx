import React from "react"

export function Card({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-white/10 bg-white/5 shadow p-6 ${className}`}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function CardTitle({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-xl font-semibold text-amber-300 ${className}`}>{children}</h3>
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-gray-300 ${className}`}>{children}</div>
}
