import AboutHero from "@/components/About/AboutHero";
import AboutOverview from "@/components/About/AboutOverview";
import ExhibitionsSection from "@/components/About/ExhibitionsSection";

export default function AboutPage() {
  return (
    <>
      <AboutHero
        image="/alice4.jpg"
        title="Alice Corbetta"
      />
      <AboutOverview />
      <ExhibitionsSection />
    </>
  );
}
