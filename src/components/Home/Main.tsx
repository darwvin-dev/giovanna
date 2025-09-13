import Link from "next/link";
import Image from "next/image";

const HERO = {
  image: "/alice5.jpg",
  quote: "La memoria è un presente che non finisce mai di passare",
  author: "Octavio Paz",
  ctaLabel: "OPERE",
  ctaHref: "/opere",
};

export default function Main() {
  return (
    <div id="main">
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/alice5.jpg"
            alt="Alice Corbetta Artwork"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="max-w-4xl px-6">
            {/* Quote */}
            <blockquote className="mb-6 text-3xl font-light italic leading-tight md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-relaxed">
              {HERO.quote}
            </blockquote>
            
            {/* Author */}
            <p className="mb-12 text-sm uppercase tracking-widest md:text-base">
              {HERO.author}
            </p>
            
            {/* CTA Button */}
            <Link
              href={HERO.ctaHref}
              className="inline-block rounded-sm bg-black/50 px-8 py-4 font-sans text-xl uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg"
            >
              {HERO.ctaLabel}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="h-6 w-px bg-white"></div>
        </div>
      </div>
    </div>
  );
}