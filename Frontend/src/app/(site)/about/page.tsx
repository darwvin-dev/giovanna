"use client";

import AboutHero from "@/components/About/AboutHero";
import AboutOverview from "@/components/About/AboutOverview";
import ExhibitionsSection from "@/components/About/ExhibitionsSection";
import { ExhibitionItem } from "@/types/admin-about";
import { DynamicPart } from "@/types/dynamic-part";
import { useEffect, useState } from "react";

type AboutServerData = {
  hero: DynamicPart;
  overview: DynamicPart;
  exhibitions: DynamicPart;
  items: ExhibitionItem[];
};

export default function AboutPage() {
  const [data, setData] = useState<AboutServerData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/about`).then(
      async (res) => {
        const serverData = await res.json();
        const description = JSON.parse(serverData.data.exhibitions?.description);
        setData({ ...serverData.data, items: description });
      }
    );
  }, []);

  if (!data) return;

  return (
    <>
      <AboutHero image={data.hero.image_1} title={data.hero.title_1 || ""} subtitle={data.hero.title_2} />
      <AboutOverview data={data.overview} />
      <ExhibitionsSection items={data?.items} />
    </>
  );
}
