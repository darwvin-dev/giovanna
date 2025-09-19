"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DynamicPart } from "@/types/dynamic-part";

export default function Main() {
  const [hero, setHero] = useState<DynamicPart | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/homepage`);
      const data = await res.json();

      setHero(data.data)
    })();
  }, []);
  console.log(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/public${hero?.image_1}`)
  return (
    <div id="main">
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/${hero?.image_1}` || ""}
            alt="Alice Corbetta Artwork"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <div className="max-w-4xl px-6">
            <blockquote className="mb-6 text-3xl font-light italic leading-tight md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-relaxed">
              {hero?.title_1}
            </blockquote>

            <p className="mb-12 text-sm uppercase tracking-widest md:text-base">
              {hero?.title_2}
            </p>

            <Link
              href={hero?.link_1 ?? "#"}
              className="inline-block rounded-sm bg-black/50 px-8 py-4 font-sans text-xl uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg"
            >
              {hero?.link_title_1}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="h-6 w-px bg-white"></div>
        </div>
      </div>
    </div>
  );
}
