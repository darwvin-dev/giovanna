"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://www.alicecorbetta.it/wp-content/uploads/2019/09/Alice2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent"
          style={{ fontFamily: "Poiret One, serif" }}
        >
          Contatta Alice
        </motion.h1>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-amber-300">Message</h2>
          <p className="text-gray-300">Cell. +39.335.322839</p>
          <p className="text-gray-300">alicecorbetta@gmail.com</p>
          <p className="text-gray-300">www.alicecorbetta.it</p>
          <a
            href="https://www.decorazioneartistica.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline"
          >
            www.decorazioneartistica.it
          </a>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/10 space-y-6"
        >
          <div>
            <label className="block text-sm mb-2">Il tuo nome *</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-amber-400 focus:ring-amber-400 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">La tua email *</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-amber-400 focus:ring-amber-400 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Oggetto</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-amber-400 focus:ring-amber-400 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Il tuo messaggio</label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 focus:border-amber-400 focus:ring-amber-400 outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold hover:opacity-90 transition"
          >
            Invia
          </button>
        </motion.form>
      </section>
    </main>
  );
}
