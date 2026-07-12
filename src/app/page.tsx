import { Hero } from "@/components/hero";
import { RealityCheck } from "@/components/reality-check";
import { GiddensDifference } from "@/components/giddens-difference";
import { RealResults } from "@/components/real-results";
import { WhoThrives } from "@/components/who-thrives";
import { CareerJourney } from "@/components/career-journey";

export default function Home() {
  return (
    <main>
      <Hero />
      <RealityCheck />
      <GiddensDifference />
      <RealResults />
      <WhoThrives />
      <CareerJourney />
    </main>
  );
}
