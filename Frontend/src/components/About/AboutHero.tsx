import Image from "next/image";
import { Poiret_One, Cormorant_Garamond } from "next/font/google";

const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
});

type AboutHeroProps = {
  image?: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
  className?: string;
  showScrollIndicator?: boolean;
};

export default function AboutHero({
  image = "/alice4.jpg",
  title = "Alice Corbetta",
  subtitle,
  overlay = true,
  className = "",
  showScrollIndicator = true,
}: AboutHeroProps) {
  return (
    <section
      className={`relative h-screen min-h-[600px] w-full overflow-hidden ${className}`}
      aria-label={title}
    >
      <div className="absolute inset-0 z-0 transform-gpu transition-transform duration-700 ease-out hover:scale-105">
        <Image
          src={image}
          alt="Alice Corbetta"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9kfa+ODhTdYmw2MAdQmIonS8eoVFK5dSDnzSlT54b6bk+h0R//2Q=="
        />
      </div>

      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
          aria-hidden="true" 
        />
      )}

      <div className="absolute top-10 right-10 w-24 h-24 border-2 border-white/20 rounded-full opacity-60" />
      <div className="absolute bottom-20 left-8 w-16 h-16 border border-white/10 rounded-full opacity-40" />
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-yellow-400/10 rounded-full" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-yellow-400/60" />
          </div>
          
          <h1
            className={`${poiret.className} text-white tracking-wide
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4
              transform transition-all duration-1000
              drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]`}
          >
            {title}
          </h1>

          {subtitle && (
            <>
              <div className="flex justify-center my-6">
                <div className="w-24 h-0.5 bg-white/30" />
              </div>
              <p className={`${cormorant.className} mt-3 text-white/90 text-xl sm:text-2xl md:text-3xl italic font-light max-w-2xl mx-auto leading-relaxed`}>
                {subtitle}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-sm mb-2 tracking-widest font-light">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-t from-yellow-400/80 to-transparent" />
          </div>
        </div>
      )}

      {/* Signature */}
      <div className="absolute bottom-8 right-8 opacity-70">
        <div className={`${poiret.className} text-white/80 text-sm tracking-widest rotate-0 transform`}>
          ALICE CORBETTA
        </div>
      </div>
    </section>
  );
}