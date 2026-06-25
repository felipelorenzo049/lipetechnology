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
import { GradientBackground } from "@/components/ui/gradient-background";
import ScrollProgress from "@/components/ScrollProgress";
import SignalThread from "@/components/SignalThread";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Reveal from "@/components/Reveal";


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
      <GradientBackground
        className="min-h-screen text-foreground overflow-x-hidden"
        animationDuration={12}
        overlay
        overlayOpacity={0.75}
      >
        <div className="relative z-10">
          <SignalThread />
          <ScrollProgress />
          <Navbar />

          <Hero />
          <Reveal><Manifesto /></Reveal>
          <Reveal><Founders /></Reveal>
          <Reveal><KPIs /></Reveal>
          <Reveal><Services /></Reveal>
          <Reveal><SectionCTA textKey="ctaSections.afterServices" highlightKey="ctaSections.afterServicesHighlight" /></Reveal>
          <Reveal><Pipe /></Reveal>
          <Reveal><HorseBidSpotlight /></Reveal>
          <Reveal><SectionCTA textKey="ctaSections.afterPortfolio" highlightKey="ctaSections.afterPortfolioHighlight" /></Reveal>

          <Reveal><Process /></Reveal>
          <Reveal><TechStack /></Reveal>
          <Reveal><FAQ /></Reveal>
          <Reveal><Contact /></Reveal>
          <Reveal><Footer /></Reveal>
          <WhatsAppButton />
        </div>
      </GradientBackground>
    </SmoothScrollProvider>
  );
};

export default Index;
