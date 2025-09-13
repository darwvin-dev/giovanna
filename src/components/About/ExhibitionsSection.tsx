"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
  initialVisibleYears?: number;
};

/* ---------------- Default Data ---------------- */

const DEFAULT_ITEMS: ExhibitionItem[] = [
  {
    year: 2021,
    description: "Fermento — Spazio Eventi, Michele Satta, Bolgheri",
  },
  {
    year: 2019,
    description:
      "Abstracta Vitae — Sale Affrescate di Palazzo Comunale, Pistoia",
  },
  {
    year: 2019,
    description:
      "Riflessi nell’ombra (bipersonale), Fondazione BCC di Castagneto Carducci, Livorno",
  },
  {
    year: 2018,
    description:
      "In ogni modo (collettiva), Fornace Pasquinucci, Limite sull’Arno (FI)",
  },
  {
    year: 2017,
    description: "Inception (bipersonale), Lumen Gallery, Firenze",
  },
  {
    year: 2016,
    description: "Libro d’artista (collettiva), Stanze del Teatro, Pontremoli",
  },
  { year: 2015, description: "13 a tavola (collettiva), Palazzo Tucci, Lucca" },
  {
    year: 2015,
    description: "Astrazioni (collettiva), Galleria Plaumann, Milano",
  },
  {
    year: 2014,
    description:
      "Rosso di donne (collettiva), Galleria Senzalimitearte, Colle Val d’Elsa",
  },
  {
    year: 2014,
    description:
      "International Workshop of Painter Symposium, Stary Sącz, Polonia",
  },
  {
    year: 2014,
    description:
      "Metaphors (installazione), Spazio Paretra — Marble Weeks, Carrara",
  },
  {
    year: 2014,
    description: "Memorie in superficie, AdeleC Showroom, Firenze",
  },
  {
    year: 2013,
    description:
      "InTime (collettiva), Present Contemporary Art Gallery, Firenze",
  },
  {
    year: 2013,
    description: "Wallmemories (personale), Spazio Lumen, Firenze",
  },
  {
    year: 2013,
    description: "Reality Fluids (collettiva), Nhow Hotel, Milano",
  },
  {
    year: 2013,
    description: "Artur-o (installazione artistica), Villa Fani, Firenze",
  },
  {
    year: 2012,
    description: "Elite Collection — DieciRosso Art Gallery, Firenze",
  },
  {
    year: 2012,
    description:
      "Fuorisalone — Tactile Surface, Chiostro di San Simpliciano, Milano",
  },
  {
    year: 2012,
    description: "Flussartisti, Sala Comunale, Castellina in Chianti",
  },
  { year: 2012, description: "Personale, Paratissima, Torino" },
  {
    year: 2011,
    description:
      "Madame Vendange (personale), Libreria Gogol — Fuorisalone 2011, Milano",
  },
  {
    year: 2010,
    description:
      "Colloqui Letterali, Chiesa di Sant’Andrea a San Miniato, Pisa",
  },
  { year: 2010, description: "Trame d’artista, Spazio Dedon, Milano" },
  {
    year: 2009,
    description:
      "Adrenalina — l’arte emerge in nuove direzioni, Ex Mercato Ebraico, Roma",
  },
  { year: 2009, description: "Livello 16 — Fuorisalone 2009, Milano" },
  {
    year: 2008,
    description:
      "Tecniche miste (collettiva), Villa Caruso, Lastra a Signa (FI)",
  },
  { year: 2008, description: "Signora delle Mele — Fuorisalone 2008, Milano" },
  { year: 2007, description: "Verdeolivo — Fuorisalone 2007, Milano" },
  { year: 2006, description: "Levia Gravia, Palazzo Ducale, Genova" },
  {
    year: 2006,
    description: "Misteroggetto (personale), Galleria Blucammello, Livorno",
  },
];

/* ---------------- Utils ---------------- */

const isExternal = (href?: string) => href?.startsWith("http");

/* ---------------- Hooks ---------------- */

// Detect reduced motion preference
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

// Observe when element enters viewport
function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {
    rootMargin: "0px 0px -15% 0px",
    threshold: 0.1,
  }
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setShown(true));
    }, options);

    io.observe(ref.current);
    return () => io.disconnect();
  }, [options]);

  return { ref, shown };
}

/* ---------------- Components ---------------- */

function Reveal({
  children,
  shown,
  y = 12,
  delay = 0,
  reduced,
}: {
  children: React.ReactNode;
  shown: boolean;
  y?: number;
  delay?: number;
  reduced: boolean;
}) {
  const style: React.CSSProperties | undefined = reduced
    ? undefined
    : {
        transition: `opacity 600ms cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 600ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
      };

  return <div style={style}>{children}</div>;
}

function TimelineItem({
  item,
  reduced,
}: {
  item: ExhibitionItem;
  reduced: boolean;
}) {
  const { ref, shown } = useInView<HTMLLIElement>({
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.15,
  });

  const content = (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] text-white/90",
        reduced
          ? ""
          : "transition-all duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:-translate-y-0.5",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="absolute left-[-23px] sm:left-[-22px] top-5 h-2 w-2 rounded-full bg-white/70 ring-2 ring-black/40"
      />
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
    </div>
  );

  const wrapperStyle: React.CSSProperties | undefined = reduced
    ? undefined
    : {
        transition:
          "opacity 600ms cubic-bezier(.2,.7,.3,1), transform 600ms cubic-bezier(.2,.7,.3,1)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
      };

  const linkProps = {
    className:
      "block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
  };

  return (
    <li ref={ref} className="ml-8 sm:ml-10" style={wrapperStyle}>
      {item.href ? (
        isExternal(item.href) ? (
          <a
            {...linkProps}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.description} — apre in nuova scheda`}
          >
            {content}
          </a>
        ) : (
          <Link {...linkProps} href={item.href} aria-label={item.description}>
            {content}
          </Link>
        )
      ) : (
        content
      )}
    </li>
  );
}

