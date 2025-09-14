import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type HighlightPost = {
  href: string;
  title: string;
  image: string;
  excerpt?: string;
  ctaLabel?: string;
  blurDataURL?: string;
};

type AboutOverviewProps = {
  post?: HighlightPost;
  paragraphs?: string[];
  promoTitle?: string;
  promoHref?: string;
};

export default function AboutOverview({
  post = {
    href: "/alice-corbetta-alchimia-di-una-meditazione-creativa/",
    title: "ALICE CORBETTA: alchimia di una meditazione creativa",
    image: "/alice4.jpg",
    excerpt: "di CARLO GIORGETTI...",
    ctaLabel: "Read More",
  },
  paragraphs = [
    "Nasce a Milano nel 1964.",
    "Terminati gli studi di pittura presso l'Accademia di Belle Arti di Brera, Alice inizia la sua professione artistica ideando e realizzando una serie d'incisioni per il libro di Antonio Mercurio dal titolo 'Lunaria', edito da Crocetti editore.",
    "Durante l'arco degli anni '90, Alice concentra maggiormente la sua attività nel texil design, collaborando con diverse aziende illustri della moda in Italia e all'estero. Contemporaneamente cura lo sviluppo di progetti di design e disegna alcune collezioni di tappeti in Italia e in Belgio.",
    "Dal 2007 si trasferisce in Toscana, dove concentra maggiormente la sua ricerca artistica sullo studio delle superficie dei materiali usando la sperimentazione como linguaggio del possibile. Partecipa ad esposizione d'arte in spazi pubblici e privati.",
  ],
  promoTitle = "Scopri il sito dedicato all'arte decorativa di Alice Corbetta su pareti e arredi",
  promoHref = "/",
}: AboutOverviewProps) {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 text-white pt-20 md:pt-28 overflow-hidden relative py-8">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/5 rounded-full opacity-30"></div>
      <div className="absolute bottom-40 right-16 w-24 h-24 border border-yellow-400/10 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/5 rounded-full"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title with decorative elements */}
        <div className="text-center mb-20 relative">
          <div className="absolute left-1/4 top-1/2 w-20 h-0.5 bg-yellow-400/40 transform -translate-y-1/2"></div>
          <div className="absolute right-1/4 top-1/2 w-20 h-0.5 bg-yellow-400/40 transform -translate-y-1/2"></div>
          
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-medium text-white inline-block px-8`}>
            About the Artist
          </h2>
          <p className="mt-4 text-white/60 text-lg">Discover the journey and inspiration behind the artwork</p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 items-start">
          {/* Highlight Card (Left) - Enhanced with artistic elements */}
          <article className="lg:col-span-5 relative group">
            {/* Decorative frame elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-yellow-400/50 opacity-80"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-yellow-400/50 opacity-80"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-yellow-400/50 opacity-80"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-yellow-400/50 opacity-80"></div>
            
            <Link
              href={post.href}
              aria-label={post.title}
              className="block overflow-hidden rounded-xl transition-all duration-700 group-hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  placeholder={post.blurDataURL ? "blur" : "empty"}
                  blurDataURL={post.blurDataURL}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                />
                
                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="mb-2">
                    <span className="inline-block w-12 h-0.5 bg-yellow-400 mb-2"></span>
                  </div>
                  <h3 className={`${playfair.className} text-2xl font-semibold mb-3 leading-tight`}>
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-white/80 text-base mb-4 font-light">{post.excerpt}</p>
                  )}
                  
                  <div className="flex items-center mt-4">
                    <span className="text-yellow-400 font-medium text-base tracking-wide group-hover:underline">
                      {post.ctaLabel ?? "Read More"}
                    </span>
                    <div className="ml-3 w-8 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-12 group-hover:bg-white"></div>
                  </div>
                </div>
              </div>
            </Link>
          </article>

          {/* Text Content (Right) */}
          <div className="lg:col-span-7">
            {/* Biography Text with enhanced styling */}
            <div className={`${cormorant.className} space-y-8 text-xl leading-relaxed text-white/90 mb-12`}>
              {paragraphs.map((p, i) => (
                <div key={i} className="relative">
                  {i === 0 && (
                    <span className="absolute -left-8 top-2 text-yellow-400/60 text-5xl font-serif">“</span>
                  )}
                  <p className="pl-4 border-l-2 border-yellow-400/30 py-2">
                    {p}
                  </p>
                </div>
              ))}
            </div>

            {/* Artistic signature */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-yellow-400 mr-4"></div>
                <div className={`${playfair.className} text-white/70 italic`}>
                  Alice Corbetta
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}