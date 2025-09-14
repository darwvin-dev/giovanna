"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const artworks = [
  {
    title: "Oltremare",
    image: "/Riflessi-Blu-Oltremare-50X70-2017.jpg",
    caption: "50cm x 70cm | Anno 2017",
  },
  {
    title: "Blucrystal",
    image: "/riflessi-blucrystal-cm60x100x4-2017.jpg",
    caption: "60cm x 100cm x 4cm | Anno 2017",
  },
  {
    title: "Continenti",
    image: "/riflessi-continenti-60x100-2017.jpg",
    caption: "60cm x 100cm | Anno 2017",
  },
  {
    title: "Scogliere",
    image: "/riflessi-scogliera-30x80-2017.jpg",
    caption: "30cm x 80cm | Anno 2017",
  },
  {
    title: "Fondali",
    image: "/riflessi-fondali-150x50-2017.jpg",
    caption: "150cm x 50cm | Anno 2017",
  },
  {
    title: "Deep Blue",
    image: "/riflessi-blu-deep-50x40-2017.jpg",
    caption: "50cm x 40cm | Anno 2017",
  },
  {
    title: "Pianeta Mare",
    image: "/riflessi-pianeta-mare-80x100x45-2017.jpg",
    caption: "80cm x 100cm x 4,5cm | Anno 2017",
  },
];

export default function RiflessiPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/riflessi-blu_home.jpg"
          alt="Riflessi Collection"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-xl px-6"
          style={{ fontFamily: "Poiret One, serif" }}
        >
          Riflessi delle parti emerse
        </motion.h1>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Amo l’acqua, la sua liquidità e la meraviglia dei suoi riflessi. Di
          conseguenza amo il mare e tutte le sue forme di vita. È dall’osservazione
          di dettagli di natura che ha inizio lo studio di queste opere che
          indagano la magia della creazione.
          <br />
          <br />
          A livello simbolico, l&apos;acqua rappresenta la luna, che è signora
          delle acque e rappresenta il dualismo (faccia illuminata e faccia
          oscura), ma anche il potenziale individuale di comunicazione, i
          sentimenti, le emozioni. L&apos;aspetto lunare rappresenta il
          femminile, la vita nascosta, che pulsa sotto la superficie.
          <br />
          <br />
          Attraverso una tecnica di stratificazione materica su tavola di legno,
          ho cercato cromie che potessero avvicinarsi a quei bagliori subacquei e
          alle sfumature iridescenti di animali marini. La resina ha cristallizzato
          quelle visioni, come dei frame…
        </motion.p>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-amber-300 mb-12 text-center"
          style={{ fontFamily: "Poiret One, serif" }}
        >
          Le Opere
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {artworks.map((art, i) => (
            <motion.figure
              key={i}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-400/40 shadow-lg hover:shadow-amber-400/30 transition"
            >
              <Image
                src={art.image}
                alt={art.title}
                width={600}
                height={800}
                className="w-full h-80 object-cover"
              />
              <figcaption className="p-4 text-center text-sm text-gray-300">
                <h3 className="font-semibold text-white text-lg mb-1">
                  {art.title}
                </h3>
                <p>{art.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </main>
  );
}
