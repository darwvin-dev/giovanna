"use client"
import React, { useState } from "react"

export function Tabs({ tabs }: { tabs: { id: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  return (
    <div>
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.id} isActive={active === t.id} onClick={() => setActive(t.id)}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4">
        {tabs.map((t) => active === t.id && <TabsContent key={t.id}>{t.content}</TabsContent>)}
      </div>
    </div>
  )
}

export function TabsList({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex gap-2 border-b border-white/10 ${className}`}>{children}</div>
}

export function TabsTrigger({ children, isActive, ...props }: { children: React.ReactNode; isActive?: boolean; onClick?: () => void }) {
  return (
    <button
      className={`px-3 py-2 text-sm ${isActive ? "text-amber-400 border-b-2 border-amber-400" : "text-gray-400 hover:text-white"}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
