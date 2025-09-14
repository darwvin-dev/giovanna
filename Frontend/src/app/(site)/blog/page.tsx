"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    slug: "arte-materia",
    title: "L'Arte della Materia",
    excerpt: "Un viaggio attraverso texture e materiali che trasformano la tela in esperienze tattili e visive. Scopri come Alice Corbetta reinventa la percezione artistica attraverso l'uso innovativo di materiali non convenzionali...",
    image: "/blog1.jpg",
    category: "Arte Contemporanea",
    date: "14 Settembre 2025",
  },
  {
    slug: "riflessi-luce",
    title: "Riflessi di Luce",
    excerpt: "Come i riflessi metallici diventano protagonisti nel dialogo tra materia e luce. Un'analisi approfondita delle tecniche utilizzate da Alice per creare giochi di luce che cambiano con l'angolazione di osservazione...",
    image: "/blog2.jpg",
    category: "Critica",
    date: "9 Settembre 2025",
  },
  {
    slug: "processo-creativo",
    title: "Il Processo Creativo",
    excerpt: "Dietro le quinte della creazione artistica: dalla prima intuizione all'opera finita. Scopri il meticoloso processo di Alice Corbetta attraverso schizzi, bozzetti e le diverse fasi di lavorazione...",
    image: "/blog3.jpg",
    category: "Artista",
    date: "5 Settembre 2025",
  },
  {
    slug: "mostre-eventi",
    title: "Mostre ed Eventi",
    excerpt: "Tutti gli appuntamenti da non perdere con le opere di Alice Corbetta. Una panoramica delle esposizioni in programma e degli eventi speciali dove incontrare l'artista...",
    image: "/blog4.jpg",
    category: "Eventi",
    date: "1 Settembre 2025",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/alice3.jpg"
            alt="Alice Corbetta Blog"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text drop-shadow-2xl"
            style={{ fontFamily: "Poiret One, serif", color: "#fdc700" }}
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto leading-relaxed"
          >
            Scopri il mondo artistico di Alice Corbetta attraverso articoli, riflessioni e approfondimenti
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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

      {/* Featured Posts */}
      <section className="py-6 px-6 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-amber-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Articoli in Evidenza
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(0, 2).map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/5 hover:border-amber-400/30 shadow-2xl hover:shadow-amber-400/10 transition-all duration-500"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500/90 text-black text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-amber-300 font-medium group-hover:underline">
                    Leggi di più
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-amber-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tutti gli Articoli
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/5 hover:border-amber-400/30 shadow-xl hover:shadow-amber-400/5 transition-all duration-500"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500/90 text-black text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-amber-300 font-medium group-hover:underline text-sm">
                    Leggi di più
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}