function YearGroup({
  year,
  items,
  reduced,
}: {
  year: string;
  items: ExhibitionItem[];
  reduced: boolean;
}) {
  const { ref, shown } = useInView<HTMLDivElement>({
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.2,
  });

  return (
    <li
      data-year-anchor={year}
      id={`year-${year}`}
      className="scroll-mt-24 md:scroll-mt-32"
    >
      <Reveal shown={shown} reduced={reduced}>
        <div
          ref={ref}
          className="sticky top-20 z-10 mb-5 flex items-center gap-3"
        >
          <div className="relative h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(234,179,8,0.25)] ring-1 ring-amber-300/30" />
          <h2 className="tabular-nums text-xl sm:text-2xl font-semibold text-amber-400/95">
            {year}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>
      </Reveal>
      <ul className="space-y-4">
        {items.map((it, i) => (
          <TimelineItem key={`${year}-${i}`} item={it} reduced={reduced} />
        ))}
      </ul>
    </li>
  );
}

export default function ExhibitionsSection({
  title = "Esposizioni",
  background = "/Alice1.jpg",
  items = DEFAULT_ITEMS,
  className = "py-8 mt-8",
  initialVisibleYears = 6,
}: ExhibitionsSectionProps) {
  const reduced = useReducedMotion();

  const grouped = useMemo(() => {
    const map = new Map<string, ExhibitionItem[]>();
    for (const it of items) {
      const y = String(it.year);
      map.set(y, [...(map.get(y) ?? []), it]);
    }
    return Array.from(map.entries()).sort(
      (a, b) => Number(b[0]) - Number(a[0])
    );
  }, [items]);

  const yearKeys = grouped.map(([y]) => y);
  const [showAll, setShowAll] = useState(false);
  const [activeYear, setActiveYear] = useState<string>(yearKeys[0] ?? "");

  const { ref: headerRef, shown: headerShown } = useInView<HTMLDivElement>();
  const timelineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const anchors = Array.from(
      root.querySelectorAll<HTMLElement>("[data-year-anchor]")
    );
    if (!anchors.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best =
          visible[0] ??
          entries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];

        const y = best?.target.getAttribute("data-year-anchor");
        if (y) setActiveYear(y);
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    anchors.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [grouped]);

  const handleChipClick = (e: React.MouseEvent, y: string) => {
    e.preventDefault();
    const el = timelineRef.current?.querySelector<HTMLElement>(
      `[data-year-anchor="${y}"]`
    );
    if (!el) return;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#year-${y}`);
  };

  return (
    <section
      className={`relative isolate w-full ${className}`}
      aria-label={title}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/60"
      />

      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal shown={headerShown} reduced={reduced} y={14} delay={40}>
          <div ref={headerRef} className="mb-10 md:mb-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1
                className="text-white text-4xl sm:text-5xl font-light tracking-wide"
                style={{ fontFamily: "Poiret One, ui-serif, serif" }}
              >
                {title}
              </h1>

              <nav
                aria-label="Quick years navigation"
                className="relative w-full lg:w-auto overflow-x-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent hover:scrollbar-thumb-amber-300 scroll-smooth h-12 max-h-12 lg:max-w-6/12 overflow-y-hidden"
              >
                <ul className="flex items-center gap-2 pb-2 pr-4">
                  {yearKeys.map((y, idx) => {
                    const hidden = !showAll && idx >= initialVisibleYears;
                    if (hidden) return null;
                    const isActive = activeYear === y;
                    return (
                      <li key={y} className="shrink-0">
                        <a
                          href={`#year-${y}`}
                          onClick={(e) => handleChipClick(e, y)}
                          aria-current={isActive ? "true" : undefined}
                          className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm tabular-nums whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 transition-all duration-300 ${
                            isActive
                              ? "bg-amber-400 text-black font-semibold shadow-sm ring-1 ring-amber-300"
                              : "bg-white/5 text-white/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-white focus-visible:ring-amber-300/70"
                          }`}
                        >
                          {y}
                        </a>
                      </li>
                    );
                  })}

                  {yearKeys.length > initialVisibleYears && (
                    <li className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowAll((v) => !v)}
                        className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-amber-400 to-amber-300 text-black shadow-sm hover:from-amber-300 hover:to-amber-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
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

        <div className="lg:col-span-8">
          <div className="relative" ref={timelineRef}>
            <div
              aria-hidden
              className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:left-4"
            />
            <ol
              className="space-y-10 overflow-hidden transition-[max-height] duration-700 ease-in-out"
              style={{
                maxHeight: showAll
                  ? "5000px"
                  : `${initialVisibleYears * 250}px`,
              }}
            >
              {grouped.map(([year, yearItems], idx) => {
                return (
                  <YearGroup
                    key={year}
                    year={year}
                    items={yearItems}
                    reduced={reduced}
                  />
                );
              })}
            </ol>

            {yearKeys.length > initialVisibleYears && (
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
                    className={`h-4 w-4 ${
                      reduced ? "" : "transition-transform"
                    } ${showAll ? "rotate-180" : ""}`}
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
    </section>
  );
}
