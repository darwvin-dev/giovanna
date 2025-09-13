"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  action?: string;
  placeholder?: string;
};

export default function SearchBar({
  open,
  onClose,
  action = "/search",
  placeholder = "Search artworks, collections, exhibitions...",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() =>
      inputRef.current?.focus({ preventScroll: true })
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[70] flex items-start justify-center pt-28 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-2xl border border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 p-4 sm:p-5 border-b border-gray-800">
          <Search className="text-yellow-400" size={22} />
          <form action={action} className="flex-1">
            <input
              ref={inputRef}
              autoFocus
              type="search"
              name="q"
              placeholder={placeholder}
              className="w-full bg-transparent text-white text-base sm:text-lg outline-none placeholder:text-white/50"
            />
          </form>
          <button
            className="h-10 w-10 grid place-items-center text-white/70 hover:text-yellow-400 rounded-full hover:bg-white/5 transition"
            onClick={onClose}
            aria-label="Close search"
            type="button"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-4 sm:p-5 text-center text-white/50">
          Type to search through the artist{"'"}s portfolio
        </div>
      </div>
    </div>
  );
}
