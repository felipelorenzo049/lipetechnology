import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Founders from "@/components/Founders";
import Services from "@/components/Services";
import SectionCTA from "@/components/SectionCTA";
import KPIs from "@/components/KPIs";
import Pipe from "@/components/Pipe";
import HorseBidSpotlight from "@/components/HorseBidSpotlight";

import Process from "@/components/Process";
import TechStack from "@/components/TechStack";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Reveal from "@/components/Reveal";
import AuroraField from "@/components/AuroraField";
import AtmosphereOverlay from "@/components/AtmosphereOverlay";


const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [location.hash]);

  return (
    <SmoothScrollProvider>
      <AuroraField />
      <AtmosphereOverlay />

      <div className="relative z-10 min-h-screen text-foreground overflow-x-clip">
        
        <ScrollProgress />
        <Navbar />

        <Hero />
        <Reveal><Manifesto /></Reveal>
        <Founders />
        <Reveal><KPIs /></Reveal>
        <Reveal><Services /></Reveal>
        <Reveal><SectionCTA textKey="ctaSections.afterServices" highlightKey="ctaSections.afterServicesHighlight" /></Reveal>
        <Reveal><Pipe /></Reveal>
        <HorseBidSpotlight />
        <Reveal><SectionCTA textKey="ctaSections.afterPortfolio" highlightKey="ctaSections.afterPortfolioHighlight" /></Reveal>

        <Reveal><Process /></Reveal>
        <Reveal><TechStack /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><Contact /></Reveal>
        <Reveal><Footer /></Reveal>
        <WhatsAppButton />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;
