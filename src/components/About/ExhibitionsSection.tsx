"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/* ---------------- Types ---------------- */

type ExhibitionItem = {
  year: string | number;
  description: string;
  href?: string;
};

type ExhibitionsSectionProps = {
  title?: string;
  background?: string;
  items?: ExhibitionItem[];
  className?: string;
  /** How many recent years to show before clicking “show all” */
  initialVisibleYears?: number;
};

/* ---------------- Data (example) ---------------- */

const DEFAULT_ITEMS: ExhibitionItem[] = [
  { year: 2021, description: "Fermento — Spazio Eventi, Michele Satta, Bolgheri" },
  { year: 2019, description: "Abstracta Vitae — Sale Affrescate di Palazzo Comunale, Pistoia" },
  { year: 2019, description: "Riflessi nell’ombra (bipersonale), Fondazione BCC di Castagneto Carducci, Livorno" },
  { year: 2018, description: "In ogni modo (collettiva), Fornace Pasquinucci, Limite sull’Arno (FI)" },
  { year: 2017, description: "Inception (bipersonale), Lumen Gallery, Firenze" },
  { year: 2016, description: "Libro d’artista (collettiva), Stanze del Teatro, Pontremoli" },
  { year: 2015, description: "13 a tavola (collettiva), Palazzo Tucci, Lucca" },
  { year: 2015, description: "Astrazioni (collettiva), Galleria Plaumann, Milano" },
  { year: 2014, description: "Rosso di donne (collettiva), Galleria Senzalimitearte, Colle Val d’Elsa" },
  { year: 2014, description: "International Workshop of Painter Symposium, Stary Sącz, Polonia" },
  { year: 2014, description: "Metaphors (installazione), Spazio Paretra — Marble Weeks, Carrara" },
  { year: 2014, description: "Memorie in superficie, AdeleC Showroom, Firenze" },
  { year: 2013, description: "InTime (collettiva), Present Contemporary Art Gallery, Firenze" },
  { year: 2013, description: "Wallmemories (personale), Spazio Lumen, Firenze" },
  { year: 2013, description: "Reality Fluids (collettiva), Nhow Hotel, Milano" },
  { year: 2013, description: "Artur-o (installazione artistica), Villa Fani, Firenze" },
  { year: 2012, description: "Elite Collection — DieciRosso Art Gallery, Firenze" },
  { year: 2012, description: "Fuorisalone — Tactile Surface, Chiostro di San Simpliciano, Milano" },
  { year: 2012, description: "Flussartisti, Sala Comunale, Castellina in Chianti" },
  { year: 2012, description: "Personale, Paratissima, Torino" },
  { year: 2011, description: "Madame Vendange (personale), Libreria Gogol — Fuorisalone 2011, Milano" },
  { year: 2010, description: "Colloqui Letterali, Chiesa di Sant’Andrea a San Miniato, Pisa" },
  { year: 2010, description: "Trame d’artista, Spazio Dedon, Milano" },
  { year: 2009, description: "Adrenalina — l’arte emerge in nuove direzioni, Ex Mercato Ebraico, Roma" },
  { year: 2009, description: "Livello 16 — Fuorisalone 2009, Milano" },
  { year: 2008, description: "Tecniche miste (collettiva), Villa Caruso, Lastra a Signa (FI)" },
  { year: 2008, description: "Signora delle Mele — Fuorisalone 2008, Milano" },
  { year: 2007, description: "Verdeolivo — Fuorisalone 2007, Milano" },
  { year: 2006, description: "Levia Gravia, Palazzo Ducale, Genova" },
  { year: 2006, description: "Misteroggetto (personale), Galleria Blucammello, Livorno" },
];

/* ---------------- Utils & Hooks ---------------- */

const isExternal = (href?: string) => (href ? /^https?:\/\//i.test(href) : false);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { rootMargin: "0px 0px -15% 0px", threshold: 0.1 }
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // SSR/old browsers safeguard
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setShown(true));
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return { ref, shown } as const;
}

