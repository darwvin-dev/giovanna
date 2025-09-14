"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Collezione Fetzen",
    image: "/fetzen_home-500x328.jpg",
    href: "/portfolio/collezione-fetzen",
    description:
      "Una serie composta da 12 pezzi che esplorano il tempo e la materia...",
  },
  {
    title: "Collezione Riflessi",
    image: "/riflessi-blu_home-500x328.jpg",
    href: "/portfolio/riflessi-blu",
    description:
      "Opere che indagano la magia della creazione con bagliori subacquei...",
  },
  {
    title: "Collezione Ossidazioni",
    image: "/Corrosioni_home-500x328.jpg",
    href: "/portfolio/ossidazioni",
    description:
      "Stratificazioni ricoperte di polveri di ferro e rame ossidato...",
  },
  {
    title: "Collezione Specchi",
    image: "/quadri-specchio-500x500.jpg",
    href: "/portfolio/specchi",
    description:
      "Prospettiva e contrasti ombra/luce in una serie fotografica unica...",
  },
  {
    title: "Opere Decorative",
    image: "/Memorie-1-2010-500x500.jpg",
    href: "/portfolio/opere-decorative",
    description:
      "Tradizione e contemporaneità si fondono in superfici materiche uniche...",
  },
];

export default function OperePage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/alice3.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl"
            style={{ fontFamily: "Poiret One, serif" }}
          >
            OPERE
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            Collezioni e progetti speciali di Alice Corbetta
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
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

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-amber-300"
          style={{ fontFamily: "Poiret One, serif" }}
        >
          Collezioni
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 shadow-lg hover:shadow-amber-400/30 border border-white/10 hover:border-amber-400/40 transition"
            >
              <Link href={c.href}>
                <Image
                  src={c.image}
                  alt={c.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-2xl font-bold text-amber-200 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-200">{c.description}</p>
                  <span className="mt-3 inline-block text-amber-300 text-sm font-semibold group-hover:underline">
                    Scopri →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
