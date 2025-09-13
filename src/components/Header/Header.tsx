"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Palette,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";
import SearchBar from "./SearchBar";

type MenuItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const MENU: MenuItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/portfolio",
    label: "Paintings",
    children: [
      { href: "/portfolio/fetzen", label: "Collezione Fetzen" },
      { href: "/portfolio/riflessi", label: "Collezione Riflessi" },
      { href: "/portfolio/ossidazioni", label: "Collezione Ossidazioni" },
      { href: "/portfolio/specchi", label: "Collezione Specchi" },
    ],
  },
  { href: "/eventi", label: "Exhibitions" },
  { href: "/contatti", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideSomeDD = Object.values(dropdownRefs.current).some(
        (el) => el && (el === target || el.contains(target))
      );
      if (!insideSomeDD) setDesktopDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopDropdown(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const logoClass = `w-auto ${
    scrolled ? "h-10 sm:h-12 lg:h-14" : "h-14 sm:h-16 lg:h-20"
  } transition-[transform,height] duration-300 ease-out group-hover:scale-105`;
  const barMinH = scrolled ? "min-h-[64px]" : "min-h-[80px]";

  return (
    <>
      <header
        role="banner"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen || searchOpen
            ? "bg-black/95 backdrop-blur-md py-2 shadow-2xl"
            : "bg-gradient-to-b from-black/70 to-transparent py-3"
        }`}
        style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-500 text-black px-4 py-2 rounded-md font-medium z-[70]"
        >
          Skip to content
        </a>

        <div
          className={`mx-auto max-w-7xl px-4 sm:px-5 flex items-center justify-between text-white ${barMinH}`}
        >
          <Link
            href="/"
            className="flex items-center group -mx-1 px-1"
            aria-label="Homepage"
          >
            <div className="relative">
              <img
                src="https://www.alicecorbetta.it/wp-content/uploads/2019/08/firma_bianca.png"
                alt="Giovanna"
                className={logoClass}
              />
              <div className="pointer-events-none absolute -inset-2 bg-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm uppercase tracking-wider font-medium">
            {MENU.map((item, i) => {
              const hasChildren = !!item.children?.length;
              const open = desktopDropdown === item.href;
              return (
                <div
                  key={item.href}
                  className="relative group flex items-center"
                  onMouseEnter={() =>
                    hasChildren && setDesktopDropdown(item.href)
                  }
                  onMouseLeave={() => hasChildren && setDesktopDropdown(null)}
                  ref={(el) => {
                    if (hasChildren) dropdownRefs.current[item.href] = el;
                  }}
                >
                  <Link
                    href={item.href}
                    className={`relative py-2 px-3 transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-yellow-400"
                        : "text-white/90 hover:text-yellow-400"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent rounded-full transition-opacity ${
                        isActive(item.href)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>

                  {hasChildren && (
                    <>
                      <button
                        type="button"
                        className={`ml-1 transition-transform duration-200 ${
                          open ? "rotate-180 text-yellow-400" : "text-white/70"
                        }`}
                        aria-haspopup="true"
                        aria-expanded={open}
                        aria-controls={`dd-${item.href}`}
                        onClick={() =>
                          setDesktopDropdown((d) =>
                            d === item.href ? null : item.href
                          )
                        }
                      >
                        <ChevronDown size={16} />
                      </button>

                      <div
                        id={`dd-${item.href}`}
                        className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                          open
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        <div className="bg-black/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-800 overflow-hidden min-w-[240px]">
                          <div className="py-2">
                            {item.children!.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-6 py-3 text-white/90 hover:text-yellow-400 hover:bg-white/5 transition-all duration-200 border-l-2 border-transparent hover:border-yellow-400"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {i < MENU.length - 1 && (
                    <span className="mx-2 text-white/20">/</span>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-3 border-l border-white/20 pl-5 ml-2">
              <a
                href="#"
                className="text-white/80 hover:text-yellow-400 transition hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-yellow-400 transition hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#mail"
                className="text-white/80 hover:text-yellow-400 transition hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <button
              aria-label="Search"
              className="p-2 rounded-full bg-white/5 hover:bg-yellow-400/10 text-yellow-400 hover:text-yellow-300 transition"
              onClick={() => setSearchOpen(true)}
              type="button"
            >
              <Search size={20} />
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              aria-label="Search"
              className="h-11 w-11 grid place-items-center rounded-full bg-white/5 text-yellow-400 active:scale-95 transition"
              onClick={() => setSearchOpen(true)}
              type="button"
            >
              <Search size={22} />
            </button>
            <button
              className="h-11 w-11 grid place-items-center rounded-full bg-white/5 text-yellow-400 active:scale-95 transition"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              type="button"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* نوار عنوان موبایل */}
        <div className="lg:hidden bg-[#E3CA94] text-black px-4 sm:px-5 py-2 flex items-center justify-between font-bold uppercase tracking-wide">
          <span>Menu</span>
          <span className="opacity-0 select-none">•</span>
        </div>
      </header>

      {/* شیت منوی موبایل */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-gradient-to-b from-black to-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
        >
          <div className="bg-[#E3CA94] text-black px-4 py-3 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center"
            >
              <img
                src="https://www.alicecorbetta.it/wp-content/uploads/2019/08/firma_bianca.png"
                alt="Giovanna"
                className="h-12 sm:h-14 w-auto"
              />
            </Link>
            <button
              className="h-10 w-10 grid place-items-center rounded-full text-black/80 hover:text-black transition"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="h-[calc(100%-120px)] overflow-y-auto overscroll-contain px-5 py-6 space-y-5">
            {MENU.map((item) =>
              !item.children ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition ${
                    isActive(item.href)
                      ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30"
                      : "text-white/90 hover:text-yellow-400 hover:bg-white/5"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.href}
                  className="rounded-lg border border-white/10"
                >
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium hover:text-yellow-400"
                    onClick={() =>
                      setMobileDropdown((s) =>
                        s === item.href ? null : item.href
                      )
                    }
                    aria-expanded={mobileDropdown === item.href}
                    aria-controls={`mdd-${item.href}`}
                    type="button"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        mobileDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`mdd-${item.href}`}
                    className={`overflow-hidden transition-[max-height] duration-300 ${
                      mobileDropdown === item.href ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 pb-3 space-y-2">
                      {item.children!.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md py-2 pl-3 text-[15px] text-white/85 hover:text-yellow-400 hover:bg-white/5 border-l border-white/10"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </nav>

          <div
            className="px-6 py-4 border-t border-white/10"
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
          >
            <div className="flex items-center justify-center gap-5 mb-4">
              <a
                href="#"
                className="h-11 w-11 grid place-items-center bg-white/5 rounded-full text-white/80 hover:text-yellow-400 hover:bg-yellow-400/10 transition"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                className="h-11 w-11 grid place-items-center bg-white/5 rounded-full text-white/80 hover:text-yellow-400 hover:bg-yellow-400/10 transition"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#mail"
                className="h-11 w-11 grid place-items-center bg-white/5 rounded-full text-white/80 hover:text-yellow-400 hover:bg-yellow-400/10 transition"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
            <div className="text-center text-white/50 text-sm flex items-center justify-center gap-2">
              <Palette size={16} />
              <span>Artistic Portfolio</span>
            </div>
          </div>
        </aside>
      </div>

      <SearchBar
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        action="/search"
        placeholder="Search artworks, collections, exhibitions..."
      />
    </>
  );
}
