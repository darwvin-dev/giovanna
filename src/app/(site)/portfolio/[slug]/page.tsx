"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GALLERY = [
  {
    title: "Mandala",
    src: "/fetzen_2-681x1024.jpg",
    caption: "32cm x 78 cm | Anno 2018",
    w: 681,
    h: 1024,
  },
  {
    title: "Corteccia",
    src: "/fetzen_1-696x1024.jpg",
    caption: "35cm x 62cm | Anno 2018",
    w: 696,
    h: 1024,
  },
  {
    title: "Scudo",
    src: "/fetzen_4-751x1024.jpg",
    caption: "40cm x 69cm | Anno 2018",
    w: 751,
    h: 1024,
  },
  {
    title: "Mappa",
    src: "/fetzen_6-1024x724.jpg",
    caption: "70cm x 50cm | Anno 2018",
    w: 1024,
    h: 724,
  },
  {
    title: "Trittico / Parte 1",
    src: "/fetzen_9.jpg",
    caption: "35cm x 65cm | Anno 2018",
    w: 1147,
    h: 1500,
  },
  {
    title: "Trittico / Parte 2",
    src: "/fetzen_8-e1569255616335.jpg",
    caption: "35cm x 65cm | Anno 2018",
    w: 1035,
    h: 1361,
  },
  {
    title: "Trittico / Parte 3",
    src: "/fetzen_7.jpg",
    caption: "35cm x 65cm | Anno 2018",
    w: 1120,
    h: 1500,
  },
  {
    title: "Reperti 1",
    src: "/reperti-65x70-cm-2018-978x1024.jpg",
    caption: "65cm x 70cm | Anno 2018",
    w: 978,
    h: 1024,
  },
  {
    title: "Reperti 2",
    src: "/reperti-50x60-cm-2018-841x1024.jpg",
    caption: "50cm x 60cm | Anno 2018",
    w: 841,
    h: 1024,
  },
  {
    title: "Reperti 3",
    src: "/fetzen-reperti-cm.70x70-973x1024.jpg",
    caption: "70cm x 70cm | Anno 2018",
    w: 973,
    h: 1024,
  },
];

export default function FetzenPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative isolate h-[50vh] min-h-[380px] bg-cover bg-center" style={{ backgroundImage: "url('/fetzen_home.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
            className="px-6 text-center text-4xl md:text-5xl font-semibold tracking-wide text-amber-300 drop-shadow"
            style={{ fontFamily: "Poiret One, ui-serif, serif" }}
          >
            Collezione Fetzen
          </motion.h1>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="leading-relaxed text-white/85 text-lg md:text-xl [text-wrap:pretty]"
        >
          <span className="mr-2 inline-block text-4xl font-bold text-amber-300">F</span>
          etzen, stracci in tedesco, sono una serie composta da 12 pezzi originati da uno studio che riguarda il tempo e la materia.
          Il piacere del “fare” in un processo manuale che nobilita e trasforma uno straccio di juta in oggetto d’arte. Ho recuperato un’antica tecnica...
        </motion.p>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:balance]">
          {GALLERY.map((it, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative mb-6 break-inside-avoid cursor-zoom-in group overflow-hidden rounded-xl bg-white/[0.05] ring-1 ring-white/10 hover:ring-amber-400/40 transition-all"
            >
              <Image
                src={it.src}
                alt={it.title}
                width={it.w}
                height={it.h}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-medium">{it.title}</span> <span className="mx-2 text-white/40">•</span> {it.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-lg italic text-white/90 ring-1 ring-white/10 shadow-lg"
        >
          <q>
            Nelle opere di Alice spazi riflettenti la luce sono affidati agli strati metallici che interrompono la superficie...
            Questi lavori sono Yantra.
          </q>
          <footer className="mt-4 text-right text-amber-300">— Claudio Giorgetti</footer>
        </motion.blockquote>
      </section>
    </main>
  );
}
