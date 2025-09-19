"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  User,
  LogOut,
  Settings,
  Home,
  FileText,
  Image,
  Contact,
  MessageSquare,
  Monitor,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: <Home className="w-5 h-5" /> },
    { name: "about", href: "/admin/about", icon: <Contact className="w-5 h-5" /> },
    { name: "Opere", href: "/admin/artworks", icon: <Image className="w-5 h-5" /> },
    { name: "Blog", href: "/admin/blog", icon: <FileText className="w-5 h-5" /> },
    { name: "Messaggi", href: "/admin/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "HomePage", href: "/admin/homepage", icon: <Monitor className="w-5 h-5" /> },
    { name: "Impostazioni", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-zinc-800">
          <h1 className="text-lg font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text tracking-wide">
            ⚡ Admin Panel
          </h1>
        </div>

        {/* Nav */}
        <nav className="mt-6 px-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                pathname === item.href
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-zinc-800">
          <button className="flex items-center gap-2 w-full text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
          {/* Left */}
          <button
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="font-semibold text-sm sm:text-base">Content Management</div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-black">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
