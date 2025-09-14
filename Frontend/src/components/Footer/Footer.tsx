import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Opere" },            
  { href: "/blog", label: "Mostre / Eventi" }, 
  { href: "/contact-us", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-black text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-[#E3CA94]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="text-sm leading-relaxed">
            <p className="text-white/85">
              © {year} Giovanna. All rights reserved.
            </p>
            <p className="text-white/70">
              Design by {" "}
              <a
                href="mailto:darwvin@hotmail.com"
                className="text-[#E3CA94] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3CA94]/40 rounded"
              >
                Darwvin
              </a>
              .
            </p>
            <p className="text-white/70">
              Photo credits:{" "}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E3CA94] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3CA94]/40 rounded"
              >
                Test
              </a>{" "}
              &amp; Giovanna
            </p>
          </div>

          <nav
            aria-label="Footer links"
            className="md:justify-self-end text-sm"
          >
            <ul className="flex flex-wrap gap-x-5 gap-y-2 uppercase tracking-wide">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/85 hover:text-[#E3CA94] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3CA94]/40 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <p className="text-xs text-white/50">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