function Reveal({
  children,
  shown,
  y = 12,
  delay = 0,
  reduced = false,
}: {
  children: React.ReactNode;
  shown: boolean;
  y?: number;
  delay?: number;
  reduced?: boolean;
}) {
  const style = reduced
    ? undefined
    : ({
        transition: `opacity 600ms cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 600ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
      } as React.CSSProperties);
  return <div style={style}>{children}</div>;
}

function useParallax(ref: React.RefObject<HTMLElement>, disabled = false) {
  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        const clamped = Math.max(-1, Math.min(1, p));
        const translate = clamped * 40; // max 40px
        el.style.setProperty("--parallax-y", `${translate.toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, disabled]);
}

function TimelineItem({ item, reduced }: { item: ExhibitionItem; reduced: boolean }) {
  const { ref, shown } = useInView<HTMLLIElement>({ rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

  const card = (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border border-white/10",
        "bg-white/[0.035] text-white/90",
        reduced ? "" : "transition-all duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:-translate-y-0.5",
      ].join(" ")}
    >
      <span aria-hidden className="absolute left-[-23px] sm:left-[-22px] top-5 h-2 w-2 rounded-full bg-white/70 ring-2 ring-black/40" />
      <div className="m-4 sm:m-5">
        <p className="leading-relaxed pr-8">{item.description}</p>
      </div>
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400",
          reduced ? "" : "transition-all duration-300 group-hover:w-full",
        ].join(" ")}
      />
      {item.href && (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={["absolute right-4 top-4 h-5 w-5 text-white/60", reduced ? "" : "transition-transform duration-300 group-hover:translate-x-0.5"].join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )}
    </div>
  );

  const style = reduced
    ? undefined
    : ({
        transition: "opacity 600ms cubic-bezier(.2,.7,.3,1), transform 600ms cubic-bezier(.2,.7,.3,1)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
      } as React.CSSProperties);

  return (
    <li ref={ref} className="ml-8 sm:ml-10" style={style}>
      {item.href ? (
        isExternal(item.href) ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
            aria-label={`${item.description} — apre in nuova scheda`}
          >
            {card}
          </a>
        ) : (
          <Link
            href={item.href}
            className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
            aria-label={item.description}
          >
            {card}
          </Link>
        )
      ) : (
        card
      )}
    </li>
  );
}

function YearGroup({ year, items, reduced }: { year: string; items: ExhibitionItem[]; reduced: boolean }) {
  const { ref: yearRef, shown: yearShown } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -10% 0px", threshold: 0.2 });

  return (
    <li data-year-anchor={year} id={`year-${year}`} className="scroll-mt-24 md:scroll-mt-32" role="listitem">
      <Reveal shown={yearShown} y={12} delay={0} reduced={reduced}>
        <div ref={yearRef} className="sticky top-20 z-10 mb-5 flex items-center gap-3">
          <div className="relative h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(234,179,8,0.25)] ring-1 ring-amber-300/30" />
          <h2 className="tabular-nums text-xl sm:text-2xl font-semibold text-amber-400/95">{year}</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>
      </Reveal>

      <ul className="space-y-4" role="list">
        {items.map((it, i) => (
          <TimelineItem key={`${year}-${i}`} item={it} reduced={reduced} />
        ))}
      </ul>
    </li>
  );
}

/* -------------- Main -------------- */

