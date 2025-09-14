"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------- Data -------------------- */
type Artwork = {
  title: string;
  image: string;
  caption: string;
  w?: number;
  h?: number;
};

const ARTWORKS: Artwork[] = [
  {
    title: "Mandala",
    image: "/fetzen_2-681x1024.jpg",
    caption: "32cm x 78 cm | Anno 2018",
    w: 681,
    h: 1024,
  },
  {
    title: "Corteccia",
    image: "/fetzen_1-696x1024.jpg",
    caption: "35cm x 62cm | Anno 2018",
    w: 696,
    h: 1024,
  },
  {
    title: "Scudo",
    image: "/fetzen_4-751x1024.jpg",
    caption: "40cm x 69cm | Anno 2018",
    w: 751,
    h: 1024,
  },
  {
    title: "Mappa",
    image: "/fetzen_6-1024x724.jpg",
    caption: "70cm x 50cm | Anno 2018",
    w: 1024,
    h: 724,
  },
  {
    title: "Trittico / Parte 1",
    image: "/fetzen_9.jpg",
    caption: "35cm x 65cm | Anno 2018",
    w: 1147,
    h: 1500,
  },
  {
    title: "Trittico / Parte 2",
    image: "/fetzen_8-e1569255616335.jpg",
    caption: "35cm x 65cm | Anno 2018",
    w: 1035,
    h: 1361,
  },
  {
    title: "Trittico / Parte 3",
    image: "/fetzen_7.jpg",
    caption: "35cm x 65cm | Anno 2018",
    w: 1120,
    h: 1500,
  },
  {
    title: "Reperti 1",
    image: "/reperti-65x70-cm-2018-978x1024.jpg",
    caption: "65cm x 70 cm | Anno 2018",
    w: 978,
    h: 1024,
  },
  {
    title: "Reperti 2",
    image: "/reperti-50x60-cm-2018-841x1024.jpg",
    caption: "50cm x 60cm | Anno 2018",
    w: 841,
    h: 1024,
  },
  {
    title: "Reperti 3",
    image: "/fetzen-reperti-cm.70x70-973x1024.jpg",
    caption: "70cm x 70cm | Anno 2018",
    w: 973,
    h: 1024,
  },
];

/* -------------------- Utils -------------------- */
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

/* -------------------- Page -------------------- */
export default function FetzenPage() {
  const items = useMemo(() => ARTWORKS, []);
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    index: number | null;
  }>({ open: false, index: null });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // lock body scroll and handle keyboard events
  useEffect(() => {
    if (lightbox.open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [lightbox.open]);

  // Preload images for better UX
  useEffect(() => {
    const preloadImages = () => {
      const promises = items.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = item.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(promises)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    };

    preloadImages();
  }, [items]);

  const openAt = (i: number) => setLightbox({ open: true, index: i });
  const close = () => setLightbox({ open: false, index: null });
  const prev = () =>
    setLightbox((s) => ({
      open: true,
      index: clamp((s.index ?? 0) - 1, 0, items.length - 1),
    }));
  const next = () =>
    setLightbox((s) => ({
      open: true,
      index: clamp((s.index ?? 0) + 1, 0, items.length - 1),
    }));

  return (
    <>
      <Head>
        <title>Collezione Fetzen - Alice Corbetta</title>
        <meta
          name="description"
          content="Scopri la Collezione Fetzen di Alice Corbetta, una serie di opere d'arte contemporanee uniche"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full mb-4"
                />
                <p className="text-amber-200">Caricamento opere...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section
          className="relative isolate h-[85vh] min-h-[520px] bg-cover bg-center flex items-end justify-center pb-16"
          style={{ backgroundImage: "url('/fetzen_home.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative z-10 text-center px-6"
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl mb-4"
              style={{ fontFamily: "Poiret One, ui-serif, serif" }}
            >
              Collezione Fetzen
            </h1>
            <p className="text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
              Una serie di opere che esplorano la materia attraverso strappi e
              ricomposizioni
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 animate-bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* DESCRIPTION */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <div className="flex">
              <span className="mr-4 text-6xl font-bold text-amber-400">F</span>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 pt-2">
                etzen, stracci in tedesco, sono una serie composta da 12 pezzi
                originati da uno studio sulla materia attraverso strappi e
                ricomposizioni. Le opere nascono da un processo stratificato che
                combina carte diverse, interventi pittorici e inserti metallici,
                creando una tensione tra frammentazione e unità, tra casualità e
                controllo.
              </p>
            </div>
          </motion.div>
        </section>

        {/* GALLERY */}
        <section className="mx-auto max-w-7xl px-6 pb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-amber-200"
          >
            Le Opere
          </motion.h2>

          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:balance]">
            {items.map((art, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10 hover:ring-amber-400/40 cursor-zoom-in shadow-lg hover:shadow-amber-400/20 group"
                onClick={() => openAt(i)}
              >
                <div className="overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    width={art.w}
                    height={art.h}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-4 text-sm text-white/80 transition-colors group-hover:text-white">
                  <span className="font-medium text-white group-hover:text-amber-300 transition-colors">
                    {art.title}
                  </span>
                  <span className="mx-2 text-white/40">•</span>
                  {art.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="mx-auto max-w-4xl px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-gradient-to-br from-amber-900/30 to-amber-700/20 backdrop-blur-md p-10 text-xl italic text-white/90 ring-1 ring-amber-400/20 shadow-2xl"
          >
            <span className="absolute -top-6 left-8 text-7xl text-amber-400/40">
              “
            </span>
            <p className="relative z-10">
              Nelle opere di Alice spazi riflettenti la luce sono affidati agli
              strati metallici che emergono prepotentemente tra le carte. La
              loro presenza dona un senso di preziosità e completezza all{"'"}
              intera opera, creando un dialogo tra materia grezza e elemento
              raffinato.
            </p>
            <footer className="mt-6 text-right text-amber-300 not-italic font-medium">
              — Claudio Giorgetti, Critico d{"'"}arte
            </footer>
          </motion.div>
        </section>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {lightbox.open && lightbox.index !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              ref={lightboxRef}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
              >
                <div className="relative overflow-hidden rounded-t-lg bg-black flex-grow flex items-center">
                  <motion.div
                    key={lightbox.index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={items[lightbox.index].image}
                      alt={items[lightbox.index].title}
                      width={items[lightbox.index].w ?? 1400}
                      height={items[lightbox.index].h ?? 1000}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </motion.div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-amber-400/20 backdrop-blur-md transition-all"
                    disabled={lightbox.index === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-amber-400/20 backdrop-blur-md transition-all"
                    disabled={lightbox.index === items.length - 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={close}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-red-500/50 backdrop-blur-md transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Index Indicator */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-sm text-white/80">
                    {lightbox.index + 1} / {items.length}
                  </div>
                </div>

                {/* Caption */}
                <div className="bg-gradient-to-r from-amber-900 to-amber-800 p-4 rounded-b-lg">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <h3 className="font-bold text-lg">
                        {items[lightbox.index].title}
                      </h3>
                      <p>{items[lightbox.index].caption}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}