export default function ExhibitionsSection({
  title = "Esposizioni",
  background = "/Alice1.jpg",
  items = DEFAULT_ITEMS,
  className = "",
  initialVisibleYears = 6,
}: ExhibitionsSectionProps) {
  const reduced = useReducedMotion();

  // Group by year (desc)
  const grouped = useMemo(() => {
    const map = new Map<string, ExhibitionItem[]>();
    for (const it of items) {
      const y = String(it.year);
      map.set(y, [...(map.get(y) ?? []), it]);
    }
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [items]);

  const yearKeys = grouped.map(([y]) => y);
  const safeInitialVisible = Math.max(1, Math.min(initialVisibleYears, yearKeys.length || 1));

  const [showAll, setShowAll] = useState(false);
  const [activeYear, setActiveYear] = useState<string>(yearKeys[0] ?? "");

  // Parallax BG
  const bgRef = useRef<HTMLDivElement>(null);
  useParallax(bgRef, reduced);

  // Header reveal
  const { ref: headerRef, shown: headerShown } = useInView<HTMLDivElement>();

  // Scroll spy (highlight active year)
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;
    const anchors = Array.from(root.querySelectorAll<HTMLElement>("[data-year-anchor]"));
    if (!anchors.length) return;

    if (typeof IntersectionObserver === "undefined") {
      setActiveYear(anchors[0].getAttribute("data-year-anchor") || "");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0] ?? entries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const y = best?.target.getAttribute("data-year-anchor");
        if (y) setActiveYear(y);
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    anchors.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [grouped]);

  // Respect hash on mount (e.g., /exhibitions#year-2014)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#year-")) {
      const y = hash.replace("#year-", "");
      setActiveYear(y);
      const el = document.getElementById(`year-${y}`);
      el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }, [reduced]);

  // Smooth scroll to year chip
  const handleChipClick = useCallback(
    (e: React.MouseEvent, y: string) => {
      e.preventDefault();
      const el = timelineRef.current?.querySelector<HTMLElement>(`[data-year-anchor="${y}"]`);
      if (!el) return;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      // sync hash for shareability (client only)
      if (typeof history !== "undefined") history.replaceState(null, "", `#year-${y}`);
    },
    [reduced]
  );

  return (
    <section className={`relative isolate ${className}`} aria-label={title}>
      {/* BG Parallax (disabled by reduce motion) */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-fixed will-change-transform"
        style={{
          backgroundImage: `url(${background})`,
          transform: reduced ? undefined : "translateY(var(--parallax-y, 0px))",
        }}
      />
      {/* Overlay & Accents */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/60" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-[36rem] w-[36rem] -z-10 rounded-full bg-yellow-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-[28rem] w-[28rem] -z-10 rounded-full bg-white/10 blur-3xl" />

      {/* Container */}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Reveal shown={headerShown} y={14} delay={40} reduced={reduced}>
          <div ref={headerRef} className="mb-10 md:mb-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1
                className="text-white text-4xl sm:text-5xl font-light tracking-wide"
                style={{ fontFamily: "Poiret One, ui-serif, serif" }}
              >
                {title}
              </h1>

              {/* Quick years nav */}
              <nav aria-label="Quick years navigation" className="w-full overflow-x-auto lg:w-auto scrollbar-none">
                <ul className="flex items-center gap-2">
                  {yearKeys.map((y, idx) => {
                    const hidden = !showAll && idx >= safeInitialVisible;
                    if (hidden) return null;
                    const isActive = activeYear === y;
                    return (
                      <li key={y} className="shrink-0">
                        <a
                          href={`#year-${y}`}
                          onClick={(e) => handleChipClick(e, y)}
                          aria-current={isActive ? "true" : undefined}
                          className={[
                            "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm tabular-nums transition-colors focus:outline-none",
                            isActive
                              ? "bg-amber-400 text-black font-semibold ring-1 ring-amber-300"
                              : "bg-white/5 text-white/90 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 focus-visible:ring-2 focus-visible:ring-amber-300/70",
                          ].join(" ")}
                        >
                          {y}
                        </a>
                      </li>
                    );
                  })}
                  {yearKeys.length > safeInitialVisible && (
                    <li className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowAll((v) => !v)}
                        className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm bg-amber-400/90 text-black font-medium hover:bg-amber-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                        aria-expanded={showAll}
                      >
                        {showAll ? "Mostra meno" : "Anni precedenti"}
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Aside */}
          <aside className="lg:col-span-4">
            <Reveal shown={headerShown} y={10} delay={120} reduced={reduced}>
              <div className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="m-6 md:m-7">
                  <p className="leading-relaxed text-white/85">
                    Selezione di esposizioni e progetti negli anni—collettive, personali e installazioni.
                  </p>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                  <p className="mt-5 text-sm text-white/70">Suggerimento: usa ناوبری سال‌ها بالا برای پرش سریع.</p>
                </div>
              </div>
            </Reveal>
          </aside>

          {/* Timeline */}
          <div className="lg:col-span-8">
            <div className="relative" ref={timelineRef}>
              <div aria-hidden className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:left-4" />
              <ol className="space-y-10" role="list">
                {grouped.map(([year, yearItems], idx) => {
                  const hiddenYear = !showAll && idx >= safeInitialVisible;
                  if (hiddenYear) return null;
                  return <YearGroup key={year} year={year} items={yearItems} reduced={reduced} />;
                })}
              </ol>

              {yearKeys.length > safeInitialVisible && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/15 hover:ring-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
                    aria-expanded={showAll}
                  >
                    {showAll ? "Mostra meno" : "Mostra tutte le esposizioni"}
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 ${reduced ? "" : "transition-transform"} ${showAll ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
